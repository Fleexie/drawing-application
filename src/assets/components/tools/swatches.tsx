import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../../store/store'
import { addToSwatches, setBrushColor } from '../../../store/brushSlice'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';

const Swatches = () => {
	const dispatch = useDispatch()
	const {swatches, color} = useSelector((state: RootState) => state.brush)

	const handleAddSwatch = () => {
		dispatch(addToSwatches(color))
	}

	const handleSwatchColorChange = (swatch: string) => {
		dispatch(setBrushColor(swatch))
		document.body.style.setProperty('--chosen-color', swatch); // Update CSS variable for brush color
	}
		
	return (
		<>
			<h3>Swatches</h3>
			<div className="toolbox__swatches">
				{swatches.map((swatch: string, index: number) => (
					<button 
						key={swatch + index} 
						className="toolbox__swatch" 
						style={{ backgroundColor: swatch }}
						onClick={() => handleSwatchColorChange(swatch)}
					></button>
				))}
				<button onClick={handleAddSwatch} className="toolbox__swatch" ><FontAwesomeIcon icon={faAdd} /></button>
			</div>
		</>
	)
}

export default Swatches