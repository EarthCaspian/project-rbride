
import { OptionType } from "../../CustomSelect/CustomSelect";
import * as Yup from 'yup';
import { Props } from "./FilterFormCard";
import { Dispatch } from "redux";
import { handleBrandSelection, handleColorSelection, handleFilterEndDate, handleFilterStartDate, handleMaxDailyPrice, handleMinDailyPrice, handleModelSelection } from "../../../store/filterSlice";


//format of options in the form
//OptionType is defined in the CustomSelect.tsx file. ({label:string(option name), value:number(id)})
export interface FormOptionsType {
    brandOptions: OptionType[] ;
    colorOptions: OptionType[] ;
    modelOptions: OptionType[] ;
  }
  
//format of the "values" received after pressing the submit button in the form
export interface ValuesType {
    brandOptions: OptionType[] ;
    colorOptions: OptionType[] ;
    modelOptions: OptionType[] ;
    minDailyPrice: number;
    maxDailyPrice: number;
  }

const getInitialValues = (props : Props) : ValuesType => {
    return {
        brandOptions : [],
        colorOptions: [],
        modelOptions: [],
        minDailyPrice : props.selectedOptions?.minDailyPrice || 0,
        maxDailyPrice: props.selectedOptions?.maxDailyPrice || 2000,
    }
};

const ValidationSchema = Yup.object().shape({
    minDailyPrice : Yup.number().max(Yup.ref('maxDailyPrice'), "Minimum price cannot exceed maximum price.")
    .min(0, "price cannot be less than 0."),
});

// ON SUBMIT EVENT
// Function that updates the filter state with selections.
const updateFilterState = (values : ValuesType, dispatch : Dispatch, selectedStartDate : Date, selectedEndDate : Date, props : Props) => {
    //Received day selections are sent to the filter state.   
    //Both dates have been serialized to JSON format to comply with JSON standards.
    dispatch(handleFilterStartDate(selectedStartDate.toJSON()));
    dispatch(handleFilterEndDate(selectedEndDate.toJSON()));
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

export {ValidationSchema, getInitialValues, updateFilterState};