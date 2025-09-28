import React from 'react'

import Layers from './tools/layers'
import ExportDialog from './dialogs/exportDialog'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { useDispatch } from 'react-redux'
import { toggleExportDialog, toggleToolbox } from '../../store/managementSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {motion} from 'motion/react';

const Toolbox = () => {
	const dispatch = useDispatch()
	const {openExportDialog, rightToolboxOpen} = useSelector((state: RootState) => state.management)
	
	const handleOpenExportDialog = () => {
		dispatch(toggleExportDialog())
	}

	const toggleToolboxFunc = () => {
		dispatch(toggleToolbox('right'));
	}

	return (
		<>
			<motion.div 
				className='toolbox'
				initial={{x: '100%'}}
				animate={{x: rightToolboxOpen ? '-5%' : '90%'}}
				transition={{duration: 0.2, ease: 'easeInOut'}}
				whileHover={{x: !rightToolboxOpen ? '70%' : '-5%'}}
			>
				<div className="toolbox__header">
					<button 
						className="toolbox__close"
						onClick={toggleToolboxFunc}
					>
						<FontAwesomeIcon icon={!rightToolboxOpen ? faChevronLeft : faChevronRight} />
					</button>
					<h2>Canvas Tools</h2>
				</div>
					
				<Layers />
				<button onClick={handleOpenExportDialog}>Open Export</button>
			</motion.div>
			{openExportDialog ? (
				<ExportDialog />
			) : null}
		</>
	)
}

export default Toolbox