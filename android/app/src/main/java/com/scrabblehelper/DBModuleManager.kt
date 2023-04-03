package com.scrabblehelper

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken

class DBModuleManager(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "DBModule"
    }

    @ReactMethod
    fun findPossibleWords(
        allWords: String,
        selectedLetters: String,
    ): Any {

        val LETTER_SOAP = "?"
        val LETTER_SOAP_PLACEHOLDER = "*"

        val gson = GsonBuilder().create()

        val words = gson.fromJson<ArrayList<String>>(allWords, object :TypeToken<ArrayList<String>>(){}.type).toMutableList()
        val selectedLetters = gson.fromJson<ArrayList<String>>(selectedLetters, object :TypeToken<ArrayList<String>>(){}.type).toMutableList()
        val filterWords = mutableListOf<String>()

        words.forEach { word ->
            val tooLongWord = word.length > selectedLetters.size

            if (tooLongWord) {
                return false
            }

            val soap_letters = selectedLetters
                .filter { it === LETTER_SOAP }
                .toMutableList()

            var custom_soap_letters = selectedLetters
                .filter { it.contains(LETTER_SOAP_PLACEHOLDER) }
                .map { it.split(LETTER_SOAP_PLACEHOLDER) }
                .toMutableList()

            val _letters = selectedLetters
                .filter { letter -> letter !== LETTER_SOAP && !letter.contains(LETTER_SOAP_PLACEHOLDER) }
                .toMutableList()

            var satisfiesLetters = -1

            word.map { it.uppercase() }.forEachIndexed { index, char ->
                if (satisfiesLetters !== -1) {
                    return@forEachIndexed
                }

                val missingChar = !_letters.contains(char)
                val noSoapAvailable = soap_letters.size === 0
                val noCustomSoapAvailable = custom_soap_letters.size === 0

                if (missingChar && noSoapAvailable && noCustomSoapAvailable) {
                    satisfiesLetters = 0
                    return@forEachIndexed
                }


                if (missingChar) {
                    val customSoapLetterAvailableIndexes = custom_soap_letters
                        .mapIndexed { index, customSoapLetters ->
                            if (customSoapLetters.contains(char as Any)) {
                                return index
                            } else {
                                return -1
                            }
                        }
                        .filter { return it !== -1 }

                    if (customSoapLetterAvailableIndexes.isNotEmpty()) {
                        custom_soap_letters.removeAt(customSoapLetterAvailableIndexes[0])
                    } else {
                        if (noSoapAvailable) {
                            satisfiesLetters = 0
                            return@forEachIndexed
                        } else {
                            soap_letters.removeLast()
                        }
                    }
                } else {
                    val charIndex = _letters.indexOf(char)
                    _letters.removeAt(charIndex)
                }

                if (index === word.length - 1) {
                    satisfiesLetters = 1
                }
            }

            if (satisfiesLetters > 0) {
                filterWords.add(word)
            }
        }

        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("findPossibleWordsResult", gson.toJson(filterWords))

        return true
    }
}
