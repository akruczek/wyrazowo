# AGENTS.md — Wyrazowo

Read this first. It is deliberately short. Detailed documentation lives in [`docs/`](docs/INDEX.md);
this file tells you which document to open so you do not have to scan the tree.

---

## What this project is

**Wyrazowo** is a React Native mobile app (iOS + Android) that helps players of Polish word games —
Scrabble and its mobile variant **Literaki**. Its core feature is a search engine that takes the
letters on your rack and returns every valid Polish word you can build from them, ranked by length
and point value. Around that core there are three mini-games, a dictionary lookup, a Scrabble board
sandbox, and a settings/profile area backed by Firebase.

The app is published, mature (236 commits, 22 minor releases) and was written by a single developer
without AI assistance. It has been dormant since **April 2024**.

---

## Status and hard gotchas

Read these before running or changing anything.

1. **The word database is not in git.** `src/assets/slowa2.ts` … `slowa15.ts` (~3.2M words, ~42 MB)
   are gitignored. They are generated from a source `slowa.ts` by `scripts/filter-words-by-length.js`.
   If they are missing, every search silently returns nothing. Check they exist before debugging search.
2. **`node_modules/` and `ios/Pods/` are absent.** The project cannot build until you install both.
3. **There are zero tests.** `jest.config.js` exists, no test file does. Do not assume a safety net.
4. **Native search does not return its results.** `DBModule.findPossibleWords` returns immediately;
   real results arrive later on the `findPossibleWordsResult` event. JS resolves with the sentinel
   `NATIVE_DB_TAG` in the meantime. This trips people up constantly — see `docs/02-search-engine.md`.
5. **The native engine is on by default** (`nativeSearchEngineEnabled: 1`). The JS implementation is a
   fallback and does **not** support word extension.
6. **Release builds are signed with the debug keystore** on Android. Do not ship as-is.
   See `docs/11-tech-debt-and-modernization.md`.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | React Native `0.73.1`, React `18.2.0` |
| Language | TypeScript `5.0.4` (strict), Kotlin `1.8.10`, Swift `5.0`, Objective-C++ |
| State | Redux Toolkit `1.9` + React Redux `8.1` |
| Styling | styled-components `6.1` (`/native`) with a custom theme and spacing DSL |
| Navigation | React Navigation 6 — material bottom tabs + native stacks |
| Animation | Reanimated `3.6`, Gesture Handler `2.14`, `LayoutAnimation` |
| Modals | `react-native-modalize` + `react-native-portalize` |
| Backend | Firebase Auth, Firebase Realtime Database, Google Sign-In |
| Utilities | Ramda `0.28`, plus the in-repo `wrzw` micro-library |
| JS engine | Hermes (both platforms). New Architecture is **off**. |

---

## Commands

```bash
# one-time setup
yarn install                                  # Node >= 18
cd ios && bundle install && bundle exec pod install && cd ..   # Ruby 2.7.4, CocoaPods ~> 1.13

# development
yarn start                                    # Metro
yarn ios                                      # build + run iOS
yarn android                                  # build + run Android
yarn lint                                     # eslint .
yarn test                                     # jest (currently runs nothing)

# maintenance
node scripts/filter-words-by-length.js 7      # regenerate src/assets/slowa7.ts (run from scripts/)
node scripts/update-version-code.js 1.22.1 1.23.0   # bump version everywhere
```

---

## Repository map

```
App.tsx / App.navigation.tsx   root providers and the bottom tab navigator
index.js                       AppRegistry entry, wrapped in gestureHandlerRootHOC
src/
  advanced-search/   word-extension search (native engine only)
  assets/            word database (gitignored) + help GIFs + premium codes
  charade/           Wordle-style guessing game
  core/              everything shared: UI kit, theme, storage, localization, services
  dashboard/         THE main screen — letter rack, search, results, history
  developer/         advanced settings: engine toggle, history import/export
  dictionarly/       alphabetical narrowing word game
  dictionary/        word lookup and random word
  help/              in-app animated guideline
  mania/             WebView wrapper around scrabblemania.pl
  more/              settings hub and all settings sub-screens
  native-db/         JS side of the native search bridge
  navigation/        SCREEN enum and shared navigator options
  playground/        15x15 Scrabble board sandbox with drag-and-drop
  settings/store/    app-wide settings slice (persisted to AsyncStorage)
  store/             Redux store registration
  user/              profile, Google sign-in, Firebase statistics, premium
ios/                 4 custom native modules (Swift + .m bridges) + app target
android/             single :app module, 3 custom native modules (Kotlin)
scripts/             word-list splitter and version bumper
docs/                this documentation
```

---

## Where to read next

