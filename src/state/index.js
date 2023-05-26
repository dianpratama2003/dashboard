import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSettingSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const selectMode = (state) => state.globalSettings.mode;
export const { setMode } = globalSettingSlice.actions;
export default globalSettingSlice.reducer;
