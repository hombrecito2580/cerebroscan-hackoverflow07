package com.hombrecito2580.cerebroscan.home.data

import android.content.Context
import org.json.JSONObject
import java.io.IOException

class DiseaseDetailsManager(private val context: Context) {

    // Function to read JSON data from assets folder
    private fun loadJSONFromAsset(fileName: String): String? {
        var json: String? = null
        try {
            val inputStream = context.assets.open(fileName)
            json = inputStream.bufferedReader().use { it.readText() }
        } catch (ex: IOException) {
            ex.printStackTrace()
        }
        return json
    }

    // Function to retrieve symptoms of a particular disease
    fun getSymptoms(diseaseName: String): List<String>? {
        val json = loadJSONFromAsset("diseases.json") ?: return null
        val jsonObject = JSONObject(json)
        val diseaseDetails = jsonObject.optJSONObject(diseaseName) ?: return null
        val symptomsArray = diseaseDetails.optJSONArray("symptoms") ?: return null
        return (0 until symptomsArray.length()).map {
            symptomsArray.getJSONObject(it).getString("first") + " - " + symptomsArray.getJSONObject(it).getString("second")
        }
    }

    // Function to retrieve cures of a particular disease
    fun getCures(diseaseName: String): List<String>? {
        val json = loadJSONFromAsset("diseases.json") ?: return null
        val jsonObject = JSONObject(json)
        val diseaseDetails = jsonObject.optJSONObject(diseaseName) ?: return null
        val curesArray = diseaseDetails.optJSONArray("cures") ?: return null
        return (0 until curesArray.length()).map {
            curesArray.getJSONObject(it).getString("first") + " - " + curesArray.getJSONObject(it).getString("second")
        }
    }

    // Function to retrieve precautions of a particular disease
    fun getPrecautions(diseaseName: String): List<String>? {
        val json = loadJSONFromAsset("diseases.json") ?: return null
        val jsonObject = JSONObject(json)
        val diseaseDetails = jsonObject.optJSONObject(diseaseName) ?: return null
        val precautionsArray = diseaseDetails.optJSONArray("prevention") ?: return null
        return (0 until precautionsArray.length()).map {
            precautionsArray.getJSONObject(it).getString("second")
        }
    }
}