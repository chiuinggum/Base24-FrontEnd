"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, Block } from "@blocknote/core";
import { 
  BlockNoteView,
  useBlockNote,
  Theme,
  lightDefaultTheme
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useState } from "react";
import axios from "axios";

// Our <Editor> component we can reuse later
export default function Editor() {
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  // let blocks = [];
  // Creates a new editor instance.
  const editor: BlockNoteEditor /*| null*/ = useBlockNote({
    // The editor will be initialized with this content.
    initialContent: [
      {
        type: "paragraph",
        content: "hi"
      }
    ],
    onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
  });
  // editor.onEditorContentChange(() => {
    // blocks = editor.topLevelBlocks;
    // console.log('content changed', blocks);
  // })

  // Renders the editor instance using a React component.
  return (
    <>
      <BlockNoteView editor={editor} />
      <span className="flex flex-row gap-2">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl" onClick={() => console.log(blocks)}>
          Create
        </button>
        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl" >
          Cancel
        </button>
      </span>
    </>
  )
}

// const handleCreate = () => {
//   try {
//     const response = axios.post('http://localhost:4000/marker/update/markdown/1', {

//     })
//   }
// }

