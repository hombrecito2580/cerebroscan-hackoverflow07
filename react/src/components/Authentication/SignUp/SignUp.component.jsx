import { Fragment, useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import "./SignUp.styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cardImage1 from "../../assets/img/edited.png";
import { motion } from "framer-motion";
import PseudoNavbar from "../PseudoNavbar/pseudonavbar.component";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [isSame, setIsSame] = useState({
    msg: "",
    color: "",
    display: "none",
    valid: false,
  });
  const [isHandleAvail, setIsHandleAvail] = useState({
    msg: "",
    color: "",
    display: "",
    valid: false,
  });
  const [btn, setBtn] = useState("disabled");

  const validateUserName = async (username) => {
    if (username.includes(" ")) return 3;
    const isThere = await axios({
      method: "post",
      url: "https://dermi-check-server-i2ys.onrender.com/api/checkUser",
      data: {
        username: username,
      },
    });
    // console.log(isThere.data)
    return isThere.data.isAvail;
  };
  useEffect(() => {
    if (userData.username == "") setIsHandleAvail({ display: "none" });
    else {
      validateUserName(userData.username).then((e) => {
        if (e == 3)
          setIsHandleAvail({
            msg: "No spaces ",
            display: "flex",
            color: "danger",
          });
        else if (e)
          setIsHandleAvail({
            msg: "Username Available",
            display: "flex",
            color: "success",
            valid: true,
          });
        else
          setIsHandleAvail({
            msg: "Username unavailable",
            display: "flex",
            color: "danger",
          });
      });
    }
    if (userData.password == "") setIsSame({ display: "none" });
    else if (userData.password != userData.rePassword) {
      setIsSame({
        msg: "Passwords Dont Match",
        color: "danger",
        display: "flex",
      });
    } else
      setIsSame({
        msg: "Passwords Do Match",
        color: "success",
        display: "flex",
        valid: true,
      });
  }, [userData]);

  useEffect(() => {
    if (isSame.valid == 1 && isHandleAvail.valid == 1) setBtn("");
  }, [isSame, isHandleAvail]);

  //Debouncing for username
  const debouncedSave = useCallback(
    debounce((nextValue) => setUserData(nextValue), 1000),
    []
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    // if(name == "username"){
    //   debouncedSave(value);
    // }else{
    setUserData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
    // }
  };

  const onsubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(userData);
      const response = await axios.post(
        "https://dermi-check-server-i2ys.onrender.com/api/register",
        userData,
        { withCredentials: true }
      );
      navigate("/");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <PseudoNavbar/>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        initial={{ scale: 0 }}
        animate={{  scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 2,
        }}
        class="container d-flex justify-content-center align-items-center min-vh-100"
      >
        <div
          style={{
            boxShadow:
              "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;",
            backdropFilter: " blur(10px)",
            backgroundColor: "transparent",
          }}
          class="row border rounded-5 p-3 shadow box-area"
          
        >
          <div
            className="extraFlow  col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#1bc0a4" }}
          >
            <div className="featured-image mb-3">
              <img
                src={cardImage1}
                className="img-fluid"
                style={{ width: "250px" }}
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily: "Courier New, Courier, monospace",
                fontWeight: 600,
              }}
            >
              Be Verified
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Hello</h2>
                <p>Join Our Community by registering Now!!!</p>
              </div>
              <form onSubmit={onsubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    onChange={onChange}
                    className="form-control field form-control-lg bg-light fs-6"
                    placeholder="Username"
                  />
                </div>
                <div
                  className={`alert alert-${isHandleAvail.color} mb-3`}
                  style={{
                    fontSize: "10px",
                    padding: "6px",
                    margin: "5px 0px",
                    display: isHandleAvail.display,
                  }}
                  role="alert"
                >
                  {isHandleAvail.msg}
                </div>
                <div className="input-group mt-3">
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    className="form-control field form-control-lg bg-light fs-6"
                    placeholder="Password"
                  />
                  <div className="line"></div>
                </div>
                <div className="input-group mb-2 mt-2">
                  <input
                    name="rePassword"
                    onChange={onChange}
                    type="password"
                    className="form-control field form-control-lg bg-light fs-6"
                    placeholder="Re-Enter Password"
                  />
                </div>
                <div
                  className={`alert alert-${isSame.color}`}
                  style={{
                    fontSize: "10px",
                    padding: "6px",
                    margin: "8px 0px",
                    display: isSame.display,
                  }}
                  role="alert"
                >
                  {isSame.msg}
                </div>
                <div className="input-group mb-3">
                  <button
                    type="submit"
                    className={`btn btn-lg w-100 fs-6 ${btn}`}
                    style={{backgroundColor : "#10c3a5" , color : "white"}}
                  >
                    SignUp
                  </button>
                </div>
              </form>
              <div className="row">
                <small>
                  Already have an account? <a href="/Login">Login</a>
                </small>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
      ;
    </Fragment>
  );
};

export default SignUp;
