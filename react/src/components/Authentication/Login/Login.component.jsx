import { Fragment, useEffect, useState, useContext } from "react";
import "./Login.styles.css";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import cardImage1 from "../../assets/img/edited.png";
import PseudoNavbar from "../PseudoNavbar/pseudonavbar.component";

const Login = () => {
  //context settings
  const { currentUser ,setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [disable, setDisable] = useState("disabled");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState({
    display: "none",
    msg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  useEffect(() => {
    if (userData.username == "" || userData.password == "")
      setDisable("disabled");
    else setDisable("");
  }, [userData]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "https://dermi-check-server-i2ys.onrender.com/api/login",
        userData,
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.error) throw new Error("Wrong username or password");
      else {
        setCurrentUser(response.data.user);
        navigate("/");
      }
    } catch (e) {
      setErr({ display: "flex", msg: e.message });
    }
  };

  return (
    <Fragment>
      <PseudoNavbar/>
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
            class="extraFlow col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#1bc0a4" }}
          >
            <div class="featured-image mb-3">
              <img
                src={cardImage1}
                class="img-fluid"
                style={{ width: "250px" }}
              />
            </div>
            <p
              class="text-white fs-2"
              style={{
                fontFamily: "Courier New, Courier, monospace",
                fontWeight: 600,
              }}
            >
              Be Verified
            </p>
            <small
              class="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              Join experienced Designers on this platform.
            </small>
          </div>

          <div class="col-md-6 right-box">
            <div
              className={`alert alert-danger`}
              style={{
                fontSize: "10px",
                padding: "6px",
                margin: "8px 0px",
                display: err.display,
              }}
              role="alert"
            >
              {err.msg}
            </div>
            <div class="row align-items-center">
              <div class="header-text mb-4">
                <h2>Hello,Again</h2>
                <p>We are happy to have you back.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Email address"
                  />
                </div>
                <div class="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    class="form-control form-control-lg bg-light fs-6"
                    placeholder="Password"
                  />
                </div>
                <div class="input-group mb-3">
                  <button
                    class={`btn btn-lg w-100 fs-6 ${disable}`}
                    style={{backgroundColor : "#10c3a5" , color : "white"}}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div class="row">
                <small>
                  Don't have account? <a href="/SignUp">Sign Up</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      ;
    </Fragment>
  );
};

export default Login;
