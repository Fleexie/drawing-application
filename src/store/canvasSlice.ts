import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CanvasData, CanvasLayer } from "../types";

/* interface CanvasState {
  width: number;
  height: number;
} */

const initialState: CanvasData = {
  width: 800,
  height: 600,
  backgroundColor: "#FFFFFF", // Default white background
  aspectRatio: 800 / 600, // Default aspect ratio based on initial width and height
  canvasLayers: {}, // Initially no layers
  canvasLayersSorted: [], // Initially no sorted layers
};

const setActiveLayerLogic = (state: CanvasData, layerId: string) => {
	state.canvasLayersSorted.forEach((id: string) => {
		state.canvasLayers[id].active = (id === layerId); // Set the active layer
	});
}

let numberOfLayers = 0; // Initialize a counter for the number of layers

export const canvasSlice = createSlice({
	name: "canvas",
	initialState,
	reducers: {
		setCanvasSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
			state.width = action.payload.width;
			state.height = action.payload.height;
			document.body.style.setProperty('--canvas-width', action.payload.width + 'px'); // Update CSS variable for canvas width
			document.body.style.setProperty('--canvas-height', action.payload.height + 'px'); // Update CSS variable for canvas width
		},
		setCanvasBackgroundColor: (state, action: PayloadAction<string>) => {
			state.backgroundColor = action.payload;
		},
		setCanvasAspectRatio: (state) => {
			state.aspectRatio = state.width / state.height;
		},
		setCanvasLayers: (state, action: PayloadAction<CanvasData["canvasLayers"]>) => {
			state.canvasLayers = action.payload;
		},
		addCanvasLayer: (state, action?: PayloadAction<boolean>) => {
			const id = 'layer-' + ++numberOfLayers; // Generate a new unique ID
			const newLayer = {} as CanvasLayer; // Create a new layer object
			newLayer.id = id; // Assign the new ID to the layer
			newLayer.name = id; // Set the name to the ID for simplicity
			newLayer.visible = true; // Set the layer to be visible by default
			newLayer.blendingMode = "normal"; // Set the default blending mode
			if (action?.payload) {
				newLayer.active = true; // If forceActive is true, set the layer as active
			}
			state.canvasLayers[id] = newLayer; // Add the new layer to the canvasLayers object
			state.canvasLayersSorted.unshift(id); // Add the new layer ID to the sorted layers array
			setActiveLayerLogic(state, id) // Set the new layer as the active layer
			
		},
		setCanvasLayersSorted: (state, action: PayloadAction<CanvasData["canvasLayersSorted"]>) => {
			state.canvasLayersSorted = action.payload;
		},
		setCanvasName: (state, action: PayloadAction<{ id: string; name: string }>) => {
			const { id, name } = action.payload;
			if (state.canvasLayers[id]) {
				state.canvasLayers[id].name = name; // Update the layer's name
			}
		},
		deleteLayer: (state, action: PayloadAction<string>) => {
			const layerId = action.payload;

			// Check if the layer exists
			if (state.canvasLayers[layerId]) {
				const isActiveLayer = state.canvasLayers[layerId].active; // Check if the layer is active
				delete state.canvasLayers[layerId]; // Remove the layer from canvasLayers
				state.canvasLayersSorted = state.canvasLayersSorted.filter((id: string) => id !== layerId); // Remove the layer ID from sorted layers
		
				// If the deleted layer was active, set the first layer in the sorted list as active
				if (isActiveLayer && state.canvasLayersSorted.length > 0) {
					const firstLayerId = state.canvasLayersSorted[0];
					setActiveLayerLogic(state, firstLayerId);
				} else if (!isActiveLayer) {
					const activeLayerId = state.canvasLayersSorted.find((id: string) => state.canvasLayers[id]?.active);
					if (activeLayerId) {
						setActiveLayerLogic(state, activeLayerId); // Reapply active state to the current active layer
					}
				}
			}
			/* const layerId = action.payload;
			let isActiveLayer = false;

			// Check if the layer exists and is active
			if (state.canvasLayers[layerId]) {
				isActiveLayer = state.canvasLayers[layerId].active; // Check if the layer is active
				delete state.canvasLayers[layerId]; // Remove the layer from canvasLayers
				state.canvasLayersSorted = state.canvasLayersSorted.filter((id: string) => id !== layerId); // Remove the layer ID from sorted layers
			}

			console.log('isActiveLayer:', isActiveLayer);
			console.log('state.canvasLayersSorted:', state.canvasLayersSorted);

			// If the deleted layer was active, set the first layer in the sorted list as active
			if (isActiveLayer && state.canvasLayersSorted.length > 0) {
				const firstLayerId = state.canvasLayersSorted[0];
				// Set the first layer as active
				setActiveLayerLogic(state, firstLayerId);
			} else if (!isActiveLayer && state.canvasLayersSorted.length > 0) {
				// Ensure the active layer remains unchanged when deleting a non-active layer
				const activeLayerId = state.canvasLayersSorted.find((id: string) => state.canvasLayers[id]?.active);
				if (activeLayerId) {
					console.log('Active layer remains unchanged:', activeLayerId);
				} else {
					// If no active layer exists, set the first layer as active
					const firstLayerId = state.canvasLayersSorted[0];
					setActiveLayerLogic(state, firstLayerId);
				}
			}

			console.log('state.canvasLayers:', state.canvasLayers); */
		},
		toggleVisibility: (state, action: PayloadAction<string>) => {
			const layerId = action.payload;
			if (state.canvasLayers[layerId]) {
				state.canvasLayers[layerId].visible = !state.canvasLayers[layerId].visible; // Toggle visibility
			}
		},
		setActiveLayer: (state, action: PayloadAction<string>) => {
			const layerId = action.payload;
			setActiveLayerLogic(state, layerId); // Set the active layer
		}
	},
})

export const { setCanvasSize, setCanvasBackgroundColor, setCanvasAspectRatio, setCanvasLayers, addCanvasLayer, setCanvasLayersSorted, setCanvasName, deleteLayer, toggleVisibility, setActiveLayer } = canvasSlice.actions;
export default canvasSlice.reducer;