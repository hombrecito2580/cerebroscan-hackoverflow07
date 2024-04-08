package com.hombrecito2580.cerebroscan.home.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.hombrecito2580.cerebroscan.R
import com.hombrecito2580.cerebroscan.home.ui.BlogActivity
import com.hombrecito2580.cerebroscan.home.data.BlogData

class BlogAdapter(private val blogList: List<BlogData>, val context: Context): RecyclerView.Adapter<BlogAdapter.BlogViewHolder>() {

    inner class BlogViewHolder(v: View) : RecyclerView.ViewHolder(v){
        val title: TextView = v.findViewById(R.id.tvTitle)
        val img: ImageView = v.findViewById(R.id.ivImage)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BlogViewHolder {
        val inflater= LayoutInflater.from(context)
        val v= inflater.inflate(R.layout.blogtile,parent,false)
        return BlogViewHolder(v)
    }

    override fun getItemCount(): Int {
        return blogList.size
    }

    override fun onBindViewHolder(holder: BlogViewHolder, position: Int) {
        val newList = blogList[position]
        holder.title.text = newList.title
        Glide.with(context).load(newList.img).into(holder.img)
        holder.itemView.setOnClickListener{
            val intent = Intent(context, BlogActivity::class.java)
            intent.putExtra("title",newList.title)
            intent.putExtra("para1",newList.para1)
            intent.putExtra("para2",newList.para2)
            intent.putExtra("img",newList.img)
            context.startActivity(intent)
        }
    }

}