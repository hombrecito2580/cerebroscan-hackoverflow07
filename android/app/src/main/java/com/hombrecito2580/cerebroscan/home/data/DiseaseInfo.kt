package com.hombrecito2580.cerebroscan.home.data

data class DiseaseInfo(
//    val symptoms: ArrayList<Symptom>,
//    val cures: ArrayList<Symptom>,
//    val prevention: ArrayList<Symptom>,
    val disease: String
)

data class TestResult(
    val diseaseInfo: DiseaseInfo
)