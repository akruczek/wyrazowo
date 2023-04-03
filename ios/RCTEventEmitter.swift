import Foundation
import React

@objc(EventEmitter)
open class EventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!
  
  private static var eventEmitter: RCTEventEmitter!

  override init() {
    super.init()
    EventEmitter.emitter = self
  }
  
  func registerEventEmitter(eventEmitter: RCTEventEmitter) {
    EventEmitter.eventEmitter = eventEmitter
  }

  open override func supportedEvents() -> [String] {
    ["findPossibleWordsResult"]
  }
}
