import React from "react";
import Draggable, {DraggableCore} from "react-draggable";
import Test4 from "./Test4";

export default function Drag(){
    return (
        <Draggable
          defaultPosition={{ x: 0, y: 0 }}
          handle="strong"
          grid={[25, 25]}
          scale={1}

        >
        <div
            className="border"
            style={{
                width: "300px",
                height: "300px",
                position: "absolute",
                top: "10px",
                left: "10px",
                zIndex: "100",
                backgroundColor: "white"
            }}
        >
            <strong className="cursor"><div>drag here</div></strong>
            <Test4/>
          </div>
        </Draggable>
      );
};
