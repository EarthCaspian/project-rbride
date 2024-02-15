import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calculateDatesDifference } from '../../../utils/formatDate';
import { RootState } from '../../../store/configureStore';
import { handleRentalEndDate, handleRentalStartDate } from '../../../store/rentalSlice';
import { handleBrandSelection, handleColorSelection, handleMaxDailyPrice, handleMinDailyPrice, handleModelSelection } from '../../../store/filterSlice';
import { BrandModel } from '../../../models/response/BrandModel';
import { ColorModel } from '../../../models/response/ColorModel';
import { ModelModel } from '../../../models/response/ModelModel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import DateChooser from '../../DateChooser/DateChooser';
import CustomSelect, { OptionType } from '../../CustomSelect/CustomSelect';

//format of options in the form
//OptionType is defined in the CustomSelect.tsx file. ({label:string(option name), value:number(id)})
interface FormOptionsType {
  brandOptions: OptionType[] ;
  colorOptions: OptionType[] ;
  modelOptions: OptionType[] ;
}

//format of the "values" received after pressing the submit button in the form
interface ValuesType {
  brandOptions: OptionType[] ;
  colorOptions: OptionType[] ;
  modelOptions: OptionType[] ;
  minDailyPrice: number;
  maxDailyPrice: number;
}

type Props = {
    brands: BrandModel[];
    colors: ColorModel[];
    models: ModelModel[];
    options : FormOptionsType;
    selectedOptions ?: ValuesType;
}

const FilterFormCard = (props: Props) => {

    const rentalState = useSelector((state: RootState) => state.rental.rental);
    const dispatch = useDispatch();

    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(rentalState.startDate));
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(rentalState.endDate));

    const initialValues : ValuesType = {
      brandOptions : [],
      colorOptions: [],
      modelOptions: [],
      minDailyPrice : props.selectedOptions?.minDailyPrice || 0,
      maxDailyPrice: props.selectedOptions?.maxDailyPrice || 2000,
    };

    const ValidationSchema = Yup.object().shape({
      minDailyPrice : Yup.number().max(Yup.ref('maxDailyPrice'), "Minimum price cannot exceed maximum price.")
      .min(0, "price cannot be less than 0."),
    });

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
    const handleSelections = (values : ValuesType) => {
        //Received day selections are sent to the rental state.   
        //Both dates have been serialized to JSON format to comply with JSON standards.
        dispatch(handleRentalStartDate(selectedStartDate.toJSON()));
        dispatch(handleRentalEndDate(selectedEndDate.toJSON()));
        //Received brand selections are sent to the filter state.
        if (values.brandOptions)
            dispatch(handleBrandSelection(props.brands.filter((brand) => values.brandOptions.find(option => option.value === brand.id))));
        //Received model selections are sent to the filter state.
        if (values.modelOptions)
            dispatch(handleModelSelection(props.models.filter((model) => values.modelOptions.find(option => option.value === model.id))));
        //Received color selections are sent to the filter state.
        if (values.colorOptions)
            dispatch(handleColorSelection(props.colors.filter((color) => values.colorOptions.find(option => option.value === color.id))));
        //Received price selections are sent to the filter state.
        if (values.minDailyPrice)
            dispatch(handleMinDailyPrice(values.minDailyPrice));
        if (values.maxDailyPrice)
            dispatch(handleMaxDailyPrice(values.maxDailyPrice));
    }

    return (
        <div className='col d-flex justify-content-center'>
          {/* FORMIK */}
          <Formik 
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={(values) => handleSelections(values)}>
              
            <Form className="row m-3" >
                    
              {/* PICKING UP DATE - DATE PICKER*/}
              <div className="col-md-6 col-12">
                <div className='row row-align-center'>
                  <label id="startDate" className="custom-label"> Picking Up Date </label>
                  <div className="custom-dateChooser w-75">
                    <DateChooser
                      onDateChange={handleStartDateChange}
                      minDate={new Date()}
                      selectedDate={selectedStartDate}
                      closeWin={true}
                      />
                  </div>
                </div>
              </div>
                    
              {/* RETURNING DATE - DATE PICKER*/}
              <div className="col-md-6 col-12">
                <div className='row row-align-center'>
                  <label id="endDate" className="custom-label"> Returning Date </label>
                  <div className="custom-dateChooser w-75">
                    <DateChooser
                      onDateChange={handleEndDateChange}
                      minDate={selectedStartDate}
                      selectedDate={selectedEndDate}
                      closeWin={true}
                      />
                  </div>
                </div>
              </div>
                    
              {/* BRAND - SELECT BOX */}
              <div className="col-lg-3 col-md-6 col-12">
                  <label id="brand" className="custom-label row-align-center"> Brand </label>
                  <Field
                      name="brandOptions"
                      options={props.options.brandOptions}
                      component={CustomSelect}
                      placeholder="Select..."
                      isMulti={true}
                      selectedValues={props.selectedOptions?.brandOptions}
                      />
              </div>
                    
              {/* MODEL - SELECT BOX */}
              <div className="col-lg-3 col-md-6 col-12">
                  <label id="model" className="custom-label row-align-center"> Model </label>
                  <Field 
                      name="modelOptions"
                      options={props.options.modelOptions}
                      component={CustomSelect}
                      placeholder="Select..."
                      isMulti={true}
                      selectedValues={props.selectedOptions?.modelOptions}

                  />
              </div>
                    
              {/* COLOR - SELECT BOX */}
              <div className="col-lg-3 col-md-6 col-12">
                  <label id="color" className="custom-label row-align-center"> Color </label>
                  <Field 
                      name="colorOptions"
                      options={props.options.colorOptions}
                      component={CustomSelect}
                      placeholder="Select..."
                      isMulti={true}
                      selectedValues={props.selectedOptions?.colorOptions}
                  />
              </div>
                    
              {/* DAILY PRICE - INPUT AREA */}
              <div className="col-lg-3 col-md-6 col-12">
                  <label id="daily-price" className="custom-label row-align-center"> Daily Price </label>
                  <div className='row'>
                    <div className="col-6">
                      <Field 
                          as="input" 
                          name="minDailyPrice" 
                          type="number" 
                          placeholder="Min..." 
                          className="form-control" 
                        />
                    </div>
                    <div className="col-6"> 
                      <Field 
                          as="input" 
                          name="maxDailyPrice" 
                          type="number" 
                          placeholder="Max..."
                          className="form-control" 
                      />
                    </div>
                    <ErrorMessage name="minDailyPrice">
                      {(message) => <p className="error-text pl-2 mt-2">{message}</p>}
                    </ErrorMessage>
                  </div>
                </div>
                {/* SUBMIT BUTTON */}
                <div className="d-grid gap-2 mt-4">
                  <button 
                      type="submit"
                      className="btn btn-primary"
                      style={{backgroundColor:"#09272d", color:"white"}}
                  > Search </button>
                </div>                     
            
            </Form>
          </Formik>
        </div>            
      )
}

export default FilterFormCard;