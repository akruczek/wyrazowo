# 07 — iOS Native Layer

Everything under `ios/`. Four custom native modules written in Swift, exposed through Objective-C
bridge files.

- [Project structure](#project-structure)
- [App target settings](#app-target-settings)
- [AppDelegate](#appdelegate)
- [Native modules](#native-modules)
  - [DBModule](#dbmodule)
  - [EventEmitter](#eventemitter)
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
  Wyrazowo.xcodeproj/           project (objectVersion 54, LastUpgradeCheck 1210)
  Wyrazowo.xcworkspace/         open THIS, not the project
  Wyrazowo/
    AppDelegate.h / .mm         RCTAppDelegate subclass
    main.m                      UIKit entry point
    Info.plist
    Wyrazowo.entitlements
    LaunchScreen.storyboard
    Images.xcassets/            app icons
  WyrazowoTests/                stale RN template test
  DBModule.swift / .m           word search
  FSModule.swift / .m           search history file I/O
  RestartModule.swift / .m      process restart
  RCTEventEmitter.swift / .m    the EventEmitter module
  RCTEventEmitter.h             header, NOT compiled
  RCTEventEmmiter.m             dead file (typo), NOT in the build
  KeyChainManager.swift         DAKeychain helper
  String+toJSON.swift           String.toJSON() extension
  Wyrazowo-Bridging-Header.h
  WyrazowoTests-Bridging-Header.h
  Podfile / Podfile.lock
  GoogleService-Info.plist
```

Native sources sit at the `ios/` root rather than inside the `Wyrazowo/` group — unusual, but they are
correctly referenced by the target.

**Targets:** `Wyrazowo` (app) and `WyrazowoTests`.
**Schemes:** one shared scheme, `Wyrazowo`.

`WyrazowoTests/WyrazowoTests.m` is the unmodified React Native template test that waits for a view
containing the text "Welcome to React Native". That text does not exist in this app, so the test would
fail if anyone ran it. Nobody does.

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
| `IPHONEOS_DEPLOYMENT_TARGET` | `12.4` (also forced onto every pod in `post_install`) |
| `ENABLE_BITCODE` | `NO` (debug config) |
| Orientation | Portrait only on iPhone; all orientations on iPad |

The version numbers are kept in sync with `package.json` and Android by
`scripts/update-version-code.js`. See [`09-build-and-tooling.md`](09-build-and-tooling.md#versioning).

The bridging header exposes React Native's module APIs to Swift:

```5:6:ios/Wyrazowo-Bridging-Header.h
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
```

---

## AppDelegate

`AppDelegate.h` declares `AppDelegate : RCTAppDelegate` (the RN 0.71+ style).

```8:17:ios/Wyrazowo/AppDelegate.mm
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"Wyrazowo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}
```

The only customization over the template is `[FIRApp configure]`. `moduleName` must match
`app.json`'s `name` and the `AppRegistry.registerComponent` call in `index.js`.

Bundle resolution is the standard debug/release split — Metro in debug, `main.jsbundle` in release.

**There is no word-database resource in the iOS bundle.** The corpus is shipped inside the JS bundle
and passed to `DBModule` on every call.

---

## Native modules

All four use the `RCT_EXTERN_MODULE` pattern: a Swift class annotated `@objc(Name)` plus a `.m` file
declaring the exported methods.

| Module | JS name | Methods |
| --- | --- | --- |
| `DBModule` | `NativeModules.DBModule` | `findPossibleWords` |
| `FSModule` | `NativeModules.FSModule` | `saveSearchHistory`, `readSearchHistory` |
| `RestartModule` | `NativeModules.RestartModule` | `restartApp` |
| `EventEmitter` | `NativeModules.EventEmitter` | (event host only) |

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

```137:138:ios/DBModule.swift
    EventEmitter.emitter.sendEvent(withName: "findPossibleWordsResult", body: filterWords)
    return allWords
```

The event carries a native `[String]` array (JS receives a real array, unlike Android which sends a
JSON string). The return value is the input `allWords` echoed back — meaningless, and ignored by JS.

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

### EventEmitter

**Files:** `ios/RCTEventEmitter.swift`, `ios/RCTEventEmitter.m`

The single event host for the whole app. Other modules reach it through the static `emitter` property.

```4:24:ios/RCTEventEmitter.swift
@objc(EventEmitter)
open class EventEmitter: RCTEventEmitter {
  public static var emitter: RCTEventEmitter!
  
  private static var eventEmitter: RCTEventEmitter!

  @objc public override static func requiresMainQueueSetup() -> Bool { return true }

  override init() {
    super.init()
    EventEmitter.emitter = self
  }
  
  func registerEventEmitter(eventEmitter: RCTEventEmitter) {
    EventEmitter.eventEmitter = eventEmitter
  }

  open override func supportedEvents() -> [String] {
    ["findPossibleWordsResult", "readSearchHistory"]
  }
}
```

Notes:

- The static `emitter` is assigned in `init`, so it is `nil` until React Native instantiates the
  module. If `DBModule` were somehow called first, `EventEmitter.emitter.sendEvent` would crash on the
  implicitly-unwrapped optional.
- `registerEventEmitter` and the private `eventEmitter` field are dead code.
- iOS declares only two events; Android additionally declares (but never emits) `searchEngineProgress`.

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

  @objc func readSearchHistory() -> Bool {
    EventEmitter.emitter.sendEvent(
      withName: "readSearchHistory",
      body: DAKeychain.shared["search_history"] ?? ""
    )

    return true
  }
```

The iOS design is quite different from Android's:

| | iOS | Android |
| --- | --- | --- |
| Write target | `Documents/search_history.txt` **and** the Keychain | User-chosen file via the Storage Access Framework |
| Read source | **the Keychain only** | User-chosen file |
| User interaction | none | system file picker |

Because reading comes from the Keychain rather than the file, **importing a file edited by the user
outside the app does nothing on iOS** — you get back whatever the app last wrote. The file exists only
so the user can retrieve it via Finder/Files (enabled by `UIFileSharingEnabled` and
`LSSupportsOpeningDocumentsInPlace` in `Info.plist`).

The `catch {}` swallows write failures silently, and the method returns `true` regardless.

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
| `UIAppFonts` | 15 icon fonts | `react-native-vector-icons` |
| `UISupportedInterfaceOrientations` | Portrait only | iPhone |
| `UISupportedInterfaceOrientations~ipad` | Portrait + both landscapes | iPad |
| `UIRequiredDeviceCapabilities` | `armv7` | legacy, meaningless on modern 64-bit-only iOS |
| `NSLocationWhenInUseUsageDescription` | **empty string** | leftover from the RN template; the app never requests location |
| `UIViewControllerBasedStatusBarAppearance` | `false` | app-wide status bar control |

Two entries are worth cleaning up: the empty location usage description (an empty purpose string can
draw review attention) and the `armv7` capability.

There is **no `PrivacyInfo.xcprivacy`**, which Apple has required for new submissions since May 2024.

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

```28:42:ios/Podfile
target 'Wyrazowo' do
  config = use_native_modules!
  use_frameworks! :linkage => :static
  $RNFirebaseAsStaticFramework = true

  use_react_native!(
    :path => config[:reactNativePath],
    # Enables Flipper.
    #
    # Note that if you have use_frameworks! enabled, Flipper will not work and
    # you should disable the next line.
    # :flipper_configuration => flipper_config,
    # An absolute path to your application root.
    :app_path => "#{Pod::Config.instance.installation_root}/.."
  )
```

Key decisions:

| Line | Effect |
| --- | --- |
| `use_frameworks! :linkage => :static` | Required by React Native Firebase; **static frameworks** |
| `$RNFirebaseAsStaticFramework = true` | Firebase pods as static frameworks |
| `:flipper_configuration` commented out | **Flipper is disabled on iOS** — it is incompatible with `use_frameworks!` |
| `post_install` forcing `IPHONEOS_DEPLOYMENT_TARGET = '12.4'` | Overrides the deployment target on **every pod**, ignoring what each pod declares |

Pods are **not committed**. `bundle exec pod install` is required before the first build; the
`Gemfile` pins CocoaPods `~> 1.13` and Ruby `2.7.4`.

Forcing 12.4 onto all pods is a blunt instrument that will start failing as dependencies raise their
minimums. Raising the app's own deployment target (RN 0.73 supports iOS 13.4+) and removing the loop
is the cleaner path.

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
4. If it emits events, add the event name to `supportedEvents()` in `RCTEventEmitter.swift` and send
   via `EventEmitter.emitter.sendEvent(withName:body:)`.

Follow the existing convention of matching the Android implementation — see
[`08-native-android.md`](08-native-android.md).

---

## Known issues

| Issue | Severity | Detail |
| --- | --- | --- |
| `exit(0)` in `RestartModule` | High | App Store review risk |
| `aps-environment: development` | High | Wrong for a release build; push is unused anyway |
| No `PrivacyInfo.xcprivacy` | High | Required by Apple since May 2024 |
| Search runs on the main thread | High | UI freezes for the duration of a large search |
| Whole corpus over the bridge per search | High | Tens of MB serialized per call |
| Force unwraps (`as!`) in `DBModule` | Medium | Malformed input crashes the app |
| `readSearchHistory` reads the Keychain, not the file | Medium | Import cannot pick up an externally edited file |
| Deprecated `kSecAttrAccessibleAlwaysThisDeviceOnly` | Medium | Deprecated since iOS 12 |
| `RCTEventEmmiter.m` dead file | Low | Typo-named leftover, not in the build |
| `RCTEventEmitter.h` unused | Low | Header not compiled |
| Empty `NSLocationWhenInUseUsageDescription` | Low | Template leftover |
| `armv7` in `UIRequiredDeviceCapabilities` | Low | Meaningless today |
| Stale `WyrazowoTests.m` | Low | Would fail if run |
| Deployment target forced to 12.4 on all pods | Low | Will break with newer dependencies |

Prioritized alongside the rest of the backlog in
[`11-tech-debt-and-modernization.md`](11-tech-debt-and-modernization.md).
