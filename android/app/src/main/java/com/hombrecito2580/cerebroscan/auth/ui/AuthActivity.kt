package com.hombrecito2580.cerebroscan.auth.ui

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.auth.adapter.ImageSliderAdapter
import com.hombrecito2580.cerebroscan.databinding.ActivityAuthBinding
import me.relex.circleindicator.CircleIndicator3

class AuthActivity : AppCompatActivity() {
    private lateinit var binding: ActivityAuthBinding

    private lateinit var handler: Handler
    private lateinit var images: ArrayList<Int>
    private lateinit var viewPager: ViewPager2
    private lateinit var indicator: CircleIndicator3

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        handler = Handler(Looper.myLooper()!!)

        images = ArrayList()
        images.add(R.drawable.slide1)
        images.add(R.drawable.slide2)
        images.add(R.drawable.slide3)

        viewPager = binding.vpImages
        val adapter = ImageSliderAdapter(images, viewPager)
        viewPager.adapter = adapter
        viewPager.offscreenPageLimit = 3
        viewPager.getChildAt(0).overScrollMode = RecyclerView.OVER_SCROLL_NEVER

        indicator = findViewById(R.id.indicator)
        indicator.setViewPager(viewPager)

        viewPager.registerOnPageChangeCallback(object : ViewPager2.OnPageChangeCallback() {
            override fun onPageSelected(position: Int) {
                super.onPageSelected(position)
                handler.removeCallbacks(runnable)
                handler.postDelayed(runnable, 2500)
            }
        })
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(runnable)
    }

    override fun onResume() {
        super.onResume()
        handler.postDelayed(runnable, 2500)
    }

    private val runnable = Runnable {
        if (viewPager.currentItem == images.size - 1) {
            viewPager.currentItem = 0
        } else {
            viewPager.currentItem += 1
        }

    }
}