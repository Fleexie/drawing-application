import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../store/store';
import { setBrushShape } from '../../../store/brushSlice'; // Adjust the import path as necessary


const BrushShape = () => {
	const dispatch = useDispatch();
	const shapeStore = useSelector((state: RootState) => state.brush.shape); // Adjust the type as per your state structure
	const brushShapes: string[] = ['round', 'square', 'triangle', 'diamond']; // Example shapes
	
	const handleShapeChange = (shape: brushShapes) => {
		// Logic to change the brush shape
		console.log(`Brush shape changed to: ${shape}`);
		// Dispatch an action or update state here
		dispatch(setBrushShape(shape)); // Dispatch the action to set the brush shape
	}
	return (
		<div>BrushShape</div>
	)
}

export default BrushShape