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

const topics = [
	"The French Revolution",
	"The Fall of the Roman Empire",
	"The Middle Ages",
	"The Renaissance",
	"World War 1",
	"World War 2",
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
			prev.includes(topic)
				? prev.filter((t) => t !== topic)
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
					<DialogTitle>Choose Topics</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<p className="text-sm text-gray-500">
						Here are some engaging topics you might explore in the subject of
						history
					</p>
					{topics.map((topic) => (
						<div key={topic} className="flex items-center space-x-2">
							<Checkbox
								id={topic}
								checked={selectedTopics.includes(topic)}
								onCheckedChange={() => handleTopicChange(topic)}
								disabled={
									selectedTopics.length >= 4 && !selectedTopics.includes(topic)
								}
							/>
							<label
								htmlFor={topic}
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{topic}
							</label>
						</div>
					))}
					<p className="text-xs text-gray-500">Select exactly 4 topics</p>
				</div>
				<Button
					variant="default"
					className="w-full"
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
