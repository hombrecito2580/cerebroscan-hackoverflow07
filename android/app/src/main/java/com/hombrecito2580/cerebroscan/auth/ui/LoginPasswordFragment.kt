package com.hombrecito2580.cerebroscan.auth.ui

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Context
import android.content.Intent
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.hombrecito2580.cerebroscan.home.ui.MainActivity
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthApiClient
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthService
import com.hombrecito2580.cerebroscan.auth.retrofit.LoginRequest
import com.hombrecito2580.cerebroscan.databinding.FragmentLoginPasswordBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit

class LoginPasswordFragment : Fragment() {
    private val args: LoginPasswordFragmentArgs by navArgs()
    private var email = ""

    private var _binding: FragmentLoginPasswordBinding? = null
    private val binding get() = _binding!!

    private lateinit var dialog: Dialog

    private lateinit var authService: AuthService

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginPasswordBinding.inflate(inflater, container, false)

        dialog = Dialog(requireActivity())
        dialog.setContentView(R.layout.progress_bar)
        dialog.setCancelable(false)
        val layoutParams = WindowManager.LayoutParams().apply {
            width = WindowManager.LayoutParams.MATCH_PARENT
            height = WindowManager.LayoutParams.MATCH_PARENT
        }
        dialog.window?.attributes = layoutParams
        if (dialog.window != null) {
            dialog.window!!.setBackgroundDrawable(
                ColorDrawable(
                    ContextCompat.getColor(
                        requireContext(),
                        R.color.white
                    )
                )
            )
        }
        // ColorDrawable(0)

        val retrofit: Retrofit = AuthApiClient.retrofit
        authService = retrofit.create(AuthService::class.java)

        return binding.root
    }

    @SuppressLint("SetTextI18n")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        email = args.email

        binding.tvEnterPassword.text = " Enter password for \n $email "

        binding.btnContinue.setOnClickListener {
            val password = binding.etPassword.text.toString()

            if (validatePassword(password)) {
                loginAndRedirect(email, password)
            }
        }

        binding.btnForgotPassword.setOnClickListener {
//            findNavController().navigate(R.id.action_loginPasswordFragment_to_forgotPasswordFragment)
        }

        binding.floatingActionButton.setOnClickListener {
            findNavController().popBackStack()
        }
    }

    private fun loginAndRedirect(email: String, password: String) {
        dialog.show()

        CoroutineScope(Dispatchers.Main).launch {
            try {
                val request = LoginRequest(email, password)
                val response = authService.login(request)
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    loginResponse?.let {
                        // Handle successful login
                        saveCredentialsToSharedPreferences(email, password)
                        startActivity(Intent(requireContext(), MainActivity::class.java))
                        dialog.dismiss()
                        activity?.finish()
                        return@launch  // Exit the coroutine on successful login
                    }
                } else {
                    // Handle unsuccessful login response
                    Toast.makeText(
                        requireContext(),
                        "Login failed: ${response.message()}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            } catch (e: Exception) {
                // Handle exception
                Toast.makeText(
                    requireContext(),
                    "An error occurred: ${e.message}",
                    Toast.LENGTH_SHORT
                ).show()
            } finally {
                dialog.dismiss()  // Dismiss the dialog in case of any outcome
            }
        }
    }

    private fun saveCredentialsToSharedPreferences(email: String, password: String) {
        val sharedPreferences =
            requireContext().getSharedPreferences("your_preferences_name", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putString("email", email)
        editor.putString("password", password)
        editor.apply()
    }


    private fun validatePassword(password: String): Boolean {
        binding.etLtPassword.helperText = null

        if (password.isEmpty()) {
            binding.etLtPassword.helperText = "Please enter the password"
            return false
        }
        return true
    }
}