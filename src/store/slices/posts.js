import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {url} from '../../api/api.url';


export const fetchPosts = createAsyncThunk('postsSlice/fetchPosts',async()=>{

    const result = await fetch(`${url}/api/posts`);
    const data = await result.json();

    return data;
})

const postsSlice = createSlice({
    initialState: [],
    name: "postsSlice",
    reducers: {

        addPostToPage: (state,action)=>{

            return [...state,action.payload]
        }
    },
    extraReducers:(builder)=> {

        builder.addCase(fetchPosts.fulfilled,(state,action)=>{

            return action.payload;
        })
    }
})


export const {addPostToPage} = postsSlice.actions;
export default postsSlice.reducer;