import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center space-y-4">
				<h1 className="text-3xl font-bold">Welcome to AcademAI</h1>
				<p className="text-muted-foreground">
					Please select your login option:
				</p>
			</div>
			<div className="flex space-x-4 mt-8">
				<Link
					href="/student/login"
					className="w-48 h-48 flex bg-white flex-col items-center justify-center space-y-2 shadow-sm hover:shadow-lg hover:no-underline"
				>
					<PersonStandingIcon className="w-12 h-12 text-black" />
					<p>Login as Student</p>
				</Link>
				<Link
					href="/teacher/login"
					className="w-48 h-48 flex bg-white flex-col items-center justify-center space-y-2 shadow-sm hover:shadow-lg hover:no-underline"
				>
					<KeyIcon className="w-12 h-12 text-black" />
					<p>Login as Teacher</p>
				</Link>
			</div>
		</div>
	);
}

function KeyIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
			<path d="m21 2-9.6 9.6" />
			<circle cx="7.5" cy="15.5" r="5.5" />
		</svg>
	);
}

function PersonStandingIcon(props) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="5" r="1" />
			<path d="m9 20 3-6 3 6" />
			<path d="m6 8 6 2 6-2" />
			<path d="M12 10v4" />
		</svg>
	);
}
