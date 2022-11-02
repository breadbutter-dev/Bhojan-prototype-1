import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./items";

const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});

export default store;
