const Sidebar = ({ sidebarOpen }) => {
	return (
		<aside
			className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
			aria-label="Sidebar"
		>
			<div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
				{/* ... (Sidebar content) */}
			</div>
		</aside>
	);
};
export default Sidebar;
