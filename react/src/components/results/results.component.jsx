import { Fragment, useContext, useEffect, useState } from "react";
import { diseaseContext } from "../../contexts/disease.context";
import TabData from "./Tabs.component";
import Loader from "./subTabs/Loader.component";
import "./results.styles.css";
import img1 from "../assets/img/cards1.png"

const Result = ({ data , name , load }) => {
  return (
    <Fragment>
      <div className="result-container">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <h3 className="my-2">{name}</h3>
            <div class="carousel-item active">
              <TabData title={"Cures"} load={load} info={data.cures} />
            </div>
            <div class="carousel-item">
              <TabData title={"Prevention"} load={load} info={data.prevention} />
              
            </div>
            <div class="carousel-item">
              <TabData title={"Symptoms"} load={load} info={data.symptoms} />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" style={{backgroundColor :"black" , borderRadius : "100px"}} aria-hidden="true"></span>
            <span class="visually-hidden"  >Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" style={{backgroundColor :"black" , borderRadius : "100px"}}  aria-hidden="true"></span>
            <span class="visually-hidden"  >Next</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Result;
