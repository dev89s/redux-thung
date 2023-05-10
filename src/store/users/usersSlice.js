import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const USER_URL = 'https://jsonplaceholder.typicode.com/users/';

export const fetchUsers = createAsyncThunk('usersState/fetchUsers',
  async (name, thunkAPI) => {
    try {
      const resp = await fetch(USER_URL);
      const data = await resp.json();
      return [...data];
    } catch (err) {
      thunkAPI.rejectWithValue(err);
      throw err;
    }
  }
)

const initialState = {
  userList: [],
  isLoading: false,
  error: undefined,
};

const usersSlice = createSlice({
  name: 'usersState',
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.isLoading = false;
      state.error = false;
    }).addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    }).addCase(fetchUsers.rejected, (state, action) => {
      state.userList = [];
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const { extraReducers } = usersSlice.actions;

export default usersSlice.reducer;
