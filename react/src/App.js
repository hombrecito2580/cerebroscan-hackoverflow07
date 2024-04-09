import "./App.css";
import NavBar from "./components/Navbar/Navbar.components";
import { Route, Routes } from "react-router-dom";
import Hello from "./components/hello";
import Login from "./components/Authentication/Login/Login.component";
import SignUp from "./components/Authentication/SignUp/SignUp.component";
import HomePage from "./components/home/home.component";
import ModelPage from "./components/model/model.component";
import Community from "./components/community/community.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar/>}>
        <Route path="/" element={<HomePage/>} ></Route>
        <Route path="/check" element={<ModelPage/>} ></Route>
        <Route path="/shop" element={<Hello />}></Route>
        <Route path="/Community" element={<Community/>}></Route>
        <Route path="/Hello" element={<Hello />}></Route>
      </Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
