import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'
import { addCanvasLayer } from '../../../store/canvasSlice'
import LayersItem from './layersItem'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence } from "motion/react"

const Layers = () => {
	const dispatch = useDispatch();
	const {sorted, layers} = useSelector((state: RootState) => {
		return {
			sorted: state.canvas.canvasLayersSorted,
			layers: state.canvas.canvasLayers
		}
	});

	const handleAddLayer = () => {
		dispatch(addCanvasLayer())
	}

	return (
		<AnimatePresence>
			<div className='layers__header'>
				<h2>Layers</h2>
				<button onClick={() => handleAddLayer()}><FontAwesomeIcon icon={faAdd} /></button>
			</div>
			{sorted.map((layerId: string) => {
				const isLastLayer = sorted[sorted.length - 1] === layerId
				return (
					<LayersItem
						key={layerId}
						id={layerId}
						layer={layers[layerId]} 
						canDelete={Object.keys(layers).length > 1} 
						isLastLayer={isLastLayer} 
					/>
				)
			})}
		</AnimatePresence>
	)
}

export default Layers