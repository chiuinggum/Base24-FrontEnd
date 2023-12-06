import InfiniteCanvas from "ef-infinite-canvas";
import { useEffect } from "react";

export default function Inf() {
    useEffect(() => {
        const infCanvas = new InfiniteCanvas(document.getElementById('canvas'));

        const ctx = infCanvas.getContext('2d');

        ctx.fillStyle = '#f00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.rect(30, 30, Infinity, 30);
        ctx.fill();
        ctx.stroke();
    }, []);
    return (
        <div>
            <canvas
                id='canvas'
                className="border"
                width={500}
                height={300}
            >
            </canvas>
        </div>
    );
};