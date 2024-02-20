import React, { useEffect, useState } from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { rentalExtraServices, rentalInsuranceOptions } from "../../utils/rentalExtraServices";
import { useDispatch, useSelector } from "react-redux";
import { RentalExtrasModel, addRentalSelectedExtraServices, addRentalSelectedInsurance } from "../../store/rentalSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/configureStore";
import { Button } from "react-bootstrap";
import { setStepLevel } from "../../store/stepsSlice";
import "./style.css";


type Props = {};

const AdditionalService = (props: Props) => {


  const rentalState = useSelector((state: RootState) => state.rental);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const lastIndex:number = rentalExtraServices.length;

  // Each index of this boolean array corresponds in turn to the indexes of the rentalExtraServices array. The indexes corresponding to the user-selected options are represented by true. In the first case all indexes are represented by false if no selection has been made before.
  const [selectedExtras, setSelectedExtras] = useState<boolean[]>(Array(rentalExtraServices.length).fill(false));
  // Each index of this boolean array corresponds in turn to the indexes of the rentalInsuranceOptions array. The index corresponding to the user-selected option is represented by true. In the first case all indexes are represented by false if no selection has been made before.
  const [selectedInsurance, setSelectedInsurance] = useState<boolean[]>(Array(rentalInsuranceOptions.length).fill(false));
  
  const spreadedExtras = [...selectedExtras];
  const spreadedInsurances = [...selectedInsurance];

  //Switch the previously selected options during rendering
  useEffect(() => {
    //Switch the insurance option
    if (rentalState.insurance.id !== 0)
      switchTheInsuranceOption(rentalState.insurance.id - 1);
    //Switch extra service options
    rentalState.extraServices.forEach((extra) => {
      switchTheExtraServiceOption(extra.id -1);
  });
  }, []);

  //For a rental, only one insurance option can be selected at a time. When a new option is chosen, if a different option had been selected before, its index is set to false.
  const switchTheInsuranceOption = (index: number) => {
    spreadedInsurances[index] = !spreadedInsurances[index]
    if (spreadedInsurances[index]){
      spreadedInsurances.forEach((option, i) => {
        if (i !== index)
        spreadedInsurances[i] = false;
        }) 
    }
    setSelectedInsurance(spreadedInsurances);
  }

  //For a rental, multiple extra services can be selected simultaneously.
  const switchTheExtraServiceOption = (index : number) => {
    spreadedExtras[index] = !spreadedExtras[index];
    setSelectedExtras(spreadedExtras);
  }

  // BUTTON CLICK EVENT
  // Function that updates the rental state with new selections
  // Then navigates to the booknow page
  const addExtrasToRent = (values:any) => {

    const insurance : RentalExtrasModel | undefined = rentalInsuranceOptions.find((extra, i) => selectedInsurance[i] == true);
    insurance ?
      dispatch(addRentalSelectedInsurance(insurance)) :
      dispatch(addRentalSelectedInsurance({id: 0, header:'', description:'', price:0}));

    const extras : RentalExtrasModel[] = rentalExtraServices.filter((extra, i) => selectedExtras[i] == true)
    dispatch(addRentalSelectedExtraServices(extras));

    dispatch(setStepLevel(2));
    
    navigate('/booknow');
  }

  return (
    <div>
      <BookingStepsCard stepPage="AdditionalService"></BookingStepsCard>
      <h4 className="additional-service-title text-center">Are you interested in incorporating our extra services?</h4>
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
        <Button type="submit" className="custom-btn rounded mt-5 mb-5 w-75" onClick={addExtrasToRent}> <b>Submit</b> </Button>
      </div>
    </div>
  );
};

export default AdditionalService;
