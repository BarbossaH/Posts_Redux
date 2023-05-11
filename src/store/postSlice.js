import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'Learn React',
    content: 'I am studying hard of react.',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'JavaScript',
    content: 'JS is powerful language.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
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
      //components don't need to know the structure of the state
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdd(state, action) {
      const { postId, reaction } = action.payload;
      const existPost = state.find((post) => post.id == postId);
      if (existPost) {
        existPost.reactions[reaction]++;
      }
    },
  },
});

export const getAllPostsState = (state) => state.posts;

export const { addPost, reactionAdd } = postSlice.actions;
// to name the reducer as postsReducer, we can also name it late when you import it, but we should set it as a default,this point is different from RTKQ, rtkq just export the whole api, not slice.reducer. Which way is better?

// export const { reducer: postsReducer } = postSlice;
export default postSlice.reducer;
