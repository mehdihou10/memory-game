import {createSlice} from '@reduxjs/toolkit';

const isSigned = createSlice({

    initialState: false,
    name: "isSignedSlice",
    reducers: {

        verifyUser: (state,action)=>{

            return action.payload;
        }
    }
})


export const {verifyUser} = isSigned.actions;
export default isSigned.reducer;