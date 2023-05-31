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
    NSLog("Search history%@", searchHistory)
    return true
  }
}
