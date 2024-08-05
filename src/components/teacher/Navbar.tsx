"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
			<div className="flex flex-wrap justify-between items-center">
				<div className="flex justify-start items-center">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
					>
						{/* ... (SVG for menu icon) */}
					</button>
					<Link href="/" className="flex items-center justify-between mr-4">
						{/* <Image
							src="https://flowbite.s3.amazonaws.com/logo.svg"
							className="mr-3 h-8"
							alt="Flowbite Logo"
							width={32}
							height={32}
						/> */}
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							Academ AI
						</span>
					</Link>
					{/* ... (Search form) */}
				</div>
				{/* ... (User menu, notifications, etc.) */}
			</div>
		</nav>
	);
};

export default Navbar;
