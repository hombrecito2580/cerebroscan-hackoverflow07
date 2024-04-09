import BlogCard from "./card/card.component";
import "./community.styles.css";
import Reveal from "../animation/Reveal.component";
import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Community = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [allBlogs, setAllBlogs] = useState(null);
  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [currentUser]);
  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get("https://dermi-check-server-i2ys.onrender.com/api/blogs");
      console.log(data.data)
      setAllBlogs(data.data);
      // console.log("all" , allBlogs)
    };
    getData();
  }, []);

  return (
    <Fragment>
      <div
        className="row d-flex justify-content-center"
        style={{ marginRight: "0px" }}
      >
        {allBlogs?.map((e) => {
          return <BlogCard data={e} />;
        })}
      </div>
    </Fragment>
  );
};

export default Community;
