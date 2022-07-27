import React, { useContext, useEffect, useState } from "react";

import Slider from "react-slick";
import ApiService from "../services/ApiService";
import { Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export const MainSlider = () => {
  const [availSlides, setAvailslides] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const { apiTokenz, authTokenz } = useContext(AuthContext);

  var settings = {
    dots: false,
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        console.log(apiTokenz)
        const response = await ApiService({
          method: "get",
          url: "/banners",
          params: {
            api_token: apiTokenz,
          },
          headers: {
            Authorization: "Bearer " + authTokenz,
          },
        });

        if (response.statusText == "OK") {
          if (response?.data?.code == 200) {
            setAvailslides(response.data.banner);
            setIsPending(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    
      fetchSlides();
    
  }, [apiTokenz]);
  return (
    <div className="container text-center">
      {isPending && (
        <div className="spinner-border text-primary  my-5 " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Slider {...settings}>
        {availSlides?.map((singleBanner) => {
          return (
            <Image
              thumbnail
              key={singleBanner.id}
              src={singleBanner.thumbnail}
              className="main-slidr-img"
            />
          );
        })}
      </Slider>
    </div>
  );
};
