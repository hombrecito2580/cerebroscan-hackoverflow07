import { Fragment, useEffect, useState } from "react";
import Default from "./subTabs/Default.component";
import Loader from "./subTabs/Loader.component";
import ShowData from "./subTabs/Data.component";
import "./Tabs.styles.css"

const TabData = ({ title, info , load}) => {
  const [newTitle , setTitle] = useState(null)
  console.log("Error" , info)
  useEffect(() => {
    if(!info) setTitle(null);
    else{
      setTitle(title)
    }
  } , [info]);
  return (
    <Fragment>
      {
        (load) ? <div id="loader" ></div> : <div style={{display : "none"}}></div>
      }
      <h3 className="mx-4" style={{ display: "flex", justifyContent: "flex-start" }}>{newTitle}</h3>
      {info?.map((e) => {
        return (
          <>
            <div id={e.id} className="data-inside">
              <h5>{e.first}</h5>
              <p>{e.second}</p>
            </div>
          </>
        );
      })}
    </Fragment>
  );
};

export default TabData;
