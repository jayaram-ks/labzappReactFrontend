import React, { useEffect, useState } from "react"
import ApiService from "../services/ApiService"
import constzObj from "../config/constantz"
import configData from "../config/configz.json"
export const MyProfile = () => {
  const [profile, setProfile] = useState([])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ApiService({
          method: "get",
          url: "/profile",
          params: {
            api_token:
            configData.API_TOKEN,
          },
          headers: {
            Authorization:
              "Bearer " + configData.AUTH_TOKEN,
          },
        });
        if (response.statusText == "OK") {
          if (response?.data?.code == 200) {
            setProfile(response.data.customer)
            setIsPending(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchProfile()
  }, []);

  return (
    <div className="vp-height">
    
    {isPending && <div className="col-md-12 text-center"><div className="spinner-border text-primary my-5" role="status"><span className="sr-only">Loading...</span></div></div>}

    { !isPending && <div className="card text-white bg-danger m-4 col-md-6 col-sm-12 mx-auto my-5 ">
      <div className="card-header">PROFILE DETAILS</div>
      <div className="card-body">
        <h5 className="card-title">

          <i className="fa fa-male m-2"> </i> {profile?.name}({profile?.age})
        </h5>
        <p className="card-text">
          <i className="fa fa-home m-2"> </i> {profile?.address}
        </p>
        <p className="card-text">
          <i className="fa fa-phone m-2"> </i> {profile?.phone}
        </p>
        <p className="card-text">
          <i className="fa fa-location-pin m-2"> </i> {profile?.pincode}
        </p>
        <p className="card-text m-2">
          District: {constzObj.districtz[profile?.district]}
        </p>
      </div>
    </div>}
    </div>
  );
};
