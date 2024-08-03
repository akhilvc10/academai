"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function SubNavbar() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [notificationCount, setNotificationCount] = useState(1); // Example count, you can update this dynamically

	return (
		<nav className="bg-gray-50 dark:bg-gray-700">
			<div className="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
				<div className="flex items-center justify-center">
					<ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
						<li>
							<Link
								href="/"
								className="text-gray-900 dark:text-white hover:underline"
								aria-current="page"
							>
								Dashboard
							</Link>
						</li>
						<li className="flex items-center">
							<Link
								href="/notification"
								className="text-gray-900 dark:text-white hover:underline flex items-center"
							>
								Notification
								{notificationCount > 0 && (
									<span className="ml-1 aspect-square flex items-center justify-center size-5 bg-red-500 text-white text-xs font-semibold rounded-full">
										{notificationCount}
									</span>
								)}
							</Link>
						</li>
						<li>
							<Link
								href="/evaluation"
								className="text-gray-900 dark:text-white hover:underline"
							>
								Evaluation
							</Link>
						</li>
						<li>
							<Link
								href="/features"
								className="text-gray-900 dark:text-white hover:underline"
							>
								Help
							</Link>
						</li>
					</ul>
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="text-gray-500 md:hidden dark:hover:bg-gray-600 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-full text-sm p-1.5"
					>
						<svg
							className="w-5 h-5 text-gray-700 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
						</svg>
					</button>
					{dropdownOpen && (
						<div className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
							<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
								<li>
									<Link
										href="/marketplace"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Marketplace
									</Link>
								</li>
								<li>
									<Link
										href="/dashboard"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/resources"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Resources
									</Link>
								</li>
								<li>
									<Link
										href="/forum"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Forum
									</Link>
								</li>
								<li>
									<Link
										href="/support"
										className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Support
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
