"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, Block } from "@blocknote/core";
import { 
  BlockNoteView,
  useBlockNote,
  Theme,
  lightDefaultTheme
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Editor (props) {
  const {
    markers,
    index,
    markerClicked
  } = props;
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [markerInfo, setMarkerInfo] = useState<any>(null);

  useEffect(() => {
    const fetchMarkerInfo = async () => {
      if (!index || !markerClicked) return;
      try {
        const url = `http://localhost:4000/marker/info/${index}/${markerClicked.id}`
        const response = await axios.get(url);
        console.log(response.data.data.json_info);
        setMarkerInfo(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMarkerInfo();
  }, [index, markerClicked]);

  let init;
  useEffect(() => {
    if (!markerInfo) return;
    init = JSON.stringify(markerInfo.json_info, null, 2);
    console.log(init);
  }, [markerInfo]);
  
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: init || null,
    onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
  });
  
  if (!index || !markerClicked || !markerInfo || !editor) return null;

  async function handleSaveButtonClicked() {
    console.log(blocks);
    console.log(index, markerClicked);
    try {
      const url = `http://localhost:4000/marker/info/${markerClicked.id}`
      const response = await axios.put(
        url,
        {
          map_id: index,
          json_info: JSON.stringify(blocks)
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <BlockNoteView editor={editor} />
      <span className="flex flex-row gap-2">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={handleSaveButtonClicked}
        >
          Save
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Cancel
        </button>
      </span>
    </>
  )
}
