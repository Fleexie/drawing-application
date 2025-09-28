import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../utils/useDebounce'
import { useDispatch, useSelector } from 'react-redux'
import { setBrushColor, setBrushOpacity } from '../../../store/brushSlice'
import type { RootState } from '../../../store/store'



const ColorPicker = () => {
	const dispatch = useDispatch()
	const {color: colorStore} = useSelector((state: RootState) => state.brush)
	const [color, setColor] = useState<string>(colorStore)
	const [alpha, setAlpha] = useState<number>(1)

	const debouncedColor = useDebounce(color, 300)
	const debouncedAlpha = useDebounce(alpha, 300)

	const prevColorRef = useRef<string>(color);
	const prevAlphaRef = useRef<number>(alpha);

	useEffect(() => {
		if (colorStore !== prevColorRef.current) {
			setColor(colorStore)
			prevColorRef.current = colorStore;
		}
	}, [colorStore])

	useEffect(() => {
		if (prevColorRef.current !== debouncedColor) {
			dispatch(setBrushColor(`${debouncedColor}`))
			prevColorRef.current = `${debouncedColor}`;
			document.body.style.setProperty('--chosen-color', `${debouncedColor}`); // Update CSS variable for brush color
		}
		
		if (prevAlphaRef.current !== debouncedAlpha) {
			dispatch(setBrushOpacity(Number(debouncedAlpha)))
			prevAlphaRef.current = Number(debouncedAlpha);
		}

	}, [debouncedColor, debouncedAlpha])

	const handleColorChange = (newColor: string) => {
		setColor(newColor)
	}
	const handleAlphaChange = (newAlpha: number) => {
		if (newAlpha < 0) {
			setAlpha(0)
			return
		}
		if (newAlpha > 1) {
			setAlpha(1)
			return
		}
		setAlpha(newAlpha)
	}

	return (
		<>
			<h3>Color Picker</h3>
			<div className="toolbox__pickers">
				<input type="color" value={color} onChange={(e) => handleColorChange(e.target.value)} />
				<input type="text" value={color} onChange={(e) => handleColorChange(e.target.value)} maxLength={7} />
			</div>
			<h3>Opacity</h3>
			<div className="toolbox__pickers">
				<input 
					type="range" 
					min="0" 
					max="1" 
					step="0.01" 
					value={alpha} 
					onChange={(e) => handleAlphaChange(parseFloat(e.target.value))}
				/>
				<input type="number" 
					step={0.01} 
					min={0} 
					max={1}
					maxLength={1}
					value={alpha} 
					onChange={(e) => handleAlphaChange(parseFloat(e.target.value))} 
				/>
			</div>
		</>
	)
}

export default ColorPicker