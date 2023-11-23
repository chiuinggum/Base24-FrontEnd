import Link from "next/link";

export default function SidebarButton({buttonName}) {
    return (
        <li>
            <Link href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="ms-3">{buttonName}</span>
            </Link>
        </li>
    );
};
