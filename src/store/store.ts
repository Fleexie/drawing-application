import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./canvasSlice";
import brushReducer from "./brushSlice";
import managementReducer from "./managementSlice";

export const store = configureStore({
  reducer: {
	canvas: canvasReducer,
	brush: brushReducer,
	management: managementReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;