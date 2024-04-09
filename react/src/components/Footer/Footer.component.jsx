import { Fragment } from "react";
import "./footer.styles.css";
import Card from "./cards/cardFooter.component"

const Footer = () => {
  return (
    <Fragment>
      <div style={{ height: "40vh" }} className="row" >
        <Card/>
      </div>
    </Fragment>
  );
};

export default Footer;
