import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, xp: 150 },
  value: {
    token: null,
    username: null,
    userId: null,
    profile: null,
    tasks: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.userId = action.payload.userId;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.userId = null;
      state.value.profile = null;
      state.value.tasks = [];
    },
    setProfile: (state, action) => {
      state.value.profile = action.payload;
    },
    setTasks: (state, action) => {
      state.value.tasks = action.payload;
    },
  },
});

export const { login, logout, setProfile, setTasks } = userSlice.actions;
export default userSlice.reducer;
