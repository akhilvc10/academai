"use client";
import React, { useState, useEffect } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { transformInput } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import {
	evaluateSingleTopicAnswers,
	getFinalReport,
	navigateToNextTopic,
} from "@/actions/actions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import EvaluationResult from "./EvaluationResult";
import SingleEvaluationResult from "./SingleEvaluationResult";

export default function EvaluationStepper({
	questions,
	currentTopic: initialTopic,
	selectedTopicsArray,
}) {
	const currentTopicIndex = selectedTopicsArray.indexOf(initialTopic);
	const [topics, setTopics] = useState([]);
	const [currentTopic, setCurrentTopic] = useState(0);

	const [expandedQuestions, setExpandedQuestions] = useState({});
	const [answers, setAnswers] = useState({});
	const [error, setError] = useState(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [evaluationResults, setEvaluationResults] = useState({});
	const { toast } = useToast();
	const { mutate: evaluateSingletopicAnswer, isPending } = useMutation({
		mutationFn: evaluateSingleTopicAnswers,
		onSuccess: (data) => {
			if (data.results) {
				toast({
					title: "Successfully Evaluated",
					description: "You can check the evaluation for each question.",
					variant: "default",
				});

				setIsSubmitted(true);
				const resultsMap = data.results.reduce((acc, result) => {
					acc[result.question_id] = result;
					return acc;
				}, {});
				setEvaluationResults(resultsMap);
				const allExpanded = topics[currentTopic].questions.reduce(
					(acc, question) => {
						acc[question.question_id] = true;
						return acc;
					},
					{},
				);
				setExpandedQuestions(allExpanded);
			}
		},
	});
	console.log(
		"🚀 ~ file: EvaluationStepper.tsx ~ line 28 ~ evaluationResults",
		evaluationResults,
	);
	const { mutate: getFinalreportHandler, isPending: finalReportLoading } =
		useMutation({
			mutationFn: getFinalReport,
			onSuccess: (data) => {
				if (data) {
					console.log(
						"🚀 ~ file: EvaluationStepper.tsx ~ line 60 ~ data",
						data,
					);
				}
			},
		});

	const { mutate: nextTopicHandler, isPending: nextTopicLoading } = useMutation(
		{
			mutationFn: navigateToNextTopic,
		},
	);

	useEffect(() => {
		const topicsWithQuestions = selectedTopicsArray
			.map((topic) => {
				if (topic === initialTopic) {
					return {
						name: topic,
						title: topic,
						questions: questions,
					};
				}
			})
			.filter(Boolean);
		setTopics(topicsWithQuestions);
		const initialTopicIndex = topicsWithQuestions.findIndex(
			(t) => t.name === initialTopic,
		);
		setCurrentTopic(initialTopicIndex !== -1 ? initialTopicIndex : 0);
	}, [selectedTopicsArray, initialTopic, questions]);

	const handleExpand = (questionId) => {
		if (!isSubmitted) {
			setExpandedQuestions((prev) => ({
				...prev,
				[questionId]: !prev[questionId],
			}));
		}
	};

	const handleAnswerChange = (questionId, value) => {
		setAnswers((prev) => ({ ...prev, [questionId]: value }));
	};

	const handlePreviousTopic = () => {
		const previousTopicName = selectedTopicsArray[currentTopicIndex - 1];
		nextTopicHandler(previousTopicName);
	};

	const handleNextTopic = () => {
		const nextTopicName = selectedTopicsArray[currentTopicIndex + 1];
		nextTopicHandler(nextTopicName);
	};

	const handleSubmit = async () => {
		const formatedAnwsers = transformInput(answers);
		await evaluateSingletopicAnswer({
			answers: formatedAnwsers,
			topic: initialTopic,
			student_id: "123456",
			subject: "history",
		});
	};

	const handleFinalReport = async () => {
		await getFinalreportHandler({
			student_id: "123456",
			subject: "history",
		});
	};

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="max-w-3xl mx-auto p-4">
			<ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse mb-6">
				{selectedTopicsArray.map((topic, index) => (
					<TooltipProvider key={index}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li
									className={`flex items-center ${
										currentTopicIndex >= index
											? "text-blue-600 dark:text-blue-500"
											: ""
									}`}
								>
									<span
										className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
											currentTopicIndex >= index
												? "border-blue-600 dark:border-blue-500"
												: "border-gray-500 dark:border-gray-400"
										}`}
									>
										{index + 1}
									</span>
									<span className="sm:inline-flex sm:ms-2 hidden md:flex">
										Topic {index + 1}
									</span>
									{index < selectedTopicsArray.length - 1 && (
										<svg
											className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 12 10"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="m7 9 4-4-4-4M1 9l4-4-4-4"
											/>
										</svg>
									)}
								</li>
							</TooltipTrigger>
							<TooltipContent>
								<p>{topic}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
				<li
					className={`items-center md:flex ${
						currentTopic === topics.length
							? "text-blue-600 dark:text-blue-500"
							: ""
					}`}
				>
					<span
						className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
							currentTopic === topics.length
								? "border-blue-600 dark:border-blue-500"
								: "border-gray-500 dark:border-gray-400"
						}`}
					>
						{topics.length + 1}
					</span>
					<span className="hidden md:block">Final Result</span>
				</li>
			</ol>
			{currentTopic < topics.length ? (
				<>
					<h1 className="text-2xl font-bold mb-4">
						{topics[currentTopic].name}
					</h1>
					{topics[currentTopic].questions.map((question) => (
						<div
							key={question.question_id}
							className="bg-white rounded-lg shadow-md p-4 mb-4"
						>
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => handleExpand(question.question_id)}
							>
								<div className="flex items-center">
									<h2 className="text-lg font-semibold mr-2">
										{question.question}
									</h2>
									{isSubmitted && answers[question.question_id] && (
										<CheckCircle className="text-green-500" size={20} />
									)}
								</div>
								{expandedQuestions[question.question_id] ? (
									<ChevronUp />
								) : (
									<ChevronDown />
								)}
							</div>
							{expandedQuestions[question.question_id] && (
								<div className="mt-4">
									<textarea
										className="w-full p-2 border rounded"
										rows="4"
										placeholder="Write your answer here..."
										value={answers[question.question_id] || ""}
										onChange={(e) =>
											handleAnswerChange(question.question_id, e.target.value)
										}
										disabled={isSubmitted}
									/>
									{isSubmitted && evaluationResults[question.question_id] && (
										<SingleEvaluationResult
											result={evaluationResults[question.question_id]}
										/>
									)}
								</div>
							)}
						</div>
					))}
				</>
			) : (
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
					<p>
						You've answered all the questions. Click 'Submit' to finish the
						quiz.
					</p>
				</div>
			)}

			<div className="flex justify-between items-center mt-4">
				<Button
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
					onClick={handlePreviousTopic}
					disabled={currentTopicIndex === 0}
				>
					Previous
				</Button>
				<div className="text-sm text-gray-500">
					Topic {currentTopicIndex + 1} of {selectedTopicsArray.length}
				</div>
				{!isSubmitted ? (
					<Button
						className="bg-green-500 text-white px-4 py-2 rounded"
						onClick={handleSubmit}
						disabled={isPending || finalReportLoading}
					>
						{isSubmitted
							? "Submitted"
							: isPending
								? "Evaluating"
								: currentTopicIndex === 3 && isSubmitted
									? "Get Final Report"
									: "Submit"}
					</Button>
				) : currentTopic < selectedTopicsArray.length - 1 &&
					currentTopicIndex < 3 ? (
					<Button
						className="bg-blue-500 text-white px-4 py-2 rounded"
						onClick={handleNextTopic}
					>
						Next Topic
					</Button>
				) : (
					<EvaluationResult />
				)}
			</div>
		</div>
	);
}
