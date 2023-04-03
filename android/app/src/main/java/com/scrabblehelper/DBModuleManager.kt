package com.scrabblehelper

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
    ) {

        val gson = GsonBuilder().create()
        val words = gson.fromJson<ArrayList<String>>(allWords, object :TypeToken<ArrayList<String>>(){}.type)

        reactApplicationContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("findPossibleWordsResult", gson.toJson(words))
    }
}
