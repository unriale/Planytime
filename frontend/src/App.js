import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import Stats from "./components/User/Stats/Stats";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={<PrivateRoute Component={<Home />} />}
          />
          <Route
            path="/signin"
            element={<PrivateRoute Component={<SigninPage />} />}
          />
          <Route
            path="/signup"
            element={<PrivateRoute Component={<SignupPage />} />}
          />
          <Route path="/stats" element={<Stats />} />
          {/* if the path doesn't exist -> go to home page
          <Route path="*" element={<Home />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
