import {createSlice} from "@reduxjs/toolkit";

const isUpdatedSlice = createSlice({

    initialState: false,
    name: "isUpdatedSlice",
    reducers: {

        changeUpdateStatus: (state,action)=>{

            return !state;
        }
    }

})

export const {changeUpdateStatus} = isUpdatedSlice.actions;
export default isUpdatedSlice.reducer;