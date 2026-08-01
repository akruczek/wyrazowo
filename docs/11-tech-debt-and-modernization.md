# 11 — Tech Debt & Modernization Backlog

An opinionated, prioritized list of what to fix before shipping again, and what to modernize
afterwards. Written against the state of the repository as of the last commit (April 2024,
version 1.22.1).

Each item states the problem, where it lives, and what to do about it.

- [Priority summary](#priority-summary)
- [P0 — Cannot build or ship](#p0--cannot-build-or-ship)
- [P1 — Store compliance and correctness](#p1--store-compliance-and-correctness)
- [P2 — Performance](#p2--performance)
- [P3 — Platform upgrades](#p3--platform-upgrades)
- [P4 — Correctness and robustness](#p4--correctness-and-robustness)
- [P5 — Hygiene and cleanup](#p5--hygiene-and-cleanup)
- [Suggested sequencing](#suggested-sequencing)

---

## Priority summary

| # | Item | Effort |
| --- | --- | --- |
| **P0** | Missing word database, missing lockfile, Android release keystore | S–M |
| **P1** | iOS `exit(0)`, `aps-environment`, `PrivacyInfo.xcprivacy`, Flipper in release, `FSActivity` export | S |
| **P2** | Corpus over the bridge, main/bridge-thread search, no index, no paging or cancellation | L |
| **P3** | RN 0.73 → current, New Architecture, targetSdk, deprecated APIs | L |
| **P4** | Search event races, non-atomic Firebase writes, silent error handling, RGY duplicates | M |
| **P5** | Zero tests, Jetifier, dead code, typos, naming, unused dependencies | S–M |

---

## P0 — Cannot build or ship

### P0.1 The word database is not in the repository

**Where:** `.gitignore:69` excludes `/src/assets/slowa*.ts`; `scripts/filter-words-by-length.js`
generates them from a `slowa.ts` that is also absent.

**Impact:** A fresh clone cannot compile. `src/dashboard/helpers/find-possible-words.helper.ts`
statically imports `slowa2` … `slowa9` and the long-word helper imports `slowa10` … `slowa15`.

**Fix options, in order of preference:**

1. Move the corpus out of the JS bundle into native assets (see [P2.1](#p21-the-entire-corpus-crosses-the-bridge-on-every-search)), and commit the source
   word list as a single compressed file. This solves the build problem and the performance problem
   together.
2. Commit the generated `slowa*.ts` files via Git LFS.
3. At minimum, commit the source `slowa.ts` and document the regeneration step (partially done in
   [`09-build-and-tooling.md`](09-build-and-tooling.md#setup-runbook)).

Do not leave this as-is. It is the single biggest barrier to picking the project back up.

### P0.2 No lockfile

**Where:** there is no `yarn.lock` or `package-lock.json` in the repository.

**Impact:** `yarn install` today resolves different versions than the app was last built with — every
`^` range has moved for two years. Builds are not reproducible and breakage will look random.

**Fix:** install once, verify the app runs, then commit the resulting lockfile immediately.

### P0.3 Android release builds are signed with the debug keystore

**Where:** `android/app/build.gradle`, `buildTypes.release.signingConfig = signingConfigs.debug`.

**Impact:** cannot upload to Google Play. The keystore is committed and its password is `android`, so
the signing identity is public.

**Fix:** generate a release keystore, keep it out of git, add a `release` signing config reading
credentials from `~/.gradle/gradle.properties` or environment variables, and point
`buildTypes.release` at it. Note that if the app was previously published, the *original* upload key
is required — check Play Console for an existing app signing key before generating a new one.

---

## P1 — Store compliance and correctness

### P1.1 `exit(0)` in the iOS restart module

**Where:** `ios/RestartModule.swift:14-19`.

```swift
UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
exit(0)
```

**Impact:** Apple's HIG explicitly says apps should never terminate programmatically. Calling a
private XPC selector on `UIApplication` compounds the risk. This is a plausible rejection reason.

**Fix:** the restart exists only to apply a language change. Replace it with a JS-level remount — key
the provider tree on the language code so the whole tree re-renders — and drop `RestartModule` from
iOS entirely. Android's `Intent.makeRestartActivityTask` approach is legitimate and can stay, or be
removed for symmetry.

### P1.2 `aps-environment: development` in the release entitlements

**Where:** `ios/Wyrazowo/Wyrazowo.entitlements`.

**Impact:** an entitlement claiming development push in a production build. Push notifications are not
used anywhere in the app.

**Fix:** delete the entitlement. If push is ever added, set it to `production` for release builds.

### P1.3 Missing `PrivacyInfo.xcprivacy`

**Where:** absent from `ios/Wyrazowo/`.

**Impact:** Apple has required a privacy manifest for new submissions since May 2024. The app uses
required-reason APIs (`UserDefaults` via AsyncStorage, file timestamps) and collects data through
Firebase.

**Fix:** add a privacy manifest declaring the `NSPrivacyAccessedAPITypes` in use and the data
collected (identifiers via Firebase Auth, usage data via RTDB). Check whether the installed Firebase
and AsyncStorage versions ship their own manifests; if not, upgrade them.

### P1.4 Flipper initialized in Android release builds

**Where:** `android/app/src/main/java/com/wyrazowo/MainApplication.kt:44`.

```kotlin
ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
```

**Impact:** debug tooling shipped to production. The RN template guards this with
`if (BuildConfig.DEBUG)`.

**Fix:** add the guard, or better, remove Flipper entirely — it is deprecated in favour of the React
Native DevTools and is already disabled on iOS in the `Podfile`.

### P1.5 `FSActivity` has no `android:exported`

**Where:** `android/app/src/main/AndroidManifest.xml`.

**Impact:** builds currently succeed because the activity has no intent filter, but Android 12+
requires an explicit declaration and stricter AGP versions will fail the build.

**Fix:** add `android:exported="false"`. While in there, also give it a transparent theme so it does
not flash a blank window, and remove the unnecessary `WRITE_EXTERNAL_STORAGE` /
`READ_EXTERNAL_STORAGE` permissions — SAF does not need them.

### P1.6 Premium codes are public

**Where:** `src/assets/premium-codes.json` is committed; `.gitignore` mentions a `premium-codes.ts`
that does not exist.

**Impact:** the unlock code is visible to anyone reading the repository.

**Fix:** decide what premium should actually be. Options: a real in-app purchase, a server-validated
code, or simply removing the gate. The current mechanism provides no protection, so keeping it while
pretending otherwise is the worst of the three.

---

## P2 — Performance

This section is the reason the app feels slow on large searches. Fixing P2.1 unlocks most of the rest.

### P2.1 The entire corpus crosses the bridge on every search

**Where:** `src/native-db/native-db.ts:11-16`, called from
`src/dashboard/helpers/find-possible-words.helper.ts:44`.

```ts
_nativeModule.findPossibleWords(
  JSON.stringify(allWords),
  JSON.stringify(selectedLetters),
  wordToExtend,
)
```

**Impact:** a 2–15 letter search serializes ~3.2 million strings (~42 MB) to JSON in JS, copies the
string across the bridge, and deserializes it natively (Gson on Android, `JSONSerialization` on iOS).
This dominates search time and causes large transient memory spikes.

**Fix:** move the corpus into native assets.

- iOS: add the word files as bundle resources; load with `String(contentsOf:)`.
- Android: put them in `app/src/main/assets/`; load with `context.assets.open()`.
- Change the native signature to `findPossibleWords(minLength, maxLength, selectedLetters, wordToExtend?)`
  and have the native side read only the length files it needs.
- Keep the JS files only if the JS fallback engine is retained; otherwise delete them, which also
  removes ~42 MB from the JS bundle and fixes [P0.1](#p01-the-word-database-is-not-in-the-repository).

This is the single highest-value change in the whole backlog.

### P2.2 Search blocks the main thread (iOS) / bridge thread (Android)

**Where:** `ios/DBModule.swift` (no `methodQueue` override, `requiresMainQueueSetup` true);
`android/.../DBModuleManager.kt` (no coroutine dispatch).

**Impact:** on iOS the UI is frozen for the duration of a search. On Android the UI thread survives
but the bridge is blocked, so nothing else native can happen.

**Fix:** iOS — override `methodQueue` to return a background `DispatchQueue`, or wrap the work in
`DispatchQueue.global(qos: .userInitiated).async`. Android — run the loop in a coroutine on
`Dispatchers.Default`. In both cases, emit results back on the appropriate thread.

### P2.3 No index — brute-force scan of every candidate

**Where:** all three implementations of the matcher.

**Impact:** O(W × L) per search with W up to 3.2 million. There is no data structure making the
problem cheaper.

**Fix (after P2.1):** precompute a letter-signature index — group words by their sorted letter
multiset, so a rack lookup becomes a set of hash lookups over subsets rather than a full scan.
A DAWG/trie is the classic alternative and also enables prefix and pattern queries, which would make
position locking and word extension much cheaper. Either can be generated at build time and shipped
as a binary asset.

### P2.4 No paging, cancellation or progress

**Where:** the whole search path.

**Impact:** a broad search runs to completion with no feedback and no way to abort. If the user
changes their mind, they wait. If two searches overlap, results interleave unpredictably
([P4.1](#p41-search-results-have-no-request-identity)).

**Fix:** add a request id to `findPossibleWords`, emit incremental batches with the id, and add a
`cancelSearch(id)` method. Android already has a half-built `sendProgressEvent` helper
(`DBModuleManager.kt:15`) that is never called — wire it up or delete it.

### P2.5 Search history grows without bound

**Where:** `src/dashboard/hooks/use-search-possible-words.hook.ts:37-46`.

Every search prepends a full `SearchResultModel` — including the complete result array — to a single
AsyncStorage entry, with no cap and no pruning. A handful of broad searches can put megabytes into
AsyncStorage, and every subsequent search reads and re-parses the whole thing.

**Fix:** cap the history (say 50 entries), and store only the search parameters plus a result count,
re-running or lazily loading results when a history entry is opened.

### P2.6 The word pool is re-split on every guess in Dictionarly

**Where:** `src/dictionarly/hooks/use-dictionarly-play.hook.ts:39`.

```ts
const allWords = wordsLength ? getDictionaryWords(longWordsByLength) : getDictionaryWords(allWordsByLength)
```

**Impact:** splits and flattens up to ~2.5 million strings on every submitted guess.

**Fix:** memoize with `React.useMemo` on `wordsLength`, or hoist to module scope.

### P2.7 Playground drop hit-testing measures 225 views

**Where:** `src/playground/playground.tsx:67-86`.

**Impact:** every tile drop triggers 226 asynchronous `measure` calls.

**Fix:** the board is a uniform grid — compute the target index arithmetically from the drop point
relative to the board origin, using a single `measure` of the container.

---

## P3 — Platform upgrades

### P3.1 React Native 0.73.1 → current

**Impact:** two years of fixes, performance work and tooling improvements; also a prerequisite for
newer versions of most dependencies and for Apple/Google SDK requirements.

**Approach:** upgrade in steps (0.73 → 0.74 → 0.75 → …) using the
[RN Upgrade Helper](https://react-native-community.github.io/upgrade-helper/), not in one jump.
Expect friction from:

- `react-native-paper` 5's material bottom tabs — `@react-navigation/material-bottom-tabs` is
  deprecated in favour of `react-native-paper`'s own `createMaterialBottomTabNavigator`, and React
  Navigation 7 changes the API again.
- `styled-components` 6 typing against newer React types.
- The custom native modules, which use the old bridge API.

### P3.2 The New Architecture

**Where:** `android/gradle.properties` `newArchEnabled=false`; iOS has no `RCT_NEW_ARCH_ENABLED`.

**Impact:** the old bridge is on its way out; RN 0.76+ defaults to the New Architecture.

**Approach:** after P3.1, convert the three native modules to TurboModules. This is also the natural
moment to fix the event-based result delivery — a TurboModule can return a real Promise, which would
remove `NATIVE_DB_TAG` and the whole event dance ([P4.1](#p41-search-results-have-no-request-identity)).

### P3.3 Deprecated Android APIs

| API | Where | Replacement |
| --- | --- | --- |
| `startActivityForResult` / `onActivityResult` | `FSModuleManager.kt`, `FSActivity.kt` | Activity Result API (`registerForActivityResult`) |
| `ACTION_GET_CONTENT` for reading | `FSActivity.kt:30` | `ACTION_OPEN_DOCUMENT` |
| `android.enableJetifier=true` | `gradle.properties` | Remove — no dependency should still need it |

Also bump `targetSdkVersion` beyond 34 as Play deadlines require, and pin the Android Gradle Plugin
version (it is currently unpinned in `android/build.gradle`).

### P3.4 Deprecated iOS APIs

| API | Where | Replacement |
| --- | --- | --- |
| `kSecAttrAccessibleAlwaysThisDeviceOnly` | `KeyChainManager.swift` | `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` |
| `IPHONEOS_DEPLOYMENT_TARGET = 12.4` forced on all pods | `Podfile:56-61` | Raise the app target to 13.4+ and delete the loop |
| `armv7` in `UIRequiredDeviceCapabilities` | `Info.plist` | Remove |

### P3.5 Dependency modernization

| Dependency | Note |
| --- | --- |
| `@react-navigation/material-bottom-tabs` | Deprecated; move to `react-native-paper`'s navigator |
| `ramda@0.28` | Two majors behind; or drop it — the app uses ~25 functions, most trivially replaceable |
| `react-native-fs` | **Unused** — remove |
| `metro-react-native-babel-preset` | Superseded by `@react-native/babel-preset` — remove |
| `kotlinx-serialization` (plugin + dependency) | **Unused** — Gson is used instead |
| `com.facebook.fresco:animated-gif:2.+` | Pin the version; `2.+` breaks reproducibility |
| `@react-native-firebase/*` 18.x | Several majors behind |

---

## P4 — Correctness and robustness

### P4.1 Search results have no request identity

**Where:** `src/native-db/hooks/use-native-sb-events.hook.ts`.

Results arrive as a bare event with no correlation to the request. Overlapping searches overwrite each
other, and there is no timeout — if the native side throws, the results modal spins forever. The
cleanup also calls `removeAllListeners`, which is global rather than scoped to the subscription.

**Fix:** short term, add a request id and ignore stale events, plus a timeout that surfaces an error
state. Long term, TurboModules with real Promises ([P3.2](#p32-the-new-architecture)) removes the
problem entirely.

### P4.2 Firebase statistics writes are not atomic

**Where:** `src/core/user-statistics-service/user-statistics-service.ts` — all three methods do
read → modify → `set`.

**Fix:** use `ServerValue.increment(n)` or `ref.transaction()`.

### P4.3 The RTDB service writes to the wrong database instance

**Where:** `src/core/real-time-database/real-time-database.service.ts` — `set`, `update`, `push` and
`remove` call `.database()` without the `europe-west1` URL that the read methods pass.

**Impact:** latent. Current writes go through `setByReference`, which inherits the correct ref, so
nothing is broken today — but any direct call to those methods would hit the wrong database.

**Fix:** pass `REAL_TIME_DATABASE_URL` consistently.

### P4.4 Errors are swallowed everywhere

| Where | Problem |
| --- | --- |
| `src/core/storage/storage.ts` | All three methods return `null` on error; a corrupt value is indistinguishable from a missing one |
| `src/core/fetch-client/fetch-client.ts` | `try/catch` around a Promise catches nothing; a network failure never calls `onError` |
| `ios/FSModule.swift:22` | `catch {}` — write failures are silent and the method still returns `true` |
| `src/dashboard/helpers/parse-sjp-word-details.helper.ts` | Optional chaining through HTML scraping; any markup change yields an empty list with no signal |

**Fix:** distinguish "missing" from "failed", handle promise rejection in `fetchClient`, and surface
failures to the user where they matter.

### P4.5 Charade duplicate-letter scoring is wrong

**Where:** `src/charade/helpers/update-rgy-letters.helper.ts:19-31` and
`src/charade/components/charade-field/charade-field.styled.ts:33-47`.

Each position is judged independently, so guessing two `A`s against a secret with one `A` highlights
both. Real Wordle accounts for multiplicity.

**Fix:** implement the standard two-pass algorithm (greens first, then yellows from the remaining
letter counts). Note the logic is duplicated in the helper and the styled file — unify it first.

### P4.6 Crash-prone force unwraps in the native matchers

**Where:** `ios/DBModule.swift:33-34` (`as!`), `android/.../DBModuleManager.kt:69` (`!!`) and
`.toInt()` on the index portion of a `"A!3"` token.

Malformed input — a rack entry like `"A!"` — crashes the app rather than failing the search.

**Fix:** guard/`?:` with a graceful fallback, and validate the encoding on the JS side before sending.

### P4.7 Custom soap selection is greedy

**Where:** all three matchers.

The first matching custom-soap group is consumed, which can reject a word that a different assignment
would satisfy. A genuine (rare) false negative.

**Fix:** proper assignment requires backtracking or bipartite matching. Given custom soap groups are
few, a small backtracking pass is affordable.

### P4.8 `appendSortedWords` relies on the functional-setter form

**Where:** `src/dictionarly/hooks/use-dictionarly-play.hook.ts:49,52`.

`appendSortedWords(value)` returns a function, which is passed straight to `setWordsAfter`. It works
only because React treats a function argument as an updater. Correct by accident.

**Fix:** make the intent explicit: `setWordsAfter(prev => appendSortedWords(value)(prev))`.

### P4.9 The Dashboard's `useMemo` swallows re-renders

**Where:** `src/dashboard/dashboard.tsx:49-71`, dependencies `[ selectedLetters, letters, possibleWords ]`.

The entire screen tree is memoized on three values, so any other state change will not re-render.
This is a deliberate optimization but a trap for future changes.

**Fix:** memoize the expensive child (`LettersGrid`) with `React.memo` instead of the whole screen.

---

## P5 — Hygiene and cleanup

### P5.1 There are no tests

Zero test files. `yarn test` passes because there is nothing to run.

**Start here** — pure helpers with no React or native dependencies:

| File | Why it matters |
| --- | --- |
| `src/dashboard/helpers/find-possible-words.helper.ts` | The parity reference for both native matchers |
| `src/dashboard/helpers/get-word-points.helper.ts` | Simple, high value |
| `src/dashboard/helpers/get-soap-characters-indexes.helper.ts` | Subtle logic |
| `src/core/styled/helpers/parse-margin.helper.ts` | Including the RTL four-token swap |
| `src/charade/helpers/update-rgy-letters.helper.ts` | Currently wrong; tests would pin the fix |
| `src/core/wrzw/` | Trivial to cover completely |

A shared fixture word list would also let the same cases be run against the Swift and Kotlin matchers
(XCTest / JUnit), which is the only realistic way to keep three implementations in sync.

### P5.2 Dead code

| Item | Where |
| --- | --- |
| `RCTEventEmmiter.m` | `ios/` — typo-named, not in the build |
| `RCTEventEmitter.h` | `ios/` — not compiled |
| `sendProgressEvent` | `DBModuleManager.kt:15` — never called |
| `registerEventEmitter` + private `eventEmitter` | `RCTEventEmitter.swift:8,17` |
| `AdvancedSearchModal` | `src/playground/components/` — empty shell |
| `onPressColumn` / `onPressRow` | `playground.tsx:40-46` — commented-out bodies |
| `types.d.ts` | Empty file |
| `WyrazowoTests.m` | Stale RN template test that would fail |
| `RNNKotlinVersion` | `android/build.gradle` — declared, unused |
| `next-env.d.ts` reference | `tsconfig.json:28` — file does not exist |
| Hidden `HELP_DATA` entries | `src/help/help.constants.ts` — dictionary and charade topics never written |

### P5.3 Naming and typos

| Item | Where |
| --- | --- |
| `settingsSlice` variable in the dashboard slice | `src/dashboard/store/dashboard.slice.ts` |
| `cutom-modalize.tsx` | `src/core/custom-modalize/` |
| `new-version-avaialble-alert.ts` | `src/core/alerts/` |
| `use-native-sb-events.hook.ts` (should be `db`) | `src/native-db/hooks/` |
| `WordDetialsDefinitions` | `src/dashboard/components/word-details-modal/` |
| `useSearchHistory` in `use-search-history-modal.hook.ts` | name/file mismatch |
| Shadowed `selectedLetters` parameter | `DBModuleManager.kt:34` |

### P5.4 Kotlin `!==` / `===` on non-primitives

**Where:** `DBModuleManager.kt` lines 52, 58, 75, 86, 87, 121.

Referential comparison where structural was intended. Works today by coincidence.

**Fix:** replace with `!=` / `==`.

### P5.5 The two premium alerts are not localized

**Where:** `src/core/alerts/go-premium-alert.ts`, `deactivate-premium-alert.ts` — hardcoded English,
the only untranslated user-facing text in the app.

### P5.6 The developer screen is visible in production

**Where:** `src/more/hooks/use-more-options.hook.ts:74` — `// TODO: hidden: !__DEV__`.

Decide: either finish the TODO, or accept it as a user-facing "advanced settings" screen and localize
and polish it accordingly. Leaving a screen labelled "Developer" in a shipped app is the worst option.

### P5.7 Missing project scaffolding

| Missing | Suggestion |
| --- | --- |
| CI | A GitHub Actions workflow running `yarn lint`, `tsc --noEmit` and `yarn test` on PRs |
| Pre-commit hooks | `husky` + `lint-staged` |
| Working ESLint rules | `semi: false` in `.eslintrc.js` is at the top level and ignored; move it under `rules` |
| `typecheck` script | `"typecheck": "tsc --noEmit"` |
| `.nvmrc` | Pin Node alongside `.ruby-version` |
| Dependency updates | Dependabot or Renovate |

### P5.8 Versioning scheme is not monotonic

**Where:** `scripts/update-version-code.js:11-21`.

`major × 100` concatenated with minor and patch means `2.0.0` → `20000`, which is **lower** than
`1.22.1` → `100221`. Google Play will reject the upload. `1.2.21` also collides with `1.22.1`.

**Fix:** switch to `major * 10000 + minor * 100 + patch`. Note this produces smaller numbers than the
current scheme, so the first release after the change needs a manual bump above `100221`.
Also fix the bug where `oldVersionCode` is computed from the **new** version's major, which silently
no-ops the Gradle and pbxproj replacements across a major bump.

### P5.9 Reanimated Babel plugin ordering

**Where:** `babel.config.js:3-4` — `react-native-reanimated/plugin` is listed before
`module-resolver`. Reanimated documents that its plugin must be last.

It works today, but move it to the end of the array to match the requirement.

---

## Suggested sequencing

### Phase 1 — Get it running again (days)

1. Recover or regenerate the word database ([P0.1](#p01-the-word-database-is-not-in-the-repository)).
2. `yarn install`, `pod install`, verify both platforms build, **commit the lockfile**
   ([P0.2](#p02-no-lockfile)).
3. Fix the Android release keystore ([P0.3](#p03-android-release-builds-are-signed-with-the-debug-keystore)).
4. Add `android:exported` to `FSActivity` ([P1.5](#p15-fsactivity-has-no-androidexported)).

At this point you have a buildable, shippable-in-principle project.

### Phase 2 — Make it safe to change (1–2 weeks)

5. Add tests for the pure helpers, especially the matcher
   ([P5.1](#p51-there-are-no-tests)).
6. Add CI running lint, typecheck and tests ([P5.7](#p57-missing-project-scaffolding)).
7. Fix store-compliance items: iOS `exit(0)`, entitlements, privacy manifest, Flipper
   ([P1.1](#p11-exit0-in-the-ios-restart-module)–[P1.4](#p14-flipper-initialized-in-android-release-builds)).

### Phase 3 — Fix the core (2–4 weeks)

8. Move the corpus into native assets and change the native signature
   ([P2.1](#p21-the-entire-corpus-crosses-the-bridge-on-every-search)). This is the big one — it also
   resolves the build problem, shrinks the bundle by ~42 MB and unblocks everything below.
9. Move search off the main/bridge thread ([P2.2](#p22-search-blocks-the-main-thread-ios--bridge-thread-android)).
10. Add request ids, cancellation and progress ([P2.4](#p24-no-paging-cancellation-or-progress),
    [P4.1](#p41-search-results-have-no-request-identity)).
11. Build a letter-signature index or DAWG ([P2.3](#p23-no-index--brute-force-scan-of-every-candidate)).
12. Cap the search history ([P2.5](#p25-search-history-grows-without-bound)).

The tests from Phase 2 are what make this safe — they let you verify the native rewrite produces
identical results to the JS reference.

### Phase 4 — Modernize the platform (2–4 weeks)

13. Step RN 0.73 → current ([P3.1](#p31-react-native-0731--current)).
14. Enable the New Architecture and convert the native modules to TurboModules
    ([P3.2](#p32-the-new-architecture)) — which lets you delete `NATIVE_DB_TAG` and the event plumbing.
15. Replace deprecated Android and iOS APIs ([P3.3](#p33-deprecated-android-apis),
    [P3.4](#p34-deprecated-ios-apis)).
16. Update or drop dependencies ([P3.5](#p35-dependency-modernization)).

### Phase 5 — Polish (ongoing)

17. Correctness fixes: Charade duplicates, Firebase atomicity, error handling
    ([P4](#p4--correctness-and-robustness)).
18. Delete dead code, fix names and typos ([P5.2](#p52-dead-code), [P5.3](#p53-naming-and-typos)).
19. Decide what premium and the developer screen should be
    ([P1.6](#p16-premium-codes-are-public), [P5.6](#p56-the-developer-screen-is-visible-in-production)).
