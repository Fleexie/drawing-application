import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setToolType } from '../../../store/brushSlice'; // Adjust the import path as necessary
import type { RootState } from '../../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintbrush, faEraser } from '@fortawesome/free-solid-svg-icons';

const BrushTools = () => {
	const dispatch = useDispatch();
	const toolType = useSelector((state: RootState) => state.brush.toolType); // Assuming you have a toolType in your brush state

	const handleChooseBrushEraser = (type: 'brush' | 'eraser') => {
		dispatch(setToolType(type)); // Dispatch the action to set the brush shape
	}

	return (
		<div className='tools__brushes'>
			<button className={toolType==='brush' ? 'active' : ''} data-brush="brush" onClick={() => {
				handleChooseBrushEraser('brush')
			}}>
				<FontAwesomeIcon icon={faPaintbrush} />
			</button>
			<button className={toolType==='eraser' ? 'active' : ''} data-brush="eraser" onClick={() => {
				handleChooseBrushEraser('eraser')
			}}>
				<FontAwesomeIcon icon={faEraser} />
			</button>

			<span>{toolType === 'brush' ? 'Drawing' : 'Erasing'}</span>
		</div>
	)
}

export default BrushTools