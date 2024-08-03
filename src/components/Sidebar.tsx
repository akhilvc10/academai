// components/Sidebar.js

import Link from "next/link";

export default function Sidebar() {
	return (
		<aside className="w-64 h-screen bg-white border-r border-gray-200 shadow-sm">
			<nav className="flex flex-col p-4 space-y-4">
				<Link
					className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md transition"
					href="#"
				>
					Dashboard
				</Link>
				<Link
					className="text-blue-600 bg-blue-50 px-4 py-2 rounded-md transition"
					href="#"
				>
					Notification
				</Link>
				<Link
					className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md transition"
					href="#"
				>
					Evaluation
				</Link>
				<Link
					href="#"
					className="text-gray-700 hover:bg-gray-100 hover:text-blue-600 px-4 py-2 rounded-md transition"
				>
					Help
				</Link>
			</nav>
		</aside>
	);
}
