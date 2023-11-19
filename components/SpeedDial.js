import CreateMap from "./CreateMap";

export default function SpeedDial() {
    return (
        <div data-dial-init className="fixed bottom-6 start-6 group">
            <div
                id="speed-dial-menu-bottom-left"
                className="flex flex-col items-center mb-4 space-y-2 opacity-0 group-hover:opacity-100 transition duration-300"
            >
                <button
                    type="button" data-tooltip-target="tooltip-map" data-tooltip-trigger="hover" data-tooltip-placement="right"
                    data-modal-target="create-map-modal" data-modal-toggle="create-map-modal" data-modal-trigger="click"
                    className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span className="sr-only">Create a Map</span>
                </button>
                <div id="tooltip-map" role="tooltip"
                    className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                    Create a Map
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
            <button
                type="button" data-dial-toggle="speed-dial-menu-bottom-left"
                aria-controls="speed-dial-menu-bottom-left" aria-expanded="false"
                className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <span className="sr-only">Open Speed Dial</span>
            </button>
            <CreateMap/>
        </div>
    );
};

