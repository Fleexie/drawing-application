import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../store/store';
import { setBrushShape } from '../../../store/brushSlice'; 


const BrushShape = () => {
	const dispatch = useDispatch();
	const shapeStore = useSelector((state: RootState) => state.brush.shape); 
	const brushShapes: string[] = ['round', 'square', 'triangle', 'diamond']; 
	
	const handleShapeChange = (shape: brushShapes) => {
		console.log(`Brush shape changed to: ${shape}`);
		dispatch(setBrushShape(shape)); 
	}
	return (
		<div>BrushShape</div>
	)
}

export default BrushShape