import { track, useEditor } from '@tldraw/tldraw'
import { useEffect } from 'react'
// import './custom-ui.css'

const CustomUi = track(() => {
	const editor = useEditor()

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Delete':
				case 'Backspace': {
					editor.deleteShapes(editor.selectedShapeIds)
					break
				}
				case 'v': {
					editor.setCurrentTool('select')
					break
				}
				case 'e': {
					editor.setCurrentTool('eraser')
					break
				}
				case 'x':
				case 'p':
				case 'b':
				case 'd': {
					editor.setCurrentTool('draw')
					break
				}
			}
		}

		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keyup', handleKeyUp)
		}
	})

	return (
		<div className="custom-layout">
			<div className="custom-toolbar">
				<button
					className="custom-button"
					data-isactive={editor.currentToolId === 'select'}
					onClick={() => editor.setCurrentTool('select')}
				>
					Select
				</button>
				<button
					className="custom-button"
					data-isactive={editor.currentToolId === 'card'}
					onClick={() => editor.setCurrentTool('card')}
				>
					Map
				</button>
                <button
					className="custom-button"
					data-isactive={editor.currentToolId === 'arrow'}
					onClick={() => editor.setCurrentTool('arrow')}
				>
					Arrow
				</button>
                <button
                    className="custom-button"
                    data-isactive={editor.currentToolId === 'hand'}
                    onClick={() => editor.setCurrentTool('hand')}
                >
                    Hand
                </button>
				<button
					className="custom-button"
					data-isactive={editor.currentToolId === 'eraser'}
					onClick={() => editor.setCurrentTool('eraser')}
				>
					Eraser
				</button>
                <button
					className="custom-button"
					// data-isactive={editor.zoomIn()}
					onClick={() => editor.zoomIn()}
				>
					Zoom In
				</button>
                <button
                    className="custom-button"
                    // data-isactive={editor.zoomOut()}
                    onClick={() => editor.zoomOut()}
                >
                    Zoom Out
                </button>
			</div>
		</div>
	)
})

export default CustomUi