import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export const LogOut = () => {
    const {loggedin,setLoggedin,apiTokenz,setAPIToken,authTokenz,SetAuthToken} = useContext(AuthContext);
    const navigate = useNavigate();
    setLoggedin(false)
    setAPIToken("")
    SetAuthToken("")
    localStorage.removeItem("lbzapp");
    navigate("../login", { replace: true });
  return (
    <div></div>
  )
}
