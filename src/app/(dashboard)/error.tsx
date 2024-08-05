"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("COol error", error);
	}, [error]);

	const handleRefresh = () => {
		reset();
		// Then, reload the page
		window.location.reload();
	};

	return (
		<div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-md text-center">
				<h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Server is currently busy
				</h1>
				<p className="mt-4 text-muted-foreground">
					We apologize for the inconvenience. Our server is experiencing high
					demand at the moment and couldn't process your request. This is
					usually temporary.
				</p>
				<p className="mt-4 text-muted-foreground">Here's what you can do:</p>
				<ul className="mt-2 list-disc list-inside text-left text-muted-foreground">
					<li>Wait a few moments and try again</li>
					<li>Refresh the page</li>
					<li>If the problem persists, please try again later</li>
				</ul>
				<div className="mt-6">
					<Button
						onClick={handleRefresh}
						className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						Try Again
					</Button>
				</div>
			</div>
		</div>
	);
}
