// import SpeedDial from "@/components/SpeedDial";
// import TripSidebar from "@/components/TripSideBar";
// import AdjustableContainer2 from "@/components/AdjustableContainer2";
// import Drag from "@/components/Drag";
// import Inf from "@/components/Inf";
// import Zoom from "@/components/Zoom";
// import Rnd1 from "@/components/Rnd1";
// import WhiteBoard from "@/components/Whiteboard";
// import OnTheCanvasExample from "@/components/WB.tsx";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

export default function Trip(){
    return (
        <div>
            {/* <TripSidebar/> */}
            {/* <AdjustableContainer2/> */}
            {/* <Drag/> */}
            {/* <Inf/> */}
            {/* <Zoom/> */}
            {/* <Rnd1/>
            <Rnd1/> */}
            {/* <WhiteBoard/> */}
            {/* <OnTheCanvasExample/> */}
            <Editor/>
        </div>
    );
}