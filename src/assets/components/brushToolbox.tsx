import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../store/store';
import {toggleToolbox} from '../../store/managementSlice';

import ColorPicker from './tools/colorPicker';
import Swatches from './tools/swatches';
import BrushSize from './tools/brushSize';

import {motion} from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import BrushTools from './tools/brushTools';

const BrushToolbox = () => {
	const {leftToolboxOpen} = useSelector((state: RootState) => state.management);
		
	const dispatch = useDispatch()

	const handleToggleToolbox = () => {
		dispatch(toggleToolbox('left'));
	}


	return (
		<>
			<motion.div 
			initial={{x: '-100%'}}
			animate={{x: leftToolboxOpen ? '5%' : '-90%'}}
			transition={{duration: 0.2, ease: 'easeInOut'}}
			whileHover={{x: !leftToolboxOpen ? '-70%' : '5%'}}

				className='toolbox'
			>
				<div className="toolbox__header">
					<h2>Toolbox</h2>
					<button 
						className="toolbox__close"
						onClick={() => handleToggleToolbox()}
					>
						<FontAwesomeIcon icon={leftToolboxOpen ? faChevronLeft : faChevronRight} />
					</button>
				</div>
				<h3>Draw mode</h3>
				<BrushTools />
				<hr />
				<h2>Brush</h2>
				<BrushSize />
				<h2>Color</h2>
				<ColorPicker />
				<Swatches />
			</motion.div>
		</>
	)
}

export default BrushToolbox