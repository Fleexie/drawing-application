namespace CanvasTypes {
	export interface CanvasLayer {
		id: string; // Unique identifier for the layer
		name: string; // Name of the layer
		visible: boolean; // Visibility status of the layer
		active: boolean; // Whether the layer is currently active (e.g., selected for editing)
		blendingMode: "normal" | "multiply" | "screen" | "overlay"; // Blending mode of the layer
	}

	export interface CanvasData {
		width: number; // Width of the canvas in pixels
		height: number; // Height of the canvas in pixels
		backgroundColor: string; // Background color of the canvas in hex format (e.g., "#FFFFFF")
		aspectRatio: number; // Aspect ratio of the canvas (width / height)
		canvasLayers: {x: CanvasLayer}; // Optional array of canvas layers
		canvasLayersSorted: CanvasLayer.id[] | string[]; // Optional array of canvas layers sorted by z-index
	}

	export interface ResizeCanvasData {
		width: CanvasData.width; // New width of the canvas in pixels
		height: CanvasData.height; // New height of the canvas in pixels
		direction: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"; // Direction of the resize action
	}

}