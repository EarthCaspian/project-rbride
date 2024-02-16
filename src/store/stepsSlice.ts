import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface stepsState {
    stepLevel: number;
}

const initialState: stepsState = {
    stepLevel : JSON.parse(localStorage.getItem("stepLevel") || JSON.stringify(0)),
};


const stepsSlice = createSlice({
    name: 'steps',
    initialState: initialState,
    reducers: {
        setStepLevel: (state, action: PayloadAction<number>) => {
            state.stepLevel = action.payload;
            localStorage.setItem("stepLevel", JSON.stringify(state.stepLevel));
        }
    },
})

export const {setStepLevel} = stepsSlice.actions;

export const stepsReducer = stepsSlice.reducer;
