import { createSlice } from "@reduxjs/toolkit";

const initialStateValue =
  localStorage.getItem("THEME") === "dark" ? true : false;

export const themeSlice = createSlice({
  name: "theme",

  initialState: { value: initialStateValue },
  reducers: {
    changeTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

//export the reducer to use it in the index file
export default themeSlice.reducer;
