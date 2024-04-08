package com.hombrecito2580.cerebroscan.home.retrofit

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitInstance {
//    private val envProperties = Properties().apply {
//        val inputStream = FileInputStream("env.properties")
//        load(inputStream)
//    }
//
//    private val BASE_URL = envProperties.getProperty("BASE_URL")

    private val client = OkHttpClient.Builder()
        .connectTimeout(15, TimeUnit.SECONDS)
        .readTimeout(15, TimeUnit.SECONDS)
        .writeTimeout(15, TimeUnit.SECONDS)
        .build()

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("http://192.168.77.36:8000/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
    }
}