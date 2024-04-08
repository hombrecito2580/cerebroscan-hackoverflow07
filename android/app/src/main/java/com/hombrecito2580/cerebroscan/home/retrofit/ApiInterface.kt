package com.hombrecito2580.cerebroscan.home.retrofit

import com.hombrecito2580.cerebroscan.home.data.BlogData
import com.hombrecito2580.cerebroscan.home.data.DiseaseInfo
import com.hombrecito2580.cerebroscan.home.data.TestResult
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiInterface {
    @GET("/allBlogs")
    suspend fun getBlogs(): Response<BlogData>

    @Multipart
    @POST("/test")
    suspend fun getDisease(
        @Part image: MultipartBody.Part
    ): Response<TestResult>
}