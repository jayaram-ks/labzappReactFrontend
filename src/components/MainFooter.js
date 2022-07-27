import React from "react";
import { Link } from "react-router-dom";

export const MainFooter = () => {
  return (
    <div className="row justify-content-md-center mt-4">
      <footer className=" text-center text-lg-start">
        <div className="text-center text-light p-3 main-footer-txtz">
          <i class="fas fa-copyright"> </i>  2022   
          <Link className=" mx-1 font-weight-bold text-light text-decoration-none" to="https://lab.com/">
              LabzApp   
          </Link> 
        </div>
      </footer>
    </div>
  );
};
