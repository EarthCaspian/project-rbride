import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { calculateDatesDifference } from '../../../utils/formatDate';
import { RootState } from '../../../store/configureStore';
import { BrandModel } from '../../../models/response/BrandModel';
import { ColorModel } from '../../../models/response/ColorModel';
import { ModelModel } from '../../../models/response/ModelModel';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import DateChooser from '../../DateChooser/DateChooser';
import CustomSelect from '../../CustomSelect/CustomSelect';
import { FormOptionsType, ValidationSchema, ValuesType, getInitialValues, updateFilterState } from './helpers';

export type Props = {
    brands: BrandModel[];
    colors: ColorModel[];
    models: ModelModel[];
    options : FormOptionsType;
    selectedOptions ?: ValuesType;
}

const FilterFormCard = (props: Props) => {

    const filterState = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch();

    const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(filterState.startDate));
    const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date(filterState.endDate));

    const initialValues = getInitialValues(props);

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
    const handleSelections = (values : ValuesType) => {
      updateFilterState(values, dispatch, selectedStartDate, selectedEndDate, props);
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