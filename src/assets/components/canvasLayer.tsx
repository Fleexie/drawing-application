import React, { useState, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'

interface Props {
	layerId: string
}

const CanvasLayerItem = (props: Props) => {
	const {layerId} = props
	const {canvas, brush, layer} = useSelector((state: RootState) => ({
		canvas: state.canvas,
		brush: state.brush,
		layer: state.canvas.canvasLayers[layerId],
		isLastLayer: state.canvas.canvasLayersSorted[state.canvas.canvasLayersSorted.length - 1] === layerId
	})) 

	const canvasContext = useRef<HTMLCanvasElement>(null)
	const contextRef = useRef<CanvasRenderingContext2D | null>(null)
	const [isDrawing, setIsDrawing] = useState<boolean>(false)

	const savedTempImage = useRef<HTMLImageElement>(null)

	const canvasSize = useRef<{width: number, height: number}>({
		width: canvas.width,
		height: canvas.height
	})


	// Initialize settings for the canvas.
	useEffect(() => {
		const canvasRef = canvasContext.current
		if (!canvasRef) return

		const currentData = {w: canvasRef.width, h: canvasRef.height}

		console.log('currentData', currentData)
		console.log('canvas', canvas)
		console.log('canvasSize.current', canvasSize.current)

		canvasRef.width = canvas.width * 2;
		canvasRef.height = canvas.height * 2;
		canvasRef.style.width = `${canvas.width}px`
		canvasRef.style.height = `${canvas.height}px`
		const ctx = canvasRef.getContext('2d')
		if (!ctx) return
		contextRef.current = ctx
		contextRef.current.scale(2, 2) // Scale the context to match the canvas size
		contextRef.current.imageSmoothingQuality = 'high' // Set image smoothing quality to high
		contextRef.current.lineJoin = 'round' // Set line join style to round


		console.log('tempImage', savedTempImage.current)
		// Restore the saved content if it exists
		if (savedTempImage.current && savedTempImage.current.src) {
			contextRef?.current?.drawImage(savedTempImage.current, 0, 0, savedTempImage.current.naturalWidth, savedTempImage.current.naturalHeight, 0, 0, canvasSize.current.width, canvasSize.current.height)

			savedTempImage.current.onerror = (err) => {
				console.error('Error loading image:', err)
			}
		}

		canvasSize.current = {width: canvas.width, height: canvas.height}

	}, [canvas.width, canvas.height])

	useEffect(() => {
		if (contextRef.current === null) return
		contextRef.current.strokeStyle = /* 'rgba(137, 126, 126, 0.09)' */ brush.color
		contextRef.current.lineWidth = brush.size
		contextRef.current.globalAlpha = brush.opacity
		contextRef.current.lineCap = brush.shape || 'round'
		//contextRef.current.shadowBlur = 25 // Reset shadow blur
		//contextRef.current.shadowColor = brush.color // Reset shadow color
		//contextRef.current.shadowOffsetX = 0 // Reset shadow offset X
		//contextRef.current.shadowOffsetY = 0 // Reset shadow offset Y

		contextRef.current.globalCompositeOperation = 'source-over' // Set composite operation for eraser
		if (brush.toolType === 'eraser') {
			contextRef.current.globalCompositeOperation = 'destination-out' // Set composite operation for eraser
		}

	}, [brush.size, brush.color, brush.opacity, brush.shape, brush.toolType])

	// Handle mouse events for drawing on the canvas.
	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const {offsetX, offsetY} = e.nativeEvent
		// Handle mouse down event
		contextRef.current?.beginPath();
		contextRef.current?.moveTo(offsetX, offsetY);
		setIsDrawing(true)
	}
	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const {offsetX, offsetY} = e.nativeEvent
		// Handle mouse move event
		if (!isDrawing || !contextRef.current) return
		contextRef.current.lineTo(offsetX, offsetY);
		contextRef.current.lineCap = brush.shape || 'round';
		contextRef.current.lineJoin = brush.shape || 'round';
		contextRef.current.stroke();
		contextRef.current.moveTo(offsetX, offsetY);
		contextRef.current.save();


	}
	const handleMouseUp = () => {
		// Handle mouse up event
		contextRef.current?.closePath();
		setIsDrawing(false)

		const canvasRef = canvasContext.current
		if (!canvasRef) return

		const tempImage = new Image()

		console.log('canvasRef', canvasRef)
		canvasRef.toBlob((blob) => {
			if (!blob) {
				console.error('Failed to create blob from canvas')
				return
			}
			console.log('blob created:', blob)
			tempImage.src = URL.createObjectURL(blob)
			savedTempImage.current = tempImage // Save the current content of the canvas
		}) 
	}

	const getClasses = () => {
		let classes = 'canvas__layer'
		if (!layer.active) {
			classes += ' inactive'
		}
		if (!layer.visible) {
			classes += ' hidden'
		}
		return classes
	}


	return ( 
		<canvas 
			ref={canvasContext}
			width={canvas.width}
			height={canvas.height}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}	
			onMouseUp={handleMouseUp}
			className={getClasses()}
			data-layer-id={layerId}
		/>
	)
}

export default CanvasLayerItem