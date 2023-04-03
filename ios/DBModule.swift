//
//  DBModule.swift
//  ScrabbleHelper
//
//  Created by Adam Kruczek on 03/04/2023.
//

import Foundation

@objc(DBModule) class DBModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  typealias JSONDictionary = [String : Any]

  func asString(jsonDictionary: JSONDictionary) -> String {
    do {
      let data = try JSONSerialization.data(withJSONObject: jsonDictionary, options: .prettyPrinted)
      return String(data: data, encoding: String.Encoding.utf8) ?? ""
    } catch {
      return ""
    }
  }
  
  @objc public func findPossibleWords(
    _ allWords: String
  ) -> String {
    NSLog("#SH", allWords)
    EventEmitter.emitter.sendEvent(withName: "findPossibleWordsResult", body: allWords)
    return allWords
  }
}
