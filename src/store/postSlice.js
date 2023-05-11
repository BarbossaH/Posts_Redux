import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', title: 'Learn React', content: 'I am studying hard of react.' },
  { id: '2', title: 'JavaScript', content: 'JS is powerful language.' },
];
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // addPost(state, action) {
    //   //this state is an array
    //   console.log('add a new post');
    //   state.push(action.payload);
    // },
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const getAllPostsState = (state) => state.posts;

export const { addPost } = postSlice.actions;
// to name the reducer as postsReducer, we can also name it late when you import it, but we should set it as a default,this point is different from RTKQ, rtkq just export the whole api, not slice.reducer. Which way is better?

// export const { reducer: postsReducer } = postSlice;
export default postSlice.reducer;
