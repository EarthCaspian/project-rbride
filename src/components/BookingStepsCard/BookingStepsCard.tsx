import React, { useState } from "react";
import "./style.css";

type ImageProps = {
  stepPage: string;
};

const BookingStepsCard: React.FC<ImageProps> = ({ stepPage }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-2">
          <img
            className={
              stepPage == "Login"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
            }
            src="/assets/StepLogin.png"
          ></img>
        </div>
        <div className="col-2">
          <img
            className={
              stepPage == "ChooseCar"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
            }
            src="/assets/StepChooseCar.png"
          ></img>
        </div>
        <div className="col-2">
          <img
            className={
              stepPage == "AdditionalService"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
            }
            src="/assets/StepAdditionalService.png"
          ></img>
        </div>
        <div className="col-2">
          <img
            className={
              stepPage == "BookNow"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
            }
            src="/assets/StepFillForm&Payment.png"
          ></img>
        </div>
        <div className="col-2">
          <img
            className={
              stepPage == "StepCompletion"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
            }
            src="/assets/StepCompletion.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default BookingStepsCard;
