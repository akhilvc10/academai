"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const DashboardLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState({
		pages: false,
		realtime: false,
		acquisition: false,
		audience: false,
		behaviour: false,
	});

	const toggleDropdown = (key) => {
		setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	return (
		<div className="bg-gray-50 dark:bg-gray-900 antialiased">
			{/* Navigation */}
			<nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
				{/* Navigation content */}
				<div className="flex flex-wrap justify-between items-center">
					<div className="flex justify-start items-center">
						<button
							data-drawer-target="sidebar-double"
							data-drawer-toggle="sidebar-double"
							aria-controls="sidebar-double"
							type="button"
							className="inline-flex items-center p-2 mr-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							<span className="sr-only">Open sidebar</span>
							<svg
								className="w-6 h-6"
								aria-hidden="true"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									clipRule="evenodd"
									fillRule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
								></path>
							</svg>
						</button>
						<Link href="/" className="flex mr-4">
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								AcademAI
							</span>
						</Link>
					</div>
					<div className="flex items-center lg:order-2">
						<button
							type="button"
							data-drawer-toggle="sidebar-double"
							aria-controls="sidebar-double"
							className="p-2 mr-1 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						>
							<span className="sr-only">Toggle search</span>
							<svg
								aria-hidden="true"
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									clip-rule="evenodd"
									fill-rule="evenodd"
									d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								></path>
							</svg>
						</button>

						<button
							type="button"
							data-dropdown-toggle="notification-dropdown"
							className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
						>
							<span className="sr-only">View notifications</span>

							<svg
								aria-hidden="true"
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
							</svg>
						</button>
						{/* ... (rest of the navigation content) ... */}
					</div>
					{/* ... (user menu, notifications, etc.) ... */}
				</div>
			</nav>

			{/* Sidebar */}
			<aside
				className={`flex z-40 fixed top-[3.5rem] left-0 h-full transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
				aria-label="Sidebar"
			>
				{/* Sidebar content */}
				<div className="overflow-y-auto z-30 py-5 px-3 w-16 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
					<ul class="space-y-2">
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									aria-hidden="true"
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
								</svg>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
									<path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
								</svg>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
									<path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
								</svg>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									class="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
						</li>
					</ul>
				</div>
				<div
					id="secondary-sidenav"
					className="overflow-y-auto py-5 px-3 w-64 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform left-0 top-0 transform-none"
				>
					{/* ... (secondary sidebar content) ... */}
					<ul className="space-y-2">
						<li>
							<Link
								href="/teacher/dashboard"
								className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
							>
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<button
								type="button"
								className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
								onClick={() => toggleDropdown("pages")}
							>
								<span className="flex-1 text-left whitespace-nowrap">
									Quick Links
								</span>
								<svg
									aria-hidden="true"
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									></path>
								</svg>
							</button>
							{dropdownOpen.pages && (
								<ul className="py-2 space-y-2">
									<li>
										<Link
											href="/settings"
											className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
										>
											Settings
										</Link>
									</li>
									{/* ... (other dropdown items) ... */}
								</ul>
							)}
						</li>
						{/* ... (other sidebar items) ... */}
					</ul>
				</div>
			</aside>

			{/* Main content */}
			<main className="bg-gray-50 dark:bg-gray-900 p-4 lg:ml-80 lg:mr-16 h-full space-y-4">
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
