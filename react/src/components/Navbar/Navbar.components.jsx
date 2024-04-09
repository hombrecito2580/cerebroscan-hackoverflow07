import "../Navbar/Navbar.styles.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import Logo from "../assets/img/Logo.png"

const NavBar = () => {
  const navigate = useNavigate();
  const {currentUser , setCurrentUser} = useContext(UserContext);
  const [authStateBtn , setAuthStateBtn] = useState({
    auth : "flex",
    profile : "none"
  });
  useEffect(() => {
    if(currentUser) setAuthStateBtn({auth : "none" , profile : "flex"});
    else setAuthStateBtn({auth : "flex" , profile : "none"});
  } , [currentUser])
  const Logout = async () => {
    try{
      console.log(currentUser)
      const response = await axios.get("https://dermi-check-server-i2ys.onrender.com/api/logout", {withCredentials :true} );
      navigate("/")
      setCurrentUser(null);

    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor : "transparent" , justifyContent : "space-between"}}>
        <div className="container">
          <a href="/">
            <img style={{width : "60px"}}  src={Logo} alt="" />
            </a>
          <a className="navbar-brand fs-4" href="#">
            CerebroScan
          </a>
          <button
            className="navbar-toggler shadow-none border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start sidebar"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header text-dark border-bottom">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                CerebroScan
              </h5>
              <button
                type="button"
                className="btn-close btn-close-dark shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column flex-lg-row p-4">
              <ul className="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/check">
                    Test
                  </a>
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center flex-column flex-lg-row gap-3">
                <button
                  href="/Login"
                  onClick={() => {navigate('/Login')}}
                  className={`btn-custom text-decoration-none px-3 py-2 ${authStateBtn.auth}`}
                  style={{
                    display : authStateBtn.auth , 
                  }}
                  >
                  SignIn
                </button>
                <button
                  href="/SignUp"
                  onClick={() => {navigate('/SignUp')}}
                  className={`btn-custom text-decoration-none px-3 py-2 ${authStateBtn.auth}`}
                  style={{
                    display : authStateBtn.auth,
                  }}
                  >
                  SignUp
                </button>
                <button
                  href="/Profile"
                  className={`btn-custom text-decoration-none px-3 py-2 ${authStateBtn.profile}`}
                    style={{
                      display : authStateBtn.profile,
                    }}
                >
                  Profile
                </button>
                <button
                  href="/home"
                  className={`btn-custom text-decoration-none px-3 py-2 ${authStateBtn.profile}`}
                  onClick={Logout}
                    style={{
                      display : authStateBtn.profile,
                    }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
