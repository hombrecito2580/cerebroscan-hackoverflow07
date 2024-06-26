package com.hombrecito2580.cerebroscan.home.ui

import android.app.Activity
import android.app.Dialog
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.ColorDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.fragment.app.Fragment
import com.bumptech.glide.Glide
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.auth.retrofit.AuthApiClient
import com.hombrecito2580.cerebroscan.databinding.FragmentTestBinding
import com.hombrecito2580.cerebroscan.home.data.BlogData
import com.hombrecito2580.cerebroscan.home.data.DiseaseDetailsManager
import com.hombrecito2580.cerebroscan.home.retrofit.ApiInterface
import com.hombrecito2580.cerebroscan.home.retrofit.RetrofitInstance
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import retrofit2.Retrofit
import java.io.BufferedReader
import java.io.ByteArrayOutputStream
import java.io.InputStream
import java.io.InputStreamReader

class TestFragment : Fragment() {
    private var _binding: FragmentTestBinding? = null
    private val binding get() = _binding!!

    private var latestSelectedImageUri: Uri? = null
    private var latestSelectedImageBitmap: Bitmap? = null

    private lateinit var dialog: Dialog

    private lateinit var apiService: ApiInterface

    private val cameraLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                latestSelectedImageBitmap = result.data?.extras?.get("data") as Bitmap?
                latestSelectedImageUri = null
                updateImageView(latestSelectedImageBitmap)
            }
        }

    private val galleryLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_OK) {
                latestSelectedImageUri = result.data?.data
                val inputStream: InputStream? = context?.contentResolver?.openInputStream(
                    latestSelectedImageUri!!
                )
                latestSelectedImageBitmap = BitmapFactory.decodeStream(inputStream)
                updateImageView(latestSelectedImageBitmap)
            }
        }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentTestBinding.inflate(inflater, container, false)
        dialog = Dialog(requireActivity())
        dialog.setContentView(R.layout.progress_bar)
        dialog.setCancelable(false)
        if (dialog.window != null) {
            dialog.window!!.setBackgroundDrawable(ColorDrawable(0))
        }

        val retrofit: Retrofit = RetrofitInstance.retrofit
        apiService = retrofit.create(ApiInterface::class.java)

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)


        binding.image.setOnClickListener {
            showBottomSheet()
        }

        binding.btnUpload.setOnClickListener {
            if (validateImage()) {
                testImageFromBitmap()
            }
        }
    }

    private fun testImageFromBitmap() {
        dialog.show()

        binding.cvSymptoms.visibility = View.GONE
        binding.cvPreventions.visibility = View.GONE
        binding.tvResult.text = ""

        val byteArrayOutputStream = ByteArrayOutputStream()
        latestSelectedImageBitmap?.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val requestBody =
            byteArrayOutputStream.toByteArray().toRequestBody("image/png".toMediaTypeOrNull())

        // Create MultipartBody.Part
        val imagePart = MultipartBody.Part.createFormData("image", "my_image.png", requestBody)

        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Perform network operation in IO thread
                val response = apiService.getDisease(imagePart)

                if (response.isSuccessful) {
                    Log.d("TGA", "OK")
                    val disease = response.body()
                    withContext(Dispatchers.Main) {
                        // Show success message on the UI thread
//                        Toast.makeText(context, "Successful", Toast.LENGTH_SHORT).show()
                        // Navigate if needed
//                         val direction = TestFragmentDirections.actionTestFragmentToDiseaseFragment(
//                             disease!!.disease)
//                         findNavController().navigate(direction)


                        var diseaseName = response.body()?.diseaseInfo?.disease
                        binding.tvResult.text = response.body()?.diseaseInfo?.disease

                        if(diseaseName == null) {
                            Toast.makeText(context, "Unexpected Error Occured", Toast.LENGTH_SHORT).show()
                        }
                        else if (diseaseName != "No Tumor") {
                            diseaseName = diseaseName.trim()
                            binding.cvSymptoms.visibility = View.VISIBLE
                            binding.cvPreventions.visibility = View.VISIBLE

                            val diseaseDetailsManager = DiseaseDetailsManager(requireContext())

                            val symptoms = diseaseDetailsManager.getSymptoms(diseaseName)
                            Log.d("DISESASES!!!!", symptoms.toString())
                            symptoms?.let { symptomList ->
                                for (i in 0 until minOf(symptomList.size, 5)) {
                                    when (i) {
                                        0 -> binding.tvSymptom1.text = symptomList[i]
                                        1 -> binding.tvSymptom2.text = symptomList[i]
                                        2 -> binding.tvSymptom3.text = symptomList[i]
                                        3 -> binding.tvSymptom4.text = symptomList[i]
                                        4 -> binding.tvSymptom5.text = symptomList[i]
                                        // If you have more than 5 symptoms, you can handle them accordingly
                                    }
                                }
                            }

                            val cures = diseaseDetailsManager.getCures(diseaseName)
                            Log.d("DISESASES!!!!", cures.toString())
                            cures?.let { cureList ->
                                for (i in 0 until minOf(cureList.size, 5)) {
                                    when (i) {
                                        0 -> binding.tvPrevention1.text = cureList[i]
                                        1 -> binding.tvPrevention2.text = cureList[i]
                                        2 -> binding.tvPrevention3.text = cureList[i]
                                        3 -> binding.tvPrevention4.text = cureList[i]
                                        4 -> binding.tvPrevention5.text = cureList[i]
                                        // If you have more than 5 cures, you can handle them accordingly
                                    }
                                }
                            }
                        }
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        // Show error message on the UI thread
                        Toast.makeText(context, "Please try again...", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                // Handle exceptions
                withContext(Dispatchers.Main) {
                    // Show error message on the UI thread
                    Toast.makeText(context, "Something went wrong...", Toast.LENGTH_SHORT).show()
                    // Log the error
                    Log.d("TAGGGGGGGGG", e.message.toString())
                }
            } finally {
                withContext(Dispatchers.Main) {
                    // Dismiss dialog on the UI thread in any case
                    dialog.dismiss()
                }
            }
        }


    }

    private fun updateImageView(imageBitmap: Bitmap?) {
        if (imageBitmap != null) {
            Glide.with(this)
                .load(imageBitmap)
                .centerCrop()
                .into(binding.image)
        }
    }

    private fun updateImageView(imageUri: Uri?) {
        if (imageUri != null) {
            Glide.with(this)
                .load(imageUri)
                .centerCrop()
                .into(binding.image)
        }
    }

    private fun validateImage(): Boolean {
        var error: String? = null

        if (latestSelectedImageUri == null && latestSelectedImageBitmap == null) {
            error = "Please select an image."
        }

        if (error != null) {
            binding.tvIvError.visibility = View.VISIBLE
            binding.tvIvError.text = error
        } else {
            binding.tvIvError.visibility = View.INVISIBLE
        }

        return error == null
    }

    private fun showBottomSheet() {
        val bottomSheetView = layoutInflater.inflate(R.layout.bottomsheet, null)
        val dialog = BottomSheetDialog(requireContext())
        dialog.setContentView(bottomSheetView)

        val btnCamera = bottomSheetView.findViewById<ImageView>(R.id.camera)
        val btnGallery = bottomSheetView.findViewById<ImageView>(R.id.folder)

        btnCamera.setOnClickListener {
            openCamera()
            dialog.dismiss()
        }

        btnGallery.setOnClickListener {
            openGallery()
            dialog.dismiss()
        }

        dialog.show()
    }

    private fun openCamera() {
        val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        cameraLauncher.launch(cameraIntent)
    }

    private fun openGallery() {
        val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        galleryLauncher.launch(galleryIntent)
    }
}