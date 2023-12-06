import React, { Component } from "react";
import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";
import Test4 from "./Test4";

export default function Zoom() {
    return (
        <TransformWrapper>
            <TransformComponent>
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "gray"
                    }}
                >
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
};