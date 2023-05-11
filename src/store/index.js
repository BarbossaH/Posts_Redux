import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postSlice';
import userReducer from './userSlice';
const store = configureStore({
  reducer: {
    //this is the name of the state of postsReducer
    posts: postsReducer,
    users: userReducer,
  },
});

export default store;