| If you are working on... | Open |
| --- | --- |
| Anything — find a file or symbol fast | [`docs/INDEX.md`](docs/INDEX.md) |
| App boot, providers, navigation, Redux shape | [`docs/01-architecture.md`](docs/01-architecture.md) |
| Word search, wildcards, scoring, results caching | [`docs/02-search-engine.md`](docs/02-search-engine.md) |
| The main screen, advanced search, the native bridge | [`docs/03-module-dashboard.md`](docs/03-module-dashboard.md) |
| Charade, Dictionarly, Dictionary, Playground, Mania, Help | [`docs/04-modules-games.md`](docs/04-modules-games.md) |
| Theme, spacings, localization, storage, the UI kit | [`docs/05-core-infrastructure.md`](docs/05-core-infrastructure.md) |
| Firebase, auth, statistics, premium, settings screens | [`docs/06-user-firebase-premium.md`](docs/06-user-firebase-premium.md) |
| Swift modules, Podfile, Info.plist, Xcode settings | [`docs/07-native-ios.md`](docs/07-native-ios.md) |
| Kotlin modules, manifest, Gradle, SAF file access | [`docs/08-native-android.md`](docs/08-native-android.md) |
| Aliases, lint, jest, scripts, versioning, first-time setup | [`docs/09-build-and-tooling.md`](docs/09-build-and-tooling.md) |
| Writing code that matches the existing style | [`docs/10-conventions.md`](docs/10-conventions.md) |
| Deciding what to modernize or fix | [`docs/11-tech-debt-and-modernization.md`](docs/11-tech-debt-and-modernization.md) |
| Understanding why something is the way it is | [`docs/12-project-history.md`](docs/12-project-history.md) |
| Cutting a release, bumping the version, creating a git tag | [`docs/13-release-process.md`](docs/13-release-process.md) |

---

## Coding conventions (summary)

Full detail with citations in [`docs/10-conventions.md`](docs/10-conventions.md). The essentials:

```ts
import * as React from 'react'                      // never `import React from`
import * as R from 'ramda'                          // Ramda is always namespaced
import { Template } from '@core/template/template'  // aliases: @core, @assets, wrzw

interface Props {
  word: string;                                     // semicolons INSIDE type members
  onPress?: () => void;
}

export const MyThing = ({ word, onPress }: Props) => {   // named export, arrow fn, no React.FC
  const [ value, setValue ] = React.useState('')         // spaces inside [ ] and { }
  const items = [ 1, 2, 3 ]                              // no statement semicolons

  return <Tx local="search_for_word" spacings="0 M" bolder />
}
```

- **No semicolons** at end of statements. Single quotes in TS, double quotes in JSX attributes.
- **Named exports only.** The single `export default` in `src/` is `src/core/wrzw/index.ts`.
- **Spaces inside brackets**: `[ a, b ]`, `{ a, b }`, `React.useEffect(fn, [ dep ])`.
- **Kebab-case filenames with a role suffix**: `*.hook.ts`, `*.helper.ts`, `*.styled.ts`,
  `*.slice.ts`, `*.selectors.ts`, `*.constants.ts`, `*.models.ts`, `*.navigation.tsx`.
- **Module layout**: `src/{feature}/{feature}.tsx` plus `components/`, `hooks/`, `helpers/`, `store/`,
  each with an `index.ts` barrel.
- **Never hardcode user-facing text.** Add a key to all five files in
  `src/core/localize/localization/` and the `Localization` enum, then use `<Tx local="my_key" />`.
- **Never hardcode colors or spacing.** Use the `COLOR` enum and the `spacings` token DSL
  (`spacings="L M"`, `spacings="0 0 XXL 0"`).
- **Layout must be RTL-aware.** Arabic and Hebrew are supported; use `useRTL()` and the helpers in
  `src/core/styled/helpers/rtl.helper.ts`.

---

## Working agreements

- Run `yarn lint` after changing TypeScript. There is no test suite to fall back on.
- Any change to the search algorithm must be applied in **three** places to stay consistent:
  `src/dashboard/helpers/find-possible-words.helper.ts`, `ios/DBModule.swift`, and
  `android/app/src/main/java/com/wyrazowo/DBModuleManager.kt`.
- Branch naming is `release/x.y.z` (and `feature/*`); the default branch is `develop`.
  Commit messages follow `vX.Y.Z lowercase description`.
- Bump versions with `scripts/update-version-code.js` so `package.json`, Gradle and Xcode stay in sync.
- The docs in `docs/` are the source of truth for how things work. If you change behaviour, update
  the matching document in the same change — see `.cursor/rules/keep-docs-updated.mdc` for the
  code-area-to-document mapping.
- Never commit without explicit permission, and always propose a commit message for changes you made.
  See `.cursor/rules/commit-messages.mdc`.
