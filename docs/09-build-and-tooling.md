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
| Node | `>= 18` (enforced by `package.json` `engines`) |
| Yarn | v1 (a `yarn.lock` is expected; npm would work but diverges from history) |
| Ruby | `2.7.4` (`.ruby-version`) |
| Bundler | any recent |
| Xcode | 14.x or newer, with iOS 12.4+ SDK |
| JDK | 17 (required by AGP 8 / Gradle 8.3) |
| Android SDK | Platform 34, Build Tools 34.0.0, NDK 25.1.8937393 |

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
| `yarn lint` | `eslint .` | |
| `yarn test` | `jest` | passes trivially — there are no tests |

There is no `typecheck` script. Run `npx tsc --noEmit` manually; it is the only real static check the
project has.

---

## Path aliases

Three aliases, configured in two places that must stay in sync.

| Alias | Resolves to |
| --- | --- |
| `@core/*` | `src/core/*` |
| `@assets/*` | `src/assets/*` |
| `wrzw` | `src/core/wrzw/index.ts` |

TypeScript (for type resolution):

```14:19:tsconfig.json
    "baseUrl": "./src",
    "paths": {
      "@core/*": [ "core/*" ],
      "wrzw": [ "core/wrzw/index.ts" ],
      "@assets/*": [ "assets/*" ]
    },
```

Babel (for runtime resolution):

```5:16:babel.config.js
    [
      'module-resolver',
      {
        root: [ './src' ],
        extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@core': './src/core',
          'wrzw': './src/core/wrzw/index.ts',
          '@assets': './src/assets',
        },
      },
    ],
```

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

## TypeScript

```1:20:tsconfig.json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react-native",
    "lib": ["es2017"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "resolveJsonModule": true,
    "target": "esnext",
    "baseUrl": "./src",
```

| Setting | Note |
| --- | --- |
| `strict: true` | On, though `any` is used liberally in navigation code |
| `resolveJsonModule` | Required for `premium-codes.json`, the locale JSONs and `google-services.json` |
| `lib: ["es2017"]` | Conservative; `Array.prototype.flat` (ES2019) is used and relies on Hermes providing it at runtime |
| `noEmit` | Babel does the transpiling; `tsc` is type-check only |
| `include` | References `next-env.d.ts`, which does not exist (harmless leftover) |

`types.d.ts` at the root is **empty**. It presumably once declared module types for the `slowa*.ts`
imports or styled-components theme augmentation.

Notably absent: the styled-components `DefaultTheme` augmentation. Themed props are typed manually via
`ThemeProps<ThemeModel>` in `getThemeProp` instead.

---

## Babel and Metro

`babel.config.js` has two plugins:

1. `react-native-reanimated/plugin` — **must stay last** in the plugin list (it currently is not last;
   `module-resolver` follows it, which happens to work but contradicts Reanimated's documented
   requirement).
2. `module-resolver` — the aliases above.

`metro.config.js` is the untouched RN 0.73 default:

```ts
const config = {};
module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

No custom transformers, no asset extensions, no resolver overrides. The `slowa*.ts` files are ordinary
TypeScript modules as far as Metro is concerned, which is why they inflate the bundle.

---

## ESLint and Prettier

```1:5:.eslintrc.js
module.exports = {
  root: true,
  extends: '@react-native',
  semi: false,
};
```

```1:4:.prettierrc.js
module.exports = {
  singleQuote: true,
  semi: false,
};
```

Both are minimal. Two things to be aware of:

- **`semi: false` in `.eslintrc.js` is in the wrong place.** ESLint config takes rules under a `rules`
  key; a top-level `semi` is ignored. The no-semicolon style is enforced by Prettier and by habit, not
  by the linter.
- The `@react-native` shared config brings in the TypeScript parser, React hooks rules and Prettier
  integration.

There is no `.eslintignore`, no pre-commit hook, no `lint-staged`, and no CI. Nothing runs the linter
automatically.

---

## Testing

```1:3:jest.config.js
module.exports = {
  preset: 'react-native',
};
```

**There are no test files in the repository.** No `__tests__` directory, no `*.test.ts`, no
`*.spec.ts`. `react-test-renderer` and `@types/jest` are installed but unused. The iOS
`WyrazowoTests` target contains the unmodified RN template test, which would fail if run.

`yarn test` therefore exits successfully having run nothing — do not read that as a green build.

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

Also worth noting: there is **no `yarn.lock` or `package-lock.json` in the repository**. Dependency
versions are therefore not pinned, and a fresh `yarn install` will resolve newer patch/minor versions
than the ones the app was last built against. This is a meaningful reproducibility risk for a project
that has been dormant for two years.

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
| `react-native` | `0.73.1` | framework |
| `react` | `18.2.0` | |
| `@reduxjs/toolkit` / `react-redux` | `^1.9.5` / `^8.1.2` | state |
| `styled-components` | `^6.1.3` | styling |
| `@react-navigation/*` | `^6.x` | navigation (native, native-stack, material-bottom-tabs) |
| `react-native-paper` | `^5.9.1` | the material bottom tab bar and `Switch` |
| `react-native-reanimated` | `^3.6.1` | animation |
| `react-native-reanimated-zoom` | `^0.3.3` | Playground pinch-zoom |
| `react-native-gesture-handler` | `^2.14.0` | gestures |
| `react-native-draggable` | `^3.3.0` | Playground tile dragging |
| `react-native-modalize` / `react-native-portalize` | `^2.1.1` / `^1.0.7` | bottom sheets |
| `rn-range-slider` | `^2.2.2` | the word-length slider |
| `react-native-vector-icons` | `^10.0.0` | icons (MaterialCommunityIcons) |
| `react-native-linear-gradient` | `^2.6.2` | multi-letter wildcard tiles |
| `react-native-haptic-feedback` | `^1.14.0` | haptics |
| `react-native-shake` | `^5.5.2` | the spy/cheat gesture |
| `react-native-webview` | `^13.3.1` | the Mania screen |
| `@react-native-async-storage/async-storage` | `^1.19.1` | persistence |
| `@react-native-firebase/{app,auth,database}` | `^18.3.0` | backend |
| `@react-native-google-signin/google-signin` | `^10.0.1` | sign-in |
| `react-native-safe-area-context` / `react-native-screens` | `^4.7.1` / `^3.23.0` | navigation primitives |
| `ramda` | `^0.28.0` | functional utilities, used pervasively |
| `react-native-fs` | `^2.20.0` | **unused** — file access goes through the custom `FSModule` |

`react-native-fs` is a removable dependency.

### Development

TypeScript `5.0.4`, ESLint `^8.19.0` with `@react-native/eslint-config`, Prettier `^2.8.8`, Jest
`^29.6.3`, `babel-plugin-module-resolver` `^5.0.0`, plus the `@react-native/*` `0.73` presets and
various `@types/*`.

`metro-react-native-babel-preset@0.76.8` is also present, which is the *old* preset superseded by
`@react-native/babel-preset` (also installed and actually used). It can be removed.
