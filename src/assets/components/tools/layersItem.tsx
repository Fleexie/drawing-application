import React, { useEffect, useState } from 'react'
import type { CanvasLayer } from '../../../types'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';

import {setCanvasName, deleteLayer, toggleVisibility, setActiveLayer} from '../../../store/canvasSlice';
import { useDispatch } from 'react-redux';
import { motion } from "motion/react"

interface LayerItemProps {
	id: string,
	layer: CanvasLayer,
	canDelete: boolean,
	isLastLayer: boolean
}

const LayersItem = (props: LayerItemProps) => {
	const dispatch = useDispatch();
	const { id, layer, canDelete, isLastLayer } = props;
	const [isRenaming, setIsRenaming] = useState<boolean>(false);
	const [name, setName] = useState<string>(layer.name);
	const [debouncedName, setDebouncedName] = useState<string>(layer.name);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedName(name);
		}, 300); // Debounce time in milliseconds

		return (() => {
			clearTimeout(handler);
		});		
	}, [name]);

	const handleRename = () => {
		// Logic to rename the layer
		if (debouncedName !== name) {
			return setTimeout(() => {handleRename()}, 300);
		} else {
			dispatch(setCanvasName({id, name: debouncedName}));
		}
	}

	const handleToggleVisibility = () => {
		if (isLastLayer) return; 
		dispatch(toggleVisibility(id)); 
	}

	const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();
		// Logic to delete the layer
		if (!canDelete || isLastLayer) return; // Prevent deletion if not allowed
		dispatch(deleteLayer(id)); // Dispatch the action to delete the layer
	}

	const handleActiveLayer = () => {
		if (layer.active) return;
		dispatch(setActiveLayer(id)); // Dispatch the action to set the active layer
	}

	const getClasses = () => {
		let classes = 'layers__item';
		if (layer.active) {
			classes += ' active';
		}
		return classes;
	}

	return (
		<motion.div 
			className={getClasses()} 
			onClick={() => handleActiveLayer()}
			initial={{opacity: 0, scale: 0.95, right: -50}}
			animate={{opacity: 1, scale: 1, right: 0}}
			exit={{opacity: 0, scale: 0.95, right: -50}}
		>
			<div className='layers__item__controls'>
				{isRenaming ? (
					<motion.input 
						/* Motion */
						initial={{translateX: -40, scaleX: 0.75}}
						animate={{translateX: 0, scaleX: 1}}
						exit={{translateX: -40, scaleX: 0.75}}
						transition={{duration: 0.3}}
						/* Rest */
						autoFocus={true}
						type="text" 
						value={name}
						onChange={(e) => setName(e.target.value)}
						defaultValue={name} 
						onBlur={(e) => {
							handleRename();
							setIsRenaming(false);
						}} 
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleRename();
								setIsRenaming(false);
							}
						}}
					/>
				) : (
					<>
						<span>{layer.name}</span>
						<motion.button 
							/* Motion */
							initial={{translateX: 5}}
							animate={{translateX: 0}}
							transition={{duration: 0.3}}
							type="button"
							onClick={() => setIsRenaming(true)}
						>
							<FontAwesomeIcon icon={faPen} className='square'/>
						</motion.button>
					</>
				)}
				<button type="button" onClick={() => handleToggleVisibility()} disabled={isLastLayer} className='square'>
					{!layer.visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
				</button>
				<button type="button" className='delete square' onClick={(e) => handleDelete(e)} disabled={!canDelete || isLastLayer}><FontAwesomeIcon icon={faTrashCan} /></button>
			</div>
		</motion.div>
	)
}

export default LayersItem