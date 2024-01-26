import React, { useState } from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { rentalExtraServices, rentalInsuranceOptions } from "../../utils/rentalExtraServices";
import { useDispatch } from "react-redux";
import { addExtraServicesToRent, addInsuranceToRent } from "../../store/rentalSlice";
import { Link } from "react-router-dom";

type Props = {};

const AdditionalService = (props: Props) => {


  const [lastIndex, setLastIndex] = useState<number>(rentalExtraServices.length);
  const [selectedExtras, setSelectedExtras] = useState<boolean[]>(Array(rentalExtraServices.length).fill(false));
  const [selectedInsurance, setSelectedInsurance] = useState<boolean[]>(Array(rentalInsuranceOptions.length).fill(false));

  const dispatch = useDispatch();

  const switchTheExtraServiceOption = (index: number) => {
    const spreadedArray = [...selectedExtras];
    spreadedArray[index] = !spreadedArray[index];
    setSelectedExtras(spreadedArray);
  }

  const switchTheInsuranceOption = (index: number) => {
    const spreadedArray = [...selectedInsurance];
    spreadedArray[index] = !spreadedArray[index]
    if (spreadedArray[index]){
      spreadedArray.forEach((option, i) => {
        if (i != index)
        spreadedArray[i] = false;
        }) 
    }
    setSelectedInsurance(spreadedArray);
  }

  const addExtrasToRent = () => {
    selectedInsurance.forEach((insurance, i) => {
      if (insurance == true)
        dispatch(addInsuranceToRent(rentalInsuranceOptions[i]));
    })

    selectedExtras.forEach((extra, i) => {
      if (extra == true)
        dispatch(addExtraServicesToRent(rentalExtraServices[i]));
    })
  }

  return (
    <div>
      <BookingStepsCard stepPage="AdditionalService"></BookingStepsCard>
      <h4 className="text-center">Are you interested in incorporating our extra services?</h4>
      <div className="container col-6">
        
        {/* Insurance Type Section */}
        <h4>Insurance Types</h4>
          <div className="accordion" >
          {
            rentalInsuranceOptions.map((option, index) => {
              return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`#collapse${index}`}
                      >
                      <div className="container">
                        <div className="row ">
                          <div className="form-check form-switch col-10 ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedInsurance[index]}
                              onChange={() => switchTheInsuranceOption(index)}
                            />
                            <label className="form-check-label">
                              {option.header};
                            </label>
                          </div>
                          <div className="text-end pb-1 col-2 ">₺{option.price}</div>
                        </div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {option.description}
                    </div>
                  </div>
                </div>
              );
            })
          }

          {/* Extra Services Section */}
          <h4 className="mt-3">Extra Services</h4>
            <div className="accordion" ></div>
            {
              rentalExtraServices.map((option, index) =>{
                return (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index + lastIndex}`}
                        aria-expanded="false"
                        aria-controls={`#collapse${index + lastIndex}`}
                      >
                        <div className="container">
                          <div className="row ">
                            <div className="form-check form-switch col-10 ">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={selectedExtras[index]}
                                onChange={() => switchTheExtraServiceOption(index)}
                              />
                            <label className="form-check-label">
                              {option.header} 
                            </label>
                            </div>
                            <div className="text-end pb-1 col-2 ">₺{option.price}</div>
                          </div>
                        </div>
                    </button>
                    </h2>
                    <div
                      id={`collapse${index + lastIndex}`}
                      className="accordion-collapse collapse "
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                          {option.description}
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>

      </div>
      <div className="container-fluid col-6 d-flex justify-content-center ">
        <Link  to='/booknow' className="custom-btn rounded mt-5 mb-5 w-75" onClick={addExtrasToRent}> <b>Submit</b> </Link>
      </div>
    </div>
  );
};

export default AdditionalService;
