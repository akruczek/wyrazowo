# 07 — iOS Native Layer

Everything under `ios/`. Three custom native modules written in Swift, exposed through Objective-C
bridge files. The app uses the RN 0.86 Swift `AppDelegate` template.

- [Project structure](#project-structure)
- [App target settings](#app-target-settings)
- [AppDelegate](#appdelegate)
- [Native modules](#native-modules)
  - [DBModule](#dbmodule)
  - [FSModule](#fsmodule)
  - [RestartModule](#restartmodule)
- [Supporting Swift files](#supporting-swift-files)
- [Info.plist](#infoplist)
- [Entitlements](#entitlements)
- [Podfile](#podfile)
- [Adding a new native module](#adding-a-new-native-module)
- [Known issues](#known-issues)

---

## Project structure

```
ios/
  Wyrazowo.xcodeproj/
  Wyrazowo.xcworkspace/         open THIS, not the project
  Wyrazowo/
    AppDelegate.swift           RN 0.86 Swift entry (replaces AppDelegate.h/.mm)
    Info.plist
    Wyrazowo.entitlements
    PrivacyInfo.xcprivacy       Apple privacy manifest (added in 1.23.0)
    LaunchScreen.storyboard
    Images.xcassets/
  DBModule.swift / .m           word search (Promise)
  FSModule.swift / .m           search history file I/O (Promise)
  RestartModule.swift / .m      process restart
  KeyChainManager.swift         DAKeychain helper
  String+toJSON.swift           String.toJSON() extension
  Wyrazowo-Bridging-Header.h
  Podfile / Podfile.lock
  GoogleService-Info.plist
```

Native sources sit at the `ios/` root rather than inside the `Wyrazowo/` group — unusual, but they are
correctly referenced by the target.

**Target:** `Wyrazowo` only (`WyrazowoTests` removed in the RN 0.86 upgrade).
**Scheme:** one shared scheme, `Wyrazowo`.

---

## App target settings

| Setting | Value |
| --- | --- |
| `PRODUCT_NAME` | `Wyrazowo` |
| `PRODUCT_BUNDLE_IDENTIFIER` | `com.akruczek.wyrazowo` |
| `MARKETING_VERSION` | `1.22.1` |
| `CURRENT_PROJECT_VERSION` | `100221` |
| `DEVELOPMENT_TEAM` | `YY88S6TW4F` |
| `SWIFT_VERSION` | `5.0` |
| `SWIFT_OBJC_BRIDGING_HEADER` | `Wyrazowo-Bridging-Header.h` |
| `IPHONEOS_DEPLOYMENT_TARGET` | `min_ios_version_supported` from RN 0.86 (via Podfile) |
| `ENABLE_BITCODE` | `NO` (debug config) |
| Orientation | Portrait only on iPhone; all orientations on iPad |

The version numbers are kept in sync with `package.json` and Android by
`scripts/update-version-code.js`. See [`09-build-and-tooling.md`](09-build-and-tooling.md#versioning).

The bridging header exposes React Native's module APIs to Swift:

```5:5:ios/Wyrazowo-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

(`RCTEventEmitter.h` import was removed with the deleted `EventEmitter` module.)

---

## AppDelegate

**File:** `ios/Wyrazowo/AppDelegate.swift` — the RN 0.86 Swift template with Firebase wired in.

```14:33:ios/Wyrazowo/AppDelegate.swift
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()

    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "Wyrazowo",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
```

The only customization over the template is `FirebaseApp.configure()`. `withModuleName: "Wyrazowo"`
must match `app.json`'s `name` and the `AppRegistry.registerComponent` call in `index.js`.

Bundle resolution is the standard debug/release split — Metro in debug, `main.jsbundle` in release.

**There is no word-database resource in the iOS bundle.** The corpus is shipped inside the JS bundle
and passed to `DBModule` on every call.

---

## Native modules

All three use the `RCT_EXTERN_MODULE` pattern: a Swift class annotated `@objc(Name)` plus a `.m` file
declaring the exported methods. Search and file I/O methods take `resolver` / `rejecter` blocks and
return results through Promises — there is no separate `EventEmitter` module.

| Module | JS name | Methods |
| --- | --- | --- |
| `DBModule` | `NativeModules.DBModule` | `findPossibleWords` → `Promise<string[]>` |
| `FSModule` | `NativeModules.FSModule` | `saveSearchHistory`, `readSearchHistory` → Promises |
| `RestartModule` | `NativeModules.RestartModule` | `restartApp` |

All four return `true` from `requiresMainQueueSetup()`, so all four are **initialized on the main
thread**, and — because none of them override `methodQueue` — all their methods also **run on the main
thread**.

---

### DBModule

**Files:** `ios/DBModule.swift` (140 lines), `ios/DBModule.m`

The iOS implementation of the word matcher. The algorithm is documented in
[`02-search-engine.md`](02-search-engine.md#the-matching-algorithm); this section covers the
iOS-specific mechanics.

#### Signature

```11:17:ios/DBModule.m
@interface RCT_EXTERN_MODULE(DBModule, NSObject)
  RCT_EXTERN_METHOD(findPossibleWords:
    (NSString*)allWords
    selectedLetters:(NSString*)selectedLetters
    wordToExtend:(NSString*)wordToExtend
  )
@end
```

```24:34:ios/DBModule.swift
  @objc func findPossibleWords(
    _ allWords: String,
    selectedLetters: String,
    wordToExtend: String?
  ) -> String {
    let LETTER_SOAP = "?"
    let LETTER_SOAP_PLACEHOLDER = "*"
    let LETTER_INDEX_SEPARATOR = "!"

    let allWordsArray: [String] = allWords.toJSON() as! [String]
    let selectedLettersArray: [String] = selectedLetters.toJSON() as! [String]
```

Both arrays arrive as **JSON strings** and are parsed with the `String.toJSON()` extension. The force
unwraps (`as!`) will crash the app if the JSON is malformed or of an unexpected shape.

#### Word extension

Applied as a post-filter after the normal match:

```126:135:ios/DBModule.swift
      if (satisfiesLetters > 0 && wordToExtend != nil) {
        if (!word.uppercased().contains((wordToExtend?.uppercased())!)) {
          satisfiesLetters = 0
        }
      }

      if (satisfiesLetters > 0) {
        filterWords.append(word)
      }
    }
```

#### Result delivery

When matching completes, `resolve(filterWords)` is called with a native `[String]` array. JS receives
a real `string[]` on the Promise — no event subscription.

#### Behavioural difference from the JS implementation

The Swift `letters` pool **excludes force-index entries**:

```48:49:ios/DBModule.swift
      var letters: [String] = selectedLettersArray
        .filter { $0 != LETTER_SOAP && !$0.contains(LETTER_SOAP_PLACEHOLDER) && !$0.contains(LETTER_INDEX_SEPARATOR) }
```

The JS version's equivalent filter omits the `LETTER_INDEX_SEPARATOR` check, so in JS a `"A!3"` entry
also sits in the plain pool. In practice `"A!3"` never equals a bare character so it can never be
consumed as one, but the two implementations are not literally identical here.

---

### FSModule

**Files:** `ios/FSModule.swift`, `ios/FSModule.m`

Search history export and import.

```13:37:ios/FSModule.swift
  @objc func saveSearchHistory(_ searchHistory: String) -> Bool {
    let file : String = "search_history.txt"

    if let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
      let fileURL = dir.appendingPathComponent(file)

      do {
        try searchHistory.write(to: fileURL, atomically: false, encoding: .utf8)
      }
      catch {}
    }

    DAKeychain.shared["search_history"] = searchHistory

    return true
  }

  @objc func readSearchHistory(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(DAKeychain.shared["search_history"] ?? "")
  }
```

The iOS design is quite different from Android's:

| | iOS | Android |
| --- | --- | --- |
| Write target | `Documents/search_history.txt` **and** the Keychain | User-chosen file via the Storage Access Framework |
| Read source | **the Keychain only** (via Promise) | User-chosen file (via Promise after SAF picker) |
| User interaction | none | system file picker |

Because reading comes from the Keychain rather than the file, **importing a file edited by the user
outside the app does nothing on iOS** — you get back whatever the app last wrote. The file exists only
so the user can retrieve it via Finder/Files (enabled by `UIFileSharingEnabled` and
`LSSupportsOpeningDocumentsInPlace` in `Info.plist`).

The `catch {}` swallows write failures silently, and `saveSearchHistory` still resolves `true`.

---

### RestartModule

**Files:** `ios/RestartModule.swift`, `ios/RestartModule.m`

```11:20:ios/RestartModule.swift
@objc(RestartModule) class RestartModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc func restartApp() -> Void {
    DispatchQueue.main.asyncAfter(deadline: .now()) {
      UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
      exit(0)
    }
  }
}
```

Called only after a language change. It suspends the app using a private-selector trick and then calls
`exit(0)`.

> **App Store risk.** Apple's Human Interface Guidelines state an app should never quit
> programmatically, and `exit(0)` combined with `perform(#selector(NSXPCConnection.suspend))` — using
> an XPC selector on `UIApplication` — is exactly the kind of thing review flags. This shipped, but it
> is fragile. A JS-level remount (re-rendering the provider tree with a new locale key) would be the
> safe replacement.

---

## Supporting Swift files

### `String+toJSON.swift`

```swift
extension String {
  func toJSON() -> Any? {
    guard let data = self.data(using: .utf8, allowLossyConversion: false) else { return nil }
    return try? JSONSerialization.jsonObject(with: data, options: .mutableContainers)
  }
}
```

Used by `DBModule` to parse the two JSON string arguments.

### `KeyChainManager.swift`

Provides `DAKeychain`, a small Keychain wrapper with a subscript API
(`DAKeychain.shared["key"] = value`). This is a well-known public snippet, not original code.

Its accessibility attribute is `kSecAttrAccessibleAlwaysThisDeviceOnly`, which has been **deprecated
since iOS 12**. `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly` is the modern equivalent.

---

## Info.plist

| Key | Value | Why |
| --- | --- | --- |
| `CFBundleDisplayName` | `Wyrazowo` | |
| `CFBundleShortVersionString` | `$(MARKETING_VERSION)` | 1.22.1 |
| `CFBundleVersion` | `$(CURRENT_PROJECT_VERSION)` | 100221 |
| `CFBundleURLTypes` | `com.googleusercontent.apps.493191532928-...` | Google Sign-In callback |
| `NSAppTransportSecurity` | `NSAllowsArbitraryLoads: false`, `NSAllowsLocalNetworking: true` | ATS enforced; local networking for Metro |
| `UIFileSharingEnabled` | `true` | Exposes Documents in the Files app |
| `LSSupportsOpeningDocumentsInPlace` | `true` | Same, for in-place editing |
| `UIAppFonts` | `MaterialDesignIcons.ttf` | `@react-native-vector-icons/material-design-icons` |
| `UISupportedInterfaceOrientations` | Portrait only | iPhone |
| `UISupportedInterfaceOrientations~ipad` | Portrait + both landscapes | iPad |
| `UIRequiredDeviceCapabilities` | `armv7` | legacy, meaningless on modern 64-bit-only iOS |
| `NSLocationWhenInUseUsageDescription` | **empty string** | leftover from the RN template; the app never requests location |
| `UIViewControllerBasedStatusBarAppearance` | `false` | app-wide status bar control |

Two entries are worth cleaning up: the empty location usage description (an empty purpose string can
draw review attention) and the `armv7` capability.

There is **a `PrivacyInfo.xcprivacy`** in `ios/Wyrazowo/` (added during the 1.23.0 modernization).
Review it when adding dependencies that declare required-reason API usage.

---

## Entitlements

```xml
<key>aps-environment</key>
<string>development</string>
```

The only entitlement, and it is set to `development`. Push notifications are not used anywhere in the
app — no `@react-native-firebase/messaging`, no `UNUserNotificationCenter`. Either remove the
entitlement or set it to `production` before an App Store build.

---

## Podfile

```17:27:ios/Podfile
target 'Wyrazowo' do
  config = use_native_modules!

  # Required by @react-native-firebase when using static frameworks
  use_frameworks! :linkage => :static
  $RNFirebaseAsStaticFramework = true

  use_react_native!(
    :path => config[:reactNativePath],
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
```

Key decisions:

| Line | Effect |
| --- | --- |
| `use_frameworks! :linkage => :static` | Required by React Native Firebase; **static frameworks** |
| `$RNFirebaseAsStaticFramework = true` | Firebase pods as static frameworks |
| No Flipper config | **Flipper removed** — incompatible with static frameworks and deprecated in RN 0.86 |

Pods are **not committed**. `bundle exec pod install` is required before the first build; the
`Gemfile` pins CocoaPods `~> 1.15.2` and Ruby `>= 3.3.0` (`.ruby-version` is `3.3.1`).

---

## Adding a new native module

Four steps:

1. **Swift class** at `ios/MyModule.swift`:
   ```swift
   @objc(MyModule) class MyModule: NSObject {
     @objc static func requiresMainQueueSetup() -> Bool { return true }

     @objc func doSomething(_ argument: String) -> Bool {
       return true
     }
   }
   ```
2. **Objective-C bridge** at `ios/MyModule.m`:
   ```objc
   #import <Foundation/Foundation.h>
   #import "React/RCTBridgeModule.h"

   @interface RCT_EXTERN_MODULE(MyModule, NSObject)
     RCT_EXTERN_METHOD(doSomething:(NSString*)argument)
   @end
   ```
3. **Add both files to the `Wyrazowo` target** in Xcode.
4. For Promise-returning methods, add `resolver:` and `rejecter:` to the `.m` bridge and call
   `resolve(...)` / `reject(...)` from Swift.

Follow the existing convention of matching the Android implementation — see
[`08-native-android.md`](08-native-android.md).

---

## Known issues

| Issue | Severity | Detail |
| --- | --- | --- |
| `exit(0)` in `RestartModule` | High | App Store review risk |
| `aps-environment: development` | High | Wrong for a release build; push is unused anyway |
| Search runs on the main thread | High | UI freezes for the duration of a large search |
| Whole corpus over the bridge per search | High | Tens of MB serialized per call |
| Force unwraps (`as!`) in `DBModule` | Medium | Malformed input crashes the app |
| `readSearchHistory` reads the Keychain, not the file | Medium | Import cannot pick up an externally edited file |
| Deprecated `kSecAttrAccessibleAlwaysThisDeviceOnly` | Medium | Deprecated since iOS 12 |
| Empty `NSLocationWhenInUseUsageDescription` | Low | Template leftover |
| `armv7` in `UIRequiredDeviceCapabilities` | Low | Meaningless today |

Prioritized alongside the rest of the backlog in
[`11-tech-debt-and-modernization.md`](11-tech-debt-and-modernization.md).
