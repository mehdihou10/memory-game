import {createSlice} from '@reduxjs/toolkit';

const updateSlice = createSlice({
    initialState: {creator: "", title: "", message: "",  tags: ""},
    name: "updateSlice",
    reducers: {

        updatePost: (state,action)=>{

            return action.payload;
        },

    }
})

export const {updatePost} = updateSlice.actions;
export default updateSlice.reducer;