//
//  String+toJSON.swift
//  Wyrazowo
//
//  Created by Adam Kruczek on 07/04/2023.
//

import Foundation

extension String {
    func toJSON() -> Any? {
        guard let data = self.data(using: .utf8, allowLossyConversion: false) else { return nil }
        return try? JSONSerialization.jsonObject(with: data, options: .mutableContainers)
    }
}
