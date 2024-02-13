import React, { useEffect, useState } from "react";
import "./style.css";
import { Form, Field, Formik } from "formik";
import DateChooser from "../DateChooser/DateChooser";
import { useDispatch } from "react-redux";
import { handleRentalEndDate, handleRentalStartDate } from "../../store/rentalSlice";
import { useNavigate } from "react-router-dom";
import BrandService from "../../services/BrandService";
import { BrandModel } from "../../models/response/BrandModel";
import { clearAllFilters, handleBrandSelection, handleMaxDailyPrice, handleMinDailyPrice } from "../../store/filterSlice";
import { calculateDatesDifference } from "../../utils/formatDate";
import CustomSelect, { OptionType } from "../CustomSelect/CustomSelect";

//format of options in the form
//OptionType is defined in the CustomSelect.tsx file. ({label:string(option name), value:number(id)})
interface FilterOptionsType {
    brandOptions : OptionType[] ,
    dailyPriceOptions : OptionType[],
}

//format of the "values" received after pressing the submit button in the form
interface ValuesType {
  brandOption : OptionType;
  dailyPriceOption : OptionType;
}

const initialValues : ValuesType = {
  brandOption : {label: "", value: 0},
  dailyPriceOption : {label: "", value: 0},
};

//variable for determining the daily price range options
export const dailyPriceRange = [{minPrice: 0, maxPrice: 200}, {minPrice: 200, maxPrice:400},{ minPrice:400, maxPrice:600}, {minPrice:600, maxPrice:800}, {minPrice:800, maxPrice:2000}];

export  const FilterBarCard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [options, setOptions] = useState<FilterOptionsType>({brandOptions: [], dailyPriceOptions: []});
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(selectedStartDate);
  const [brands, setBrands] = useState<BrandModel[]>([]);
  let brandsResponse : BrandModel[];

  useEffect(() => {
    fetchAndMap();
    dispatch(clearAllFilters());
  }, []);

  const fetchAndMap = async () => {
    brandsResponse = await fetchBrands();
    mapDatasToFilterForm();
  }

  const fetchBrands = () : Promise<BrandModel[]> => {
    return (
      BrandService.getAll().then((response) => {
        setBrands(response.data);
        return (response.data);
      })
    )
  };

  //Converts all brands from brandResponse and all ranges in dailyPriceRange to FilterOptionType to reflect in the form
  const mapDatasToFilterForm = () => {
    const brandOptions = brandsResponse.map((brand) => {
        return {label: brand.name, value: brand.id}
    })
    const dailyPriceOptions = dailyPriceRange.map((price, i) => {
      return {label: String(price.minPrice) + "-" + String(price.maxPrice), value: i}
    })
    const options = {brandOptions: brandOptions, dailyPriceOptions : dailyPriceOptions};
    setOptions(options);
}

  const handleStartDateChange = (date: Date) => {
    setSelectedStartDate(date);
    if (calculateDatesDifference(date, selectedEndDate) < 0)
        setSelectedEndDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setSelectedEndDate(date);
  };

  // ON SUBMIT EVENT
  // Function that updates the rental state and filter state with selections.
  // Then navigates to the carList page.
  const handleSelections =  (values : ValuesType) => {
    //Received day selections are sent to the rental state.   
    //Both dates have been serialized to string format to comply with JSON standards.  
    dispatch(handleRentalStartDate(selectedStartDate.toLocaleDateString()));
    dispatch(handleRentalEndDate(selectedEndDate.toLocaleDateString()));

    //Received brand selection is sent to the filter state.
    if (values.brandOption)
        dispatch(handleBrandSelection(brands.filter((brand : BrandModel) => values.brandOption.value === brand.id)));
    //Received price range selection is sent to the filter state.
    if (values.dailyPriceOption) {
      const index = values.dailyPriceOption.value;
      dispatch(handleMinDailyPrice(dailyPriceRange[index].minPrice));
      dispatch(handleMaxDailyPrice(dailyPriceRange[index].maxPrice));
    }
    navigate("/cars");
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={values => handleSelections(values)}>
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