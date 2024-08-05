import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
	return (
		<div className="w-full max-w-3xl mx-auto p-4 space-y-4">
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
		</div>
	);
};

export default SkeletonLoader;
