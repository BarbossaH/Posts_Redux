import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

// const initialState = [
//   {
//     id: '1',
//     title: 'Learn React',
//     content: 'I am studying hard of react.',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: '2',
//     title: 'JavaScript',
//     content: 'JS is powerful language.',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

//create a adapter and sort it.
const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState({
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
  count: 0,
});
// const initialState = {
//   posts: [],
//   status: 'idle', // idle, loading, succeeded, failed
//   error: null,
//   count: 0,
// };

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (initialState) => {
    const { id } = initialState;
    try {
      const res = await axios.put(`${POSTS_URL}/${id}`, initialState);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (initialState) => {
    const { id } = initialState;
    try {
      const res = await axios.delete(`${POSTS_URL}/${id}`);
      if (res?.status === 200) return initialState;
      return `${res?.status}: ${res?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // addPost: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   //components don't need to know the structure of the state
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //         date: new Date().toISOString(),
    //         userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    reactionAdd(state, action) {
      const { postId, reaction } = action.payload;
      //because of using the adapter, entities now become the all post data
      // const existPost = state.posts.find((post) => post.id == postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    increaseCount(state, action) {
      // this function is for testing the performance of the project.
      state.count = state.count + 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        // add the fetched posts to the array
        // state.posts = state.posts.concat(loadedPosts);
        postAdapter.upsertMany(state, loadedPosts);
        // postAdapter.updateMany
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        // state.posts.push(action.payload);
        postAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        // console.log(action.payload.date);
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = [...posts, action.payload];
        postAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log('delete could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = posts;
        postAdapter.removeOne(state, id);
      });
  },
});

export const getAllPostsStatus = (state) => state.posts.status;
export const getAllPostsError = (state) => state.posts.error;
export const getCountState = (state) => state.posts.count;
//now we can use the adapter to get the state, and post id
// export const getAllPostsState = (state) => state.posts.posts;
// export const getPostById = (state, postId) => {
//   // console.log(state);
//   // return 0;
//   const thePost = state.posts.posts.find((post) => {
//     return post.id === Number(postId);
//   });
//   // console.log(thePost);
//   return thePost;
// };

//using es6 to destruct and rename the selectors not to change to much code
export const {
  selectAll: getAllPostsState,
  selectById: getPostById,
  selectIds: getPostIds,
  // passing in a selector that returns the posts slice of state
} = postAdapter.getSelectors((state) => state.posts);

export const getPostsByUser = createSelector(
  [getAllPostsState, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);
export const { increaseCount, reactionAdd } = postSlice.actions;
// to name the reducer as postsReducer, we can also name it late when you import it, but we should set it as a default,this point is different from RTKQ, rtkq just export the whole api, not slice.reducer. Which way is better?

// export const { reducer: postsReducer } = postSlice;
export default postSlice.reducer;
