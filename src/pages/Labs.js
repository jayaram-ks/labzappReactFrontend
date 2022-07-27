import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import configData from "../config/configz.json";
import { LabSingle } from "../components/LabSingle";
import { CardGroup } from "react-bootstrap";
import { Outlet } from "react-router-dom";
export const Labs = () => {
  const [availLabs, setAvaillabs] = useState([]);
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await ApiService({
          method: "get",
          url: "/listlabs",
          params: {
            api_token: configData.API_TOKEN,
            latitude: configData.CUST_LAT,
            longitude: configData.CUST_LONG,
          },
          headers: {
            Authorization: "Bearer " + configData.AUTH_TOKEN,
          },
        });

        if (response.statusText == "OK") {
          if (response?.data?.code == 200) {
            setAvaillabs(response.data.labs);
            setIsPending(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLabs();
  }, []);

  return (
  
    <div className="row mx-auto w-75 my-auto vp-height">
     
      {availLabs.length < 1 && !isPending ? <div class="alert alert-danger fs-5 " role="alert">No Labs Available in your location</div>:''}

      {isPending && <div className="spinner-border text-primary  mx-auto my-5" role="status"><span className="sr-only">Loading...</span></div>}
      
      <CardGroup>
      {availLabs?.map((singleLab)=>{
        return <LabSingle key={singleLab.lab_id} labdata={singleLab} />
      })}
      
      </CardGroup>
    
    </div>
  
  );
};
