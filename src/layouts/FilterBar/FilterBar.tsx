import React, { useState } from 'react'
import { BrandModel } from '../../models/response/BrandModel';
import { ColorModel } from '../../models/response/ColorModel';
import { ModelModel } from '../../models/response/ModelModel';
import FilterFormCard from '../../components/CarsCards/FilterBarCard/FilterFormCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { FormOptionsType, fetchBrands, fetchColors, fetchModels, getPreSelectedOptions, mapDatasToFormOptionsType } from './helpers';

const FilterBar = () => {
    const filterState = useSelector((state: RootState) => state.filter);
    const [options, setOptions] = useState<FormOptionsType>({brandOptions:[], colorOptions:[], modelOptions: []});
    const [brands, setBrands] = useState<BrandModel[]>([]);
    const [models, setModels] = useState<ModelModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    let brandsResponse : BrandModel[];
    let modelsResponse : ModelModel[];
    let colorsResponse : ColorModel[];
    

    const fetchThemAllAndMap = async () => {
        brandsResponse = await fetchBrands();
        modelsResponse = await fetchModels();
        colorsResponse = await fetchColors();
        setBrands(brandsResponse);
        setModels(modelsResponse);
        setColors(colorsResponse);
        const allOptions = mapDatasToFormOptionsType(brandsResponse, modelsResponse, colorsResponse);
        setOptions(allOptions);
    }

    fetchThemAllAndMap();

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
                                selectedOptions={getPreSelectedOptions(filterState)}
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