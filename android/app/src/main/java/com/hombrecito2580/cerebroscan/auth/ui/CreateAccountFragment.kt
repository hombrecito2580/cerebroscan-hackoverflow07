package com.hombrecito2580.cerebroscan.auth.ui

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.hombrecito2580.cerebroscan.home.ui.MainActivity
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthApiClient
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthService
import com.hombrecito2580.cerebroscan.auth.retrofit.SignUpRequest
import com.hombrecito2580.cerebroscan.auth.retrofit.SignUpResponse
import com.hombrecito2580.cerebroscan.databinding.FragmentCreateAccountBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Response
import retrofit2.Retrofit

class CreateAccountFragment : Fragment() {
    private val args: CreateAccountFragmentArgs by navArgs()
    private var email = ""

    private var _binding: FragmentCreateAccountBinding? = null
    private val binding get() = _binding!!

    private lateinit var dialog: Dialog

    private lateinit var authService: AuthService

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCreateAccountBinding.inflate(inflater, container, false)

        dialog = Dialog(requireActivity())
        dialog.setContentView(R.layout.progress_bar)
        dialog.setCancelable(false)
        if (dialog.window != null) {
            dialog.window!!.setBackgroundDrawable(ColorDrawable(0))
        }

        val retrofit: Retrofit = AuthApiClient.retrofit
        authService = retrofit.create(AuthService::class.java)

        return binding.root
    }

    @SuppressLint("SetTextI18n")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        email = args.email

        binding.tvCreatePassword.text = "Enter password for\n$email"

        binding.btnContinue.setOnClickListener {
            val password = binding.etPassword.text.toString().trim()
            val confirmPassword = binding.etConfirmPassword.text.toString().trim()
            val name = binding.etName.text.toString().trim()

            if(validateInputs(password, confirmPassword, name) && validatePassword(password, confirmPassword)) {
                createAccountAndRedirect(email, password, name)
            }
        }

        binding.floatingActionButton.setOnClickListener {
            findNavController().popBackStack()
        }
    }

    private fun createAccountAndRedirect(email: String, password: String, name: String) {
        dialog.show()

        CoroutineScope(Dispatchers.Main).launch {
            try {
                val response = signUpUser(email, password)
                if (response?.isSuccessful == true) {
                    val signUpResponse = response.body()
                    signUpResponse?.let {
                        // Handle successful sign up
                        Toast.makeText(context, "Sign up successful", Toast.LENGTH_SHORT).show()
                        // Save token to shared preferences
                        saveTokenToSharedPreferences(signUpResponse.token)
                        // Redirect to appropriate screen
                        startActivity(Intent(requireContext(), MainActivity::class.java))
                        activity?.finish()
                        return@launch
                    }
                } else {
                    // Handle non-successful response
                    Toast.makeText(context, "Sign up failed: ${response?.message()}", Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                // Handle exceptions
                Toast.makeText(context, "An error occurred: ${e.message}", Toast.LENGTH_SHORT).show()
            } finally {
                dialog.dismiss() // Dismiss dialog in any case
            }
        }
    }

    private fun saveTokenToSharedPreferences(token: String) {
        val sharedPreferences = requireContext().getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString("token", token)
        editor.apply()
    }

    private suspend fun signUpUser(email: String, password: String): Response<SignUpResponse>? {
        return withContext(Dispatchers.IO) {
            try {
                val request = SignUpRequest(email, password)
                authService.signUp(request)
            } catch (e: Exception) {
                // Handle exceptions
                withContext(Dispatchers.Main) {
                    Toast.makeText(context, "An error occurred during sign-up: ${e.message}", Toast.LENGTH_SHORT).show()
                }
                null
            }
        }
    }

    private fun validateInputs(password: String, confirmPassword: String, name: String): Boolean {
        binding.etLtPassword.helperText = null
        binding.etLtConfirmPassword.helperText = null
        binding.etLtName.helperText = null

        if(name.isEmpty()) {
            binding.etLtName.helperText = "Please enter your name"
            return false
        }
        if(password.isEmpty()) {
            binding.etLtPassword.helperText = "Please enter a password"
            return false
        }
        if(confirmPassword.isEmpty()) {
            binding.etLtConfirmPassword.helperText = "Please confirm the password"
            return false
        }
        return true
    }

    private fun validatePassword(password: String, confirmPassword: String): Boolean {
        if(password.length < 6) {
            binding.etLtPassword.helperText = "Password must contain at least 6 characters"
            binding.etLtConfirmPassword.helperText = null
            return false
        }
        if(password != confirmPassword) {
            binding.etLtPassword.helperText = ""
            binding.etLtConfirmPassword.helperText = "Passwords do not match"
            return false
        }
        binding.etLtPassword.helperText = ""
        binding.etLtConfirmPassword.helperText = ""
        return true
    }
}