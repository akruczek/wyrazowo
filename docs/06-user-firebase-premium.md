# 06 — User, Firebase, Premium & Settings

The account and configuration side of the app: Google sign-in, the Realtime Database, game
statistics, the premium code mechanism, the settings hub and the developer screen.

- [Firebase setup](#firebase-setup)
- [Authentication](#authentication)
- [Realtime Database](#realtime-database)
- [Game statistics](#game-statistics)
- [The user screen](#the-user-screen)
- [Premium](#premium)
- [The More settings hub](#the-more-settings-hub)
- [The developer screen](#the-developer-screen)

---

## Firebase setup

| Item | Value |
| --- | --- |
| Firebase project | `wyrazowo` |
| Project number | `493191532928` |
| iOS bundle id | `com.akruczek.wyrazowo` |
| Android application id | `com.wyrazowo` |
| Realtime Database URL | `https://wyrazowo-default-rtdb.europe-west1.firebasedatabase.app` |
| Storage bucket | `wyrazowo.appspot.com` |
| Config files | `ios/GoogleService-Info.plist`, `android/app/google-services.json` (both committed) |
| Services used | Auth, Realtime Database |
| Services **not** used | Firestore, Analytics, Crashlytics, Cloud Messaging, Remote Config |

Offline persistence is enabled globally via the root `firebase.json`:

```json
{ "react-native": { "database_persistence_enabled": true } }
```

Initialization differs per platform: iOS calls `[FIRApp configure]` in `AppDelegate.mm`; Android
relies on the `com.google.gms.google-services` Gradle plugin plus autolinked
`@react-native-firebase/app`.

> **Note the bundle id mismatch.** iOS is `com.akruczek.wyrazowo`, Android is `com.wyrazowo`. Both are
> registered in the same Firebase project, so this works, but it is easy to trip over when adding a
> new Firebase service or an OAuth client.

---

## Authentication

**File:** `src/core/auth/auth-service.ts`

Google Sign-In exchanged for a Firebase credential. Three methods:

| Method | Signature | Purpose |
| --- | --- | --- |
| `init` | `() => void` | Configure `GoogleSignin` with the web client id |
| `googleSignIn` | `() => Promise<false \| UserCredential>` | Play Services check → Google sign-in → Firebase credential |
| `getCurrentUser` | `() => FirebaseAuthTypes.User \| null` | `auth().currentUser` |

```6:34:src/core/auth/auth-service.ts
export const authService: AuthService = {
  init: () => {
    const webClientId = googleServicesJson
      ?.client
      ?.[0]
      ?.oauth_client
      ?.find?.(({ client_type }) => client_type === (__DEV__ ? 3 : 3)) // TODO: verify on production build
      ?.client_id

    GoogleSignin.configure({ webClientId })
  },
  googleSignIn: async () => {
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })

    if (!hasPlayServices) {
      return false
    }

    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)
  },
```

Two things stand out:

1. **`init` reads the Android `google-services.json` on both platforms**, importing it as a JSON module
   to pull out the OAuth web client id. iOS therefore depends on an Android config file being present
   and correct.
2. The `__DEV__ ? 3 : 3` ternary is a leftover — both branches are identical, and the accompanying
   `TODO` says it was never verified against a production build.

`GoogleSignin.hasPlayServices` is Android-specific in spirit but is called unconditionally; on iOS it
resolves true.

### Where sign-in happens

| Location | Behaviour |
| --- | --- |
| `App.navigation.tsx` on mount | `getCurrentUser()` → `dispatch(setUserAction(user))` — restores a cached session silently |
| `useUserAuth` (User screen) | If no cached user, **automatically triggers the Google sign-in flow on mount** |

```35:54:src/user/hooks/use-user-auth.hook.ts
  React.useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setUserState(user)
      dispatch(setUserAction(user))
      getRealTimeDatabaseData(user.uid)
    } else {
      authService.googleSignIn().then((response) => {
        if (response) {
          const { user } = response
          setUserState(user)
          dispatch(setUserAction(user))
          getRealTimeDatabaseData(user.uid)
        }
```

There is no explicit "sign in" button and **no sign-out** anywhere in the app. Opening the profile row
in More is what triggers authentication.

### Redux

```ts
interface UserState {
  authData: FirebaseAuthTypes.User | null;
}
```

One action, `setUserAction`. Selectors: `userUidSelector`, `userImageSelector`,
`userDisplayNameSelector`. Storing a live Firebase object is why the store disables
`serializableCheck`.

---

## Realtime Database

**File:** `src/core/real-time-database/real-time-database.service.ts`

A thin wrapper over `@react-native-firebase/database`. Twelve methods:

| Method | Purpose |
| --- | --- |
| `getRef(endpoint)` | Reference at a path |
| `readOnce(endpoint, success?, failure?)` | One-shot `value` read |
| `readOnceByRef(reference, success?, failure?)` | One-shot read from an existing ref |
| `addListener(endpoint, onChanged)` | Subscribe to `value` |
| `removeListener(endpoint, listener)` | Unsubscribe |
| `set(endpoint, value, onComplete?)` | Overwrite a node |
| `update(endpoint, values, onComplete?)` | Partial update |
| `push(endpoint)` | Create a child key |
| `pushByReference(ref, values?)` | Push onto an existing ref |
| `setByReference(ref, values, onComplete?)` | Set on an existing ref |
| `remove(endpoint, onComplete?)` | Delete a node |

> **Inconsistency to be aware of:** the read/listen methods pass the explicit
> `REAL_TIME_DATABASE_URL` (`europe-west1`), while `set`, `update`, `push` and `remove` call
> `.database()` with **no URL**, hitting the default instance. Writes today all go through
> `setByReference` (which inherits the correct URL from `getRef`), so nothing is broken — but calling
> `realTimeDatabaseService.set(...)` directly would write to the wrong database.

### Data shape

```
/users/{uid}
  uid: string
  points:
    value: number
    dictionarly: { value, successCount, failureCount }
    charade:     { value, successCount, failureCount }
```

Seeded on first login from:

```1:13:src/core/real-time-database/real-time-database.constants.ts
export const DEFAULT_USER_POINTS = {
  value: 0,
  dictionarly: { value: 0, successCount: 0, failureCount: 0 },
  charade: { value: 0, successCount: 0, failureCount: 0 },
}
```

### Live subscription

`useRealTimeUserData` creates the node if missing, then attaches a `value` listener so the User screen
updates in real time:

```16:40:src/user/hooks/use-real-time-user-data.hook.ts
  const getRealTimeDatabaseData = async (uid: string) => {
    const realTimeDatabaseUserDataRef = await realTimeDatabaseService.getRef(`/users/${uid}`)
    // Creates user node with DEFAULT_USER_POINTS if missing
    setUserUid(uid)
  }

  React.useEffect(() => {
    if (userUid) {
      userListener = realTimeDatabaseService.addListener(`/users/${userUid}`, (data) => {
        setUserData(data.val())
      })
    }
```

### Security note

The database rules are not in this repository. The client writes points directly to
`/users/{uid}/points/...` with no server-side validation, so scores are trivially forgeable by anyone
who can authenticate. Fine for a single-player stats display; not suitable for a leaderboard.

---

## Game statistics

**File:** `src/core/user-statistics-service/user-statistics-service.ts`

Three methods, all following the same read-modify-write pattern against
`/users/{uid}/points/{subtype}` where `subtype` is `'dictionarly' | 'charade'`.

```6:22:src/core/user-statistics-service/user-statistics-service.ts
  updatePoints: async (
    uid: string,
    points: number,
    subtype: Subtype,
  ) => {
    const realTimeDatabasePointsRef = await realTimeDatabaseService.getRef(`/users/${uid}/points/${subtype}`)
    const realTimeDatabasePoints = await realTimeDatabaseService.readOnceByRef(realTimeDatabasePointsRef)

    const newData = {
      ...realTimeDatabasePoints.val(),
      value: (realTimeDatabasePoints.val().value ?? 0) + points,
    }

    await realTimeDatabaseService.setByReference(realTimeDatabasePointsRef, newData)

    return newData
  },
```

| Method | Field updated |
| --- | --- |
| `updatePoints(uid, points, subtype)` | `value += points` |
| `updateSuccess(uid, subtype)` | `successCount += 1` |
| `updateFailure(uid, subtype)` | `failureCount += 1` |

This is a **non-atomic read-modify-write**, not a Firebase transaction. Two devices finishing a game
simultaneously will lose one of the updates. `ServerValue.increment` or `ref.transaction()` would be
the correct primitives.

### Point values

| Game | Outcome | Points |
| --- | --- | --- |
| Charade | win | +10 |
| Charade | loss | -10 |
| Dictionarly | win | `floor(10 × (longWords ? 2 : 1) × [1, 1.2, 1.5, 2][difficulty])` → 10 to 40 |

Writes are triggered from the game end modals (`src/charade/components/end-modal/`,
`src/dictionarly/components/dictionarly-end-modal/`) and are guarded by `userUidSelector` — anonymous
players accumulate nothing.

---

## The user screen

**File:** `src/user/user.tsx`, screen `More-User`

Three sections:

1. **Profile** — avatar and display name from the Google account (`useUserAuth`).
2. **Premium** — current status; tap to open the code modal, long-press to deactivate (`usePremium`).
3. **Statistics** — `UserStatistics`, a table of points, wins and losses per game, driven live by
   `useRealTimeUserData`.

---

## Premium

Premium is a **local, offline, code-based unlock**. There is no in-app purchase, no receipt
validation and no server involvement.

### What it unlocks

Exactly one thing: the maximum word length in the search slider.

| | Free | Premium |
| --- | --- | --- |
| Max selected letters | 9 | 15 |
| Max word length | 9 | 15 |

Enforced in two places — `useSelectLetter` (rack cap, shows `goPremiumAlert`) and `useLettersSlider`
(slider cap via `sliderDefaultValues[4]`).

### The codes

```json
[ "PREMIUM1" ]
```

`src/assets/premium-codes.json` is **committed to the repository**, so the code is public to anyone
who reads the source. `.gitignore` mentions a `premium-codes.ts` variant that does not exist —
presumably the intended private version.

### Activation

```24:36:src/more/components/premium-modal/premium-modal.tsx
  const applyPremiumCode = () => {
    if ((premiumCodes ?? []).includes(premiumCode)) {
      modalizeRef?.current?.close?.()

      setTimeout(() => {
        setState(null)
        setPremiumCode('')
        premiumService.activateOnce(dispatch)
      })
    } else {
      setState(false)
    }
  }
```

```7:22:src/core/premium-service/premium-service.ts
export const premiumService: PremiumService = {
  activateOnce: async (dispatch?: Dispatch<AnyAction>) => {
    if (dispatch) {
      dispatch(setPremiumAction(1))
    }

    Storage.set(STORAGE_KEY.PREMIUM, '1')
  },
```

State lives in `settings.premium` (a `number`, `> 0` means active) and in AsyncStorage under
`@premium`. Deactivation via long-press on the premium row goes through `deactivatePremiumAlert` and
`premiumService.deactivateOnce`.

Because it is stored in plain AsyncStorage, premium survives app restarts but not a reinstall, and can
be flipped by anyone with device access.

---

## The More settings hub

**Directory:** `src/more/`, screen `More-Main`

A `FlatList` of `OptionItem` rows built by `useMoreOptions`:

```37:81:src/more/hooks/use-more-options.hook.ts
  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        tx: displayName,
        onChange: () => navigation.navigate(SCREEN.MORE_USER),
        imageUrl,
      },
      {
        local: 'language',
        onChange: () => navigation.navigate(SCREEN.MORE_LANGUAGE),
        icon: 'translate',
      },
```

| # | Entry | Destination |
| --- | --- | --- |
| 1 | User profile (avatar + display name) | `More-User` |
| 2 | Language | `More-Language` |
| 3 | Theme | `More-Theme` |
| 4 | Haptic feedback | `More-Haptic` |
| 5 | Scrabblemania | `More-Mania` |
| 6 | Help | `More-Help` |
| 7 | Advanced settings | `Developer` |
| 8 | About the author | `More-Author` |

The list returns `[]` until `hapticFeedbackEnabled` has rehydrated, which is what makes `EmptyOptions`
(a spinner) appear briefly on a cold start. The app version from `package.json` is rendered in the
footer.

### Settings sub-screens

| Screen | Values | Action | Storage key |
| --- | --- | --- | --- |
| Language | `pl` / `en` / `de` / `ar` / `he` | `setLanguageCodeAction` | `LANGUAGE_CODE` |
| Theme | light `0` / dark `1` / system `-1` | `setDarkThemeEnabledAction` | `DARK_THEME_ENABLED` |
| Haptic | on `1` / off `0` | `setHapticFeedbackEnabledAction` | `HAPTIC_FEEDBACK_ENABLED` |

**Changing the language restarts the app.** `restartAppAlert` confirms, then
`NativeModules.RestartModule.restartApp()` kills and relaunches the process. This is because
`useLocalize` memoizes on the language code but many strings are captured at render time in ways that
do not reliably refresh.

### Author screen

Static links to the author's GitHub, LinkedIn and the project repository.

---

## The developer screen

**Directory:** `src/developer/`, screens `Developer-Main` and `Developer-Search-History`

Despite the name, this is **visible to every user** in production. The intent to hide it was never
completed:

```70:75:src/more/hooks/use-more-options.hook.ts
      {
        local: 'advanced_settings',
        onChange: () => navigation.navigate(SCREEN.DEVELOPER),
        icon: 'wrench',
        // TODO: hidden: !__DEV__,
      },
```

### Developer-Main

A single switch: **native search engine on/off**. Writes `setNativeSearchEngineEnabledAction`, which
persists to `NATIVE_SEARCH_ENGINE_ENABLED`. Turning it off makes the app use the JS matcher and
disables Advanced Search.

### Developer-Search-History

Three actions on the stored search history, each behind a confirmation alert:

```22:41:src/developer/components/developer-search-history/developer-search-history.tsx
  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(localize, () => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
      dispatch(setSearchHistoryTimestampAction(new Date().getTime()))
    })
  }

  const handleSaveSearchHistory = () => {
    saveSearchHistoryAlert(localize, () => {
      Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT).then((searchHistory: SearchResultModel[] | null) => {
        NativeModules.FSModule.saveSearchHistory(JSON.stringify(searchHistory))
      })
    })
  }

  const handleImportSearchHistory = () => {
    overwriteSearchHistoryAlert(localize, () => {
      NativeModules.FSModule.readSearchHistory()
    })
  }
```

| Action | Mechanism |
| --- | --- |
| Clear | Overwrite storage with `[]`, bump the Redux timestamp |
| Export | `FSModule.saveSearchHistory(json)` — writes a text file (iOS: Documents + Keychain; Android: system file picker) |
| Import | `FSModule.readSearchHistory()` — result arrives on the `readSearchHistory` event |

Import is asynchronous through the same event pattern as search:

```ts
// src/developer/hooks/use-read-search-history.hook.ts
// listens for 'readSearchHistory', writes the payload to STORAGE_KEY.SEARCH_RESULT,
// then dispatches setSearchHistoryTimestampAction to refresh the UI
```

The platform-specific file access is documented in [`07-native-ios.md`](07-native-ios.md) and
[`08-native-android.md`](08-native-android.md).
