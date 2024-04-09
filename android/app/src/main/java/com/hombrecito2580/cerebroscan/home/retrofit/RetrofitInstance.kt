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
        .connectTimeout(25, TimeUnit.SECONDS)
        .readTimeout(25, TimeUnit.SECONDS)
        .writeTimeout(25, TimeUnit.SECONDS)
        .build()

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("https://dermi-check-server-i2ys.onrender.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .client(client)
            .build()
    }
}