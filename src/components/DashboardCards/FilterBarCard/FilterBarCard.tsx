import React, { useEffect, useState } from "react";
import "./style.css";
import { Form, Field, Formik } from "formik";
import DateChooser from "../../DateChooser/DateChooser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BrandModel } from "../../../models/response/BrandModel";
import { clearAllFilters } from "../../../store/filterSlice";
import { calculateDatesDifference } from "../../../utils/formatDate";
import CustomSelect from "../../CustomSelect/CustomSelect";
import { FilterOptionsType, ValuesType, fetchBrands, initialValues, mapBrandsToFilterOptions, updateFilterState } from "./helpers";


export  const FilterBarCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [options, setOptions] = useState<FilterOptionsType>({brandOptions:[], dailyPriceOptions:[]});
  const [brands, setBrands] = useState<BrandModel[]>([]);
  
  useEffect(() => {
    fetchBrandsAndMapThemToFilterOptions();
    dispatch(clearAllFilters());
  }, []);
  
  //Fetch all brands then converts them from brandResponse and all ranges in dailyPriceRange to FilterOptionType to reflect in the form
  const fetchBrandsAndMapThemToFilterOptions = async () => {
    const brandsResponse = await fetchBrands();
    setBrands(brandsResponse);
    setOptions(mapBrandsToFilterOptions(brandsResponse));
  };
    
  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date);
    if (calculateDatesDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
  };

  // ON SUBMIT EVENT
  // Function that updates the filter state with selections.
  // Then navigates to the carList page.
  const handleSelections =  (values : ValuesType) => {
    updateFilterState(values, dispatch, selectedStartDate, selectedEndDate, brands);
    navigate("/cars");
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={(values : ValuesType )=> handleSelections(values)}>
          <Form className="row m-3">

            {/* PICKING UP DATE - DATE PICKER*/}
            <div className="col-6 ">
              <label id="startDate" className="custom-label"> Picking Up Date </label>
              <div className="custom-dateChooser">
                  <DateChooser
                    onDateChange={handleStartDateChange}
                    minDate={new Date()}
                    selectedDate={selectedStartDate}
                    closeWin={true}
                  />
              </div>
            </div>

            {/* RETURNING DATE - DATE PICKER*/}
            <div className="col-6 ">
              <label id="endDate" className="custom-label"> Returning Date </label>
              <div className="custom-dateChooser">
                  <DateChooser
                    onDateChange={handleEndDateChange}
                    minDate={selectedStartDate}
                    selectedDate={selectedEndDate}
                    closeWin={true}
                    />
              </div>
            </div>

            {/* BRAND - SELECT BOX */}
            <div className="col-6 ">
              <label id="brand" className="custom-label"> Brand </label>
              <Field
                  name="brandOption"
                  options={options.brandOptions}
                  component={CustomSelect}
                  placeholder="Select..."
                  isMulti={false}
              />
            </div>

            {/* DAILY PRICE - SELECT BOX */}
            <div className="col-6 ">
              <label id="daily-price" className="custom-label"> Daily Price </label>
              <Field
                name="dailyPriceOption"
                options={options.dailyPriceOptions}
                component={CustomSelect}
                placeholder="Select..."
                isMulti={false}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primar" style={{backgroundColor:"#09272d", color:"white"}}> Search </button>
            </div>                               
          
          </Form>
        </Formik>
    </div>
  )
}