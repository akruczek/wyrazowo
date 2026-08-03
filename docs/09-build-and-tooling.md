# 09 — Build & Tooling

Path aliases, linting, testing, the two maintenance scripts, versioning, git conventions and a
from-scratch setup runbook.

- [Setup runbook](#setup-runbook)
- [Scripts](#scripts)
- [Path aliases](#path-aliases)
- [TypeScript](#typescript)
- [Babel and Metro](#babel-and-metro)
- [ESLint and Prettier](#eslint-and-prettier)
- [Testing](#testing)
- [Maintenance scripts](#maintenance-scripts)
- [Versioning](#versioning)
- [What is not in git](#what-is-not-in-git)
- [Git conventions](#git-conventions)
- [Dependencies](#dependencies)

---

## Setup runbook

The repository as checked out **cannot build**. Three things are missing: `node_modules/`,
`ios/Pods/`, and the word database.

### Prerequisites

| Tool | Version |
| --- | --- |
| Node | `>= 22.11.0` (enforced by `package.json` `engines`) |
| Yarn or npm | Either works; **`package-lock.json` is committed** (first lockfile in 1.23.0) |
| Ruby | `3.3.1` (`.ruby-version`) |
| Bundler | any recent |
| Xcode | 15+ recommended for RN 0.86 |
| JDK | 17+ |
| Android SDK | Platform 36, Build Tools 36.0.0, NDK 27.1.12297006 |

### Steps

```bash
# 1. JS dependencies
yarn install

# 2. iOS native dependencies
cd ios
bundle install                 # installs CocoaPods ~> 1.13 into vendor/bundle
bundle exec pod install
cd ..

# 3. Word database — REQUIRED, see below
#    You need src/assets/slowa.ts (the full corpus, not in git), then:
cd scripts
for n in 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do node filter-words-by-length.js $n; done
cd ..

# 4. Android SDK path
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties

# 5. Run
yarn start                     # Metro, in one terminal
yarn ios                       # or: yarn android
```

Step 3 is the blocker. Without `src/assets/slowa2.ts` … `slowa15.ts` the TypeScript imports in
`src/dashboard/helpers/find-possible-words.helper.ts` fail and the bundle will not build. The source
`slowa.ts` is not in the repository either — it must be recovered from a previous working copy, a
backup, or regenerated from a Polish Scrabble dictionary word list (one word per line, lowercase,
joined with `.` and wrapped in `export default '...'`).

### iOS notes

- Open `ios/Wyrazowo.xcworkspace`, never `Wyrazowo.xcodeproj` — the project uses CocoaPods.
- The signing team is `YY88S6TW4F`; you will need to change it to your own for a device build.

---

## Scripts

Defined in `package.json`:

| Script | Command | Notes |
| --- | --- | --- |
| `yarn android` | `react-native run-android` | |
| `yarn ios` | `react-native run-ios` | |
| `yarn start` | `react-native start` | Metro |
| `yarn lint` | `eslint .` | flat `eslint.config.js` |
| `yarn typecheck` | `tsc --noEmit` | TypeScript 7 via `@typescript/native` |
| `yarn test` | `jest` | Jest 30; passes trivially — there are no tests |

There is no separate typecheck alias beyond `yarn typecheck`. `yarn typecheck:tsc6` runs the ESLint
API TypeScript 6 install if you need to compare compiler output.

---

## Path aliases

Three aliases, configured in two places that must stay in sync.

| Alias | Resolves to |
| --- | --- |
| `@core/*` | `src/core/*` |
| `@assets/*` | `src/assets/*` |
| `wrzw` | `src/core/wrzw/index.ts` |

TypeScript (extends `@react-native/typescript-config`):

```1:16:tsconfig.json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    "types": ["jest"],
    "paths": {
      "*": ["./src/*"],
      "@core/*": ["./src/core/*"],
      "wrzw": ["./src/core/wrzw/index.ts"],
      "@assets/*": ["./src/assets/*"]
    },
    "resolveJsonModule": true,
    "strict": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["**/node_modules", "**/Pods"]
}
```

| Setting | Note |
| --- | --- |
| No `baseUrl` | Required for TypeScript 7 path resolution |
| `"*": ["./src/*"]` | Bare imports resolve under `src/` |
| `paths` use `./` prefixes | TS7-compatible alias form |
| `strict: true` | On, though `any` is used liberally in navigation code |

### Dual TypeScript install

| Package | Role |
| --- | --- |
| `@typescript/native` (`typescript@^7.0.2`) | **`yarn typecheck`** / editor primary — `tsc --noEmit` |
| `typescript` aliased to `@typescript/typescript6@^6.0.2` | ESLint `@typescript-eslint` parser API only |

Do not bump the ESLint-facing `typescript` package to 7 until `@typescript-eslint` supports it.

Babel (for runtime resolution):

```1:18:babel.config.js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          wrzw: './src/core/wrzw/index.ts',
          '@assets': './src/assets',
        },
      },
    ],
    // Must be listed last
    'react-native-worklets/plugin',
  ],
}
```

The **`react-native-worklets/plugin` must stay last** (Reanimated 4 depends on it; the old
`react-native-reanimated/plugin` is not used).

### The `package.json` naming trick

`src/core/package.json` contains `{ "name": "@core" }` and `src/core/wrzw/package.json` contains
`{ "name": "wrzw" }`. These are not real packages and are not installed — they give the directories a
package identity so tooling (editors, some resolvers) treats the alias as a module rather than a
relative path. Deleting them will not break the build, but do not be confused into thinking they are
workspace packages.

### Alias usage in practice

Aliases are used for **cross-module** imports. Within a module, relative paths are the norm:

```ts
import { Template } from '@core/template/template'          // cross-module: alias
import { useSelectLetter } from './hooks'                   // same module: relative
import { SCREEN } from '../navigation/navigation.constants' // sibling module: relative
```

Note that sibling feature modules (`../dashboard/helpers`) are reached relatively, not via an alias —
only `core` and `assets` have one.

---

## Babel and Metro

See the Babel snippet under [Path aliases](#path-aliases) above.

`metro.config.js` is the RN 0.86 default — no custom transformers or resolver overrides. The
`slowa*.ts` files are ordinary TypeScript modules as far as Metro is concerned, which is why they
inflate the bundle.

---

## ESLint and Prettier

**ESLint:** flat config in `eslint.config.js` (`.eslintrc.js` deleted). Extends
`@react-native/eslint-config/flat` with a sanitizer that drops broken plugins (`ft-flow`,
`eslint-comments`). Enforces `semi: ['error', 'never']` under `rules`.

**Version:** ESLint **9.39.5** — not ESLint 10. `eslint-plugin-react` and the RN shared config do not
support ESLint 10 yet; treat upgrading as blocked debt (see
[`11-tech-debt-and-modernization.md`](11-tech-debt-and-modernization.md)).

```1:4:.prettierrc.js
module.exports = {
  singleQuote: true,
  semi: false,
};
```

Prettier **3.9.6**. There is no pre-commit hook, no `lint-staged`, and no CI. Nothing runs the linter
automatically.

---

## Testing

```1:3:jest.config.js
module.exports = {
  preset: 'react-native',
};
```

**There are no test files in the repository.** `jest.config.js` uses `@react-native/jest-preset` (Jest
**30.4.2**). `yarn test` exits successfully having run nothing — do not read that as a green build.

If you add tests, the highest-value targets are the pure helpers, which have no React or native
dependencies:

- `src/dashboard/helpers/find-possible-words.helper.ts` (the JS matcher — the parity reference for
  both native implementations)
- `src/dashboard/helpers/get-word-points.helper.ts`
- `src/dashboard/helpers/get-soap-characters-indexes.helper.ts`
- `src/charade/helpers/update-rgy-letters.helper.ts`
- `src/core/styled/helpers/parse-margin.helper.ts` (the spacings DSL, including the RTL swap)
- `src/core/wrzw/`

The matcher tests would need a small fixture word list rather than the real corpus.

---

## Maintenance scripts

Two plain Node scripts in `scripts/`. **Both use paths relative to `scripts/`, so they must be run
from inside that directory.**

### `filter-words-by-length.js`

Splits the master word list into one file per word length.

```12:24:scripts/filter-words-by-length.js
  const words = packageJsonData
    ?.split("'")
    ?.[1]
    ?.split('.')
    ?.filter(({ length }) => _length == length)

  fs.writeFile(`../src/assets/slowa${_length}.ts`, `export default '${words.join('.')}'`, 'utf8', error => {
```

```bash
cd scripts
node filter-words-by-length.js 7      # reads ../src/assets/slowa.ts, writes ../src/assets/slowa7.ts
```

It reads the whole corpus into memory, splits on `'` to get the string literal, splits on `.`, filters
by length, and rejoins. Run it once per length from 2 to 15.

### `update-version-code.js`

Bumps the version in three files at once.

```bash
cd scripts
node update-version-code.js 1.22.1 1.23.0
```

| File | Fields updated |
| --- | --- |
| `package.json` | `version` |
| `android/app/build.gradle` | `versionCode`, `versionName` |
| `ios/Wyrazowo.xcodeproj/project.pbxproj` | `CURRENT_PROJECT_VERSION`, `MARKETING_VERSION` (twice — Debug and Release) |

It does simple string replacement, so both the old and new version must be passed and the old version
must match exactly. It does not touch `changelog.md` — that is manual.

---

## Versioning

The Android `versionCode` / iOS `CURRENT_PROJECT_VERSION` is derived from the semver string:

```11:21:scripts/update-version-code.js
  const oldVersionCode = [
    Number(newVersion.split('.')[0]) * 100,
    oldVersion.split('.')[1],
    oldVersion.split('.')[2],
  ].join('')

  const newVersionCode = [
    Number(newVersion.split('.')[0]) * 100,
    newVersion.split('.')[1],
    newVersion.split('.')[2],
  ].join('')
```

The rule is: **`major × 100`, then the minor, then the patch, concatenated as strings.**

| Version | Computation | Code |
| --- | --- | --- |
| `1.22.1` | `100` + `22` + `1` | `100221` |
| `1.23.0` | `100` + `23` + `0` | `100230` |
| `2.0.0` | `200` + `0` + `0` | `20000` |

Two flaws in this scheme:

- It is **not monotonic across a major bump**: `2.0.0` produces `20000`, which is *less* than
  `1.22.1`'s `100221`. Google Play would reject the upload.
- Multi-digit minors collide: `1.2.21` → `100221` is the same code as `1.22.1`.

A conventional `major * 10000 + minor * 100 + patch` scheme would fix both.

Also note `oldVersionCode` is computed using the **new** version's major (`newVersion.split('.')[0]`),
so bumping across a major boundary produces a wrong search string and the Gradle/pbxproj replacements
silently no-op.

Current state: `1.22.1` / `100221`, consistent across `package.json`, `android/app/build.gradle` and
the Xcode project.

---

## What is not in git

From `.gitignore`, the entries that matter:

```56:73:.gitignore
# Bundle artifact
*.jsbundle

# Ruby / CocoaPods
/ios/Pods/
/vendor/bundle/

# Temporary files created by Metro to check the health of the file watcher
.metro-health-check*

# testing
/coverage

# Words database
/src/assets/slowa*.ts

# PREMIUM CODES
/src/assets/premium-codes.ts
```

| Ignored | Consequence |
| --- | --- |
| `/src/assets/slowa*.ts` | **The app cannot build from a fresh clone.** ~42 MB of word data must be regenerated. |
| `/src/assets/premium-codes.ts` | Intended private version of the premium codes; **the actual `premium-codes.json` is committed**, so the codes are public. |
| `node_modules/`, `/ios/Pods/`, `/vendor/bundle/` | Standard; must be installed |
| `*.keystore` except `debug.keystore` | The debug keystore is committed and is also used for release builds |
| `local.properties` | Listed as ignored, but `android/local.properties` exists in the working tree with a machine-specific SDK path |

Also worth noting: **`package-lock.json` is committed** (added in 1.23.0). A `yarn.lock` also exists
in the working tree from earlier history — pick one package manager for installs to avoid drift.

---

## Git conventions

| Aspect | Convention |
| --- | --- |
| Default branch | `develop` |
| Release branches | `release/x.y.z` |
| Feature branches | `feature/name` (e.g. `origin/feature/advanced-search-engine`) |
| Current branch | `release/1.22.1` |
| Commit format | `vX.Y.Z lowercase description of the change` |
| Merges | Release branches merged into `develop` via GitHub pull requests |
| Total commits | 236 |
| Last commit | April 2024 |

Examples from the log:

```
eba0481 v1.22.1 fix incorrect reading saved search history for advanced search
41bc21a Merge pull request #22 from akruczek/release/1.22.0
01a9115 v1.22.0 handle unhandled promise rejections - network
3e59458 v1.22.0 advanced native search engine android
4348957 v1.22.0 advanced native searcha engine iOS
```

Every commit is prefixed with the version it belongs to, which makes `changelog.md` easy to assemble
and makes `git log --grep "v1.22"` a useful way to see everything that went into a release.

There is no CI configuration (`.github/workflows/` does not exist), no PR template and no
`CONTRIBUTING.md`.

---

## Dependencies

### Runtime

| Package | Version | Used for |
| --- | --- | --- |
| `react-native` | `0.86.2` | framework |
| `react` | `19.2.3` | |
| `@reduxjs/toolkit` / `react-redux` | `^2.12.0` / `^9.3.0` | state |
| `styled-components` | `^6.4.4` | styling (`/native`; `ThemeProps` typing is currently loose) |
| `@react-navigation/native` / `native-stack` | `^7.x` | navigation |
| `react-native-paper` | `^5.15.3` | material bottom tabs (`react-native-paper/react-navigation`), `PaperProvider`, `Switch` |
| `react-native-reanimated` | `^4.5.3` | animation (requires `react-native-worklets`) |
| `react-native-worklets` | `^0.11.3` | Reanimated 4 Babel plugin dependency |
| `react-native-gesture-handler` | `^3.1.0` | gestures |
| `react-native-zoom-toolkit` | `^5.1.0` | Playground pinch-zoom (`ResumableZoom`) |
| `react-native-awesome-slider` | `^2.9.0` | listed but unused — dual-thumb slider is local |
| `react-native-modalize` / `react-native-portalize` | removed | replaced by `@gorhom/bottom-sheet` / `@gorhom/portal` |
| `react-native-reanimated-zoom` / `react-native-draggable` / `rn-range-slider` | removed | replaced by zoom-toolkit, `DraggableLetter`, local `RangeSlider` |
| `@gorhom/bottom-sheet` | `^5.2.14` | bottom sheets (`CustomModalize` adapter) |
| `@react-native-vector-icons/material-design-icons` | `^13.1.2` | icons via `@core/icon/icon` (MDI set, `MaterialDesignIcons.ttf`) |
| `react-native-linear-gradient` | `^2.8.3` | multi-letter wildcard tiles |
| `react-native-haptic-feedback` | `^3.0.0` | haptics |
| `react-native-shake` | `^6.10.0` | the spy/cheat gesture |
| `react-native-webview` | `^14.0.1` | the Mania screen |
| `@react-native-async-storage/async-storage` | `^3.1.1` | persistence (`Storage` wrapper unchanged) |
| `@react-native-firebase/{app,auth,database}` | `^26.0.0` | backend (modular API only) |
| `@react-native-google-signin/google-signin` | `^16.1.4` | sign-in (`{ type, data }` response) |
| `react-native-safe-area-context` / `react-native-screens` | `^5.8.0` / `^4.26.2` | navigation primitives |
| `ramda` | `^0.32.0` | functional utilities, used pervasively |

### Development

TypeScript 7 (`@typescript/native`) for `tsc`, TypeScript 6 alias for ESLint API, ESLint **9.39.5**
(flat config), Prettier **3.9.6**, Jest **30.4.2**, `babel-plugin-module-resolver` `^5.0.2`, plus
the `@react-native/*` `0.86.2` presets and various `@types/*`.
