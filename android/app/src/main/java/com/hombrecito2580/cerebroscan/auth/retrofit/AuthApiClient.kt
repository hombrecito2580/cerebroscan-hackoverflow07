package com.hombrecito2580.cerebroscan.auth.retrofit

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.FileInputStream
import java.util.Properties

object AuthApiClient {
    private val envProperties = Properties().apply {
        val inputStream = FileInputStream("env.properties")
        load(inputStream)
    }

    private val BASE_URL = envProperties.getProperty("BASE_URL")

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}