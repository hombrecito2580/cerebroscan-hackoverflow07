package com.hombrecito2580.cerebroscan.auth.ui

import android.app.Dialog
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.fragment.findNavController
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthApiClient
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthService
import com.hombrecito2580.cerebroscan.auth.retrofit.CheckAccountRequest
import com.hombrecito2580.cerebroscan.databinding.FragmentLoginWithEmailBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import retrofit2.Retrofit
import java.util.regex.Pattern

class LoginWithEmailFragment : Fragment() {
    private var _binding: FragmentLoginWithEmailBinding? = null
    private val binding get() = _binding!!

    private lateinit var dialog: Dialog

    private lateinit var authService: AuthService

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentLoginWithEmailBinding.inflate(inflater, container, false)

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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.loginContinueButton.setOnClickListener {
            val email = binding.loginEMailEditText.text.toString().trim()
            if (isValid(email)) {
                redirect(email)
            }
        }

    }

    private fun isValid(email: String): Boolean {
        if (email.isEmpty()) {
            binding.loginEMailEditTextLayout.helperText = "Please enter the Email"
            return false
        }

        val pattern = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}\$")
        val matcher = pattern.matcher(email)

        return if (matcher.matches()) {
            binding.loginEMailEditTextLayout.helperText = null
            true
        } else {
            binding.loginEMailEditTextLayout.helperText = "Invalid Email"
            false
        }
    }

    private fun redirect(email: String) {
        dialog.show()

        CoroutineScope(Dispatchers.Main).launch {
            try {
                val accountExists = checkAccountExists(email)

                when (accountExists) {
                    1 -> {
                        val direction = LoginWithEmailFragmentDirections.actionLoginWithEmailFragmentToLoginPasswordFragment(email)
                        findNavController().navigate(direction)
                    }
                    0 -> {
                        val direction = LoginWithEmailFragmentDirections.actionLoginWithEmailFragmentToCreateAccountFragment(email)
                        findNavController().navigate(direction)
                    }
                    else -> {
                        // Unexpected response, show a generic error message
                        Toast.makeText(context, "Unexpected response from server", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                // Handle exceptions
                Toast.makeText(context, "An error occurred: ${e.message}", Toast.LENGTH_SHORT).show()
            } finally {
                dialog.dismiss() // Dismiss dialog in any case
            }
        }
    }

    private suspend fun checkAccountExists(email: String): Int {
        return withContext(Dispatchers.IO) {
            try {
                val request = CheckAccountRequest(email)
                val response = authService.checkAccount(request)

                if (response.isSuccessful) {
                    val checkAccountResponse = response.body()
                    if (checkAccountResponse != null) {
                        if (checkAccountResponse.isAvail) 0
                        else 1
                    } else {
                        // Invalid response from server
                        -1
                    }
                } else {
                    // Handle non-successful response
                    -1
                }
            } catch (e: Exception) {
                // Handle exceptions
                -1
            }
        }
    }

}