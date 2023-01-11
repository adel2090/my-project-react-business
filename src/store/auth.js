import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialAuthState = {
  isConnected: false,
  userInfo: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isConnected = true;
      console.log("redux true");
      state.userData = action.payload;
    },

    logout(state) {
      state.isConnected = false;
      console.log("redux false");
      state.userData = null;
    },

    userInfoUpdate(state, actions) {
      state.userInfo = actions.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
