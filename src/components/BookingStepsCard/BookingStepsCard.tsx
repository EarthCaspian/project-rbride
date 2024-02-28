import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

type ImageProps = {
  stepPage: string;
};

const BookingStepsCard: React.FC<ImageProps> = ({ stepPage }) => {

  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const stepsLevelState = useSelector((state: RootState) => state.steps.stepLevel);
  const navigate = useNavigate();

  const chooseCarStep = () => {
   (stepsLevelState > 0 && rentalState.car && rentalState.car.id !== 0) ?
    navigate("/car-details/" + `${rentalState.car.id}`) : navigate("/cars");
  };

  const additionalserviceStep = () => {
    if (stepsLevelState >= 1 && stepsLevelState !== 3)
      navigate("/additionalservices");
  };

  const bookNowStep = () => {
    if (stepsLevelState === 2)
      navigate("/booknow");
  };

  const completionStep = () => {
    if (stepsLevelState === 3)
      navigate("/completion");
  };

  return (
    <div className="booking-icon container-fluid col-lg-8 col-md-12" style={{marginTop:100}}>
      <div className="row">

        <div className="col-3">
        <button onClick={chooseCarStep} className="step-button">
            <img
              className={
                stepPage === "ChooseCar"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
              }
              style={{maxWidth:"3.5rem", maxHeight:"3.5rem"}}
              src="/assets/StepCardImages/StepChooseCar.png"
              alt="choosecar">
            </img>
        </button>
        </div>
        <div className="col-3">
          <button onClick={additionalserviceStep} className="step-button">
            <img
              className={
                stepPage === "AdditionalService"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
              }
              style={{maxWidth:"3.5rem", maxHeight:"3.5rem"}}
              src="/assets/StepCardImages/StepAdditionalService.png"
              alt="additionalservice">
            </img>
          </button>
        </div>
        <div className="col-3">
          <button onClick={bookNowStep} className="step-button">
            <img
              className={
                stepPage === "BookNow"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
              }
              style={{maxWidth:"3.5rem", maxHeight:"3.5rem"}}
              src="/assets/StepCardImages/StepFillForm&Payment.png"
              alt="booknow">
            </img>
          </button>
        </div>
        <div className="col-3">
          <button onClick={completionStep} className="step-button">
            <img
              className={
                stepPage === "StepCompletion"
                ? "opacity-100 step-image img-fluid"
                : "opacity-25 step-image img-fluid"
              }
              style={{maxWidth:"3.5rem", maxHeight:"3.5rem"}}
              src="/assets/StepCardImages/StepCompletion.png"
              alt="stepcompletion">
            </img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepsCard;
