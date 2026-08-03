# Wyrazowo — File & Symbol Index

Machine-oriented lookup table. Use this instead of scanning the tree.
Every path is relative to the repository root.

- [1. Task → file lookup](#1-task--file-lookup)
- [2. Source file inventory (`src/`)](#2-source-file-inventory-src)
- [3. Native file inventory](#3-native-file-inventory)
- [4. Root-level files](#4-root-level-files)
- [5. Symbol index](#5-symbol-index)

---

## 1. Task → file lookup

| I want to change... | Go to |
| --- | --- |
| The word-matching algorithm (JS) | `src/dashboard/helpers/find-possible-words.helper.ts` |
| The word-matching algorithm (iOS) | `ios/DBModule.swift` |
| The word-matching algorithm (Android) | `android/app/src/main/java/com/wyrazowo/DBModuleManager.kt` |
| Letter point values / scoring | `src/dashboard/helpers/get-word-points.helper.ts` |
| The wildcard / forced-index encoding | `src/core/letter-card/letter-card.constants.ts` |
| The word database itself | `src/assets/slowa{2..15}.ts` (gitignored, regenerate with `scripts/filter-words-by-length.js`) |
| Which word-length files are loaded | `src/dashboard/helpers/find-possible-words.helper.ts`, `find-possible-long-words.helper.ts` |
| The main search screen | `src/dashboard/dashboard.tsx` |
| Search results UI | `src/dashboard/components/possible-words-modal/possible-words-modal.tsx` |
| Search history | `src/dashboard/hooks/use-search-history-modal.hook.ts`, `src/dashboard/components/search-history-modal/` |
| The JS↔native bridge for search | `src/native-db/native-db.ts` |
| Word-extension (advanced) search | `src/advanced-search/advanced-search.tsx` |
| Theme colors | `src/core/colors/colors.constants.ts` |
| Light/dark theme tokens | `src/core/styled/theme.ts` |
| The `spacings` prop DSL | `src/core/styled/helpers/parse-margin.helper.ts` (`parseSpacings`) |
| Spacing scale values | `src/core/styled/models.ts` (`SPACING` enum) |
| Translations | `src/core/localize/localization/{pl,en,de,ar,he}.json` |
| The translation key type | `src/core/localize/localize.models.ts` (`Localization` enum) |
| Adding a screen / route name | `src/navigation/navigation.constants.ts` + the relevant `*.navigation.tsx` |
| Bottom tab bar | `App.navigation.tsx` |
| Redux store registration | `src/store/store.ts` |
| App settings (theme, language, haptic, premium, native engine) | `src/settings/store/settings.slice.ts` |
| AsyncStorage keys | `src/core/storage/storage.constants.ts` |
| Firebase auth | `src/core/auth/auth-service.ts` |
| Firebase realtime database | `src/core/real-time-database/real-time-database.service.ts` |
| Game statistics writes | `src/core/user-statistics-service/user-statistics-service.ts` |
| Premium activation | `src/core/premium-service/premium-service.ts`, `src/assets/premium-codes.json` |
| Settings menu entries | `src/more/hooks/use-more-options.hook.ts` |
| The Wordle-style game | `src/charade/` |
| The alphabetical guessing game | `src/dictionarly/` |
| The Scrabble board sandbox | `src/playground/` |
| App version bump | `scripts/update-version-code.js` |
| Cut a release / create a git tag | [`13-release-process.md`](13-release-process.md) + `changelog.md` |
| Path aliases | `tsconfig.json` + `babel.config.js` |

---

## 2. Source file inventory (`src/`)

309 files total. `src/assets/slowa*.ts` and `src/assets/gif/*` are data, not code.

### `src/advanced-search/` — word-extension search screen

| File | Purpose |
| --- | --- |
| `advanced-search.tsx` | Screen: readonly letters + word-to-extend input + search. Native engine only. |
| `advanced-search.styled.ts` | Button container styling. |
| `components/word-extension/word-extension.tsx` | Text input for the board word being extended, with direction arrows. |
| `components/word-extension/word-extension.styled.ts` | Styles for the above. |

### `src/assets/` — static data

| File | Purpose |
| --- | --- |
| `slowa2.ts` … `slowa15.ts` | Word database, one file per word length. Dot-separated single string default export. **Gitignored.** |
| `premium-codes.json` | Array of valid premium activation codes. |
| `gif/*.gif` | Six animated help GIFs used by the in-app guideline. |

### `src/charade/` — Wordle-style game

| File | Purpose |
| --- | --- |
| `charade.tsx` | Setup screen: word length counter, duplicate-letters checkbox, play button. |
| `charade.styled.ts` | Separator. |
| `charade.navigation.tsx` | Stack: main → play → playground. |
| `components/charade-play/charade-play.tsx` | Game shell; leave-game alert, shake-to-reveal. |
| `components/charade-playground/charade-playground.tsx` | 6×N guess grid + keyboard + end modal. |
| `components/charade-playground/charade-playground.styled.ts` | Grid list/row styles. |
| `components/charade-field/charade-field.tsx` | Single letter cell. |
| `components/charade-field/charade-field.styled.ts` | Red/green/yellow cell background logic. |
| `components/end-modal/end-modal.tsx` | Win/lose modal; writes Firebase stats. |
| `components/end-modal/end-modal.styled.ts` | Modal styles. |
| `components/index.ts` | Barrel. |
| `helpers/create-new-contents.helper.ts` | Writes one letter into the flat grid array. |
| `helpers/get-charade-field-content.helper.ts` | Reads a cell by row/column. |
| `helpers/update-rgy-letters.helper.ts` | Classifies a submitted row into red/green/yellow letters. |
| `helpers/index.ts` | Barrel. |
| `hooks/use-charade-play.hook.ts` | Setup state, picks the random secret word, navigates to play. |
| `hooks/use-charade-press.hook.ts` | Core game loop: typing, clearing, submitting, RGY updates. |
| `hooks/use-charade-words.hook.ts` | Reads `word` / `allWords` from navigation params. |
| `hooks/use-charade-spy.hook.ts` | Shake-to-reveal debug helper. |
| `hooks/index.ts` | Barrel. |

### `src/core/` — shared infrastructure

| File | Purpose |
| --- | --- |
| `models.ts` | `NumberFlag` (`0 \| 1`), `ScreenType`. |
| `package.json` | `{ "name": "@core" }` — module identity for the alias. |
| `alert-icon/alert-icon.tsx` | Tappable info/warning icon that opens a localized alert. |
| `alert-icon/alert-icon.models.ts` | `AlertType` union. |
| `alert-icon/alert-icon.styled.ts` | Styles. |
| `alerts/clear-search-history-alert.ts` | Confirm clearing search history. |
| `alerts/deactivate-premium-alert.ts` | Confirm premium deactivation. |
| `alerts/go-premium-alert.ts` | Premium upsell when exceeding the free word-length limit. |
| `alerts/leave-game-alert.ts` | Confirm abandoning a game in progress. |
| `alerts/new-version-avaialble-alert.ts` | Notifies about a newer GitHub release. (Filename typo is intentional/original.) |
| `alerts/overwrite-search-history-alert.ts` | Confirm overwriting history on import. |
| `alerts/restart-app-alert.ts` | Confirm restart after a language change. |
| `alerts/save-search-history-alert.ts` | Confirm exporting search history to a file. |
| `alerts/spy-alert.ts` | Debug alert revealing a hidden value. |
| `app-icon/app-icon.tsx` | Renders "WRZW" as four letter cards. |
| `app-icon/app-icon.styled.ts` | Styles. |
| `auth/auth-service.ts` | Google Sign-In + Firebase credential exchange. |
| `auth/auth-service.models.ts` | Auth service type. |
| `colors/colors.constants.ts` | `COLOR` enum — the entire palette. |
| `custom-button/custom-button.tsx` | Pressable colored button with optional haptic. |
| `custom-button/custom-button.styled.tsx` | Styles (only `.styled.tsx` in the repo). |
| `custom-checkbox/custom-checkbox.tsx` | Labeled checkbox with RTL support. |
| `custom-checkbox/custom-checkbox.styled.ts` | Styles. |
| `custom-counter/custom-counter.tsx` | Minus/plus numeric stepper with color breakpoints. |
| `custom-counter/custom-counter.styled.ts` | Styles. |
| `custom-keyboard/custom-keyboard.tsx` | Polish on-screen keyboard with per-key RGY coloring. |
| `custom-keyboard/custom-keyboard.constants.ts` | Key rows, `SEND` / `CLEAR` keys. |
| `custom-keyboard/custom-keyboard.styled.ts` | Styles. |
| `custom-modalize/cutom-modalize.tsx` | Themed `@gorhom/bottom-sheet` `BottomSheetModal` adapter (`CustomModalizeRef`). (Filename typo is original.) |
| `icon/icon.tsx` | Re-exports MDI icons from `@react-native-vector-icons/material-design-icons` as `MaterialCommunityIcons` / `Icon`. |
| `custom-switch/custom-switch.tsx` | Paper `Switch` wrapper. |
| `custom-switch/custom-switch.styled.ts` | Styles. |
| `custom-text-input/custom-text-input.tsx` | Themed input with error state. |
| `custom-text-input/custom-text-input.styled.ts` | Styles. |
| `fetch-client/fetch-client.ts` | Minimal `fetch` GET wrapper. |
| `fetch-client/fetch-client.constants.ts` | `SJP_BASE_PATH = 'https://sjp.pl'`. |
| `focus-aware-status-bar/focus-aware-status-bar.tsx` | `StatusBar` that only renders when the screen is focused. |
| `header/header.tsx` | Colored screen header with back / left / right actions. |
| `header/header.models.ts` | `HeaderProps`, `HeaderSideContentConfig`. |
| `header/header.styled.ts` | Styles. |
| `header/hooks/use-header-press.hook.ts` | Header action press handling. |
| `header/hooks/use-header-text-size.hook.ts` | Shrinks the title when it overflows 75% of screen width. |
| `header/hooks/index.ts` | Barrel. |
| `hooks/use-force-update.hook.ts` | Returns a function that forces a re-render. |
| `hooks/use-haptic-feedback.hook.ts` | Triggers haptics when the setting is on. |
| `hooks/use-is-premium.hook.ts` | `premium > 0`. |
| `hooks/use-localize.hook.ts` | Returns a getter for the current locale strings. |
| `hooks/use-modal-top-offset.hook.ts` | Computes a modal's top offset from safe area + tab bar. |
| `hooks/use-new-version-alert.hook.ts` | Compares GitHub tags to `package.json` version. |
| `hooks/use-rehydrate-store.hook.ts` | Loads a storage key on mount and dispatches an action. |
| `hooks/use-spy.hook.ts` | Shake-gesture debug reveal. |
| `is-platform/is-platform.ts` | `isIOS` / `isAndroid` helpers. |
| `letter-card/letter-card.tsx` | Scrabble tile component (plain / multi-letter / forced-index variants). |
| `letter-card/letter-card.constants.ts` | Alphabet, point groups, `LETTER_SOAP`, `LETTER_SOAP_PLACEHOLDER`, `LETTER_INDEX_SEPARATOR`. |
| `letter-card/letter-card.styled.ts` | Styles. |
| `letters-slider/range-slider.tsx` | Dual-thumb range control (gesture-handler + Reanimated); replaces `rn-range-slider`. |
| `letters-slider/letters-slider.tsx` | Dual-thumb word-length range slider with premium gate. |
| `letters-slider/letter-slider.styled.ts` | Styles. |
| `letters-slider/models.ts` | `LetterSliderDefaultValues` tuple. |
| `letters-slider/hooks/use-letters-slider.hook.ts` | Range state + premium blocking. |
| `letters-slider/components/letter-slider-label/*` | Slider value label. |
| `letters-slider/components/letter-slider-rail/*` | Slider rail. |
| `letters-slider/components/letter-slider-thumb/*` | Slider thumb. |
| `localize/localize.ts` | Picks the locale JSON and interpolates `{{params}}`. |
| `localize/localize.constants.ts` | `LANGUAGE_CODES`, labels, flag emojis. |
| `localize/localize.models.ts` | `Localization` enum — all translation keys. |
| `localize/localization/{pl,en,de,ar,he}.json` | Translation files, 81 keys each. |
| `localize/hooks/use-rtl.hook.ts` | Whether the active locale is right-to-left. |
| `maps/screen-type-to-color-map.ts` | Maps `ScreenType` to its accent `COLOR`. |
| `noop/noop.ts` | Empty function. |
| `play-button/play-button.tsx` | Floating "play" button. |
| `play-button/play-button.styled.ts` | Styles. |
| `premium-service/premium-service.ts` | `activateOnce` / `deactivateOnce`. |
| `premium-service/premium-service-models.ts` | Types. |
| `progress-indicator/progress-indicator.tsx` | Step dots with a connecting line. |
| `progress-indicator/progress-indicator.styled.ts` | Styles. |
| `real-time-database/real-time-database.service.ts` | Firebase RTDB read/write/listen wrapper. |
| `real-time-database/real-time-database.constants.ts` | `DEFAULT_USER_POINTS`, DB URL. |
| `real-time-database/real-time-database.models.ts` | Types. |
| `responsive/responsive.ts` | `RESPONSIVE.WIDTH(%)` / `RESPONSIVE.HEIGHT(%)`. |
| `shadow/shadow.constants.ts` | Reusable shadow style. |
| `storage/storage.ts` | AsyncStorage wrapper (`set` / `get` / `remove`). |
| `storage/storage.constants.ts` | `STORAGE_KEY` enum. |
| `storage/storage.models.ts` | `SearchResultModel`. |
| `styled/index.ts` | Barrel for styled helpers. |
| `styled/models.ts` | `ThemeModel`, `SPACING` enum. |
| `styled/theme.ts` | Light/dark theme objects, `THEME_LABELS`, `getThemeProp`. |
| `styled/helpers/parse-margin.helper.ts` | `parseMargin` + `parseSpacings` (the `spacings` DSL parser). |
| `styled/helpers/parse-padding.helper.ts` | `parsePadding`. |
| `styled/helpers/parse-absolute.helper.ts` | `parseAbsolute`. |
| `styled/helpers/rtl.helper.ts` | RTL flex direction / alignment / rotation / text align. |
| `styled/helpers/append-style-when-provided.helper.ts` | Emits a CSS line only when the prop exists. |
| `styled/row-around-container.styled.ts` | RTL-aware `space-around` row. |
| `styled/spacing-view.styled.ts` | `View` with the `spacings` prop. |
| `switch-button/switch-button.tsx` | Segmented control. |
| `switch-button/switch-button.styled.ts` | Styles. |
| `system-language/system-language.tsx` | Exports `SYSTEM_LANGUAGE` read from the device locale. |
| `template/template.tsx` | Screen shell: header + safe area; wraps content in `BottomSheetModalProvider` and mounts `PortalHost`. |
| `template/template.styled.ts` | Styles (`TemplateHost`, `TemplateSafeArea`). |
| `text/text.constants.ts` | `TEXT_SIZE` scale. |
| `tx/tx.tsx` | Localized text component. |
| `tx/tx.styled.ts` | `StyledTx` — all text styling props. |
| `tx/tx.models.ts` | `StyledTxProps`. |
| `tx/index.ts` | Barrel. |
| `user-statistics-service/user-statistics-service.ts` | Increments points / success / failure in RTDB. |
| `wrzw/index.ts` | Default-exports the six micro-utils. |
| `wrzw/package.json` | `{ "name": "wrzw" }` — module identity for the alias. |
| `wrzw/utils/compare-joined.ts` | Compares two arrays by their joined strings. |
| `wrzw/utils/exist.ts` | Not `null` / `undefined`. |
| `wrzw/utils/get-time.ts` | `Date.now()` equivalent. |
| `wrzw/utils/if-else.ts` | Functional ternary. |
| `wrzw/utils/is-e.ts` | Array is empty. |
| `wrzw/utils/to-number-flag.ts` | `boolean` → `0 \| 1`. |

### `src/dashboard/` — main search screen

| File | Purpose |
| --- | --- |
| `dashboard.tsx` | The main search screen. |
| `dashboard.navigation.tsx` | Stack: search → advanced search. |
| `dashboard.styled.ts` | Bottom content container. |
| `components/dashboard-buttons-and-modals/dashboard-buttons-and-modals.tsx` | History / search / clear buttons plus all four modals. |
| `components/dashboard-buttons-and-modals/dashboard-buttons.styled.ts` | Styles. |
| `components/force-index-modal/force-index-modal.tsx` | Pick a 1–15 position for a letter. |
| `components/force-index-modal/force-index-modal.styled.ts` | Styles. |
| `components/letters-grid/letters-grid.tsx` | Tappable Polish alphabet grid. |
| `components/possible-words-modal/possible-words-modal.tsx` | Results list grouped by length, sorted by points. |
| `components/possible-words-modal/possible-words-modal-footer.tsx` | "Load more" pagination footer. |
| `components/possible-words-modal/possible-words-modal.styled.ts` | Styles. |
| `components/search-history-modal/search-history-modal.tsx` | List of past searches. |
| `components/search-history-modal/search-history-modal-item.tsx` | One past search; reopens its cached results. |
| `components/search-history-modal/search-history-modal.styled.ts` | Styles. |
| `components/selected-letters/selected-letters.tsx` | The player's rack, in two rows. |
| `components/selected-letters/selected-letters.styled.ts` | Styles. |
| `components/soap-letter-modal/soap-letter-modal.tsx` | Configure a blank tile into a multi-choice wildcard. |
| `components/soap-letter-modal/soap-letter-modal.styled.ts` | Styles. |
| `components/word-details-modal/word-details-modal.tsx` | Word detail sheet. |
| `components/word-details-modal/word-details-headline.tsx` | Word + point total. |
| `components/word-details-modal/word-details-definitions.tsx` | Definitions scraped from sjp.pl. |
| `components/word-details-modal/word-details-modal.styled.ts` | Styles. |
| `components/index.ts` | Barrel. |
| `helpers/find-possible-words.helper.ts` | **The search entry point** + the JS matching algorithm + `allWordsByLength`. |
| `helpers/find-possible-long-words.helper.ts` | `longWordsByLength` (10–15 letters). |
| `helpers/get-word-points.helper.ts` | Polish Literaki scoring. |
| `helpers/get-soap-characters-indexes.helper.ts` | Which positions in a result were filled by a wildcard. |
| `helpers/get-results-already-saved-index.helper.ts` | Finds a cached identical search. |
| `helpers/is-force-index-available.helper.ts` | Whether a rack letter can be position-locked. |
| `helpers/parse-sjp-word-details.helper.ts` | Extracts definitions from sjp.pl HTML. |
| `helpers/reverse-not-nil-words.helper.ts` | Reverses and compacts grouped word arrays. |
| `helpers/toggle-selected-soap-letters.helper.ts` | Toggles a letter in the wildcard selection. |
| `helpers/update-storage-search-result.helper.ts` | Bumps a cached search to the front of history. |
| `helpers/index.ts` | Barrel. |
| `hooks/use-search-possible-words.hook.ts` | Search orchestration: cache lookup, engine call, result persistence. |
| `hooks/use-select-letter.hook.ts` | The rack: select, deselect, clear, force index, premium cap. |
| `hooks/use-soap-modal.hook.ts` | Wildcard configuration modal. |
| `hooks/use-search-history-modal.hook.ts` | History availability + modal ref. |
| `hooks/use-word-detail.hook.ts` | Result pagination and grouping, long-press to open details. |
| `hooks/use-word-definitions.hook.ts` | Fetches definitions from sjp.pl. |
| `hooks/use-dashboard-rehydration.hook.ts` | Loads language / haptic / native-engine / premium from storage. |
| `hooks/use-gestures-enabled.hook.ts` | Android-only Modalize scroll/pan conflict workaround. |
| `hooks/index.ts` | Barrel. |
| `store/dashboard.slice.ts` | `selectedLetters`, `searchHistoryTimestamp`. |
| `store/dashboard.selectors.ts` | Selectors for the above. |

### `src/developer/` — advanced settings

| File | Purpose |
| --- | --- |
| `developer.tsx` | Native search engine toggle; link to search history tools. |
| `developer.navigation.tsx` | Stack. |
| `components/developer-search-history/developer-search-history.tsx` | Clear / export / import search history. |
| `hooks/use-read-search-history.hook.ts` | Listens for the native `readSearchHistory` event. |

### `src/dictionarly/` — alphabetical guessing game

| File | Purpose |
| --- | --- |
| `dictionarly.tsx` | Setup: short/long words, difficulty, play. |
| `dictionarly.styled.ts` | Separator. |
| `components/dictionarly-play/dictionarly-play.tsx` | Game screen: progress, input, before/after lists. |
| `components/dictionarly-play/dictionarly-play.styled.ts` | Styles. |
| `components/dictionarly-end-modal/dictionarly-end-modal.tsx` | Result modal; writes Firebase stats. |
| `components/dictionarly-end-modal/dictionarly-end-modal.styled.ts` | Styles. |
| `components/dictionarly-searched-text/dictionarly-searched-text.tsx` | Renders guesses with matching-prefix highlighting. |
| `helpers/get-dictionary-words.helper.ts` | Splits and flattens the dot-separated word blobs. |
| `helpers/append-sorted-words.helper.ts` | Appends a guess and re-sorts. |
| `helpers/is-char-ok.helper.ts` | Whether the prefix up to an index matches the secret. |
| `helpers/get-searched-word-content.helper.ts` | Char display, with `...` for a full prefix match. |
| `helpers/index.ts` | Barrel. |
| `hooks/use-play-dictionarly.hook.ts` | Setup state; picks the secret word; navigates. |
| `hooks/use-dictionarly-play.hook.ts` | Guess submission and alphabetical sorting. |
| `hooks/use-dictionarly-play-progress.hook.ts` | Chance counter by difficulty. |
| `hooks/use-dictionarly-spy.hook.ts` | Shake-to-reveal. |
| `hooks/index.ts` | Barrel. |

### `src/dictionary/` — word lookup

| File | Purpose |
| --- | --- |
| `dictionary.tsx` | Search a word or roll a random one. |
| `dictionary.navigation.tsx` | Stack: dictionarly → play → dictionary. |
| `dictionary.styled.ts` | Styles. |
| `dictionary.models.ts` | `DictionaryRandomFiltersModel`. |
| `components/dictionary-buttons/dictionary-buttons.tsx` | Search button. |
| `components/dictionary-buttons/dictionary-buttons.styled.ts` | Styles. |
| `components/dictionary-definitions/dictionary-definitions.tsx` | Definition list / loading / not-found states. |
| `components/dictionary-customize-random/dictionary-customize-random.tsx` | Length filter for the random word. |
| `components/dictionary-customize-random/dictionary-customize-random.styled.ts` | Styles. |
| `components/index.ts` | Barrel. |
| `helpers/get-random-words.helper.ts` | Flattens and filters the word pool. |
| `helpers/get-word-from-db.helper.ts` | Finds a word inside a dot-separated blob. |
| `helpers/index.ts` | Barrel. |
| `hooks/use-dictionary-word.hook.ts` | Search + random word logic. |
| `hooks/use-dictionary-random-filters.hook.ts` | Min/max length filter state. |
| `hooks/index.ts` | Barrel. |

### `src/help/` — in-app guideline

| File | Purpose |
| --- | --- |
| `help.tsx` | List of help topics. |
| `help.constants.ts` | `HELP_DATA` (dictionary and charade entries are hidden). |
| `help.navigation.tsx` | Stack. |
| `help.styled.ts` | Styles. |
| `components/guideline/guideline.tsx` | GIF viewer with prev/next. |
| `components/guideline/guideline.constants.ts` | GIF references for the six dashboard topics. |
| `components/guideline/guideline.styled.ts` | Styles. |

### `src/mania/`

| File | Purpose |
| --- | --- |
| `mania.tsx` | WebView embedding scrabblemania.pl, gated by `MANIA_ENABLED`. |

### `src/more/` — settings hub

| File | Purpose |
| --- | --- |
| `more.tsx` | Settings list. |
| `more.navigation.tsx` | Stack containing every settings sub-screen plus `Developer` and `User`. |
| `more.models.ts` | `MoreOption`. |
| `more.styled.ts` | Styles. |
| `hooks/use-more-options.hook.ts` | Builds the settings menu. |
| `components/option-item/option-item.tsx` | Settings row (switch / icon / avatar / chevron). |
| `components/option-item/option-item.styled.ts` | Styles. |
| `components/listed-option/listed-option.tsx` | Text row container. |
| `components/listed-option/listed-option.styled.ts` | Styles. |
| `components/empty-options/empty-options.tsx` | Spinner shown while settings rehydrate. |
| `components/language/language.tsx` | Language picker screen. |
| `components/language/language-item.tsx` | One language; triggers the restart alert. |
| `components/theme/theme.tsx` | Theme picker screen. |
| `components/theme/theme-item.tsx` | Light / dark / system row. |
| `components/haptic-feedback/haptic-feedback.tsx` | Haptic on/off screen. |
| `components/haptic-feedback/haptic-feedback-item.tsx` | One haptic option. |
| `components/premium-modal/premium-modal.tsx` | Premium code entry and validation. |
| `components/premium-modal/premium-modal.styled.ts` | Styles. |
| `components/author/author.tsx` | Author links. |
| `components/author/author.styled.ts` | Styles. |
| `components/index.ts` | Barrel (also consumed by `user` and `developer`). |

### `src/native-db/` — JS side of the native search bridge

| File | Purpose |
| --- | --- |
| `native-db.ts` | Wraps `NativeModules.DBModule`; returns `Promise<string[]>`. |
| `native-db.models.ts` | `NativeDB` interface. |

### `src/navigation/`

| File | Purpose |
| --- | --- |
| `navigation.constants.ts` | `SCREEN` enum, `BOTTOM_NAVIGATION_HEIGHT`, `DEFAULT_SCREEN_OPTIONS`. |
| `navigation.helpers.ts` | `getNavigationParam`. |

### `src/playground/` — Scrabble board sandbox

| File | Purpose |
| --- | --- |
| `playground.tsx` | The 15×15 board with drag-and-drop letter placement. |
| `playground.constants.ts` | `PLAYGROUND_FIELD_TYPE` and the 225-cell `PLAYGROUND_FIELDS` layout. |
| `playground.models.ts` | `PlaygroundFieldModel`. |
| `playground.styled.ts` | Zoom wrapper, grid list, bottom container. |
| `hooks/use-gesture-letters-indexes.hook.ts` | Paging through alphabet rows. |
| `hooks/use-gesture-letters-initial-coords.ts` | Absolute X/Y placement of draggable tiles. |
| `components/draggable-letter.tsx` | Playground draggable tile (gesture-handler + Reanimated). |
| `components/gesture-letters-grid/gesture-letters-grid.tsx` | Draggable alphabet tray. |
| `components/gesture-letters-grid/gesture-letters-grid-arrow.tsx` | Paging arrows. |
| `components/gesture-letters-grid/gesture-letters-grid.styled.ts` | Styles. |
| `components/playground-field/playground-field.tsx` | One board cell (holds a measurable ref). |
| `components/playground-field/playground-field.styled.ts` | Cell size and premium-square colors. |
| `components/playground-field-content/playground-field-content.tsx` | Letter or bonus marker. |
| `components/playground-backlight/playground-backlight.tsx` | Row/column highlight overlay. |
| `components/playground-backlight/playground-backlight.styled.ts` | Styles. |
| `components/advanced-search-modal/advanced-search-modal.tsx` | Empty work-in-progress shell. |
| `components/advanced-search-modal/advanced-search-modal.styled.ts` | Styles. |

### `src/settings/`, `src/store/`, `src/user/`

| File | Purpose |
| --- | --- |
| `settings/store/settings.slice.ts` | App-wide settings; every reducer also writes to AsyncStorage. |
| `settings/store/settings.selectors.ts` | Settings selectors with safe fallbacks. |
| `store/store.ts` | `configureStore`; exports `RootState` and `AppDispatch`. |
| `user/user.tsx` | Profile screen: sign-in, premium, statistics. |
| `user/store/user.slice.ts` | Firebase auth data. |
| `user/store/user.selectors.ts` | `userUidSelector`, `userImageSelector`, `userDisplayNameSelector`. |
| `user/hooks/use-user-auth.hook.ts` | Auto Google sign-in on mount. |
| `user/hooks/use-real-time-user-data.hook.ts` | RTDB listener on `/users/{uid}`. |
| `user/hooks/use-premium.hook.ts` | Premium modal / deactivation. |
| `user/hooks/index.ts` | Barrel. |
| `user/components/user-statistics/user-statistics.tsx` | Stats table. |
| `user/components/user-statistics/user-statistics.styled.ts` | Styles. |

---

## 3. Native file inventory

### iOS (`ios/`)

| File | Purpose |
| --- | --- |
| `DBModule.swift` / `DBModule.m` | Native word search; resolves Promise with `string[]`. |
| `FSModule.swift` / `FSModule.m` | Search history to Documents file + Keychain; Promises. |
| `RestartModule.swift` / `RestartModule.m` | Suspends and `exit(0)`s the app. |
| `KeyChainManager.swift` | `DAKeychain` helper used by `FSModule`. |
| `String+toJSON.swift` | `String.toJSON()` extension. |
| `Wyrazowo-Bridging-Header.h` | Imports `RCTBridgeModule`. |
| `Wyrazowo/AppDelegate.swift` | RN 0.86 Swift entry; calls `FirebaseApp.configure()`. |
| `Wyrazowo/Info.plist` | Bundle config, URL schemes, ATS, fonts. |
| `Wyrazowo/PrivacyInfo.xcprivacy` | Apple privacy manifest. |
| `Wyrazowo/Wyrazowo.entitlements` | `aps-environment: development`. |
| `Wyrazowo/LaunchScreen.storyboard` | Launch screen. |
| `Wyrazowo/Images.xcassets/` | App icons. |
| `Podfile` / `Podfile.lock` | CocoaPods; static frameworks; Ruby 3.3.1 via Bundler. |
| `GoogleService-Info.plist` | Firebase config. |

### Android (`android/`)

| File | Purpose |
| --- | --- |
| `app/src/main/java/com/wyrazowo/MainApplication.kt` | React host; registers the three custom packages. |
| `app/src/main/java/com/wyrazowo/MainActivity.kt` | Hosts the `"Wyrazowo"` root component. |
| `app/src/main/java/com/wyrazowo/DBModuleManager.kt` | Native word search; emits `findPossibleWordsResult`. |
| `app/src/main/java/com/wyrazowo/DBModulePackage.kt` | Registers `DBModuleManager`. |
| `app/src/main/java/com/wyrazowo/FSModuleManager.kt` | Search history via the Storage Access Framework. |
| `app/src/main/java/com/wyrazowo/FSModulePackage.kt` | Registers `FSModuleManager`. |
| `app/src/main/java/com/wyrazowo/FSActivity.kt` | Headless activity that launches the system file picker. |
| `app/src/main/java/com/wyrazowo/RestartModuleManager.kt` | Restarts the process. |
| `app/src/main/java/com/wyrazowo/RestartModulePackage.kt` | Registers `RestartModuleManager`. |
| `app/src/main/AndroidManifest.xml` | Permissions, `MainActivity`, `FSActivity`. |
| `app/src/debug/AndroidManifest.xml` | Debug overlay enabling cleartext traffic. |
| `app/build.gradle` | App module config, signing, version. |
| `build.gradle` | SDK versions, Kotlin 1.8.10, plugin classpaths. |
| `gradle.properties` | Hermes on, New Architecture off. |
| `settings.gradle` | `:app` plus the RN Gradle plugin build. |
| `app/google-services.json` | Firebase config. |
| `app/debug.keystore` | Debug keystore — **also used for release builds**. |

---

## 4. Root-level files

| File | Purpose |
| --- | --- |
| `App.tsx` | Provider tree: Redux → NavigationContainer → `AppNavigation`. |
| `App.navigation.tsx` | Bottom tab navigator, theme resolution, tab accent colors. |
| `index.js` | `AppRegistry.registerComponent` wrapped in `gestureHandlerRootHOC`. |
| `app.json` | `{ name, displayName }` = `Wyrazowo`. |
| `package.json` | Dependencies, scripts, version `1.22.1` (1.23.0 pending release script). |
| `package-lock.json` | npm lockfile (added 1.23.0). |
| `tsconfig.json` | TS7 paths with `./` prefixes; no `baseUrl`. |
| `babel.config.js` | `module-resolver` aliases, `react-native-worklets/plugin` last. |
| `metro.config.js` | Default RN 0.86 config. |
| `jest.config.js` | `@react-native/jest-preset`. No tests exist. |
| `eslint.config.js` | Flat ESLint 9 config from `@react-native/eslint-config/flat`. |
| `.prettierrc.js` | `singleQuote: true`, `semi: false`. |
| `firebase.json` | Enables RTDB offline persistence. |
| `Gemfile` / `Gemfile.lock` / `.ruby-version` / `.bundle/config` | CocoaPods toolchain (Ruby 3.3.1, gems into `vendor/bundle`). |
| `types.d.ts` | Empty. |
| `changelog.md` | Full release history, newest first. Updated by hand at release time. |
| `scripts/filter-words-by-length.js` | Splits `slowa.ts` into `slowa{N}.ts`. |
| `scripts/update-version-code.js` | Bumps the version across package.json, Gradle and the Xcode project. |

---

## 5. Symbol index

### `SCREEN` route names — `src/navigation/navigation.constants.ts`

`DASHBOARD`, `DASHBOARD_SEARCH`, `DASHBOARD_ADVANCED_SEARCH`, `DEVELOPER`, `DEVELOPER_MAIN`, `DEVELOPER_SEARCH_HISTORY`, `CHARADE`, `CHARADE_MAIN`, `CHARADE_PLAY`, `CHARADE_PLAYGROUND`, `MORE`, `MORE_MAIN`, `MORE_LANGUAGE`, `MORE_THEME`, `MORE_HAPTIC`, `MORE_MANIA`, `MORE_HELP`, `MORE_AUTHOR`, `MORE_HELP_MAIN`, `MORE_HELP_GUIDELINE`, `MORE_USER`, `DICTIONARY`, `DICTIONARY_DICTIONARY`, `DICTIONARY_DICTIONARLY`, `DICTIONARY_PLAY`

Values are the enum name in Title-Case with dashes, e.g. `DASHBOARD_ADVANCED_SEARCH = 'Dashboard-Advanced-Search'`.

### `STORAGE_KEY` — `src/core/storage/storage.constants.ts`

| Key | Value | Stores |
| --- | --- | --- |
| `SEARCH_RESULT` | `searchResult` | `SearchResultModel[]` as JSON |
| `HAPTIC_FEEDBACK_ENABLED` | `hapticFeedbackEnabled` | `"0"` / `"1"` |
| `NATIVE_SEARCH_ENGINE_ENABLED` | `nativeSearchEngineEnabled` | `"0"` / `"1"` |
| `DARK_THEME_ENABLED` | `darkThemeEnabled` | `"-1"` / `"0"` / `"1"` |
| `PREMIUM` | `premium` | `"0"` / `"1"` |
| `LANGUAGE_CODE` | `languageCode` | raw string, e.g. `"pl"` |

All keys are prefixed with `@` inside AsyncStorage.

### `COLOR` — `src/core/colors/colors.constants.ts`

| Name | Hex |
| --- | --- |
| `TRANSPARENT` | `transparent` |
| `DARK_SLATE_GREY` | `#2F4F4F` |
| `WHITE` | `#FFFFFF` |
| `BLACK` | `#000000` |
| `WHITE_SMOKE` | `#F5F5F5` |
| `GOLD` | `#FFD700` |
| `DARK_SEA_GREEN` | `#8FBC8F` |
| `DODGER_BLUE` | `#1E90FF` |
| `FIRE_BRICK` | `#FF6347` |
| `SLATE_GREY` | `#708090` |
| `FLORAL_WHITE` | `#FFFAF0` |
| `DARK_RED` | `#8B0000` |
| `DIM_GREY` | `#696969` |
| `DIM_GREY_LIGHTER` | `#A5A5A5` |

### `SPACING` — `src/core/styled/models.ts`

`XXXS = 2`, `XXS = 4`, `XS = 8`, `S = 12`, `M = 16`, `L = 24`, `XL = 32`, `XXL = 48`, `XXXL = 96`

### Letter encoding — `src/core/letter-card/letter-card.constants.ts`

| Constant | Value | Meaning |
| --- | --- | --- |
| `LETTER_SOAP` | `?` | Blank tile, matches any single letter |
| `LETTER_SOAP_PLACEHOLDER` | `*` | Separator inside a multi-choice wildcard, e.g. `A*B*C` |
| `LETTER_INDEX_SEPARATOR` | `!` | Position lock, e.g. `A!3` = "A must sit at index 3" |
| `LETTER_EMPTY` | `''` | Empty cell |
| `ALL_LETTERS_SORTED` | 32 letters | The Polish alphabet used in every grid |
| `LETTERS_1` / `_2` / `_3` / `_5` | letter groups | Point values 1, 2, 3 and 5 |

### Redux actions

| Action | Slice | File |
| --- | --- | --- |
| `setHapticFeedbackEnabledAction` | settings | `src/settings/store/settings.slice.ts` |
| `setNativeSearchEngineEnabledAction` | settings | same |
| `setDarkThemeEnabledAction` | settings | same |
| `setPremiumAction` | settings | same |
| `setLanguageCodeAction` | settings | same |
| `setSelectedLettersAction` | dashboard | `src/dashboard/store/dashboard.slice.ts` |
| `setSearchHistoryTimestampAction` | dashboard | same |
| `setUserAction` | user | `src/user/store/user.slice.ts` |

### Redux selectors

| Selector | Fallback | File |
| --- | --- | --- |
| `hapticFeedbackEnabledSelector` | `1` | `src/settings/store/settings.selectors.ts` |
| `nativeSearchEngineEnabledSelector` | `1` | same |
| `darkThemeEnabledSelector` | `0` | same |
| `premiumSelector` | `0` | same |
| `languageCodeSelector` | `null` | same |
| `selectedLettersSelector` | `[]` | `src/dashboard/store/dashboard.selectors.ts` |
| `searchHistoryTimestampSelector` | `0` | same |
| `userUidSelector` | — | `src/user/store/user.selectors.ts` |
| `userImageSelector` | — | same |
| `userDisplayNameSelector` | — | same |

### Native modules

| Module | Method | iOS | Android |
| --- | --- | --- | --- |
| `DBModule` | `findPossibleWords(allWordsJSON, selectedLettersJSON, wordToExtend?)` → `Promise<string[]>` | `ios/DBModule.swift` | `DBModuleManager.kt` |
| `FSModule` | `saveSearchHistory(json)` → `Promise` | `ios/FSModule.swift` | `FSModuleManager.kt` |
| `FSModule` | `readSearchHistory()` → `Promise<string>` | same | same |
| `RestartModule` | `restartApp()` | `ios/RestartModule.swift` | `RestartModuleManager.kt` |

### All hooks

| Hook | File |
| --- | --- |
| `useForceUpdate` | `src/core/hooks/use-force-update.hook.ts` |
| `useHapticFeedback` | `src/core/hooks/use-haptic-feedback.hook.ts` |
| `useIsPremium` | `src/core/hooks/use-is-premium.hook.ts` |
| `useLocalize` | `src/core/hooks/use-localize.hook.ts` |
| `useModalTopOffset` | `src/core/hooks/use-modal-top-offset.hook.ts` |
| `useNewVersionAlert` | `src/core/hooks/use-new-version-alert.hook.ts` |
| `useRehydrateStore` | `src/core/hooks/use-rehydrate-store.hook.ts` |
| `useSpy` | `src/core/hooks/use-spy.hook.ts` |
| `useRTL` | `src/core/localize/hooks/use-rtl.hook.ts` |
| `useHeaderPress` | `src/core/header/hooks/use-header-press.hook.ts` |
| `useHeaderTextSize` | `src/core/header/hooks/use-header-text-size.hook.ts` |
| `useLettersSlider` | `src/core/letters-slider/hooks/use-letters-slider.hook.ts` |
| `useDashboardRehydration` | `src/dashboard/hooks/use-dashboard-rehydration.hook.ts` |
| `useGesturesEnabled` | `src/dashboard/hooks/use-gestures-enabled.hook.ts` |
| `useSearchHistory` | `src/dashboard/hooks/use-search-history-modal.hook.ts` |
| `useSearchPossibleWords` | `src/dashboard/hooks/use-search-possible-words.hook.ts` |
| `useSelectLetter` | `src/dashboard/hooks/use-select-letter.hook.ts` |
| `useSoapModal` | `src/dashboard/hooks/use-soap-modal.hook.ts` |
| `useWordDefinitions` | `src/dashboard/hooks/use-word-definitions.hook.ts` |
| `useWordDetail` | `src/dashboard/hooks/use-word-detail.hook.ts` |
| `useCharadePlay` | `src/charade/hooks/use-charade-play.hook.ts` |
| `useCharadePress` | `src/charade/hooks/use-charade-press.hook.ts` |
| `useCharadeWords` | `src/charade/hooks/use-charade-words.hook.ts` |
| `useCharadeSpy` | `src/charade/hooks/use-charade-spy.hook.ts` |
| `usePlayDictionarly` | `src/dictionarly/hooks/use-play-dictionarly.hook.ts` |
| `useDictionarlyPlay` | `src/dictionarly/hooks/use-dictionarly-play.hook.ts` |
| `useDictionarlyPlayProgress` | `src/dictionarly/hooks/use-dictionarly-play-progress.hook.ts` |
| `useDictionarlySpy` | `src/dictionarly/hooks/use-dictionarly-spy.hook.ts` |
| `useDictionaryWord` | `src/dictionary/hooks/use-dictionary-word.hook.ts` |
| `useDictionaryRandomFilters` | `src/dictionary/hooks/use-dictionary-random-filters.hook.ts` |
| `useGestureLettersIndexes` | `src/playground/hooks/use-gesture-letters-indexes.hook.ts` |
| `useGestureLettersInitialCoords` | `src/playground/hooks/use-gesture-letters-initial-coords.ts` |
| `useMoreOptions` | `src/more/hooks/use-more-options.hook.ts` |
| `useUserAuth` | `src/user/hooks/use-user-auth.hook.ts` |
| `useRealTimeUserData` | `src/user/hooks/use-real-time-user-data.hook.ts` |
| `usePremium` | `src/user/hooks/use-premium.hook.ts` |
| `useReadSearchHistory` | `src/developer/hooks/use-read-search-history.hook.ts` |

### Services

| Service | File |
| --- | --- |
| `authService` | `src/core/auth/auth-service.ts` |
| `realTimeDatabaseService` | `src/core/real-time-database/real-time-database.service.ts` |
| `userStatisticsService` | `src/core/user-statistics-service/user-statistics-service.ts` |
| `premiumService` | `src/core/premium-service/premium-service.ts` |
| `Storage` | `src/core/storage/storage.ts` |
| `fetchClient` | `src/core/fetch-client/fetch-client.ts` |
| `DB` (native search) | `src/native-db/native-db.ts` |

### `wrzw` utilities — `src/core/wrzw/index.ts` (default export)

| Util | Signature |
| --- | --- |
| `toNumberFlag` | `(value: boolean) => 0 \| 1` |
| `exist` | `<T>(arg: T) => boolean` |
| `ifElse` | `<T, F>(onTrue: T, onFalse: F, condition: boolean) => T \| F` |
| `compareJoined` | `<A, T>(a: A[], b: T[]) => boolean` |
| `getTime` | `() => number` |
| `isE` | `<T>(array: T[]) => boolean` |
