export default function CreateMap() {
    return (
        <div 
            id="create-map-modal" tabIndex="-1" aria-hidden="true" 
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Add Sites to Map
                    </h3>
                </div>
            </div>
        </div>
    );
};