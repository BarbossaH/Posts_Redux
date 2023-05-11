import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice';
const store = configureStore({
  reducer: {
    //this is the name of the state of postsReducer
    posts: postsReducer,
  },
});

export default store;
