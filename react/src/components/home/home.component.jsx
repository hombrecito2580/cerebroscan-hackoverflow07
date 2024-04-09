import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import "./home.styles.css";
import photo from "../assets/img/edited.png";
import cardImage1 from "../assets/img/cards1.png";
import cardImage2 from "../assets/img/cards2.png";
import cardImage3 from "../assets/img/cards3.png";
import cardImage4 from "../assets/img/cards4.png";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Reveal from "../animation/Reveal.component";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.component";

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [screen, setScreen] = useState("h");
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(
        "https://dermi-check-server-i2ys.onrender.com/api/home",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data.data.user) {
        setCurrentUser(data.data.user);
      } else {
        setCurrentUser(null);
        setScreen("No user");
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <div class="landing-page">
        <div class="content">
          <div class="container">
            <Reveal>
              <div class="info" style={{ width: "75%" }}>
                <h1>CerebroScan</h1>
                <p>
                  Discover a revolutionary leap in healthcare with our
                  cutting-edge brain tumor detection app. Seamlessly analyze
                  brain MRI images using state-of-the-art image recognition
                  technology for swift and accurate diagnoses. From common tumor
                  types to complex anomalies, our app empowers users to identify
                  and understand brain tumors with precision. Take charge of
                  your health journey confidently as we usher in a future where
                  detecting brain tumors is intuitive, reliable, and
                  personalized. Welcome to a new era of healthcare innovation.
                </p>
                <button
                  style={{ backgroundColor: "#10c3a5", color: "white" }}
                  onClick={() => navigate("/check")}
                >
                  Get Started
                </button>
              </div>
            </Reveal>
            <Reveal>
              <div class="image">
                {/* <img src="https://i.postimg.cc/65QxYYzh/001234.png" /> */}
                <img src={photo} className="img" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="grids-container" style={{ margin: "10vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage1}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">
                      How CerebroScan Helps ?
                    </h5>
                    <p class="card-text text-center">
                      Get immediate, in-depth insights into your brain health
                      with our intuitive brain tumor detection app. Simply
                      upload brain MRI images, and our advanced AI algorithms
                      will swiftly and accurately analyze them, providing
                      comprehensive diagnoses. Empower yourself with crucial
                      information about potential brain tumors, enabling
                      proactive management of your neurological well-being.
                      Experience a seamless and informative journey towards
                      better brain health with our innovative application.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage2}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">Accurate Results !</h5>
                    <p class="card-text text-center">
                      Count on our state-of-the-art AI technology for accurate
                      and dependable results. Our advanced algorithms
                      meticulously analyze images with exceptional precision,
                      guaranteeing trustworthy information regarding your skin
                      concerns. Embrace the power of AI-driven diagnostics for a
                      more informed and efficient approach to managing your skin
                      health.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage3}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">
                      Get Help From Doctors
                    </h5>
                    <p class="card-text text-center">
                      Count on our cutting-edge AI technology for meticulous and
                      dependable outcomes. Our advanced algorithms meticulously
                      analyze images with unparalleled precision, guaranteeing
                      you receive dependable information regarding your brain
                      health concerns. Embrace the efficacy of AI-driven
                      diagnostics for a more informed and effective strategy in
                      handling your neurological well-being.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage4}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">Get Medication </h5>
                    <p class="card-text text-center">
                      Optimize your treatment journey with seamless access to
                      medication recommendations within our app. Receive
                      personalized prescriptions and expert guidance on
                      over-the-counter remedies curated specifically for your
                      unique skin condition. Eliminate guesswork and uncertainty
                      by leveraging our app's tailored solutions for your skin
                      health needs, ensuring a smoother and more effective
                      treatment process.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default HomePage;
