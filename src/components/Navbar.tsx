import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="bg-white border-gray-200 dark:bg-gray-800">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
				<Link href="/" className="flex items-center">
					<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
						AcademAI
					</span>
				</Link>
				<div className="flex items-center">
					<a
						href="tel:5541251234"
						className="hidden mr-6 text-sm font-medium text-gray-900 dark:text-white hover:underline sm:inline"
					>
						(555) 412-1234
					</a>
					<Link
						href="/contact"
						className="text-sm font-medium sm:mr-6 text-primary-600 dark:text-primary-500 hover:underline"
					>
						Contact us
					</Link>
					<Link
						href="/login"
						className="hidden text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline sm:inline"
					>
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
