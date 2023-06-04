package com.wyrazowo

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.IOException
import java.io.InputStreamReader
import java.io.OutputStream
import java.io.OutputStreamWriter

class FSActivity: AppCompatActivity() {
  private var dataToSave: String? = ""

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val intent = intent
    dataToSave = intent.getStringExtra("dataToSave")

    if (dataToSave != null) {
      val createIntent = Intent(Intent.ACTION_CREATE_DOCUMENT)
      createIntent.addCategory(Intent.CATEGORY_OPENABLE)
      createIntent.type = "text/plain"
      createIntent.putExtra(Intent.EXTRA_TITLE, "search_history" + ".txt")
      startActivityForResult(createIntent, WRITE_REQUEST_CODE)
    } else {
      val readIntent = Intent(Intent.ACTION_GET_CONTENT)
      readIntent.type = "text/plain"
      startActivityForResult(readIntent, 0)
    }
  }

  override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == WRITE_REQUEST_CODE) {
      when (resultCode) {
        RESULT_OK -> if (data != null && data.data != null) {
          writeInFile(data.data!!, dataToSave!!)
          finish()
        }
        RESULT_CANCELED -> {
          finish()
        }
      }
    } else if (data?.data !== null) {
      when (resultCode) {
        RESULT_OK -> {
          val stringBuilder = StringBuilder()

          contentResolver.openInputStream(data.data!!)?.use { inputStream ->
            BufferedReader(InputStreamReader(inputStream)).use { reader ->
              var line: String? = reader.readLine()
              while (line != null) {
                stringBuilder.append(line)
                line = reader.readLine()
              }
            }
          }

          val intent = Intent()
          intent.putExtra("readData", stringBuilder.toString())
          this.setResult(Activity.RESULT_OK, intent)
          finish()
        }
        RESULT_CANCELED -> {
          finish()
        }
      }
    } else {
      finish()
    }
  }

    private fun writeInFile(uri: Uri, text: String) {
      val outputStream: OutputStream?

      try {
        outputStream = contentResolver.openOutputStream(uri)
        val bufferWriter = BufferedWriter(OutputStreamWriter(outputStream))
        bufferWriter.write(text)
        bufferWriter.flush()
        bufferWriter.close()
      } catch (error: IOException) {
        error.printStackTrace()
      }
    }

    companion object {
      private const val WRITE_REQUEST_CODE = 101
    }
}
