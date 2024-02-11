import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({

    initialState: {},
    name: "userSlice",
    reducers: {

        getUser: (state,action)=>{

            return action.payload;
        }
    }
})


export const {getUser} = userSlice.actions;
export default userSlice.reducer;