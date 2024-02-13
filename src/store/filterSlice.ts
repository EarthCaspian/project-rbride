import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BrandModel } from "../models/response/BrandModel";
import { ModelModel } from "../models/response/ModelModel";
import { ColorModel } from "../models/response/ColorModel";
import { RootState } from "./configureStore";

export interface FilterState {
    brands: BrandModel[];
    models: ModelModel[];
    colors: ColorModel[];
    minDailyPrice: number;
    maxDailyPrice: number;
}

const initialFilterSliceState : FilterState = {
    brands : JSON.parse(localStorage.getItem("brands") || JSON.stringify([])),
    models:  JSON.parse(localStorage.getItem("models") || JSON.stringify([])),
    colors:  JSON.parse(localStorage.getItem("colors") || JSON.stringify([])),
    minDailyPrice : JSON.parse(localStorage.getItem("minDailyPrice") || JSON.stringify(0)),
    maxDailyPrice : JSON.parse(localStorage.getItem("maxDailyPrice") || JSON.stringify(2000)),
};

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialFilterSliceState,
    reducers: {
        handleBrandSelection(state: FilterState, action: PayloadAction<BrandModel[]>) {
            state.brands = action.payload;
            localStorage.setItem("brands", JSON.stringify(state.brands));
        },
        handleModelSelection(state: FilterState, action: PayloadAction<ModelModel[]>) {
            state.models = action.payload;
            localStorage.setItem("models", JSON.stringify(state.models));
        },
        handleColorSelection(state: FilterState, action: PayloadAction<ColorModel[]>) {
            state.colors = action.payload;
            localStorage.setItem("colors", JSON.stringify(state.colors));
        },
        handleMinDailyPrice(state: FilterState, action: PayloadAction<number>) {
            state.minDailyPrice = action.payload;
            localStorage.setItem("minDailyPrice", JSON.stringify(state.minDailyPrice));
        },
        handleMaxDailyPrice(state: FilterState, action: PayloadAction<number>) {
            if (action.payload > 800)
                action.payload = initialFilterSliceState.maxDailyPrice;
            state.maxDailyPrice = action.payload;
            localStorage.setItem("maxDailyPrice", JSON.stringify(state.maxDailyPrice));
        },
        clearAllFilters(state: FilterState) {
            state.brands = [];
            state.models = [];
            state.colors = [];
            state.minDailyPrice = 0;
            state.maxDailyPrice = 2000;
            localStorage.setItem("brand", JSON.stringify(state.brands));
            localStorage.setItem("model", JSON.stringify(state.models));
            localStorage.setItem("color", JSON.stringify(state.colors));
            localStorage.setItem("minDailyPrice", JSON.stringify(state.minDailyPrice));
            localStorage.setItem("maxDailyPrice", JSON.stringify(state.maxDailyPrice));
        }
    }
})

export const {handleBrandSelection, handleModelSelection, handleColorSelection, handleMinDailyPrice, handleMaxDailyPrice, clearAllFilters} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
export const selectFilter = (state: RootState) => state.filter;
