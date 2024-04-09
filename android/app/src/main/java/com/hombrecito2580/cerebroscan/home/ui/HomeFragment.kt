package com.hombrecito2580.cerebroscan.home.ui

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.hombrecito2580.cerebroscan.auth.ui.AuthActivity
import com.hombrecito2580.cerebroscan.databinding.FragmentHomeBinding
import com.hombrecito2580.cerebroscan.home.adapter.BlogAdapter
import com.hombrecito2580.cerebroscan.home.data.BlogData
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.BufferedReader
import java.io.InputStreamReader

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val blogs = mutableListOf<BlogData>()
    private lateinit var adapter: BlogAdapter
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout for this fragment
        _binding = FragmentHomeBinding.inflate(inflater, container, false)

        binding.blogRV.layoutManager = LinearLayoutManager(requireContext())
        adapter = BlogAdapter(blogs, requireContext())
        binding.blogRV.adapter = adapter

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        loadBlogData()

        val sharedPreferences: SharedPreferences = requireContext().getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
        val token = sharedPreferences.getString("token", "") ?: ""

        if(token.isNotEmpty()) {
            binding.btnLogin.visibility = View.GONE
            binding.btnLogout.visibility = View.VISIBLE
        }

        binding.btnLogin.setOnClickListener {
            startActivity(Intent(requireContext(), AuthActivity::class.java))
        }

        binding.btnLogout.setOnClickListener {
            val editor: SharedPreferences.Editor = sharedPreferences.edit()
            editor.remove("token")
            editor.apply()
            binding.btnLogin.visibility = View.VISIBLE
            binding.btnLogout.visibility = View.GONE
        }

//        var error: String? = null
//        CoroutineScope(Dispatchers.IO).launch {
//            try {
//                val inputStream: InputStream = requireContext().assets.open("blogs.json")
//                val size = inputStream.available()
//                val buffer = ByteArray(size)
//                inputStream.read(buffer)
//                inputStream.close()
//
//                val json = String(buffer, Charsets.UTF_8)
//                val gson = Gson()
////
//                val blog = gson.fromJson(json, Array<BlogData>::class.java)
//                blogs.addAll(blog)
//
////                // Notify adapter data change inside coroutine
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(requireContext(), blogs.size, Toast.LENGTH_SHORT).show()
//                    adapter = BlogAdapter(blogs, requireContext())
//
//                    adapter.notifyDataSetChanged()
//
//                }
//            } catch (e: Exception) {
//                // Handle exception
//                error = e.toString()
//                withContext(Dispatchers.Main) {
//                    Toast.makeText(requireContext(), "Failure", Toast.LENGTH_SHORT).show()
//                }
//            }
//        }

    }

    private fun loadBlogData() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Read JSON file from assets folder
                val inputStream = requireContext().assets.open("blogs.json")
                val reader = BufferedReader(InputStreamReader(inputStream))
                val json = reader.use { it.readText() }

                // Parse JSON using Gson
                val listType = object : TypeToken<List<BlogData>>() {}.type
                val blogList = Gson().fromJson<List<BlogData>>(json, listType)

                // Update UI with blog data
                withContext(Dispatchers.Main) {
                    blogs.clear()
                    blogs.addAll(blogList)
                    adapter.notifyDataSetChanged()
                }
            } catch (e: Exception) {
                // Handle exception
                e.printStackTrace()
            }
        }
    }

    override fun onResume() {
        super.onResume()

        val sharedPreferences: SharedPreferences = requireContext().getSharedPreferences("my_preferences", Context.MODE_PRIVATE)
        val token = sharedPreferences.getString("token", "") ?: ""

        if(token.isNotEmpty()) {
            binding.btnLogin.visibility = View.GONE
            binding.btnLogout.visibility = View.VISIBLE
        }
    }
}