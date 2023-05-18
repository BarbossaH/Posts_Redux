import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
// const initialState = [
//   { id: '0', name: 'Julian' },
//   { id: '1', name: 'Xia' },
//   { id: '2', name: 'Kevin' },
//   { id: '3', name: 'Lucy' },
// ];

const initialState = [];
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(USERS_URL);
    // console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //because it won't load the user data again, this place just return the payload
      return action.payload;
    });
  },
});

export const getAllUsersState = (state) => state.users;
export const getUserByIdState = (state, userId) =>
  state.users.find((user) => user.id === Number(userId));

export default userSlice.reducer;
