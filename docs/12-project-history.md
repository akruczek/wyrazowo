# 12 — Project History

Why the codebase looks the way it does. Condensed from `changelog.md` (44 releases, 0.1.0 → 1.23.0
planned) and the git log.

Read this when something seems arbitrary — most oddities are the fossil of an earlier decision.

- [Timeline at a glance](#timeline-at-a-glance)
- [Era 1: Search engine foundations (0.1.x – 0.4.x)](#era-1-search-engine-foundations-01x--04x)
- [Era 2: Feature expansion (0.5.0 – 0.8.x)](#era-2-feature-expansion-050--08x)
- [Era 3: Going native (0.9.0 – 0.10.x)](#era-3-going-native-090--010x)
- [Era 4: Monetization and localization (0.11.0 – 1.1.0)](#era-4-monetization-and-localization-0110--110)
- [Era 5: The games (1.2.0 – 1.13.x)](#era-5-the-games-120--113x)
- [Era 6: Design system maturity (1.14.0 – 1.18.x)](#era-6-design-system-maturity-1140--118x)
- [Era 7: Reaching full potential (1.17.0 – 1.20.0)](#era-7-reaching-full-potential-1170--1200)
- [Era 8: Modernization and advanced search (1.21.0 – 1.22.1)](#era-8-modernization-and-advanced-search-1210--1221)
- [Era 9: Dependency modernization (1.23.0)](#era-9-dependency-modernization-1230)
- [What this explains](#what-this-explains)

---

## Timeline at a glance

| Version | Codename | The point of it |
| --- | --- | --- |
| 0.1.0 | Search Engine Foundations | Words up to 9 letters, blanks, word details |
| 0.2.0 | Scrabblemania | Bottom navigation, WebView, dictionary |
| 0.2.3 | — | **Word database split by length** |
| 0.3.0 | App Icon & Launch Screen | |
| 0.4.0 | Redesign V1 | Dashboard and navigation redesign |
| 0.5.0 | Soap Letters | Configurable multi-choice wildcards |
| 0.6.0 | Search History | |
| 0.7.0 | Haptic Feedback | |
| 0.8.0 | Playground | 15×15 board sandbox |
| 0.9.0 | **Native Search Engine** | Swift + Kotlin matchers |
| 0.10.0 | Dictionary | Native dictionary search |
| 0.11.0 | Dictionary Evolution | Random-word length filter |
| 0.12.0 | **Premium** | Code-based unlock |
| 1.0.0 | Localizations | Polish + English |
| 1.1.0 | Localizations Evolution | German, forced language |
| 1.2.0 | Playground Evolution | Letter carousel |
| 1.3.0 | **Search Engine Evolution** | Force index (`A!3`) |
| 1.4.0 | Dark Theme | |
| 1.5.0 | Charade Foundations | The Wordle clone |
| 1.6.0 | Guideline | Animated in-app help |
| 1.7.0 | Charade | Dictionary validation; **app renamed** |
| 1.8.0 | Charade Evolution | Advanced settings screen |
| 1.9.0 | **Dictionarly** | The alphabetical narrowing game |
| 1.10.0 | Google Sign-In | User screen |
| 1.11.0 | Advanced Search History | Save / import / clear |
| 1.12.0 | Dictionarly Evolution | 4 difficulty levels |
| 1.13.0 | User Statistics | Firebase RTDB points |
| 1.14.0 | Playground Reborn | Playground moved to Dashboard |
| 1.15.0 | UI Friendship | Animations, leave-game alerts, `wrzw` |
| 1.16.0 | UX Clean Up | **Generic text and spacing systems** |
| 1.17.0 | **Dashboard Reborn** | Search extended to 15 letters |
| 1.18.0 | Localization Improvements | Generic `Localization` enum |
| 1.19.0 | More Settings | Theme / haptic screens, update alert |
| 1.20.0 | **RTL** | Arabic and Hebrew |
| 1.21.0 | Maintenance | RN 0.73, Java → Kotlin, npm → yarn |
| 1.22.0 | **Advanced Search** | Word extension |
| 1.22.1 | — | History fix for advanced search |
| 1.23.0 | **Dependency Modernization** | RN 0.86, New Architecture, Promise native bridge |

---

## Era 1: Search engine foundations (0.1.x – 0.4.x)

The app started as one thing: a word search.

> **0.1.0 SEARCH ENGINE FOUNDATIONS**
> - Basic search engine which allow to search words up to 9 letters
> - Placeholder letters support
> - Words length configuration for optimization purpose
> - Word detail view with definition and points

The 9-letter ceiling and the word-length slider were both **performance measures**, not product
choices. Three of the next four releases were optimization work:

| Release | Change |
| --- | --- |
| 0.1.1 / 0.1.2 | "Words database security improvements" — the corpus was obfuscated / moved out of git |
| 0.1.3 | Search engine optimization |
| 0.1.4 | Words database optimization |
| 0.2.3 | **Search engine optimization (split database)** — the origin of `slowa2.ts` … `slowa9.ts` |

**Why the DB is split by length:** 0.2.3. Loading only the files matching the requested length range
was the first real speedup, and `allWordsByLength` still encodes that decision today.

0.2.0 added the bottom navigation and the Scrabblemania WebView; 0.2.2 added the dictionary. 0.4.0 was
the first redesign, and 0.4.1 fixed "wrong result when using soap letters" — the wildcard matcher has
been subtly tricky from the beginning.

---

## Era 2: Feature expansion (0.5.0 – 0.8.x)

Four features that still exist unchanged in shape:

- **0.5.0 Soap Letters** — the `A*B*C` multi-choice wildcard, plus the app version in the More tab.
- **0.6.0 Search History** — and immediately 0.6.2, "Possibility to search more than 100 results",
  which is where the paginated results modal comes from.
- **0.7.0 Haptic Feedback** — an option from day one, hence `useHapticFeedback` checking a setting
  rather than firing unconditionally.
- **0.8.0 Playground** — the board sandbox, with three follow-up releases fixing Android layout and
  shadows.

---

## Era 3: Going native (0.9.0 – 0.10.x)

The pivotal architectural decision.

> **0.9.0 NATIVE SEARCH ENGINE**
> - Native search engine foundation iOS
> - Native search engine foundation android

Rolled out cautiously, platform by platform, over four releases:

| Release | Change |
| --- | --- |
| 0.9.0 | Foundations on both platforms |
| 0.9.1 | Native engine shipped for Android |
| 0.9.2 | Fixed soap characters in the Android engine |
| 0.9.3 | Native engine shipped for iOS |

**Why the JS engine still exists:** it was the original implementation, and the native ones were built
alongside it as an opt-in. The developer toggle that switches between them
(`nativeSearchEngineEnabled`) is a direct survivor of this rollout — it was the safety valve.

**Why the corpus crosses the bridge:** the word files already lived in the JS bundle from Era 1. The
native modules were added as pure functions operating on data passed in, which was the smallest
possible change at the time. Two years later it is the app's main performance problem — see
[`11-tech-debt-and-modernization.md`](11-tech-debt-and-modernization.md#p21-the-entire-corpus-crosses-the-bridge-on-every-search).

0.10.0 gave the dictionary its own native search and a redesign.

---

## Era 4: Monetization and localization (0.11.0 – 1.1.0)

**0.12.0 PREMIUM** introduced the code-based unlock — "no more limitations!" The limitation in
question is the word-length cap, which is why premium to this day gates exactly one thing.

**1.0.0 LOCALIZATIONS** was the 1.0 milestone: full Polish and English support, plus "iOS native
search engine optimization" and "Search history optimization".

**1.1.0** added German and the ability to force a language from the More tab. 1.1.1 fixed an "Android
crash when locale identifier is not present" — the defensive fallback chain in
`src/core/system-language/system-language.tsx` dates from here.

---

## Era 5: The games (1.2.0 – 1.13.x)

The app grew from a tool into a small suite.

**1.3.0 SEARCH ENGINE EVOLUTION** added force index — "add letters on specific positions when search
possible words". This is the `A!3` encoding. Note the fix in the same release: "Native search engine
and premium flags in storage conflicts", and in 1.3.1 "Force index for selected letters second line" —
the two-row rack layout has caused index bugs repeatedly (again in 1.21.0).

**1.4.0 DARK THEME** — hence the four-token theme model and the tri-state `darkThemeEnabled`.

**1.5.0 CHARADE FOUNDATIONS** through **1.8.0 CHARADE EVOLUTION** built the Wordle clone:

| Release | Change |
| --- | --- |
| 1.5.0 | Charade playable; Playground moved to the More tab |
| 1.5.2 | Keyboard letter markings (the RGY coloring) |
| 1.7.0 | Guess validation against the dictionary; **app renamed** and re-iconed |
| 1.8.0 | Success/failure feedback; **Advanced Settings screen created** |

1.8.0 is where the Developer screen comes from: "Moved clear history and native search engine options
to new Advanced Settings screen". It was a tidy-up of the More tab, not a hidden debug menu — which
explains why it ships to users.

**1.9.0 DICTIONARLY** added the second game, followed by three consecutive releases (1.9.1, 1.9.2,
1.10.0) fixing its keyboard behaviour and list performance.

**1.10.0 GOOGLE SIGN-IN** added the User screen and moved premium onto it. **1.13.0 USER STATISTICS**
added the Firebase RTDB points, and 1.13.1 adjusted the multipliers — the
`floor(10 × longWords × difficulty)` formula in Dictionarly's end modal is the result.

---

## Era 6: Design system maturity (1.14.0 – 1.18.x)

Four releases of infrastructure work, and the origin of most of `src/core/`.

**1.15.0 UI FRIENDSHIP** — "_otils to wrzw migration". The micro-utility library was renamed from
`_otils` to `wrzw` here. Also added the leave-game alerts and screen-wide animations.

**1.16.0 UX CLEAN UP** — the most consequential technical release:

> ### Technical
> - Generic text migration
> - Generic spacing migration

This is where `Tx` and the `spacings` DSL were introduced and rolled out across the app. Everything in
[`05-core-infrastructure.md`](05-core-infrastructure.md#the-spacings-dsl) traces back to 1.16.0.

**1.18.0 LOCALIZATION IMPROVEMENTS** — "Generic Localization migration" produced the `Localization`
enum that types every `Tx local=` prop.

**1.14.0 PLAYGROUND REBORN** moved the Playground from More to Dashboard. It moved again in 1.22.0, to
Charade. Its current home in the Charade stack is the result of two relocations, not a design.

---

## Era 7: Reaching full potential (1.17.0 – 1.20.0)

**1.17.0 DASHBOARD REBORN** removed the constraint the app had shipped with since 0.1.0:

> - Unlocked full potential of search engine by allow to search words up to 15 letters!
> - Alert warning for letters slider

This is where `slowa10.ts` … `slowa15.ts` and the second index array `longWordsByLength` appear. The
split into two arrays exists purely because 10–15 was added later — functionally they could be one
array today.

The "alert warning for letters slider" is the warning shown above 10 letters, added because long
searches are slow. It is a UI acknowledgement of the performance problem rather than a fix.

**1.19.0 MORE SETTINGS** split theme and haptic into their own screens and added the GitHub-tag update
alert (`useNewVersionAlert`).

**1.20.0 RTL** added Arabic and Hebrew. Because the app never enabled `I18nManager.forceRTL`, this
release introduced the manual RTL handling seen everywhere: the `useRTL` hook, the `rtl.helper.ts`
functions, `RTL` props on containers, the four-token spacing swap and the reversed tab order.

---

## Era 8: Modernization and advanced search (1.21.0 – 1.22.1)

**1.21.0 MAINTENANCE** was the last big upkeep pass:

> - Upgrade React Native to 0.73.1
> - Upgrade dependencies / cocoa-pods
> - **Migrate native android codebase from Java to Kotlin**
> - Migrate from npm to yarn
> - Migrate from openjdk@11 to openjdk@17

The Android module is Kotlin because of this release. It also fixed "Android gestures issues on
possible words modal when back from background" — the origin of `useGesturesEnabled`.

**1.22.0 ADVANCED SEARCH** was the last feature, built across nine commits:

```
143ee25 v1.22.0 Advanced search foundations
8943874 v1.22.0 Advanced search rename
dc7a148 v1.22.0 Word extension foundations
4ad89aa v1.22.0 make advanced search selected letters read-only
04d0031 v1.22.0 move basics of search-possible-words functionality to advanced search module
d97416b v1.22.0 pass wordToExtend param to native search engine
4348957 v1.22.0 advanced native searcha engine iOS
3e59458 v1.22.0 advanced native search engine android
01a9115 v1.22.0 handle unhandled promise rejections - network
```

Note the order: the native implementations came **last**, which is why word extension exists only in
Swift and Kotlin and the JS engine explicitly bails out. The same release moved Playground into the
Charade module.

**1.22.1**, the last release before dormancy, fixed "Incorrect reading saved results from history for
advanced search" — the reason `useSearchPossibleWords` skips the cache when `wordToExtend` is set.

---

## Era 9: Dependency modernization (1.23.0)

After two years dormant, the stack was brought to React Native **0.86.2** on branch
`feature/dependency-modernization-0.86`. The release is numbered **1.23.0** (not 2.0.0) because the
existing `versionCode` scheme concatenates `major × 100 + minor + patch` — a 2.0.0 bump would produce
`20000`, which Play Store rejects as lower than `1.22.1`'s `100221`.

> **1.23.0 DEPENDENCY MODERNIZATION**
> - RN 0.86 / React 19 / New Architecture mandatory (Firebase v26, Reanimated 4)
> - Native search and file I/O return Promises; EventEmitter module deleted
> - Replaced modalize, vector-icons, material-bottom-tabs, reanimated-zoom, rn-range-slider, draggable
> - ESLint 9 flat config, TypeScript 7 typecheck, Jest 30, first package-lock.json
> - Flipper removed; iOS Swift AppDelegate; PrivacyInfo.xcprivacy; targetSdk 36

The Promise-based native bridge is the most important behavioural change for anyone reading search
code: there is no `NATIVE_DB_TAG`, no `useNativeDBEvents`, and no platform-specific event emitters.

---

## What this explains

| Oddity | Origin |
| --- | --- |
| Word DB split into one file per length | 0.2.3, the first real optimization |
| Two index arrays (`allWordsByLength` + `longWordsByLength`) | 10–15 letter support added later, in 1.17.0 |
| A JS engine that nobody uses | It was the original; native was added as opt-in in 0.9.x |
| The native engine toggle in settings | The safety valve from the 0.9.x rollout |
| The corpus crossing the bridge | Native modules were bolted onto JS-resident data in 0.9.0 |
| Premium gating only word length | The cap was the only limitation when premium shipped in 0.12.0 |
| "Advanced Settings" visible to users | It was a More-tab tidy-up in 1.8.0, not a debug screen |
| Playground inside the Charade stack | Moved twice — More → Dashboard (1.14.0) → Charade (1.22.0) |
| The `spacings` DSL and `Tx` | The "generic migrations" of 1.16.0 and 1.18.0 |
| `wrzw` as a name | Renamed from `_otils` in 1.15.0 |
| Manual RTL everywhere | 1.20.0 added RTL without `I18nManager.forceRTL` |
| Kotlin rather than Java on Android | The 1.21.0 migration |
| Word extension missing from the JS engine | Native implementations landed last in 1.22.0 |
| Advanced search bypassing the result cache | The 1.22.1 bug fix |
| Event-based native search (`NATIVE_DB_TAG`) | Removed in 1.23.0 — native modules now return Promises |
| `CustomModalize` wrapping gorhom, not Modalize | 1.23.0 library replacements |
| Dual TypeScript (7 for tsc, 6 for ESLint) | 1.23.0 tooling split |
| Recurring "second row" letter index bugs | The two-row rack layout, fixed in 1.3.1 and again in 1.21.0 |

The pattern across nine years of releases: **ship the feature, then spend the next release fixing
Android**. Android-specific fixes appear in 0.8.1, 0.8.2, 1.1.1, 1.5.1, 1.6.1, 1.10.0, 1.11.1, 1.15.1,
1.21.0 and 1.22.0. If you are adding something, budget time for the Android pass.
