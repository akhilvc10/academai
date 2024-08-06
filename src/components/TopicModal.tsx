"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { setTopicsToCookies } from "@/actions/actions";

const TIMELINE_ITEMS = [
	{
		title: "The French Revolution",
		subtitle: "Fall of empire",
		pages: "Page 12",
	},
	{
		title: "The Fall of the Roman Empire",
		subtitle: "Causes",
		pages: "Pages 1-3",
	},
	{
		title: "The Middle Ages",
		subtitle: "Russian Involvement",
		pages: "Pages 50-51",
	},
	{ title: "The Renaissance", subtitle: "Pyramids", pages: "World War 1" },
	{ title: "World War 1", subtitle: "Global Conflict", pages: "Pages 100-120" },
	{ title: "World War 2", subtitle: "Major Events", pages: "Pages 150-200" },
];

const TopicModal = () => {
	const [selectedTopics, setSelectedTopics] = useState([]);
	const mutation = useMutation({
		mutationFn: setTopicsToCookies,
	});

	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const savedTopics = Cookies.get("selectedTopics");
		if (savedTopics) {
			setSelectedTopics(JSON.parse(savedTopics));
		}
	}, []);

	const handleTopicChange = (topic) => {
		setSelectedTopics((prev) =>
			prev.some((t) => t.title === topic.title)
				? prev.filter((t) => t.title !== topic.title)
				: [...prev, topic].slice(0, 4),
		);
	};

	const handleBeginTest = () => {
		mutation.mutate({
			topics: selectedTopics,
		});
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Take Evaluation Test</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold mb-4">
						Choose Topics
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<p className="text-sm text-gray-600">
						Here are some engaging topics you might explore in the subject of
						history
					</p>
					<div className="space-y-2">
						{TIMELINE_ITEMS.map((topic) => (
							<div
								key={topic.title}
								className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
							>
								<Checkbox
									id={topic.title}
									checked={selectedTopics.some((t) => t.title === topic.title)}
									onCheckedChange={() => handleTopicChange(topic)}
									disabled={
										selectedTopics.length >= 4 &&
										!selectedTopics.some((t) => t.title === topic.title)
									}
									className="h-5 w-5"
								/>
								<label
									htmlFor={topic.title}
									className="text-sm font-medium leading-none cursor-pointer select-none"
								>
									{topic.title}
								</label>
							</div>
						))}
					</div>
					<p className="text-xs text-gray-500 italic">
						Select exactly 4 topics
					</p>
				</div>
				<Button
					variant="default"
					className="w-full mt-4"
					disabled={selectedTopics.length !== 4 || mutation.isPending}
					onClick={handleBeginTest}
				>
					Begin Test
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default TopicModal;
