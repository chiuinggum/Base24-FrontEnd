export default function ModeSwitch({modeName, handleOnChange, isChecked}) {
    return (
        <div
            className="flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            <span className="ms-3">{modeName}</span>
            <label
                className="mx-3 relative inline-flex items-center cursor-pointer"
            >
                <input 
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleOnChange}
                    checked={isChecked}
                />
                <div
                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                >
                </div>
            </label>
        </div>
    );
}