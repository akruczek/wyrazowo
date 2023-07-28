//
//  RestartModule.swift
//  Wyrazowo
//
//  Created by Adam Kruczek on 28/07/2023.
//

import Foundation
import Darwin

@objc(RestartModule) class RestartModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }

  @objc func restartApp() -> Void {
    DispatchQueue.main.asyncAfter(deadline: .now()) {
      UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
      exit(0)
    }
  }
}
