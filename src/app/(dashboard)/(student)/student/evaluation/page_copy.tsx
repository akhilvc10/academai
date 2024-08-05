"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Cookies from "js-cookie";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const QuizApp = () => {
	const [topics, setTopics] = useState([]);
	const [currentTopic, setCurrentTopic] = useState(0);
	const [expandedQuestion, setExpandedQuestion] = useState(null);
	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const savedTopics = Cookies.get("selectedTopics");
		if (savedTopics) {
			try {
				const parsedTopics = JSON.parse(savedTopics);
				const shuffledTopics = parsedTopics.sort(() => Math.random() - 0.5);
				setTopics(
					shuffledTopics.map((topic) => ({
						name: topic,
						title: topic,
						questions: [],
					})),
				);
			} catch (err) {
				console.error("Error parsing saved topics:", err);
				setError("Error loading topics. Please try again.");
			}
		} else {
			setError("No topics found. Please select topics first.");
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (topics.length > 0 && currentTopic < topics.length) {
			fetchQuestions(topics[currentTopic].name);
		}
	}, [topics, currentTopic]);

	const fetchQuestions = async (topicName) => {
		setLoading(true);
		setError(null);

		try {
			const url = `https://falcon-hackathon-academai.vercel.app/api/v1/academai/questions?student_id=123456&difficulty_level=Medium&questions=1&topic_name=${encodeURIComponent(topicName)}&subject=history`;

			console.log("Fetching questions from URL:", url);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Received data:", data);

			if (!data.questions || !Array.isArray(data.questions)) {
				throw new Error("Invalid data format received from the server");
			}

			setTopics((prevTopics) => {
				const newTopics = [...prevTopics];
				newTopics[currentTopic].questions = data.questions;
				return newTopics;
			});
		} catch (err) {
			console.error("Error fetching questions:", err);
			setError(`Failed to load questions: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleExpand = (id) => {
		setExpandedQuestion(expandedQuestion === id ? null : id);
	};

	const handleAnswerChange = (id, value) => {
		setAnswers({ ...answers, [id]: value });
	};

	const handleNextTopic = () => {
		if (currentTopic < topics.length - 1) {
			setCurrentTopic(currentTopic + 1);
			setExpandedQuestion(null);
		}
	};

	const handlePreviousTopic = () => {
		if (currentTopic > 0) {
			setCurrentTopic(currentTopic - 1);
			setExpandedQuestion(null);
		}
	};

	const handleSubmit = () => {
		console.log("Submitting answers:", answers);
		alert("Quiz submitted successfully!");
	};

	if (loading && topics.length === 0) {
		return <div className="text-center mt-8">Loading quiz...</div>;
	}

	if (error && topics.length === 0) {
		return <div className="text-center mt-8 text-red-500">{error}</div>;
	}

	console.log("topics[currentTopic].questions", topics[currentTopic].questions);

	return (
		<div className="max-w-3xl mx-auto p-4">
			<ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse mb-6">
				{topics.map((topic, index) => (
					<TooltipProvider key={index}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li
									className={`flex items-center ${
										index <= currentTopic
											? "text-blue-600 dark:text-blue-500"
											: ""
									}`}
								>
									<span
										className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
											index <= currentTopic
												? "border-blue-600 dark:border-blue-500"
												: "border-gray-500 dark:border-gray-400"
										}`}
									>
										{index + 1}
									</span>
									<span className="sm:inline-flex sm:ms-2 hidden md:flex">
										Topic {index + 1}
									</span>
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
								</li>
							</TooltipTrigger>
							<TooltipContent>
								<p>{topic.name}</p>
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
								<h2 className="text-lg font-semibold">{question.question}</h2>
								{expandedQuestion === question.question_id ? (
									<ChevronUp />
								) : (
									<ChevronDown />
								)}
							</div>
							{expandedQuestion === question.question_id && (
								<div className="mt-4">
									<textarea
										className="w-full p-2 border rounded"
										rows="4"
										placeholder="Write your answer here..."
										value={answers[question.question_id] || ""}
										onChange={(e) =>
											handleAnswerChange(question.question_id, e.target.value)
										}
									/>
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
				<button
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
					onClick={handlePreviousTopic}
					disabled={currentTopic === 0}
				>
					Previous
				</button>
				<div className="text-sm text-gray-500">
					Topic {currentTopic + 1} of {topics.length}
				</div>
				{currentTopic < topics.length - 1 ? (
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded"
						onClick={handleNextTopic}
					>
						Next
					</button>
				) : (
					<button
						className="bg-green-500 text-white px-4 py-2 rounded"
						onClick={handleSubmit}
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default QuizApp;
