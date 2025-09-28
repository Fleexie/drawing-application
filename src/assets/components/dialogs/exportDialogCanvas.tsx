import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';

const ExportDialogCanvas = () => {
	const {canvasLayers: canvasLayersSore, canvasLayersSorted} = useSelector((state: RootState) => state.canvas);

	const mergedCanvasRef = useRef<HTMLCanvasElement>(null);

	const [canvasWidth, setCanvasWidth] = useState<number>(800);
	const [canvasHeight, setCanvasHeight] = useState<number>(600);

	const [includeHidden, setIncludeHidden] = useState<boolean>(false);





	const flattenCanvasLayers = (canvasLayers: HTMLCanvasElement[]) => {
		const mergedCanvas = mergedCanvasRef.current;
		const ctx = mergedCanvas?.getContext('2d');
		// Logic to flatten canvas layers
		const width = canvasLayers[0].width;
		const height = canvasLayers[0].height;

		console.log('mergedCanvas', mergedCanvas)
		console.log('ctx', ctx)

		if (!ctx || !mergedCanvas) return;

		mergedCanvas.width = width;
		mergedCanvas.height = height;

		canvasLayers.forEach((layer) => {
			ctx.drawImage(layer, 0, 0, width, height);
		});

		console.log('mergedCanvasRef', mergedCanvasRef)

		if (mergedCanvasRef.current) {
			const dataUrl = mergedCanvas.toDataURL('image/png');

			console.log('dataUrl', dataUrl)
			return dataUrl;
		}
	}

	const handleExport = () => {
		const canvasLayers = document.querySelectorAll('[data-layer-id]') as NodeListOf<HTMLCanvasElement>;
		console.log('canvasLayersSore', canvasLayersSore)
		console.log('canvasLayers', canvasLayers)
		let layersArray = Array.from(canvasLayers);

		if (!includeHidden) {
			layersArray = layersArray.filter((layer) => {
				if (!layer) return false;
				const layerId = layer.getAttribute('data-layer-id');
				if (!layerId || !canvasLayersSore[layerId] || !canvasLayersSore[layerId].visible) return false;
				return true;
			})
		}

		console.log('layersArray', layersArray)

		const flattenedDataUrl = flattenCanvasLayers(layersArray as HTMLCanvasElement[]);

		console.log('flattenedDataUrl', flattenedDataUrl)
	}

	useEffect(() => {
		handleExport();
	}, [includeHidden]);

	const handleToggleIncludeHidden = () => {
		setIncludeHidden(prev => !prev);
	}


	return (
		<div id='export-dialog-canvas'>
			<canvas ref={mergedCanvasRef}
				width={canvasWidth}
				height={canvasHeight}
				className='canvas__preview'
			/>

			<button onClick={handleExport}>Try Export</button>
			<button onClick={handleToggleIncludeHidden}>Include Hidden</button>
		</div>
	)
}

export default ExportDialogCanvas