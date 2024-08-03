"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const topics = [
	{
		name: "The Renaissance",
		title: "Topic 1",
		questions: [
			{
				id: 1,
				text: "How did the Renaissance contribute to the transformation of art, and what were the key characteristics that distinguished Renaissance art from that of the Middle Ages?",
			},
			{
				id: 2,
				text: "In what ways did the Renaissance promote the spread of humanism, and how did this intellectual movement influence the social, political, and religious landscape of Europe?",
			},
			{
				id: 3,
				text: "How did the Renaissance contribute to the advancements in science and technology, and what role did key figures play in shaping the scientific revolution that followed?",
			},
		],
	},
	{
		name: "The Ottoman Empire",
		title: "Topic 2",
		questions: [
			{
				id: 4,
				text: "Describe the expansion of the Ottoman Empire and its impact on European politics in the 15th and 16th centuries.",
			},
			{
				id: 5,
				text: "How did Ottoman culture influence art, architecture, and science in Europe during the Renaissance period?",
			},
		],
	},
	{
		name: "The French Revolution",
		title: "Topic 3",

		questions: [
			{
				id: 6,
				text: "What were the main causes of the French Revolution, and how did it change the political landscape of Europe?",
			},
			{
				id: 7,
				text: "Discuss the impact of the French Revolution on the concepts of citizenship, nationalism, and human rights.",
			},
		],
	},
	{
		name: "World War I",
		title: "Topic 4",
		questions: [
			{
				id: 8,
				text: "What were the main causes of World War I, and how did the alliance system contribute to its outbreak?",
			},
			{
				id: 9,
				text: "Describe the impact of new technologies on warfare during World War I.",
			},
		],
	},
];

const QuizApp = () => {
	const [currentTopic, setCurrentTopic] = useState(0);
	const [expandedQuestion, setExpandedQuestion] = useState(null);
	const [answers, setAnswers] = useState({});

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
		// Here you would typically send the answers to a server
		alert("Quiz submitted successfully!");
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse mb-6">
				{topics.map((topic, index) => (
					<li
						key={index}
						className={`flex items-center ${index <= currentTopic ? "text-blue-600 dark:text-blue-500" : ""}`}
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
							{topic.title}
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
				))}
				<li
					className={`items-center md:flex ${currentTopic === topics.length ? "text-blue-600 dark:text-blue-500" : ""}`}
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
							key={question.id}
							className="bg-white rounded-lg shadow-md p-4 mb-4"
						>
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => handleExpand(question.id)}
							>
								<h2 className="text-lg font-semibold">{question.text}</h2>
								{expandedQuestion === question.id ? (
									<ChevronUp />
								) : (
									<ChevronDown />
								)}
							</div>
							{expandedQuestion === question.id && (
								<div className="mt-4">
									<textarea
										className="w-full p-2 border rounded"
										rows="4"
										placeholder="Write your answer here..."
										value={answers[question.id] || ""}
										onChange={(e) =>
											handleAnswerChange(question.id, e.target.value)
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
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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
