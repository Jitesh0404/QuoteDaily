import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bgColor: "",
  quotesCollection : []
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    changeBg: (state, action) => {
      state.bgColor = action.payload;
    },
    addQuotes : (state,action)=>{
      state.quotesCollection = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeBg,addQuotes } = quoteSlice.actions;

export default quoteSlice.reducer;
