import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<Loader2 className="h-16 w-16 animate-spin text-blue-500" />
			<h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
				Loading Results
			</h2>
			<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
				Please wait while we process your evaluation...
			</p>
		</div>
	);
};

export default LoadingScreen;
