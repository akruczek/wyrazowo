# 05 — Core Infrastructure

`src/core/` is the app's private design system and service layer. Nothing here is a screen; everything
is imported by feature modules through the `@core/*` alias.

- [Storage](#storage)
- [Theming](#theming)
- [The spacings DSL](#the-spacings-dsl)
- [Styled helpers](#styled-helpers)
- [Localization](#localization)
- [RTL support](#rtl-support)
- [Responsive](#responsive)
- [Networking](#networking)
- [The wrzw utility library](#the-wrzw-utility-library)
- [UI components](#ui-components)
- [Alerts](#alerts)
- [Hooks](#hooks)
- [Navigation constants](#navigation-constants)

---

## Storage

**Files:** `src/core/storage/storage.ts`, `storage.constants.ts`, `storage.models.ts`

A thin AsyncStorage wrapper. Three methods, all swallowing errors and returning `null` on failure.

```3:32:src/core/storage/storage.ts
export const Storage = {
  set: async (key: string, value: string): Promise<void | null> => {
    try {
      const result = await AsyncStorage.setItem(`@${key}`, String(value))
      return result
    } catch (error) {
      return null
    }
  },
  get: async <T>(key: string, raw?: boolean): Promise<T | null> => {
    try {
      const result = await AsyncStorage.getItem(`@${key}`)
      return result != null
        ? raw
          ? result
          : JSON.parse(result)
        : null
    } catch (error) {
      return null
    }
  },
```

Three things to remember:

1. **Every key is prefixed with `@`** in the underlying store. `STORAGE_KEY.PREMIUM` is `premium` in
   code but `@premium` in AsyncStorage.
2. **`get` parses JSON by default.** Pass `raw: true` for values that are not valid JSON — currently
   only `LANGUAGE_CODE`, which stores a bare `pl` / `en` / etc.
3. **Errors are silent.** A corrupt value looks identical to a missing one.

### Keys

| `STORAGE_KEY` | Stored value | Written by |
| --- | --- | --- |
| `SEARCH_RESULT` | `SearchResultModel[]` as JSON | `useSearchPossibleWords`, developer import |
| `HAPTIC_FEEDBACK_ENABLED` | `"0"` / `"1"` | settings slice |
| `NATIVE_SEARCH_ENGINE_ENABLED` | `"0"` / `"1"` | settings slice |
| `DARK_THEME_ENABLED` | `"-1"` / `"0"` / `"1"` | settings slice |
| `PREMIUM` | `"0"` / `"1"` | settings slice / `premiumService` |
| `LANGUAGE_CODE` | raw string | settings slice |

### Models

```1:6:src/core/storage/storage.models.ts
export interface SearchResultModel {
  wordLength: [ number, number ];
  selectedLetters: string[];
  result: string[];
  timestamp: number;
}
```

### Persistence pattern

There is no redux-persist. Instead, **the settings reducers write to storage themselves**, and
`useRehydrateStore` reads them back on mount. If you add a setting, you must do both halves:

```ts
setMyThingAction: (state, action: PayloadAction<NumberFlag>) => {
  state.myThing = action.payload
  Storage.set(STORAGE_KEY.MY_THING, String(action.payload))
},
```

...and add a `useRehydrateStore(STORAGE_KEY.MY_THING, setMyThingAction)` call, normally in
`useDashboardRehydration`.

---

## Theming

**Files:** `src/core/styled/theme.ts`, `src/core/styled/models.ts`, `src/core/colors/colors.constants.ts`

The theme is deliberately tiny — four semantic tokens:

```5:22:src/core/styled/theme.ts
enum LIGHT {
  backgroundPrimary = COLOR.WHITE,
  backgroundSecondary = COLOR.WHITE_SMOKE,
  textPrimary = COLOR.BLACK,
  textSecondary = COLOR.DIM_GREY,
}

enum DARK {
  backgroundPrimary = COLOR.DARK_SLATE_GREY,
  backgroundSecondary = COLOR.DIM_GREY,
  textPrimary = COLOR.WHITE,
  textSecondary = COLOR.WHITE_SMOKE,
}
```

| Token | Light | Dark |
| --- | --- | --- |
| `backgroundPrimary` | `#FFFFFF` | `#2F4F4F` |
| `backgroundSecondary` | `#F5F5F5` | `#696969` |
| `textPrimary` | `#000000` | `#FFFFFF` |
| `textSecondary` | `#696969` | `#F5F5F5` |

Everything else — accents, semantic colors, tile colors — comes straight from the `COLOR` enum and is
**not** theme-aware. This is why accent colors look identical in light and dark mode.

### Reading a token in a styled component

```ts
import { getThemeProp } from '@core/styled/theme'

export const Box = styled.View`
  background-color: ${getThemeProp('backgroundPrimary')};
`
```

### Theme mode

`ThemeNumberFlag = -1 | 0 | 1` — auto / light / dark. `THEME_LABELS` is `[ 'light', 'dark', 'auto' ]`,
used by the theme picker. Resolution against the OS scheme happens in `App.navigation.tsx`; see
[`01-architecture.md`](01-architecture.md#theme-resolution).

---

## The spacings DSL

The most distinctive thing in the codebase. Instead of numeric margins, components take a
space-separated string of **spacing tokens**.

### The scale

```15:25:src/core/styled/models.ts
export enum SPACING {
  XXXS = 2,
  XXS = 4,
  XS = 8,
  S = 12,
  M = 16,
  L = 24,
  XL = 32,
  XXL = 48,
  XXXL = 96,
}
```

### Syntax

Same shorthand rules as CSS, but with token names instead of lengths:

| Tokens given | Meaning | Example | Output |
| --- | --- | --- | --- |
| 1 | all sides | `spacings="M"` | `16px` |
| 2 | vertical, horizontal | `spacings="L M"` | `24px 16px` |
| 3 | top, horizontal, bottom | `spacings="XS S M"` | `8px 12px 16px` |
| 4 | top, right, bottom, left | `spacings="0 0 XXL 0"` | `0 0 48px 0` |

Any token that is not in the enum resolves to `0`, which is how literal `0` works in the examples
above — it is not special-cased, it simply fails the lookup.

### The parser

```11:34:src/core/styled/helpers/parse-margin.helper.ts
export const parseSpacings = <P extends { spacings?: string, RTL?: boolean }>({ spacings, RTL }: P): string | number => {
  const marginsArray = spacings?.split(' ')

  if (marginsArray?.length === 4) {
    if (RTL) {
      const [ top, left, bottom, right ] = marginsArray as SpacingsArray
      return `${SPACING[top] ?? 0}px ${SPACING[right] ?? 0}px ${SPACING[bottom] ?? 0}px ${SPACING[left] ?? 0}px`
    } else {
      const [ top, right, bottom, left ] = marginsArray as SpacingsArray
      return `${SPACING[top] ?? 0}px ${SPACING[right] ?? 0}px ${SPACING[bottom] ?? 0}px ${SPACING[left] ?? 0}px`
    }
  } else if (marginsArray?.length === 3) {
```

### The RTL rule — read this carefully

**In the four-token form only**, when `RTL` is true the input order changes to
`top left bottom right`. The output is still emitted as CSS `top right bottom left`, so the second and
fourth values swap.

```
spacings="0 S 0 M"    LTR -> margin: 0 12px 0 16px    (right 12, left 16)
spacings="0 S 0 M"    RTL -> margin: 0 16px 0 12px    (right 16, left 12)
```

In other words, in the four-token form the second slot always means "the leading side" and the fourth
"the trailing side". The 1, 2 and 3-token forms are symmetric and unaffected.

### Who accepts `spacings`

| Component | Prop | Notes |
| --- | --- | --- |
| `Tx` / `StyledTx` | `spacings`, `spacingType` | `spacingType` switches margin ↔ padding |
| `SpacingView` | `spacings`, `type`, `RTL` | `type` defaults to `margin` |

`RTL` is passed automatically by `Tx`; for `SpacingView` you pass it yourself from `useRTL()`.

### Numeric variants

`parseMargin` and `parsePadding` take actual number tuples (`Margin` / `Padding` types) and are used
by styled components that need computed values rather than tokens.

---

## Styled helpers

**Directory:** `src/core/styled/`, barrel at `index.ts`

| Helper | Purpose |
| --- | --- |
| `parseMargin({ margins })` | `[8, 16]` → `8px 16px` |
| `parsePadding({ paddings })` | same, for padding |
| `parseSpacings({ spacings, RTL })` | the token DSL above |
| `parseAbsolute({ absolute })` | `[0, null, 8, null]` → only the non-null edges are emitted |
| `appendStyleWhenProvided(styleName, propName, suffix?)` | emits `styleName: value;` only when the prop `exist`s |
| `getRTLFlexDirection` | `row` / `row-reverse` |
| `getRTLColumnAlignItems` | `flex-start` / `flex-end` |
| `getRTLRotation` | `''` / `transform: rotate(180deg);` |
| `getRTLTextAlignment` | `left` / `right` |
| `SpacingView` | a `View` with the `spacings` prop |
| `RowAroundContainer` | RTL-aware `space-around` flex row |

`appendStyleWhenProvided` is the idiom for optional style props:

```ts
export const Thing = styled.View`
  ${appendStyleWhenProvided('min-height', 'minHeight', 'px')}
`
```

Note it uses `wrzw.exist`, so `0` and `[]` count as provided — only `null` and `undefined` are skipped.

---

## Localization

**Directory:** `src/core/localize/`

Five languages, 81 keys each, all bundled at build time.

| Code | Label | Emoji | RTL |
| --- | --- | --- | --- |
| `pl` | Polski | 🇵🇱 | no |
| `en` | English | 🇬🇧 | no |
| `de` | Deutsch | 🇩🇪 | no |
| `ar` | عربي | 🇸🇦 | **yes** |
| `he` | עִברִית | 🇮🇱 | **yes** |

### How it works

```8:18:src/core/localize/localize.ts
export const localize = (languageCode: LANGUAGE_CODES, params?: LocalizeParams): typeof Localization => {
  let localizationsStringified = JSON.stringify({ pl, en, de, ar, he }[languageCode])

  if (params) {
    Object.keys(params).forEach((key) => {
      localizationsStringified = localizationsStringified.replace(`{{${key}}}`, params[key] as any)
    })
  }

  return JSON.parse(localizationsStringified) as typeof Localization
}
```

Interpolation is done by stringifying the whole locale object, doing a string `replace` per param, and
re-parsing. It is inefficient but only used for a handful of `{{version}}` placeholders. Note
`String.replace` without a global flag replaces the **first** occurrence only.

### `useLocalize`

```8:17:src/core/hooks/use-localize.hook.ts
export const useLocalize = (params?: LocalizeParams): () => typeof Localization => {
  const _languageCode = useSelector(languageCodeSelector)
  const languageCode = _languageCode ?? SYSTEM_LANGUAGE ?? LANGUAGE_CODES.EN

  const handleChange = React.useCallback(() => {
    return localize(languageCode, params)
  }, [ _languageCode ])

  return handleChange
}
```

Resolution order: **user setting → device language → English**. The hook returns a *function*, not the
object, so call it: `const localize = useLocalize(); localize().dashboard`.

`SYSTEM_LANGUAGE` comes from `src/core/system-language/system-language.tsx`, which reads
`SettingsManager` on iOS and `I18nManager.localeIdentifier` on Android and takes the first two
characters.

### The `Tx` component

Every piece of user-facing text goes through `Tx`.

```13:27:src/core/tx/tx.tsx
export const Tx = ({ tx, local, children, ...styledTxProps }: Props) => {
  const localize = useLocalize()

  const getChildren = () => {
    if (children) return children
    const base = localize()[local as keyof typeof Localization] ?? tx
    return `${styledTxProps.prefix ?? ''}${base}${styledTxProps.suffix ?? ''}`
  }

  return (
    <StyledTx children={getChildren()} RTL={Boolean(localize().rtl)} {...styledTxProps} />
  )
}
```

Content priority: `children` > `local` (translation key) > `tx` (raw string).

`StyledTxProps` gives `Tx` a large boolean-prop API — documented inline in `src/core/tx/tx.models.ts`:

| Group | Props |
| --- | --- |
| Weight / alignment | `bold`, `bolder`, `center`, `right`, `uppercase`, `underline`, `oneLine`, `shadow` |
| Semantic color | `link`, `disabled`, `error`, `warning`, `ok`, `white`, `black`, `themeColor` |
| Font size | `XXXS` (6px), `XXS` (10), `XS` (12), `S` (16), `M` (22), `L` (28), `XL` (32), `XXL` (36), `XXXL` (42) |
| Layout | `spacings`, `spacingType`, `absolute`, `RTL` |
| Content | `prefix`, `suffix` |

Typical usage:

```tsx
<Tx local="selected_letters" bolder disabled center />
<Tx local="word_extension" bolder disabled center spacings="L 0 0" />
```

Careful: the **font-size tokens and the spacing tokens share names but are different scales**. `M` as a
boolean prop means 22px font; `M` inside `spacings` means 16px of space.

### Adding a translation key

1. Add the key to all five files in `src/core/localize/localization/`.
2. Add it to the `Localization` enum in `localize.models.ts` (this is what types `local`).
3. Use `<Tx local="my_new_key" />`.

Missing a language file will not fail the build — it will render `undefined`.

---

## RTL support

Arabic and Hebrew are supported. The signal is a boolean `rtl` key inside each locale JSON, surfaced
by `useRTL()`:

```ts
export const useRTL = () => Boolean(useLocalize()().rtl)
```

RTL is applied in three ways:

1. **Flex direction** — `getRTLFlexDirection` and friends in styled components. Containers take an
   `RTL` prop.
2. **Spacings** — the four-token swap described above.
3. **Navigation order** — the bottom tab array is reversed in `App.navigation.tsx`.

The app does **not** use `I18nManager.forceRTL`, so the platform does not mirror the layout
automatically. Everything is manual, which means a new component with a horizontal layout must
explicitly handle RTL or it will look wrong in Arabic and Hebrew.

Components that already do: `Tx`, `Header`, `CustomCheckbox`, `CustomCounter`, `CustomTextInput`,
`RowAroundContainer`, `SelectedLetters`, `DashboardButtonsContainer`, `AdvancedSearchButtonsContainer`.

---

## Responsive

```3:6:src/core/responsive/responsive.ts
export const RESPONSIVE = {
  WIDTH: (percent?: number) => Dimensions.get('screen').width * ((percent ?? 100) / 100),
  HEIGHT: (percent?: number) => Dimensions.get('screen').height * ((percent ?? 100) / 100),
}
```

Percent-of-screen sizing, used for tile sizes, icon sizes and grid layout. Two caveats:

- It uses `Dimensions.get('screen')`, not `'window'` — on Android that includes the system bars.
- Values are computed **once at call time**. Nothing listens for orientation or size changes, which is
  fine because the app is portrait-locked on both platforms.

---

## Networking

**Files:** `src/core/fetch-client/fetch-client.ts`, `fetch-client.constants.ts`

The app makes exactly one kind of HTTP call: fetching word definitions from `https://sjp.pl`.

```8:22:src/core/fetch-client/fetch-client.ts
export const fetchClient = (url: string): FetchClient => ({
  get: (onSuccess, onError) => {
    try {
      return fetch(url).then(onSuccess)
    } catch (error: any) {
      onError()
      return error
    }
  }
})
```

Limitations worth knowing before you extend it:

- The `try/catch` only catches **synchronous** throws. A rejected `fetch` promise (network failure) is
  unhandled and `onError` never fires.
- HTTP error statuses still call `onSuccess`; the caller must inspect `response.ok`.
- No headers, no auth, no timeout, no retry, no cancellation.

The response is raw HTML, scraped by `parseSjpWordDetails`. See
[`03-module-dashboard.md`](03-module-dashboard.md#parsesjpworddetails-is-html-scraping).

There is also a GitHub API call in `useNewVersionAlert` that fetches the repository's tags to detect
a newer release; it uses `fetch` directly rather than `fetchClient`.

---

## The wrzw utility library

**Directory:** `src/core/wrzw/`, imported as `import wrzw from 'wrzw'` (the only default export in `src/`).

Six functions the author found himself rewriting:

| Util | Signature | Behaviour |
| --- | --- | --- |
| `toNumberFlag` | `(value: boolean) => 0 \| 1` | Boolean to the `NumberFlag` type used by settings |
| `exist` | `<T>(arg: T) => boolean` | `!== null && !== undefined`. **`0`, `''` and `[]` all "exist".** |
| `ifElse` | `<T, F>(onTrue: T, onFalse: F, condition: boolean) => T \| F` | Eagerly-evaluated ternary |
| `compareJoined` | `<A, T>(a: A[], b: T[]) => boolean` | Equality by `a.join() === b.join()` |
| `getTime` | `() => number` | `new Date().getTime()` |
| `isE` | `<T>(array: T[]) => boolean` | Array is empty |

`compareJoined` is load-bearing: it is how the search cache decides two racks are the same
(after sorting) and how the slider avoids redundant updates.

Both `src/core/package.json` (`{ "name": "@core" }`) and `src/core/wrzw/package.json`
(`{ "name": "wrzw" }`) exist only to give those directories a package identity matching their aliases.
The actual resolution is configured in `tsconfig.json` and `babel.config.js` — see
[`09-build-and-tooling.md`](09-build-and-tooling.md).

---

## UI components

All in `src/core/`. Named exports, arrow components, props via a local `interface Props`.

### `Template`

The screen shell every screen uses.

```11:19:src/core/template/template.tsx
export const Template = ({ flex, children, outChildren, ...headerProps }: Props) => (
  <TemplateHost>
    <TemplateSafeArea justifyContent={flex ? 'space-between' : undefined}>
      <Header {...headerProps} />
      {children}
    </TemplateSafeArea>
    {outChildren}
  </TemplateHost>
)
```

| Prop | Purpose |
| --- | --- |
| `flex` | `justify-content: space-between` on the safe area |
| `children` | screen content, inside the safe area |
| `outChildren` | content rendered **outside** the safe area (floating buttons, keyboards) |
| ...`HeaderProps` | everything else is forwarded to `Header` |

### `Header`

```ts
export interface HeaderProps {
  type: ScreenType;                            // dashboard | dictionary | charade | more
  local?: keyof typeof Localization;           // title translation key
  backButton?: boolean;
  backButtonAlert?: Function;                  // confirm before going back
  onTouchEnd?: () => void;                     // used by the spy hooks
  rightContentConfig?: HeaderSideContentConfig;
  leftIcon?: string;                           // MaterialCommunityIcons name
  leftScreen?: SCREEN;                         // where the left icon navigates
  navigationParams?: {[key: string]: any};
}
```

`type` selects the accent color via `screen-type-to-color-map.ts`. The title auto-shrinks when it
would exceed 75% of the screen width (`useHeaderTextSize`).

`HeaderSideContentConfig` is `{ onPress, onLongPress?, icon, indicator? }` — `indicator` draws a dot
badge.

### The rest

| Component | Key props | Behaviour |
| --- | --- | --- |
| `Tx` | see [Localization](#localization) | localized, styled text |
| `CustomButton` | `tx`, `local`, `color`, `invisible`, `withHaptic`, `minHeight`, `onPress` | colored pressable; `invisible` disables the press handler |
| `CustomCheckbox` | `defaultValue`, `local`, `onChange` | labeled checkbox, `LayoutAnimation` on toggle |
| `CustomCounter` | `value`, `range`, `local`, `colorBreakpoints`, `setValue` | minus/plus stepper clamped to `range`; breakpoints recolor the value |
| `CustomKeyboard` | `onPress`, `greenLetters`, `yellowLetters`, `redLetters` | Polish keyboard with Wordle-style key coloring plus `SEND` and `CLEAR` |
| `CustomModalize` | `children`, `reference`, ...`ModalizeProps` | themed bottom sheet |
| `CustomSwitch` | `defaultValue`, `color`, `onValueChange` | Paper `Switch`, gold track by default |
| `CustomTextInput` | `value`, `onChange`, `state`, `errorMessage`, `maxLength`, `autoCapitalize`, ... | themed input; `state === false` shows the error message |
| `LetterCard` | `content`, `size`, `fontSize`, `isSelected`, `multiLetter`, `forcedIndex`, `selectable`, `disabled`, `onPress`, `onLongPress` | the Scrabble tile; gradient variant for multi-letter wildcards, badge for position locks |
| `LettersSlider` | `onChange`, `defaultValues` | dual-thumb range; warns above 10 letters, premium-gated above 9 |
| `ProgressIndicator` | `steps`, `progress`, `color`, `onStepTouchEnd` | step dots with a connecting line |
| `SwitchButton` | `value`, `labels`, `colors`, `elementsInRowCount`, `onChange` | segmented control from translation keys |
| `PlayButton` | `type`, `onPress` | floating play button, positioned from the top safe-area inset |
| `AlertIcon` | `type`, `titleLocal`, `descriptionLocal`, `isVisible` | tappable icon that opens a localized `Alert` |
| `AppIcon` | — | renders "WRZW" as four `LetterCard`s |
| `FocusAwareStatusBar` | ...`StatusBarProps` | renders `StatusBar` only when the screen is focused |
| `SpacingView` | `spacings`, `type`, `RTL` | spacing primitive |
| `RowAroundContainer` | `RTL` | RTL-aware `space-around` row |

`LetterSliderDefaultValues` is `[ defaultMin, defaultMax, rangeMin, rangeMax, premiumCap ]`.

---

## Alerts

**Directory:** `src/core/alerts/`

Plain functions wrapping `Alert.alert`. Nine of them:

| Alert | Purpose |
| --- | --- |
| `leaveGameAlert` | Confirm abandoning a game in progress |
| `clearSearchHistoryAlert` | Confirm wiping search history |
| `saveSearchHistoryAlert` | Confirm exporting history to a file |
| `overwriteSearchHistoryAlert` | Confirm overwriting history on import |
| `restartAppAlert` | Confirm the restart required by a language change |
| `newVersionAvaialbleAlert` | Announce a newer GitHub release (filename typo is original) |
| `goPremiumAlert` | Upsell when exceeding the free letter limit |
| `deactivatePremiumAlert` | Confirm turning premium off |
| `spyAlert` | Debug reveal of a hidden value |

`goPremiumAlert` and `deactivatePremiumAlert` contain **hardcoded English strings** and do not go
through the localization system — the only user-facing text in the app that is not translated.

---

## Hooks

**Directory:** `src/core/hooks/` (plus a few co-located with their components)

| Hook | Signature | Purpose |
| --- | --- | --- |
| `useLocalize` | `(params?) => () => Localization` | Current locale strings |
| `useRTL` | `() => boolean` | Whether the locale is right-to-left |
| `useRehydrateStore` | `<V>(key, action, raw?) => { value, isPending }` | Load a storage key into Redux on mount |
| `useIsPremium` | `() => boolean` | `premium > 0` |
| `useHapticFeedback` | `() => { triggerHaptic }` | Haptic pulse, respecting the setting |
| `useForceUpdate` | `() => () => void` | Force a re-render (Ramda `inc` counter) |
| `useSpy` | `(value, defaultSpyFlag?) => { spyFlag, setSpyFlag }` | Shake to reveal a value, only when focused |
| `useNewVersionAlert` | `() => void` | Compare GitHub tags to `package.json` and alert |
| `useModalTopOffset` | `() => number` | Top safe area + `BOTTOM_NAVIGATION_HEIGHT` + 30 |
| `useHeaderPress` | — | Header action handling |
| `useHeaderTextSize` | — | Shrink the title when it overflows |
| `useLettersSlider` | — | Slider range state plus the premium gate |

`useHapticFeedback` centralizes the setting check, so callers just call `triggerHaptic()`:

```ts
const { triggerHaptic } = useHapticFeedback()
```

---

## Navigation constants

**Files:** `src/navigation/navigation.constants.ts`, `navigation.helpers.ts`

```3:3:src/navigation/navigation.constants.ts
export const BOTTOM_NAVIGATION_HEIGHT = 75
```

A hardcoded tab-bar height used for modal offsets and Playground layout. If the tab bar ever changes,
this constant must change with it.

```33:37:src/navigation/navigation.constants.ts
export const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
  animationDuration: 150,
}
```

Applied by every stack navigator. Headers are drawn by the in-house `Header` inside `Template`, which
is why the native header is disabled everywhere.

The full `SCREEN` enum is listed in [`INDEX.md`](INDEX.md#screen-route-names--srcnavigationnavigationconstantsts).

`getNavigationParam<T>(param, navigation)` reads a param from the **currently active route** in the
navigator's state. It is not type-safe and does not walk nested navigators — it assumes the param
lives on the active route of the navigator you hand it.
