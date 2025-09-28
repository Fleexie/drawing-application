import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { setBrushSize as setBrushSizeDispatch } from '../../../store/brushSlice';
import { useDebounce } from '../../utils/useDebounce';

const BrushSize = () => {
	const dispatch = useDispatch();
	const {size} = useSelector((state: RootState) => state.brush);
	
	const [brushSize, setBrushSize] = useState(size);
	const debouncedSize = useDebounce(brushSize, 300);

	const handleBrushSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBrushSize(Number(event.target.value));
	};

	useEffect(() => {
		dispatch(setBrushSizeDispatch(Number(debouncedSize)))
	}, [debouncedSize]);

	return (
		<>
			<h3>Size</h3>
			<div className='toolbox__dual-input'>
				<input
					type="range"
					min={1}
					max={50}
					step={1}
					value={brushSize}
					onChange={handleBrushSizeChange}
				/>
				<input 
					type="number" 
					value={brushSize}
					onChange={handleBrushSizeChange}
					min={1}
					max={50}
				/>
			</div>
		</>
	)
}

export default BrushSize