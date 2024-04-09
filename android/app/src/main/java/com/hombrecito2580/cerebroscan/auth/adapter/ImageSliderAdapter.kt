package com.hombrecito2580.cerebroscan.auth.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.hombrecito2580.cerebroscan.R

class ImageSliderAdapter(private val images: ArrayList<Int>, private val viewPager2: ViewPager2): RecyclerView.Adapter<ImageSliderAdapter.SliderViewHolder>() {

    inner class SliderViewHolder(itemView: View): RecyclerView.ViewHolder(itemView) {
        val imageView: ImageView = itemView.findViewById(R.id.ivImage)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SliderViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.layout_slider, parent, false)
        return SliderViewHolder(view)
    }

    override fun getItemCount(): Int {
        return images.size
    }

    override fun onBindViewHolder(holder: SliderViewHolder, position: Int) {
        val currentImage = images[position]
        holder.imageView.setImageResource(currentImage)

        if (position == images.size - 1) {
            viewPager2.setCurrentItem(0, true)
        }
    }
}