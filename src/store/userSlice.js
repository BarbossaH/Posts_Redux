import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '0', name: 'Julian' },
  { id: '1', name: 'Xia' },
  { id: '2', name: 'Kevin' },
  { id: '3', name: 'Kevin' },
];
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const getAllUsersState = (state) => state.users;

export default userSlice.reducer;
