import React from 'react'
import ExportDialogCanvas from './exportDialogCanvas';
import { useDispatch } from 'react-redux';
import {toggleExportDialog} from '../../../store/managementSlice';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

const ExportDialog = () => {
	const dispatch = useDispatch();

	const handleCloseDialog = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			dispatch(toggleExportDialog());
		}
	};


	return (
		<div className='dialog__overlay' onClick={(e) => handleCloseDialog(e)}>
			<div className='dialog__container'>
				<div className='dialog__header'>
					<h2>Export Canvas</h2>
					<div className='dialog__close' onClick={(e) => handleCloseDialog(e)}>
						<FontAwesomeIcon icon={faClose} style={{pointerEvents: 'none'}} />
					</div>
				</div>
				<div className="dialog__body">
					<ExportDialogCanvas />
				</div>
			</div>

		</div>
	)
}

export default ExportDialog