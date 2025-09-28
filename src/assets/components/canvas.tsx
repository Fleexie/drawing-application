import React, { useEffect, useRef, type ReactHTMLElement } from 'react'
import type { RootState } from '../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import {addCanvasLayer, setCanvasSize} from '../../store/canvasSlice'
import CanvasLayerItem from './canvasLayer'

const Canvas = () => {
	const dispatch = useDispatch()
	const {brush, canvas} = useSelector((state: RootState) => {
		return {
			brush: state.brush,
			canvas: state.canvas
		}
	})

	const firstRender = useRef<boolean>(true)
	const containerRef = useRef<HTMLDivElement>(null)
	const brushRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		//Handle initial layer addition if no layers exist
		if (canvas.canvasLayersSorted.length === 0 && firstRender.current) {
			dispatch(addCanvasLayer(true))
			firstRender.current = false
		}

		document.addEventListener('mouseup', (e) => {
			if (resizeActive) {
				setResizeActive(false)

				document.removeEventListener('mouseup', () => {})
			}
			return
		})

		return () => {
			document.removeEventListener('mouseup', () => {})
		}
	},[])


	const [resizeActive, setResizeActive] = React.useState<boolean>(false)
	const [startCoords, setStartCoords] = React.useState<{x: number, y: number}>({x: 0, y: 0})
	const handleDirectionLogic = (direction: string, deltaX: number, deltaY: number) => {
		let width: number = null;
		let height: number = null;

		switch (direction) {
			case 'top':
				if (deltaY < 0) {
					height = canvas.height + Math.abs(deltaY)
				}
				if (deltaY > 0) {
					height = canvas.height - Math.abs(deltaY)
				}
			break;
			case 'bottom':
				if (deltaY > 0) {
					height = canvas.height + Math.abs(deltaY)
				}
				if (deltaY < 0) {
					height = canvas.height - Math.abs(deltaY)
				}
			break;
			case 'left':
				if (deltaX < 0) {
					width = canvas.width + Math.abs(deltaX)
				}
				if (deltaX > 0) {
					width = canvas.width - Math.abs(deltaX)
				}
			break;
			case 'right':
				if (deltaX > 0) {
					width = canvas.width + Math.abs(deltaX)
				}
				if (deltaX < 0) {
					width = canvas.width - Math.abs(deltaX)
				}
			break;
		}

		return {x: width, y: height}
	}

	const canvasResizeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		// Drag start setting coords and activating resize
		if (e.type === 'dragstart') {
			setResizeActive(true)
			setStartCoords({x: e.clientX, y: e.clientY})
		}

		if (e.type === 'dragend') {
			setResizeActive(false)
			const coords = {x: e.clientX, y: e.clientY}
			const deltaX = coords.x - startCoords.x
			const deltaY = coords.y - startCoords.y

			setStartCoords({x: 0, y: 0}) // Reset start coordinates after resizing
			const directions = e?.target?.dataset.direction.split('-') // top, bottom, left, right, top-left, top-right, bottom-left, bottom-right
			
			if (!directions || directions.length === 0) {
				console.warn('No valid direction found in dataset.')
				return
			}

			const newCoords: {x: number|null, y: number|null} = {
				x: null, 
				y: null
			} // Initialize new coordinates for resizing

			directions.forEach((direction: 'top' | 'bottom' | 'left' | 'right') => {
				const {x, y} = handleDirectionLogic(direction, deltaX, deltaY) // Handle the direction logic based on the drag end event
				if (x !== null) newCoords.x = x
				if (y !== null) newCoords.y = y
			})	
			
			
			dispatch(setCanvasSize({width: newCoords.x || canvas.width, height: newCoords.y || canvas.height})) // Dispatch the new canvas size
			return

		}
	}

	containerRef.current?.addEventListener('mousemove', (e: MouseEvent) => {
		const coords = {x: e.clientX, y: e.clientY}

		if (!brushRef.current) return
		brushRef.current.style.left = coords.x + 'px';
		brushRef.current.style.top = coords.y + 'px';
		
	})

	return (
		<>
			<div className='canvas__wrapper' > 
				<div className='canvas__container' ref={containerRef} width={canvas.width} height={canvas.height}>	
					{canvas.canvasLayersSorted.toReversed().map((layerId: string) => {
						const layer = canvas.canvasLayers[layerId]
						return (
							<CanvasLayerItem 
							key={layer.id} 
							layerId={layer.id}
							/>
						)
					})}
				</div>

				<div 
					data-direction="top" 
					draggable
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					className="canvas__resizing canvas__resizing--top"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="bottom" 
					draggable
					className="canvas__resizing canvas__resizing--bottom"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="left" 
					draggable
					className="canvas__resizing canvas__resizing--left"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="right" 
					draggable
					className="canvas__resizing canvas__resizing--right"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="top-left" 
					draggable
					className="canvas__resizing canvas__resizing--top-left"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="top-right" 
					draggable
					className="canvas__resizing canvas__resizing--top-right"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="bottom-left" 
					draggable
					className="canvas__resizing canvas__resizing--bottom-left"
				/>
				<div 
					onDragStart={(e) => canvasResizeHandler(e)}
					onDrag={(e) =>canvasResizeHandler(e)}
					onDragEnd={(e) => canvasResizeHandler(e)}
					data-direction="bottom-right" 
					draggable
					className="canvas__resizing canvas__resizing--bottom-right"
				/>
			</div>
			<div className='canvas__brush' style={{width: brush.size, height: brush.size, backgroundColor: brush.color}} ref={brushRef} />
		</>
	)
}

export default Canvas