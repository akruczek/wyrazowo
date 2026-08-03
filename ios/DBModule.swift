//
//  DBModule.swift
//  Wyrazowo
//

import Foundation

@objc(DBModule) class DBModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return false }

  @objc func findPossibleWords(
    _ allWords: String,
    selectedLetters: String,
    wordToExtend: String?,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.global(qos: .userInitiated).async {
      let LETTER_SOAP = "?"
      let LETTER_SOAP_PLACEHOLDER = "*"
      let LETTER_INDEX_SEPARATOR = "!"

      guard let allWordsArray = allWords.toJSON() as? [String],
            let selectedLettersArray = selectedLetters.toJSON() as? [String] else {
        reject("DB_PARSE_ERROR", "Failed to parse word lists", nil)
        return
      }

      var filterWords: [String] = []

      for word in allWordsArray {
        var soap_letters: [String] = selectedLettersArray
          .filter { $0 == LETTER_SOAP }

        var custom_soap_letters: [[String]] = selectedLettersArray
          .filter { $0.contains(LETTER_SOAP_PLACEHOLDER) }
          .map { $0.components(separatedBy: LETTER_SOAP_PLACEHOLDER) }

        var force_index_letters: [String] = selectedLettersArray
          .filter { $0.contains(LETTER_INDEX_SEPARATOR) }

        var letters: [String] = selectedLettersArray
          .filter { $0 != LETTER_SOAP && !$0.contains(LETTER_SOAP_PLACEHOLDER) && !$0.contains(LETTER_INDEX_SEPARATOR) }

        var satisfiesLetters: Int = -1

        for (index, char) in word.uppercased().enumerated() {
          if (satisfiesLetters != -1) {
            break
          }

          let forcedIndexes = force_index_letters
            .map { Int($0.components(separatedBy: LETTER_INDEX_SEPARATOR)[1]) ?? 0 }

          if (forcedIndexes.contains(index)) {
            let forcedIndexLetter = force_index_letters.first(
              where: {
                Int($0.components(separatedBy: LETTER_INDEX_SEPARATOR)[1]) == Int(index)
              }
            )

            if (forcedIndexLetter?.components(separatedBy: LETTER_INDEX_SEPARATOR)[0] == String(char)) {
              let forcedIndexLetterIndex = force_index_letters.firstIndex(
                where: {
                  Int($0.components(separatedBy: LETTER_INDEX_SEPARATOR)[1]) == Int(index)
                }
              ) ?? -1

              force_index_letters.remove(at: forcedIndexLetterIndex)

              if (Int(index) == Int(word.count - 1)) {
                satisfiesLetters = 1
              }
            } else {
              satisfiesLetters = 0
            }
          } else {
            let missingChar = !letters.contains(String(char))
            let noSoapAvailable = soap_letters.count == 0
            let noCustomSoapAvailable = custom_soap_letters.count == 0

            if (missingChar && noSoapAvailable && noCustomSoapAvailable) {
              satisfiesLetters = 0
              break
            }

            if (missingChar) {
              var customSoapLetterAvailableIndexes: [Int] = []

              for (index, customSoapLetters) in custom_soap_letters.enumerated() {
                if (customSoapLetters.contains(String(char))) {
                  customSoapLetterAvailableIndexes.append(index)
                }
              }

              if (customSoapLetterAvailableIndexes.isEmpty) {
                if (noSoapAvailable) {
                  satisfiesLetters = 0
                  break
                } else {
                  soap_letters.removeLast()
                }
              } else {
                custom_soap_letters.remove(at: customSoapLetterAvailableIndexes[0])
              }
            } else {
              let charIndex: Int = letters.firstIndex(where: { String($0) == String(char) }) ?? -1

              if (charIndex >= 0) {
                letters.remove(at: charIndex)
              }
            }

            if (index == word.count - 1) {
              satisfiesLetters = 1
            }
          }
        }

        if (satisfiesLetters > 0 && wordToExtend != nil) {
          if (!word.uppercased().contains((wordToExtend?.uppercased())!)) {
            satisfiesLetters = 0
          }
        }

        if (satisfiesLetters > 0) {
          filterWords.append(word)
        }
      }

      resolve(filterWords)
    }
  }
}
