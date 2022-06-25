import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  message: "",
  type: "",
  open: false,
  id: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: { value: initialState },
  reducers: {
    setAlert: (state, action) => {
      const id = uuidv4();
      state.value = { ...action.payload, open: true, id };
    },
    removeAlert: (state) => {
      state.value = initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
