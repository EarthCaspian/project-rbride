import { Dispatch } from "redux";
import { BrandModel } from "../../models/response/BrandModel";
import BrandService from "../../services/BrandService";
import { OptionType } from "../CustomSelect/CustomSelect";
import { handleBrandSelection, handleFilterEndDate, handleFilterStartDate, handleMaxDailyPrice, handleMinDailyPrice } from "../../store/filterSlice";

//format of options in the form
//OptionType is defined in the CustomSelect.tsx file. ({label:string(option name), value:number(id)})
export interface FilterOptionsType {
    brandOptions : OptionType[] ,
    dailyPriceOptions : OptionType[],
}

//format of the "values" received after pressing the submit button in the form
export interface ValuesType {
  brandOption : OptionType;
  dailyPriceOption : OptionType;
}

export const initialValues : ValuesType = {
  brandOption : {label: "", value: 0},
  dailyPriceOption : {label: "", value: 0},
};

export type DailyPriceRangeModel = {
    minPrice: number;
    maxPrice: number;
};

//variable for determining the daily price range options
  const dailyPriceRange : DailyPriceRangeModel[] = [{minPrice: 0, maxPrice: 200}, {minPrice: 200, maxPrice:400},{ minPrice:400, maxPrice:600}, {minPrice:600, maxPrice:800}, {minPrice:800, maxPrice:2000}];
  
  const fetchBrands = () : Promise<BrandModel[]> => {
    return (
      BrandService.getAll().then((response) => {
        return (response.data);
      })
      )
  };

  //Converts all brands from brandResponse and all ranges in dailyPriceRange to FilterOptionType to reflect in the form
  const mapBrandsToFilterOptions = (brandsResponse : BrandModel[]) : FilterOptionsType => {
    const brandOptions = brandsResponse?.map((brand) => {
        return {label: brand.name, value: brand.id}
    })
    const dailyPriceOptions = dailyPriceRange.map((price, i) => {
      return {label: String(price.minPrice) + "-" + String(price.maxPrice), value: i}
    })
    const options = {brandOptions: brandOptions, dailyPriceOptions : dailyPriceOptions};
    return options;
}

  // ON SUBMIT EVENT
  // Function that updates the filter state with selections.
  const updateFilterState = (values : ValuesType, dispatch : Dispatch, selectedStartDate : Date, selectedEndDate : Date, brands : BrandModel[]) => {
    //Received day selections are sent to the filter state.   
    //Both dates have been serialized to string format to comply with JSON standards.  
    dispatch(handleFilterStartDate(selectedStartDate.toJSON()));
    dispatch(handleFilterEndDate(selectedEndDate.toJSON()));
    //Received brand selection is sent to the filter state.
    if (values.brandOption)
        dispatch(handleBrandSelection(brands.filter((brand : BrandModel) => values.brandOption.value === brand.id)));
    //Received price range selection is sent to the filter state.
    if (values.dailyPriceOption) {
      const index = values.dailyPriceOption.value;
      dispatch(handleMinDailyPrice(dailyPriceRange[index].minPrice));
      dispatch(handleMaxDailyPrice(dailyPriceRange[index].maxPrice));
    }
  }

export { mapBrandsToFilterOptions, dailyPriceRange, fetchBrands, updateFilterState };