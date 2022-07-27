import React, { useEffect, useState } from "react";
import { BookATest } from "../components/BookATest";
import { BookOnCall } from "../components/BookOnCall";
import { MainSlider } from "../components/MainSlider";
import { PackageSlider } from "../components/PackageSlider";
import { UploadPresc } from "../components/UploadPresc";
import { ViewLabs } from "../components/ViewLabs";

export const Home = () => {
  return (
    <div className="vp-height">
      <div className="row w-100 mx-auto px-1 my-1">
        <div className=" col-12 ">
          <MainSlider />
        </div>
      </div>
      <div className="row w-100 mx-auto my-3 px-5  home-btn-row">
        <div className=" col-lg-3 col-md-6 col-sm-12  mt-1">
          <BookOnCall />
        </div>
        <div className=" col-lg-3 col-md-6 col-sm-12  mt-1">
          <UploadPresc />
        </div>
        <div className=" col-lg-3 col-md-6 col-sm-12  mt-1">
          <ViewLabs />
        </div>
        <div className=" col-lg-3 col-md-6 col-sm-12  mt-1">
          <BookATest />
        </div>
      </div>
      <div className="row w-100 mx-auto my-1 px-1">
        <div className=" col-12 mt-1">
          <PackageSlider />
        </div>
      </div>
    </div>
  );
};
