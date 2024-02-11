import {configureStore} from '@reduxjs/toolkit';
import postsSlice from './slices/posts';
import updateSlice from "./slices/update.post";
import isUpdatedSlice from "./slices/isUpdated";
import userSlice from './slices/user';
import isSigned from './slices/isSigned';


export const store = configureStore({

    reducer: {
        posts: postsSlice,
        post: updateSlice,
        isUpdated: isUpdatedSlice,
        user: userSlice,
        isSigned
    }
})