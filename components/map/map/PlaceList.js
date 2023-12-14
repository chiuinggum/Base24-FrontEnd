

export default function PlaceList(props) {
    const {
        markers
    } = props;
    return (
        <div className="flex flex-col p-2">
            <span className="ms-3">Places:</span>
            <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ms-4 my-1">
                {
                    markers.map((marker, index) => {
                        return (
                            <li key={index}>{marker.name}</li>
                        )
                    })
                }
            </ul>
        </div>
    );
};