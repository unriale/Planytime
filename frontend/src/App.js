import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<PrivateRoute Component={<Home/>} />} />
        <Route path="/signin" element={<PrivateRoute Component={<SigninPage/>} />} />
        <Route path="/signup" element={<PrivateRoute Component={<SignupPage/>} />} />
      </Routes>
    </Router>
  );
}

export default App;
