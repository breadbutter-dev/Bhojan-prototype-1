import { createSlice } from "@reduxjs/toolkit";

const initialItemsState = { items: [] };

const itemSlice = createSlice({
  name: "items",
  initialState: initialItemsState,
  reducers: {
    getItems(state, action) {
      state.items = action.payload;
    },
    deleteItem(state, action) {
      var updatedArray = [...state.items];

      for (var i = 0; i < updatedArray.length; i++) {
        if (updatedArray[i] === action.payload) {
          updatedArray.splice(i, 1);
        }
      }
      state.items = updatedArray;
    },
    createItem(state, action) {
      state.items = state.items.push(action.payload);
    },
    updateItem(state, action) {
      const tempArray = [...state.items];
      tempArray.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action.payload };
        }
      });
    },
  },
});

export const itemAction = itemSlice.actions;
export default itemSlice.reducer;
