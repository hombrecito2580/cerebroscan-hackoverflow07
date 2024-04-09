import { Fragment } from "react";

const ShowData = ({ data }) => {
  console.log(data);
  const { info, pr } = data;
  return (
    <Fragment>
      <div class="card" style={{ height: "100%", boxShadow: "none ", overflowY : "auto"}}>
        <div class="card-body" style={{ backgroundColor : "#bbe7d8"}}>
          <h5 class="card-title">Disease : {pr}</h5>
          <ul>
            {info.map((e) => {
              return (
                <div className="card-text" style={{display : "flex" , flexDirection : "column" , alignItems : "flex-start"}}>
                  <p class="d-inline-flex gap-1" style={{margin : "5px"}}>
                    <ul className="list-group list-group-item-action">
                      <li
                      // style={{width : "100%"}}
                      style={{backgroundColor : "#10c3a5" , color : "white"}}
                        class="text-decoration-none list-group-item "
                        data-bs-toggle="collapse"
                        href={`#${e.first[0]}-${e.id}`}
                        role="button"
                        aria-expanded="false"
                        aria-controls={`${e.first[0]}-${e.id}`}
                      >
                        {e.first}
                      </li>
                    </ul>
                  </p>
                  <div class="collapse" id={`${e.first[0]}-${e.id}`}>
                    <div class="card card-body">{e.second}</div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ShowData;
