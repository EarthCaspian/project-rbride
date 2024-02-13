import React, { useEffect, useState } from 'react'
import { BrandModel } from '../../models/response/BrandModel';
import { ColorModel } from '../../models/response/ColorModel';
import { ModelModel } from '../../models/response/ModelModel';
import BrandService from '../../services/BrandService';
import ModelService from '../../services/ModelService';
import ColorService from '../../services/ColorService';
import FilterFormCard from '../../components/CarsCards/FilterBarCard/FilterFormCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { OptionType } from '../../components/CustomSelect/CustomSelect';

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

const FilterBar = () => {
    const filterState = useSelector((state: RootState) => state.filter);
    const [options, setOptions] = useState<FormOptionsType>({brandOptions:[], colorOptions:[], modelOptions: []});
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [models, setModels] = useState<ModelModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    let brandsResponse : BrandModel[];
    let modelsResponse : ModelModel[];
    let colorsResponse : ColorModel[];
    
    useEffect(() => {
            fetchThemAllAndMap();
      }, []);

    const fetchThemAllAndMap = async () => {
        brandsResponse = await fetchBrands();
        modelsResponse = await fetchModels();
        colorsResponse = await fetchColors();
        mapDatasToFormOptionsType();
    }

    const fetchBrands = () : Promise<BrandModel[]> => {
        return (
            BrandService.getAll().then((response) => {
                setBrands(response.data);
                return (response.data);
            })
        )
    }

    const fetchModels = () : Promise<ModelModel[]> => {
        return (
            ModelService.getAll().then((response) => {
                setModels(response.data);
                return(response.data);
            })
        )
    }

    const fetchColors = () : Promise<ColorModel[]> => {
        return (
            ColorService.getAll().then((response) => {
                setColors(response.data);
                return(response.data);
            })
        )
    }

    //Converts all responses to OptionType, then combines them all into FormOptionsType type.    
    const mapDatasToFormOptionsType = () => {
        const brandOptions = brandsResponse.map((brand) => {
            return {label: brand.name, value: brand.id}
        })
        const modelOptions = modelsResponse.map((model) => {
            return {label: model.name, value: model.id}
        })
        const colorOptions = colorsResponse.map((color) => {
            return {label: color.name, value:color.id}
        })
        const allOptions = {brandOptions: brandOptions, colorOptions: colorOptions, modelOptions: modelOptions};
        setOptions(allOptions);
    }

    //Function that makes the old selected options visible when the user refreshes the page
    //Previously selected options are sent to the CustomSelect component through the prop, and these options are set as selected. 
    const fetchOldSelectedOptions = () : ValuesType => {
        const oldSelectedOptions : ValuesType = {
           brandOptions : filterState.brands?.map((brand) => {return ({label : brand.name,  value : brand.id})}),
           colorOptions : filterState.colors?.map((color) => {return ( {label : color.name,  value : color.id})}),
           modelOptions : filterState.models?.map((model, i) => {return ( {label : model.name,  value : i})}),
           minDailyPrice : filterState.minDailyPrice,
           maxDailyPrice : filterState.maxDailyPrice,
        }
        return oldSelectedOptions;
    }

  return (
    <div>
        <div className='row d-flex justify-content-center' style={{marginTop:60}}>

            {/* ACCORDION ITEM */}
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">

                    {/* ACCORDION-BODY */}
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                        <div className="accordion-body custom-accordion-body">
                        
                        {/* FORM */}
                        <div className='col-12'>
                            <FilterFormCard 
                                brands={brands}
                                colors={colors}
                                models={models}
                                options={options}
                                selectedOptions={fetchOldSelectedOptions()}
                            />
                        </div>
                        </div>
                    </div>

                    {/* ACCORDION HEADER */}
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" style={{backgroundColor: " rgba(253, 179, 94)", height:"50px"}}>
                            <div className="ms-auto ">
                                <h5 style={{color:'rgb(9, 39, 45)'}}>Filters</h5>
                            </div>
                        </button>
                    </h2>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterBar;