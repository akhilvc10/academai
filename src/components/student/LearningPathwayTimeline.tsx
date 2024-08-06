import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BookCheck } from "lucide-react";
import Cookies from "js-cookie";

const TimelineItem = ({ title, subtitle, pages }) => (
	<div className="flex items-start mb-8 relative">
		<div className="mr-4 z-10">
			<div className="p-3 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
				<BookCheck size={16} />
			</div>
		</div>
		<div className="pt-1 flex-grow">
			<h3 className="font-semibold">{title}</h3>
			<p className="text-sm text-gray-500">{subtitle}</p>
			{pages && (
				<div className="text-xs flex items-center gap-1">
					View
					<p className="underline  text-blue-500 cursor-pointer">{pages}</p>
				</div>
			)}
		</div>
	</div>
);

const LearningPathwayTimeline = () => {
	const [selectedTopics, setSelectedTopics] = useState([]);

	useEffect(() => {
		const savedTopics = Cookies.get("selectedTopics");
		setSelectedTopics(JSON.parse(savedTopics));
	}, []);

	return (
		<Card className="p-6 border-none">
			<div className="relative">
				<div className="absolute left-5 top-0 bottom-4 w-px bg-gray-300" />
				{selectedTopics.map((item, index) => (
					<TimelineItem key={index} {...item} />
				))}
			</div>
		</Card>
	);
};
export default LearningPathwayTimeline;
