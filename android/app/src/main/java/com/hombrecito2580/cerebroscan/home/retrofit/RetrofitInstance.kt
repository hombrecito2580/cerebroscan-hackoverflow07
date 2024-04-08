package com.hombrecito2580.cerebroscan.home.retrofit

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitInstance {
//    private val envProperties = Properties().apply {
//        val inputStream = FileInputStream("env.properties")
//        load(inputStream)
//    }

//    private val BASE_URL = envProperties.getProperty("BASE_URL")

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("https://example.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }
}