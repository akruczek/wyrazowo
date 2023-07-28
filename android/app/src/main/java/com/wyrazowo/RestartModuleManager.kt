package com.wyrazowo

import android.content.Intent
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class RestartModuleManager(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RestartModule"
    }

    @ReactMethod
    fun restartApp(): Boolean {
        val packageManager: PackageManager = reactApplicationContext.getPackageManager()
        val intent = packageManager.getLaunchIntentForPackage(reactApplicationContext.getPackageName())
        val componentName = intent!!.component
        val mainIntent = Intent.makeRestartActivityTask(componentName)
        reactApplicationContext.startActivity(mainIntent)
        Runtime.getRuntime().exit(0)
        return true
    }
}
