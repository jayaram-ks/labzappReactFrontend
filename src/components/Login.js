import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ApiService from "../services/ApiService";

export const Login = () => {
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPinCode] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { loggedin, setLoggedin } = useContext(AuthContext);
  const [errormsg, setErrormsg] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showlogform, setshowLogForm] = useState(true);
  const [cotp, setCotp] = useState("");
  const navigate = useNavigate();

  const [isOTPPending, setIsOTPPending] = useState(false);
  const [otperrormsg, setOTPErrormsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    setErrormsg("");
    submitforOTP();
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    setIsOTPPending(true);
    setOTPErrormsg("");
    submitReceivedOTP();
  };

  const submitforOTP = async () => {
    try {
      const response = await ApiService({
        method: "post",
        url: "/register",
        params: {
          customer_name: fullname,
          customer_phone: mobile,
          customer_pincode: pincode,
        },
      });
      if (response.statusText == "OK") {
        console.log(response);
        if (response?.data?.code == 200) {
          setIsPending(false);
          //setLoggedin(true);
          //navigate("../profile", true);
          setShowOTP(true);
          setshowLogForm(false);
        } else {
          setIsPending(false);
          let ermsg = response.data.message;
          setErrormsg(ermsg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitReceivedOTP = async () => {
    try {
      const response = await ApiService({
        method: "post",
        url: "/verifyotp",
        params: {
          customer_mobile_otp: cotp,
          customer_phone: mobile,
        },
      });
      if (response.statusText == "OK") {
        
        if (response?.data?.code == 200) {
          setIsOTPPending(false);
          const uzer = {
            apiToken: response.data.api_token,
            authKey: response.data.auth_key,
          };
         
          //localStorage.removeItem("lbzapp");
          localStorage.setItem("lbzapp", JSON.stringify(uzer));
          setLoggedin(true)
          navigate("../profile", true);
        } else {
          setIsOTPPending(false);
          let ermsg = response.data.message;
          setOTPErrormsg(ermsg);
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vp-height">
      {showlogform && (
        <div className="card col-md-4 col-sm-12 mx-auto my-5 ">
          <div className="card-body">
            <h5 className="card-title text-center">Login with Mobile Number</h5>
            <form className="form-floating" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  required
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Full Name"
                  onChange={(e) => setFullname(e.target.value)}
                />
                <label for="floatingInput">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  required
                  type="number"
                  className="form-control"
                  id="mobNum"
                  placeholder="Mobile Number"
                  onChange={(e) => setMobile(e.target.value)}
                />
                <label for="mobNum">Mobile number</label>
              </div>

              <div className="form-floating">
                <input
                  required
                  type="number"
                  className="form-control"
                  id="pinCode"
                  placeholder="Pincode"
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <label for="pinCode">Pincode</label>
              </div>
              <button className="btn text-white def-bg-color my-3">
                Get OTP
              </button>
            </form>

            {errormsg.length > 0 ? (
              <div className="alert alert-danger" role="alert">
                {errormsg}
              </div>
            ) : (
              ""
            )}
            {isPending && (
              <div
                className="spinner-border text-primary  my-1 text-center "
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {showOTP && (
        <div className="card col-md-4 col-sm-12 mx-auto my-5">
          <div className="card-body">
            <h5 className="card-title text-center">Enter OTP</h5>
            <form className="form-floating" onSubmit={handleOTPSubmit}>
              <div className="form-floating mb-3">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  id="otp"
                  onChange={(e) => setCotp(e.target.value)}
                />
                <label for="otp">Enter OTP received in your mobile</label>
              </div>
              <button className="btn text-white def-bg-color my-3">
                Submit OTP
              </button>
            </form>
            {otperrormsg.length > 0 ? (
              <div className="alert alert-danger" role="alert">
                {otperrormsg}
              </div>
            ) : (
              ""
            )}
            {isOTPPending && (
              <div
                className="spinner-border text-primary  my-1 text-center "
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
