import { createSlice } from "@reduxjs/toolkit";

const initialUserState = { email: "", name: "", uid: "", authProvider: "" };

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUserData(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
      state.authProvider = action.payload.authProvider;
    },
    // getUserData(state) {
    //   return state;
    // },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
