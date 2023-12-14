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

export default function NotePadPath (props) {
    const {
        pathClicked,
        saveClicked, 
        setSaveClicked,
        paths
    } = props;

    let initialContent: string | null = localStorage.getItem(`path-${pathClicked}`);

    useEffect(() => {
        initialContent = localStorage.getItem(`path-${pathClicked}`);
    }, [pathClicked]);

    const editor: BlockNoteEditor = useBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    });

    // if the save button is clicked
    useEffect(() => {
        if (!editor) return;

        const updateInfo = async () => {
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_PATHS_URL}/update/info`,
                    {
                        id: pathClicked,
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
            localStorage.removeItem(`path-${pathClicked}`);
            localStorage.setItem(`path-${pathClicked}`, JSON.stringify(editor.topLevelBlocks));
            paths.forEach((path) => {
                if (path.id === pathClicked) {
                    path.info = JSON.stringify(editor.topLevelBlocks);
                }
            })
            updateInfo();
            setSaveClicked(false);
        }
    }, [saveClicked])

    if (!editor) return null;

    return (
        <>
            <BlockNoteView editor={editor} theme={theme} />
        </>
    )
}