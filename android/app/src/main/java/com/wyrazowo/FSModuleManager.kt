package com.wyrazowo

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FSModuleManager(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "FSModule"
    }

    @ReactMethod
    fun saveSearchHistory(
            searchHistory: String,
    ): Any {
        Log.v("TAGK", searchHistory)
        return true
    }
}
