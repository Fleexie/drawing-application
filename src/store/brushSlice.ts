import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BrushData } from "../types";

const initialState: BrushData = {
  size: 5,
  color: "#000000",
  opacity: 1.0, // Default opacity
  shape: "round", // Default brush shape
  swatches: [],
  toolType: "brush" // Default tool type
};

export const brushSlice = createSlice({
  name: "brush",
  initialState,
  reducers: {
	setBrushSize: (state, action: PayloadAction<number>) => {
	  state.size = action.payload;
	},
	setBrushColor: (state, action: PayloadAction<string>) => {
	  state.color = action.payload;
	},
	setBrushOpacity: (state, action: PayloadAction<number>) => {
	  state.opacity = action.payload;
	},
	setBrushShape: (state, action: PayloadAction<"round" | "square">) => {
	  state.shape = action.payload;
	},
	addToSwatches: (state, action: PayloadAction<string>) => {
		const color = action.payload;
		if (!state.swatches.includes(color)) {
			state.swatches.unshift(color); // Add color to swatches if not already present
			if (state.swatches.length > 10) {
				state.swatches.shift(); // Remove the oldest swatch if more than 10 colors
			}
		}
	},
	setToolType: (state, action: PayloadAction<"brush" | "eraser">) => {
	  state.toolType = action.payload;
	},
  },
});

export const { setBrushSize, setBrushColor, setBrushOpacity, setBrushShape, addToSwatches, setToolType } = brushSlice.actions;

export default brushSlice.reducer;