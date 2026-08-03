# 10 — Coding Conventions

These are the conventions actually used in this codebase, derived from the existing code rather than
from a style guide. Follow them so generated code is indistinguishable from what is already there.

Most of this is **not enforced by tooling** — `eslint.config.js` enforces `semi: never` but nothing runs on
commit. Consistency is maintained by convention only.

- [File naming](#file-naming)
- [Directory layout](#directory-layout)
- [Formatting](#formatting)
- [Imports](#imports)
- [Exports](#exports)
- [Components](#components)
- [Hooks](#hooks)
- [Helpers](#helpers)
- [Styled components](#styled-components)
- [Redux](#redux)
- [Types](#types)
- [Ramda usage](#ramda-usage)
- [Text and localization](#text-and-localization)
- [Comments](#comments)
- [Checklist](#checklist)

---

## File naming

Kebab-case, with a suffix that declares the file's role.

| Suffix | Contents | Example |
| --- | --- | --- |
| *(none)* | A component | `dashboard.tsx`, `letter-card.tsx` |
| `.hook.ts` | One hook | `use-select-letter.hook.ts` |
| `.helper.ts` | Pure functions | `find-possible-words.helper.ts` |
| `.styled.ts` | styled-components | `dashboard.styled.ts` |
| `.constants.ts` | Constants and enums | `colors.constants.ts` |
| `.models.ts` | Types and interfaces | `header.models.ts` |
| `.slice.ts` | A Redux slice | `settings.slice.ts` |
| `.selectors.ts` | Redux selectors | `dashboard.selectors.ts` |
| `.navigation.tsx` | A stack navigator | `charade.navigation.tsx` |
| `.service.ts` / `-service.ts` | A service object | `real-time-database.service.ts`, `auth-service.ts` |
| `index.ts` | A barrel re-export | `hooks/index.ts` |

Hook files are always prefixed `use-`. The directory name matches the component name:
`custom-button/custom-button.tsx`.

Two inconsistencies exist and are **intentional to preserve** (renaming them would touch many
imports): the service suffix alternates between `.service.ts` and `-service.ts`, and
`custom-button.styled.tsx` is the only `.styled.tsx`.

Three files have typos in their names. Do not "fix" them casually — they are imported by path:

| File | Correct spelling |
| --- | --- |
| `src/core/custom-modalize/cutom-modalize.tsx` | `custom-` |
| `src/core/alerts/new-version-avaialble-alert.ts` | `available` |
| `ios/RCTEventEmmiter.m` | `Emitter` (this one is dead code and can be deleted) |

---

## Directory layout

```
src/{feature}/
  {feature}.tsx
  {feature}.navigation.tsx
  {feature}.styled.ts
  {feature}.models.ts
  {feature}.constants.ts
  components/{name}/{name}.tsx + {name}.styled.ts
  components/index.ts
  hooks/use-{name}.hook.ts
  hooks/index.ts
  helpers/{name}.helper.ts
  helpers/index.ts
  store/{feature}.slice.ts + {feature}.selectors.ts
```

Barrels re-export everything in the directory, one line per file:

```ts
// src/dashboard/hooks/index.ts
export * from './use-search-possible-words.hook'
export * from './use-select-letter.hook'
```

Shared code goes in `src/core/` following the same rules.

---

## Formatting

| Rule | Example |
| --- | --- |
| **No statement semicolons** | `const x = 1` |
| **Semicolons inside type members** | `interface P { word: string; }` |
| Single quotes in TS | `import * as R from 'ramda'` |
| Double quotes in JSX attributes | `<Tx local="search" />` |
| 2-space indentation | |
| Trailing commas in multiline literals | |
| Max line length ~120 | |
| **Spaces inside array and destructuring brackets** | `[ 1, 2, 3 ]`, `const [ a, b ] = x` |
| **Spaces inside object braces** | `{ a, b }` |
| No space in JSX prop braces | `onPress={handlePress}` |

The bracket-spacing rule is the most visible signature of this codebase and applies everywhere,
including hook dependency arrays:

```37:37:src/dashboard/dashboard.tsx
  const sliderDefaultValues: LetterSliderDefaultValues = [ 2, 8, 2, 15, isPremium ? 15 : 9 ]
```

```46:46:src/dashboard/dashboard.tsx
  const navigationParams = React.useMemo(() => ({ selectedLetters }), [ selectedLetters ])
```

Type members always end with `;` even though statements never do:

```9:17:src/core/custom-button/custom-button.tsx
interface Props {
  tx?: string | number;
  local?: keyof typeof Localization;
  minHeight?: number;
  children?: any;
  invisible?: boolean;
  color?: COLOR;
  withHaptic?: boolean;
  onPress: (args?: any) => void;
}
```

---

## Imports

Always namespace React and Ramda:

```1:3:src/dashboard/hooks/use-search-possible-words.hook.ts
import * as React from 'react'
import * as R from 'ramda'
import wrzw from 'wrzw'
```

Never `import React from 'react'` and never `import { useState } from 'react'` — hooks are always
called as `React.useState`, `React.useEffect`, `React.useRef`, `React.useCallback`, `React.useMemo`.

### Order

Observed ordering, top to bottom:

1. `react`
2. Third-party packages (`ramda`, `react-native`, `react-redux`, navigation, `@gorhom/bottom-sheet`)
3. `wrzw`
4. `@core/*` aliases
5. Relative imports from other feature modules (`../navigation/...`)
6. Relative imports within the module (`./hooks`, `./components`)
7. The module's own styled file, usually last

```1:15:src/dashboard/dashboard.tsx
import * as React from 'react'
import { CustomModalizeRef } from '@core/custom-modalize/cutom-modalize'
import { useSelector } from 'react-redux'
import { LettersSlider } from '@core/letters-slider/letters-slider'
import { useIsPremium } from '@core/hooks/use-is-premium.hook'
import { LetterSliderDefaultValues } from '@core/letters-slider/models'
import { Template } from '@core/template/template'
import { Tx } from '@core/tx'
import { useNewVersionAlert } from '@core/hooks/use-new-version-alert.hook'
import { isForceIndexAvailable } from './helpers'
import { SelectedLetters, LettersGrid, DashboardButtonsAndModals } from './components'
import { useSelectLetter, useSearchPossibleWords, useSoapModal, useDashboardRehydration } from './hooks'
import { nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { DashboardBottomContent } from './dashboard.styled'
import { SCREEN } from '../navigation/navigation.constants'
```

Groups are not separated by blank lines. Within a module, import from the barrel (`'./hooks'`) rather
than the individual file.

---

## Exports

**Named exports only.** There is exactly one `export default` in `src/`: `src/core/wrzw/index.ts`
(plus the `slowa*.ts` data files, which are generated).

```ts
export const Dashboard = () => { /* ... */ }
export const useSelectLetter = (): UseSelectLetter => { /* ... */ }
export const findPossibleWords = async (...) => { /* ... */ }
```

---

## Components

Arrow functions with destructured props. **Never `React.FC`** — the codebase does not use it anywhere.

```19:37:src/core/custom-button/custom-button.tsx
export const CustomButton = ({
  tx, local, minHeight, children, invisible, color, withHaptic, onPress,
}: Props) => {
  const { triggerHaptic } = useHapticFeedback()

  const handlePress = invisible ? undefined : () => {
    if (withHaptic) {
      triggerHaptic()
    }

    onPress()
  }

  return (
    <CustomButtonContainer onPress={handlePress} {...{ invisible, color, minHeight }}>
      {tx || local ? <Tx {...{ tx, local }} white bold /> : children ?? null}
    </CustomButtonContainer>
  )
}
```

Rules:

- Props interface is named `Props` and declared immediately above the component in the same file.
  Only exported when another module needs it (e.g. `HeaderProps` in `header.models.ts`).
- **Shorthand spread for pass-through props**: `{...{ invisible, color, minHeight }}`. Used heavily
  when forwarding many props at once.
- Screens are composition-only. Logic goes in hooks; the screen wires hooks to components.
- Event handlers are named `handleX` (own logic) or `onX` (props received from a parent).
- Curried handlers for list items: `const handleDeselectLetter = (index: number) => () => { ... }`.

Return type is normally inferred. `App.tsx` annotates `React.JSX.Element`, but that is the exception.

---

## Hooks

Every hook declares an interface for its return value, named after the hook in PascalCase without
the `use` prefix:

```12:24:src/dashboard/hooks/use-search-possible-words.hook.ts
interface UseSearchPossibleWords {
  possibleWords: string[];
  noWordsFound: boolean;
  searchPossibleWords: () => void;
  onLengthChange: (minMax: [ number, number ]) => void;
  clearPossibleWords: () => void;
}

export const useSearchPossibleWords = (
  selectedLetters: string[],
  nativeSearchEngineEnabled: NumberFlag | null,
  wordToExtend?: string,
): UseSearchPossibleWords => {
```

The interface is local to the file (not exported) unless another module needs it. The return is always
an object literal listing the fields, placed on the last line:

```106:107:src/dashboard/hooks/use-search-possible-words.hook.ts
  return { possibleWords, noWordsFound, searchPossibleWords, onLengthChange, clearPossibleWords }
}
```

Other conventions:

- Constants that configure the hook are declared **inside** it in SCREAMING_CASE:
  `const MAX_SELECTED_LETTERS = 15`, `const RESULTS_COUNT = 30`.
- Refs are preferred over state for values that should not trigger renders (slider ranges, filters,
  latest-value mirrors for event callbacks).
- Optional chaining on refs is idiomatic: `modalizeRef?.current?.open?.()`.

---

## Helpers

Pure functions, one concept per file, exported by name. Two styles coexist:

**Plain functions** for anything with branching:

```4:24:src/dashboard/helpers/get-soap-characters-indexes.helper.ts
export const getSoapCharactersIndexes = (word: string, _selectedLetters: string[]) => {
  let soapIndexes: number[] = []
  let _letters = _selectedLetters
```

**Ramda pipelines** for data transformations:

```12:17:src/dashboard/helpers/get-word-points.helper.ts
export const getWordPoints = R.pipe<string[], string, string[], number[], number>(
  R.toUpper,
  R.split(''),
  R.map(mapCharacterToPoint),
  R.sum,
)
```

Local variables prefixed with `_` mean "a working copy of a parameter" (`_letters`,
`_selectedLetters`, `_savedResultSelectedLetters`). This is the codebase's way of signalling mutation
of a local copy.

---

## Styled components

Always `styled-components/native`. Props interfaces are named `{ComponentName}Props` and declared in
the same file.

```6:32:src/core/custom-button/custom-button.styled.tsx
interface CustomButtonContainerProps {
  invisible?: boolean;
  color?: COLOR;
  minHeight?: number;
}

const getCustomButtonContainerOpacity = R.pipe(
  R.propOr(false, 'invisible'),
  R.not,
  Number,
)

const getCustomButtonContainerBackgroundColor = R.propOr(COLOR.DODGER_BLUE, 'color')

export const CustomButtonContainer = styled.TouchableOpacity.attrs<CustomButtonContainerProps>(({ invisible }) => ({
  activeOpacity: invisible ? 0 : undefined,
}))<CustomButtonContainerProps>`
  justify-content: center;
  align-items: center;
  align-self: center;
  border: 0.5px solid ${COLOR.DIM_GREY_LIGHTER};
  padding: ${SPACING.XS}px ${SPACING.M}px;
  border-radius: 30px;
  background-color: ${getCustomButtonContainerBackgroundColor};
  opacity: ${getCustomButtonContainerOpacity};
  ${appendStyleWhenProvided('min-height', 'minHeight', 'px')};
`
```

Rules:

- **Never hardcode a hex color.** Use the `COLOR` enum.
- **Never hardcode a spacing number.** Use `SPACING.X` in CSS, or the `spacings` prop DSL on
  components that support it.
- Prop-derived values are extracted into named `get{Component}{Property}` functions above the
  component, often as Ramda pipelines.
- Theme access goes through `getThemeProp('backgroundPrimary')`.
- Optional style lines use `appendStyleWhenProvided(cssProperty, propName, suffix?)`.
- Percent-of-screen sizing uses `RESPONSIVE.WIDTH(n)` / `RESPONSIVE.HEIGHT(n)`.
- Horizontal layouts take an `RTL` prop and use the helpers in `rtl.helper.ts`.

Prop documentation uses JSDoc blocks on each field, as in `src/core/tx/tx.models.ts` and
`src/core/styled/spacing-view.styled.ts`.

---

## Redux

Slices follow Redux Toolkit conventions with one project-specific addition: **reducers persist to
storage themselves**.

```25:52:src/settings/store/settings.slice.ts
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setHapticFeedbackEnabledAction: (state, action: PayloadAction<NumberFlag>) => {
      Storage.set(STORAGE_KEY.HAPTIC_FEEDBACK_ENABLED, String(action.payload))
      state.hapticFeedbackEnabled = action.payload
    },
```

| Element | Convention |
| --- | --- |
| State interface | `{Feature}State`, exported |
| Initial state | `const initialState: {Feature}State = { ... }` |
| Action names | `set{Thing}Action` — always the `Action` suffix |
| Payload typing | `PayloadAction<T>` |
| Action export | Destructured block at the bottom |
| Reducer export | `export const {feature}Reducer = {feature}Slice.reducer` |
| Selectors | Separate `.selectors.ts` file, `{thing}Selector` naming |

Selectors are defensive, using optional chaining and a fallback:

```ts
export const hapticFeedbackEnabledSelector = (state: RootState) =>
  state?.settings?.hapticFeedbackEnabled ?? 1
```

Note the side effect inside the reducer. This is technically impure, but it is the established pattern
here — if you add a persisted setting, follow it, and add the matching `useRehydrateStore` call.

---

## Types

| Convention | Detail |
| --- | --- |
| `interface` for object shapes | `interface Props`, `interface SettingsState` |
| `type` for unions and tuples | `type ScreenType = 'dashboard' \| ...` |
| `enum` for named constant sets | `COLOR`, `SPACING`, `SCREEN`, `STORAGE_KEY`, `Localization` |
| Tuples for fixed-length data | `[ number, number ]` for word length ranges |
| `keyof typeof X` for enum keys | `local?: keyof typeof Localization` |

Shared primitives in `src/core/models.ts`:

```ts
export type NumberFlag = 0 | 1
export type ScreenType = 'dashboard' | 'dictionary' | 'charade' | 'more'
```

`any` is used pragmatically for navigation objects (`useNavigation<any>()`), modal refs
(`React.MutableRefObject<any>`) and children (`children?: any`). Do not extend that habit into new
domain code, but do not fight it in navigation code either — matching the surroundings matters more.

---

## Ramda usage

Ramda is used pervasively and always as `R.*`. The functions that actually appear:

| Category | Functions |
| --- | --- |
| Lists | `R.append`, `R.remove`, `R.update`, `R.times`, `R.slice`, `R.splitEvery`, `R.dropLast`, `R.last`, `R.findIndex`, `R.includes`, `R.reverse` |
| Sorting | `R.sortWith`, `R.descend`, `R.prop` |
| Logic | `R.cond`, `R.always`, `R.T`, `R.not`, `R.equals`, `R.any`, `R.isNil` |
| Objects | `R.propOr`, `R.pipe` |
| Math | `R.inc`, `R.dec`, `R.sum` |
| Placeholder | `R.__` |

Immutable list updates use Ramda rather than spread:

```73:73:src/dashboard/hooks/use-select-letter.hook.ts
    updateSelectedLetters(R.remove(index, 1, selectedLetters))
```

`R.inc` / `R.dec` are passed directly to state setters:

```60:60:src/charade/hooks/use-charade-press.hook.ts
      setActiveRow(R.inc)
```

The in-house `wrzw` library covers the gaps Ramda does not: `wrzw.isE`, `wrzw.exist`,
`wrzw.compareJoined`, `wrzw.ifElse`, `wrzw.getTime`, `wrzw.toNumberFlag`.

---

## Text and localization

**Never hardcode user-facing text.** Every string goes through `Tx`:

```56:56:src/dashboard/dashboard.tsx
      <Tx local="selected_letters" bolder disabled center />
```

To add a string:

1. Add the key to all five files in `src/core/localize/localization/` (`pl`, `en`, `de`, `ar`, `he`).
2. Add it to the `Localization` enum in `src/core/localize/localize.models.ts`.
3. Use `<Tx local="my_key" />`.

Keys are `snake_case`. When you need the raw string (a placeholder, an `Alert` body), call the hook:

```ts
const localize = useLocalize()
const text = localize().enter_premium_code
```

The two premium alerts currently violate this rule with hardcoded English — do not copy that.

---

## Comments

The codebase is lightly commented. What comments exist are:

- **Step markers in complex algorithms**, numbered to match debug logs:
  ```59:62:src/dashboard/helpers/find-possible-words.helper.ts
        // If word which is currently in verification is longer than all possible letter -> RETURN FALSE
        const tooLongWord = word.length > selectedLetters.length
        _log(`#1 ${word}, tooLongWord: ${tooLongWord}`)
        if (tooLongWord) return false
  ```
- **JSDoc on prop interfaces** in the core UI kit (`tx.models.ts`, `spacing-view.styled.ts`).
- **`TODO:` markers** for known gaps (`use-more-options.hook.ts:74`, `auth-service.ts:12`).

Do not add comments that restate the code. Comments explain *why* or flag a constraint.

---

## Checklist

Before considering a change done:

- [ ] No statement semicolons; semicolons inside type members.
- [ ] Spaces inside `[ ]` and `{ }`, including dependency arrays.
- [ ] `import * as React from 'react'`, `import * as R from 'ramda'`.
- [ ] Named exports; no `export default`.
- [ ] No `React.FC`; arrow component with a local `Props` interface.
- [ ] File name is kebab-case with the right role suffix, and added to the directory's `index.ts`.
- [ ] Logic lives in a `use-*.hook.ts` with a declared return interface, not in the component.
- [ ] No hardcoded colors (`COLOR`), spacing (`SPACING` / `spacings`) or user-facing text (`Tx`).
- [ ] New translation key added to **all five** locale files and the `Localization` enum.
- [ ] Horizontal layout handles RTL.
- [ ] New persisted setting writes in the reducer and reads via `useRehydrateStore`.
- [ ] Search-algorithm changes applied to the JS, Swift **and** Kotlin implementations.
- [ ] `yarn lint` and `npx tsc --noEmit` pass.
- [ ] The relevant document in `docs/` updated if behaviour changed.
