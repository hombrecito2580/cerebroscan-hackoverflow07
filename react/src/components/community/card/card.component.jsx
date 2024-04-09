import { Fragment, useContext, useEffect, useState } from "react";
import "./card.styles.css";
import { motion, useAnimation } from "framer-motion";

const BlogCard = ({ data }) => {
  console.log(data.title);
  return (
    <Fragment>
      <div class="card col-4 mx-4" style={{height : "20vh"}}>
        <img src={data.img} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{data.title}</h5>
          <p class="card-text">
            <p>{data.para1}</p>
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogCard;
