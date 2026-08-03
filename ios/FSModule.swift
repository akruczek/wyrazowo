//
//  FSModule.swift
//  Wyrazowo
//

import Foundation

@objc(FSModule) class FSModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc func saveSearchHistory(
    _ searchHistory: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    let file: String = "search_history.txt"

    if let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first {
      let fileURL = dir.appendingPathComponent(file)

      do {
        try searchHistory.write(to: fileURL, atomically: false, encoding: .utf8)
      } catch {
        // Keychain write below is the source of truth for reads
      }
    }

    DAKeychain.shared["search_history"] = searchHistory
    resolve(true)
  }

  @objc func readSearchHistory(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    resolve(DAKeychain.shared["search_history"] ?? "")
  }
}
