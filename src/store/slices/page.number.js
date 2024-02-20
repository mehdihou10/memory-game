import {createSlice} from '@reduxjs/toolkit';

const pageNumberSlice = createSlice({

    initialState: 1,
    name: "pageNumberSlice",
    reducers: {

        changeActivePage: (state,action)=>{

            return action.payload;
        },

    }
})


export const {changeActivePage} = pageNumberSlice.actions;
export default pageNumberSlice.reducer;