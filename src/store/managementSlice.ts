import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ManagementData } from "../types";


const initialState: ManagementData = {
	openExportDialog: false, // Whether the export dialog is open
	leftToolboxOpen: true, // Whether the left toolbox is open
	rightToolboxOpen: true, // Whether the right toolbox is open
};

export const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {
	toggleExportDialog: (state) => {
	  state.openExportDialog = !state.openExportDialog;
	},
	toggleToolbox: (state, action: PayloadAction<"left" | "right">) => {
	  if (action.payload === "left") {
		state.leftToolboxOpen = !state.leftToolboxOpen;
	  } else if (action.payload === "right") {
		state.rightToolboxOpen = !state.rightToolboxOpen;
	  }
	},
  },
});

export const { toggleExportDialog, toggleToolbox } = managementSlice.actions;

export default managementSlice.reducer;