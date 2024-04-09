import { Fragment, useContext, useEffect, useRef, useState } from "react";
import photo from "../assets/img/photo.png";
import axios from "axios";
import "./model.styles.css";
import Result from "../results/results.component";
import { diseaseContext } from "../../contexts/disease.context";
import jsonData from "../json/newData.json"

const ModelPage = () => {
  // const { disease, setDisease } = useContext(diseaseContext);
  const [disease, setDisease] = useState("Upload Your MRI to se reports");
  const [name, setName] = useState("Upload Your MRI to see Reports");
  const [image, setImage] = useState(null);
  const [btn, setBtn] = useState("disabled");
  const [load , setLoad] = useState(false)
  const inputRef = useRef(null);

  useEffect(() => {
    if (image) setBtn("");
    else setBtn("disabled");
  }, [image]);

  const handleClick = (e) => {
    inputRef.current.click();
    console.log("h");
  };

  const handleChange = (e) => {
    const data = e.target.files[0];
    console.log(data);
    setImage(data);
  };

  const removeImage = (e) => {
    console.log(inputRef.current.value);
    inputRef.current.value = null;
    setImage(null);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (image) {
        setDisease("Loading");
        console.log("imght");

        const response = await axios.post(
          "https://dermi-check-server-i2ys.onrender.com/test",
          { image: image },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Received");
        // console.log(response);
        const { diseaseInfo } = response.data;
        setDisease(jsonData[diseaseInfo.disease]);
        setName(diseaseInfo.disease)
        //error handling left
      } else throw new Error("Please Select Image to upload");
    } catch (e) {
      console.log(e);
      //Here create the error handler
    }
  };


  return (
    <Fragment>
      <div
        className="my-5 container container-model text-center"
        style={{
          backdropFilter: "blur(10px)",
          borderRadius: "50px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-4 col-12 mx-lg-2 left-container">
            <div
              className="box-container"
              style={{
                backdropFilter: "blur(10px)",
                height: "60vh",
                border: "2px dashed #ccc",
                borderRadius: "5px",
                flexDirection: "column",
              }}
            >
              <div className="insider" style={{ marginTop: "10vh" }}>
                <label
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                  }}
                  onClick={handleClick}
                  htmlFor="image-upload-input"
                  className="image-upload-label"
                >
                  Click to choose an image
                </label>
                <div style={{ cursor: "pointer" }}>
                  {image != null ? (
                    <img
                      onClick={handleClick}
                      src={URL.createObjectURL(image)}
                      alt=""
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                    />
                  ) : (
                    <img
                      onClick={handleClick}
                      src={photo}
                      alt=""
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                    />
                  )}
                  <form onSubmit={handleSubmit}>
                    <input
                      name="image"
                      onChange={handleChange}
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                    />
                    <div className="buttons">
                      <button
                        style={{ backgroundColor: "#10c3a5", color: "white" }}
                        type="submit"
                        className={`${btn} mx-2 my-2 btn`}
                      >
                        Upload
                      </button>
                      <div
                        style={{ backgroundColor: "#10c3a5", color: "white" }}
                        className={`${btn} mx-2 my-2 btn`}
                        onClick={removeImage}
                      >
                        remove
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-7 col-12 my-2 disease-display"
            style={{
              // boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",

              height: "50vh",
              borderRadius : "50px",
              overflowY: "hidden",
              overflowX: "hidden",
            }}
          >
            <Result data={disease} name={name} load={load}/>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ModelPage;
