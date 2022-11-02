import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./items";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    item: itemReducer,
    user: userReducer,
  },
});

export default store;
