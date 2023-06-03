//
//  FSModule.swift
//  Wyrazowo
//
//  Created by Adam Kruczek on 31/05/2023.
//

import Foundation

@objc(FSModule) class FSModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  
  @objc func saveSearchHistory(
    _ searchHistory: String
  ) -> Bool {
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
    EventEmitter.emitter.sendEvent(withName: "readSearchHistory", body: DAKeychain.shared["search_history"] ?? "")

    return true
  }
}
