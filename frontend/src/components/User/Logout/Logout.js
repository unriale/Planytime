import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";

const Logout = () => {
  let { logoutUser } = useContext(AuthContext);
  logoutUser();
};

export default Logout;
