import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const SkeletonLoader = () => {
	return (
		<div className="w-full max-w-3xl mx-auto p-4 space-y-4 relative">
			{/* Progress bar skeleton */}
			<div className="flex items-center justify-between">
				{[1, 2, 3, 4, 5].map((i) => (
					<div key={i} className="flex items-center">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-4 w-16 ml-2" />
					</div>
				))}
			</div>

			{/* Title skeleton */}
			<Skeleton className="h-10 w-3/4 mx-auto" />

			{/* Question skeleton */}
			<div className="space-y-2">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-5/6" />
			</div>

			{/* Answer box skeleton */}
			<Skeleton className="h-32 w-full" />

			{/* Second question skeleton */}
			<div className="space-y-2 mt-8">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-5/6" />
				<Skeleton className="h-6 w-4/6" />
			</div>

			{/* Second answer box skeleton */}
			<Skeleton className="h-32 w-full" />

			{/* Overlay with label and spinner */}
			<div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80">
				<div className="bg-white flex justify-center items-center flex-row-reverse gap-5 p-4 rounded-md">
					<Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
					<p className="text-gray-700 font-medium">
						Fetching personalised questions for you
					</p>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
