import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {url} from '../../api/api.url';


export const fetchPosts = createAsyncThunk('postsSlice/fetchPosts',async(num)=>{

    let result;

    if(!num){

        result = await fetch(`${url}/api/posts`);
        
    } else{

        result = await fetch(`${url}/api/posts?page=${num}`);

    }
    
    const data = await result.json();

    return data;
})


const postsSlice = createSlice({
    initialState: [],
    name: "postsSlice",
    reducers: {

        addPostToPage: (state,action)=>{

            return [...state,action.payload]
        },

        updatePosts: (state,action)=>{

            console.log(action.payload)
            
            return action.payload
        }
    },
    extraReducers:(builder)=> {

        builder.addCase(fetchPosts.fulfilled,(state,action)=>{

            return action.payload;
        })

    }
})


export const {addPostToPage,updatePosts} = postsSlice.actions;
export default postsSlice.reducer;