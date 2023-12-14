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

const theme = {
    ...lightDefaultTheme,
    borderRadius: 10,
    fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;

export default function NotePad (props) {
    const {
        markerClicked,
        saveClicked,
        setSaveClicked,
        markers
    } = props;
    // const [blocks, setBlocks] = useState<Block[] | null>(null);

    let initialContent: string | null = localStorage.getItem(markerClicked);

    useEffect(() => {
        initialContent = localStorage.getItem(markerClicked);
    }, [markerClicked])

    const editor: BlockNoteEditor = useBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        // onEditorContentChange: (editor) => setBlocks(editor.topLevelBlocks)
    });

    // if the save button is clicked
    useEffect(() => {
        if (!editor) return;
        // console.log('editor.topLevelBlocks:', JSON.stringify(editor.topLevelBlocks));

        const updateInfo = async () => {
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_MARKERS_URL}/update/info`,
                    {
                        id: markerClicked,
                        info: JSON.stringify(editor.topLevelBlocks)
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                )
            } catch (error) {
                console.error(error);
            }
        }

        if (saveClicked) {
            // update the info in local storage
            localStorage.removeItem(markerClicked);
            localStorage.setItem(markerClicked, JSON.stringify(editor.topLevelBlocks));
            // update the info in the markers array
            markers.forEach((marker) => {
                if (marker.id === markerClicked) {
                    marker.info = JSON.stringify(editor.topLevelBlocks);
                }
            })
            // update the info in the database
            updateInfo();
            setSaveClicked(false);
        }
    }, [saveClicked])

    if (!editor) return null;

    return (
        <>
            <BlockNoteView editor={editor} theme={theme}/>
        </>
    )
};