import { createSlice, current } from "@reduxjs/toolkit";

const initialItemsState = { items: [] };

const itemSlice = createSlice({
  name: "items",
  initialState: initialItemsState,
  reducers: {
    getItems(state, action) {
      state.items = action.payload;
    },
    deleteItem(state, action) {
      var updatedArray = [...current(state).items];

      for (var i = 0; i < updatedArray.length; i++) {
        if (updatedArray[i].id === action.payload.id) {
          updatedArray.splice(i, 1);
        }
      }

      state.items = updatedArray;
    },
    createItem(state, action) {
      const currentArr = current(state).items;
      state.items = [...currentArr, action.payload];
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
