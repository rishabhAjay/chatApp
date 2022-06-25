import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: { value: initialState },
  reducers: {
    addSelectedUserProfile: (state, action) => {
      state.value.selectedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSelectedUserProfile } = chatSlice.actions;

export default chatSlice.reducer;
