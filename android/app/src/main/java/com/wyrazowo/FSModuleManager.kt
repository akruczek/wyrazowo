package com.wyrazowo

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class FSModuleManager(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private var pendingReadPromise: Promise? = null

  override fun getName(): String {
    return "FSModule"
  }

  private val listener: BaseActivityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(
      activity: Activity,
      requestCode: Int,
      resultCode: Int,
      data: Intent?,
    ) {
      super.onActivityResult(activity, requestCode, resultCode, data)
      if (requestCode == READ_REQUEST_CODE) {
        val promise = pendingReadPromise
        pendingReadPromise = null

        if (promise == null) {
          return
        }

        if (resultCode == Activity.RESULT_OK && data != null) {
          promise.resolve(data.getStringExtra("readData") ?: "")
        } else {
          promise.reject("FS_READ_CANCELLED", "Search history import was cancelled")
        }
      }
    }
  }

  init {
    reactApplicationContext.addActivityEventListener(listener)
  }

  @ReactMethod
  fun saveSearchHistory(searchHistory: String, promise: Promise) {
    try {
      val createFileIntent = Intent(reactApplicationContext, FSActivity::class.java)
      createFileIntent.putExtra("dataToSave", searchHistory)
      createFileIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
      reactApplicationContext.startActivity(createFileIntent)
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject("FS_SAVE_ERROR", error.message, error)
    }
  }

  @ReactMethod
  fun readSearchHistory(promise: Promise) {
    try {
      pendingReadPromise = promise
      val readFileIntent = Intent(reactApplicationContext, FSActivity::class.java)
      readFileIntent.flags = Intent.FLAG_ACTIVITY_MULTIPLE_TASK
      reactApplicationContext.startActivityForResult(readFileIntent, READ_REQUEST_CODE, Bundle.EMPTY)
    } catch (error: Exception) {
      pendingReadPromise = null
      promise.reject("FS_READ_ERROR", error.message, error)
    }
  }

  companion object {
    private const val READ_REQUEST_CODE = 0
  }
}
