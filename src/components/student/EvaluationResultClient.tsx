"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import SpeedoMeter from "@/components/SpeedoMeter";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Card,
	CardContent,
	CardHeader,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Progress } from "../ui/progress";
import ScoreChart from "../ScoreChart";
import ImprovedFeedbackCard from "./FeedbackCard";
import LearningPathwayTimeline from "./LearningPathwayTimeline";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function EvaluationResultClient({ data }) {
	const {
		feedback,
		percentage_marks,
		conceptual_understanding,
		problem_solving,
		clarity_of_expression,
		marks_per_topic,
	} = data;

	const router = useRouter();

	const skillsData = [
		{
			fill: "var(--color-conceptual_understanding)",
			score: Number.parseInt(conceptual_understanding),
			name: "Conceptual Understanding",
		},
		{
			fill: "var(--color-problem_solving)",
			score: Number.parseInt(problem_solving),
			name: "Problem Solving",
		},
		{
			fill: "var(--color-clarity_of_expression)",
			score: Number.parseInt(clarity_of_expression),
			name: "Clarity of Expression",
		},
	];

	return (
		<Dialog
			defaultOpen={true}
			onOpenChange={() => {
				router.push("notification");
				Cookies.remove("selectedTopics");
			}}
		>
			<DialogContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Detailed Evaluation Result</DialogTitle>
				</DialogHeader>
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Overall Performance</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-center">
							<div className="w-64 h-64">
								<SpeedoMeter
									percentage={percentage_marks}
									title={`${percentage_marks}%`}
								/>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Skill Assesment</CardTitle>
						</CardHeader>
						<CardContent className="flex justify-center">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{skillsData.map((skill) => (
									<ScoreChart data={skill} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Topic-wise Performance</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{marks_per_topic.map((topic, index) => (
									<div key={index} className="space-y-2">
										<div className="flex justify-between items-center">
											<span>{topic.topic}:</span>
											<span className="font-bold">
												{topic.mark}/{topic.total_possible_marks}
											</span>
										</div>
										<Progress
											value={(topic.mark / topic.total_possible_marks) * 100}
											className="w-full"
										/>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					<ImprovedFeedbackCard feedback={feedback} />

					<Card>
						<CardHeader>
							<CardTitle>Recommended learning path</CardTitle>
						</CardHeader>
						<div className="space-y-4">
							<LearningPathwayTimeline />
						</div>
					</Card>
				</div>
			</DialogContent>
		</Dialog>
	);
}
