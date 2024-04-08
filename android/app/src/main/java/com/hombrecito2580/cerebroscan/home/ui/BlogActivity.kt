package com.hombrecito2580.cerebroscan.home.ui

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.bumptech.glide.Glide
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.databinding.ActivityBlogBinding

class BlogActivity : AppCompatActivity() {

    private lateinit var binding: ActivityBlogBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityBlogBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.tvTitle.text=intent.getStringExtra("title")
        binding.para1.text=intent.getStringExtra("para1")
        binding.para2.text=intent.getStringExtra("para2")

        val uri=intent.getStringExtra("img")
        Glide.with(this).load(uri).into(binding.img)
    }
}