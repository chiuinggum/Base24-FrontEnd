import dynamic from 'next/dynamic'
const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, { ssr: false })
import '@tldraw/tldraw/tldraw.css'
import { CardShapeTool } from './CardShapeTool'
import { CardShapeUtil } from './CardShapeUtil'
import { uiOverrides } from './ui-overrides'
import CustomUi from './CustomUi'
import { useState, useEffect, useCallback } from 'react'
import { serializeTldrawJson, useEditor, Editor } from '@tldraw/tldraw'
import { set } from 'core-js/core/dict'
import axios from 'axios'

const customShapeUtils = [CardShapeUtil]
const customTools = [CardShapeTool]

// export default function WB1() {
// 	return (
// 		<div style={{ position: 'fixed', inset: 0 }}>
// 			<Tldraw
// 				// Pass in the array of custom shape classes
// 				shapeUtils={customShapeUtils}
// 				// Pass in the array of custom tool classes
// 				tools={customTools}
// 				// Pass in any overrides to the user interface
// 				overrides={uiOverrides}
// 				hideUi
// 			>
// 				<CustomUi />
// 			</Tldraw>
// 		</div>
// 	)
// }

export default function WB1() {
	// const [saving, setSaving] = useState(false)
	// const [initialized, setInitialized] = useState(false)

	// const [editor, setEditor] = useState<Editor>()

	// useEffect(() => {
	// 	console.log('Editor Object:', editor);
	//   }, [editor]);

	// const setAppToState = useCallback((editor: Editor) => {
	// 	console.log('hi')
	// 	setEditor(editor)
	// }, [editor])
  
	// editor?.store?.listen((entry) => {
	// 	// console.log('hi?')
	// 	// const { changes, source } = entry
	// 	// console.log('Changes:', changes);
	// 	// console.log('Source:', source);
	// 	if (!saving) {
	// 		setSaving(true)
	// 		saveToBackend(editor.store.getSnapshot())
	// 			.finally(() => setSaving(false))
	// 	}
	// })

	// const saveToBackend = async (snapshot) => {
	// 	try {
	// 		console.log(snapshot);
	// 		// const response = await axios.post(
	// 		// 	'http://localhost:4000/test/save',
	// 		// 	{ data: JSON.stringify(serializedData) },
	// 		// 	{ headers: { 'Content-Type': 'application/json' } }
	// 		// )
	// 		// console.log(response)
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	// const snapshot = {
	// 	"store": {
	// 		"document:document": {
	// 			"gridSize": 10,
	// 			"name": "",
	// 			"meta": {},
	// 			"id": "document:document",
	// 			"typeName": "document"
	// 		},
	// 		"page:page": {
	// 			"meta": {},
	// 			"id": "page:page",
	// 			"name": "Page 1",
	// 			"index": "a1",
	// 			"typeName": "page"
	// 		},
	// 		"shape:XgRSMSsnwVudo5bHRSQoz": {
	// 			"x": 239.3333282470703,
	// 			"y": 88.33334350585938,
	// 			"rotation": 0,
	// 			"isLocked": false,
	// 			"opacity": 1,
	// 			"meta": {},
	// 			"id": "shape:XgRSMSsnwVudo5bHRSQoz",
	// 			"type": "card",
	// 			"props": {
	// 				"w": 343.1031576916216,
	// 				"h": 340.7840366305689,
	// 				"color": "black",
	// 				"weight": "regular"
	// 			},
	// 			"parentId": "page:page",
	// 			"index": "a1",
	// 			"typeName": "shape"
	// 		}
	// 	},
	// 	"schema": {
	// 		"schemaVersion": 1,
	// 		"storeVersion": 4,
	// 		"recordVersions": {
	// 			"asset": {
	// 				"version": 1,
	// 				"subTypeKey": "type",
	// 				"subTypeVersions": {
	// 					"image": 2,
	// 					"video": 2,
	// 					"bookmark": 0
	// 				}
	// 			},
	// 			"camera": {
	// 				"version": 1
	// 			},
	// 			"document": {
	// 				"version": 2
	// 			},
	// 			"instance": {
	// 				"version": 22
	// 			},
	// 			"instance_page_state": {
	// 				"version": 5
	// 			},
	// 			"page": {
	// 				"version": 1
	// 			},
	// 			"shape": {
	// 				"version": 3,
	// 				"subTypeKey": "type",
	// 				"subTypeVersions": {
	// 					"group": 0,
	// 					"text": 1,
	// 					"bookmark": 1,
	// 					"draw": 1,
	// 					"geo": 7,
	// 					"note": 4,
	// 					"line": 1,
	// 					"frame": 0,
	// 					"arrow": 1,
	// 					"highlight": 0,
	// 					"embed": 4,
	// 					"image": 2,
	// 					"video": 1,
	// 					"card": 1
	// 				}
	// 			},
	// 			"instance_presence": {
	// 				"version": 5
	// 			},
	// 			"pointer": {
	// 				"version": 1
	// 			}
	// 		}
	// 	}
	// }
	// const fetchSerializedData = async () => {
	// 	try {
	// 		editor.store.loadSnapshot(snapshot)
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }
	
	// useEffect(() => {
	// 	fetchSerializedData()
	// }, [editor]);

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				// Pass in the array of custom shape classes
				shapeUtils={customShapeUtils}
				// Pass in the array of custom tool classes
				tools={customTools}
				// Pass in any overrides to the user interface
				overrides={uiOverrides}
				hideUi
				// onMount={setAppToState}
			>
				<CustomUi/>
			</Tldraw>
		</div>
	)
};