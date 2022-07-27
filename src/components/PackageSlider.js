import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import ApiService from "../services/ApiService";
import configData from "../config/configz.json";
import { Image } from "react-bootstrap";

export const PackageSlider = () => {
  const [availSlides, setAvailslides] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await ApiService({
          method: "get",
          url: "/listpackagesbanner",
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
            setAvailslides(response.data.packbanner);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSlides();
  }, []);
  return (
    <div className="container">
      <Slider {...settings}>
        {availSlides?.map((singlePBanner) => {
          return <Image key={singlePBanner.packid} thumbnail src={singlePBanner.pack_image} className="main-slidr-img" />
        })}
      </Slider>
    </div>
  );
};
