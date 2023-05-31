package com.wyrazowo

import android.content.Context
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.io.BufferedReader
import java.io.FileInputStream
import java.io.FileOutputStream
import java.io.InputStreamReader

class FSModuleManager(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "FSModule"
    }

    @ReactMethod
    fun saveSearchHistory(searchHistory: String) {
        Log.v("TAGK", searchHistory)

        val file = "search_history.txt"
        val fileOutputStream: FileOutputStream

        try {
            fileOutputStream = reactApplicationContext.openFileOutput(file, Context.MODE_PRIVATE)
            fileOutputStream.write(searchHistory.toByteArray())
        } catch (e: Exception){
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun readSearchHistory() {
        try {
            var fileInputStream: FileInputStream? = reactApplicationContext.openFileInput("search_history.txt")
            var inputStreamReader = InputStreamReader(fileInputStream)
            val bufferedReader = BufferedReader(inputStreamReader)
            var searchHistory = ""

            searchHistory = bufferedReader.readText()

            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("readSearchHistory", searchHistory)
        } catch (e: Exception) {
            reactApplicationContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("readSearchHistory", "")
        }
    }
}
