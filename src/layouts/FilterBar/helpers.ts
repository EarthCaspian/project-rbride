import { OptionType } from "../../components/CustomSelect/CustomSelect";
import { BrandModel } from "../../models/response/BrandModel";
import { ColorModel } from "../../models/response/ColorModel";
import { ModelModel } from "../../models/response/ModelModel";
import BrandService from "../../services/BrandService";
import ColorService from "../../services/ColorService";
import ModelService from "../../services/ModelService";
import { FilterState } from "../../store/filterSlice";

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

const fetchBrands = () : Promise<BrandModel[]> => {
    return (
        BrandService.getAll().then((response) => {
            return (response.data);
        })
    )
}

const fetchModels = () : Promise<ModelModel[]> => {
    return (
        ModelService.getAll().then((response) => {
            return(response.data);
        })
    )
}

const fetchColors = () : Promise<ColorModel[]> => {
    return (
        ColorService.getAll().then((response) => {
            return(response.data);
        })
    )
}

    //Converts all responses to OptionType, then combines them all into FormOptionsType type.    
    const mapDatasToFormOptionsType = (brandsResponse : BrandModel[], modelsResponse : ModelModel[], colorsResponse : ColorModel[]) : FormOptionsType => {
        const brandOptions = brandsResponse.map((brand) => {
            return {label: brand.name, value: brand.id}
        })
        const modelOptions = modelsResponse.map((model) => {
            return {label: model.name, value: model.id}
        })
        const colorOptions = colorsResponse.map((color) => {
            return {label: color.name, value:color.id}
        })
        return {brandOptions: brandOptions, colorOptions: colorOptions, modelOptions: modelOptions};
    }

    //Function that makes the old selected options visible when the user refreshes the page
    //Previously selected options are sent to the CustomSelect component through the prop, and these options are set as selected. 
    const getPreSelectedOptions = (filterState : FilterState) : ValuesType => {
        const oldSelectedOptions : ValuesType = {
           brandOptions : filterState.brands?.map((brand) => {return ({label : brand.name,  value : brand.id})}),
           colorOptions : filterState.colors?.map((color) => {return ( {label : color.name,  value : color.id})}),
           modelOptions : filterState.models?.map((model, i) => {return ( {label : model.name,  value : i})}),
           minDailyPrice : filterState.minDailyPrice,
           maxDailyPrice : filterState.maxDailyPrice,
        }
        return oldSelectedOptions;
    }

export { fetchBrands, fetchModels, fetchColors, mapDatasToFormOptionsType, getPreSelectedOptions};