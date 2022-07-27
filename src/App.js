import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MainFooter } from "./components/MainFooter";
import { MainHeader } from "./components/MainHeader";
import { BookTest } from "./pages/BookTest";
import { Home } from "./pages/Home";
import { AvailLabTests } from "./pages/AvailLabTests";
import { LabReports } from "./pages/LabReports";
import { Labs } from "./pages/Labs";
import { MyProfile } from "./pages/MyProfile";
import { NotFound } from "./pages/NotFound";
import { AvailLabPacks } from "./pages/AvailLabPacks";
import { Login } from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import { LogOut } from "./components/LogOut";

function App() {
  const [loggedin, setLoggedin] = useState(false)
  const [apiTokenz, setAPIToken] = useState("")
  const [authTokenz, SetAuthToken] = useState("")
  const loginCredentials  = localStorage.getItem("lbzapp")
  
 
  useEffect(() => {
    if(loginCredentials == null){
      setLoggedin(false) 
    }
    else{
      const logindata = JSON.parse(loginCredentials)
      setAPIToken(logindata.apiToken)
      SetAuthToken(logindata.authKey)
      setLoggedin(true) 
    }
    
  }, [])
  
  
  
  return (
    <div className="container-fluid p-0">
      <AuthContext.Provider value={{loggedin,setLoggedin,apiTokenz,setAPIToken,authTokenz,SetAuthToken}}>
      <MainHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="labs"  >
          <Route index element={<Labs />} />
          <Route path="tests/:labId" element={<AvailLabTests />} />
          <Route path="packs/:labId" element={<AvailLabPacks />} />
        </Route>
        <Route path="booktest" element={<BookTest />} />
        <Route path="labreports" element={<LabReports />} />
        <Route path="login" element={<Login/>} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="logout" element={<LogOut />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <MainFooter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
