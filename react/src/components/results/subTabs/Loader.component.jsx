import { Fragment } from "react";

const Loader = () => {
  return (
    <Fragment>
      <div class="card bg-transparent" style={{height : "100%"}} aria-hidden="true">
        {/* <img src="..." class="card-img-top" alt="" /> */}
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
          <a
            class="btn disabled placeholder col-6"
            aria-disabled="true"
            style={{backgroundColor : "#10c3a5" , color : "white"}}
          ></a>
        </div>
      </div>
    </Fragment>
  );
};

export default Loader;
