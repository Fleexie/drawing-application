namespace BrushTypes {
	export type brushShapes = 'round' | 'square' | 'triangle' | 'diamond'; // Define the brush shapes you want to support
	
	export interface BrushData {
		size: number; // Size of the brush in pixels
		color: string; // Color of the brush in hex format (e.g., "#FF0000")
		opacity: number; // Opacity of the brush (0 to 1)]
		shape: brushShapes; // Shape of the brush
		swatches: string[]; // Array of color swatches for quick selection
		toolType: "brush" | "eraser"; // Type of tool, can be brush or eraser
	}
}