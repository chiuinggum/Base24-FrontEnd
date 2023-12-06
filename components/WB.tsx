// // import { stopEventPropagation, Tldraw, TLEditorComponents, track, useEditor } from '@tldraw/tldraw'
// import dynamic from 'next/dynamic'
// import '@tldraw/tldraw/tldraw.css'
// import { useState } from 'react'
// const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, { ssr: false })
// const stopEventPropagation = dynamic(async () => (await import('@tldraw/tldraw')).stopEventPropagation, { ssr: false })
// const track = dynamic(async () => (await import('@tldraw/tldraw')).track, { ssr: false })
// const useEditor = dynamic(async () => (await import('@tldraw/tldraw')).useEditor, { ssr: false })
// const TLEditorComponents = dynamic(async () => (await import('@tldraw/tldraw')).TLEditorComponents, { ssr: false })
// // The "OnTheCanvas" component is rendered on top of the canvas, but behind the UI.
// function MyComponent() {
// 	const [state, setState] = useState(0)

// 	return (
// 		<>
// 			<div
// 				style={{
// 					position: 'absolute',
// 					top: 50,
// 					left: 50,
// 					width: 'fit-content',
// 					padding: 12,
// 					borderRadius: 8,
// 					backgroundColor: 'goldenrod',
// 					zIndex: 0,
// 					pointerEvents: 'all',
// 					userSelect: 'unset',
// 				}}
// 				onPointerDown={stopEventPropagation}
// 				onPointerMove={stopEventPropagation}
// 			>
// 				The count is {state}! <button onClick={() => setState((s) => s - 1)}>+1</button>
// 			</div>
// 			<div
// 				style={{
// 					position: 'absolute',
// 					top: 150,
// 					left: 150,
// 					width: 128,
// 					padding: 12,
// 					borderRadius: 8,
// 					backgroundColor: 'pink',
// 					zIndex: 99999999,
// 					pointerEvents: 'all',
// 					userSelect: 'unset',
// 				}}
// 				onPointerDown={stopEventPropagation}
// 				onPointerMove={stopEventPropagation}
// 			>
// 				The count is {state}! <button onClick={() => setState((s) => s + 1)}>+1</button>
// 			</div>
// 		</>
// 	)
// }

// // The "InFrontOfTheCanvas" component is rendered on top of the canvas, but behind the UI.
// const MyComponentInFront = track(() => {
// 	const editor = useEditor()
// 	const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()

// 	if (!selectionRotatedPageBounds) return null

// 	const pageCoordinates = editor.pageToScreen(selectionRotatedPageBounds.point)

// 	return (
// 		<div
// 			style={{
// 				position: 'absolute',
// 				top: Math.max(64, pageCoordinates.y - 64),
// 				left: Math.max(64, pageCoordinates.x),
// 				padding: 12,
// 				background: '#efefef',
// 			}}
// 		>
// 			This does not scale with the zoom
// 		</div>
// 	)
// })

// const components: TLEditorComponents = {
// 	OnTheCanvas: MyComponent,
// 	InFrontOfTheCanvas: MyComponentInFront,
// 	SnapLine: null,
// }

// export default function OnTheCanvasExample() {
// 	return (
// 		<div className="tldraw__editor">
// 			<Tldraw persistenceKey="things-on-the-canvas-example" components={components} />
// 		</div>
// 	)
// }