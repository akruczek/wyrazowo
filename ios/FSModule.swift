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
    let fileName = "search_history"

    let dir = try? FileManager.default.url(
      for: .documentDirectory,
      in: .userDomainMask,
      appropriateFor: nil,
      create: true
    )

    guard let fileURL = dir?.appendingPathComponent(fileName).appendingPathExtension("txt") else {
      fatalError("Not able to create URL")
    }

    // Writing to the file named Test
    do {
      try searchHistory.write(
        to: fileURL,
        atomically: true,
        encoding: .utf8
      )
    } catch {
      assertionFailure("Failed writing to URL: \(fileURL), Error: " + error.localizedDescription)
    }

    return true
  }

  @objc func readSearchHistory() -> Bool {
    let fileName = "search_history"

    let dir = try? FileManager.default.url(
      for: .documentDirectory,
      in: .userDomainMask,
      appropriateFor: nil,
      create: true
    )

    guard let fileURL = dir?.appendingPathComponent(fileName).appendingPathExtension("txt") else {
      fatalError("Not able to create URL")
    }

    var searchHistory = ""

    do {
      searchHistory = try String(contentsOf: fileURL)
    } catch {
      assertionFailure("Failed reading from URL: \(fileURL), Error: " + error.localizedDescription)
    }

    EventEmitter.emitter.sendEvent(withName: "readSearchHistory", body: searchHistory)
    return true
  }
}
