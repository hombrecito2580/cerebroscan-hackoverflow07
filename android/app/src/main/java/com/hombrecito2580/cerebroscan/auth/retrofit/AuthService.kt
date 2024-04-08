package com.hombrecito2580.cerebroscan.auth.retrofit

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.Query

interface AuthService {
    @POST("/api/checkUser")
    suspend fun checkAccount(@Body request: CheckAccountRequest): Response<CheckAccountResponse>

    @POST("/api/register-mobile")
    suspend fun signUp(
        @Body request: SignUpRequest,
        @Query("source") source: String = "mobile"
    ): Response<SignUpResponse>

    @POST("/api/login-mobile")
    suspend fun login(
        @Body request: LoginRequest,
        @Query("source") source: String = "mobile"
    ): Response<LoginResponse>
}