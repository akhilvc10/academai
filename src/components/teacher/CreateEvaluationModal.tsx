import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import TopicCard from "@/components/teacher/TopicCard";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useEffect } from "react";

const CreateEvaluationModal = ({ isOpen, onClose, onCreateEvaluation }) => {
	const [step, setStep] = useState(1);
	const [evaluationData, setEvaluationData] = useState({
		name: "",
		subject: "history",
		textbook: null,
		topics: [],
		students: [],
		difficultyLevel: "medium",
	});
	const [errors, setErrors] = useState({});
	const [visibleTopics, setVisibleTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const students = [
		{ id: "S001", name: "Emma Thompson", grade: "10A" },
		{ id: "S002", name: "Liam Chen", grade: "10B" },
		{ id: "S003", name: "Sophia Patel", grade: "10A" },
		{ id: "S004", name: "Noah Kim", grade: "10C" },
		{ id: "S005", name: "Olivia Martinez", grade: "10B" },
		{ id: "S006", name: "Ethan Nguyen", grade: "10C" },
	];

	const allTopics = [
		{
			id: 1,
			title: "The French Revolution",
			summary:
				"A period of far-reaching social and political upheaval in France that lasted from 1789 until the late 1790s.",
		},
		{
			id: 2,
			title: "The Fall of the Roman Empire",
			summary:
				"The process of decline of the Roman Empire, which culminated in the fall of Rome in 476 CE.",
		},
		{
			id: 3,
			title: "The Middle Ages",
			summary:
				"The period of European history lasting from the 5th to the 15th centuries, also known as the Medieval period.",
		},
		{
			id: 4,
			title: "The Renaissance",
			summary:
				"A period of cultural, artistic, political, and economic revival following the Middle Ages.",
		},
		{
			id: 5,
			title: "World War 1",
			summary:
				"A global war originating in Europe that lasted from 28 July 1914 to 11 November 1918.",
		},
		{
			id: 6,
			title: "World War 2",
			summary:
				"A global war that lasted from 1939 to 1945, involving many of the world's nations.",
		},
	];

	useEffect(() => {
		if (isOpen && step === 2) {
			setIsLoading(true);
			setVisibleTopics([]);
			const timer = setTimeout(() => {
				allTopics.forEach((topic, index) => {
					setTimeout(() => {
						setVisibleTopics((prev) => [...prev, topic]);
						if (index === allTopics.length - 1) {
							setIsLoading(false);
						}
					}, index * 1000); // Add each topic with a 1-second delay
				});
			}, 1000); // Initial delay before starting to add topics
			return () => clearTimeout(timer);
		}
	}, [isOpen, step]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEvaluationData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		setEvaluationData((prev) => ({ ...prev, textbook: file }));
		setErrors((prev) => ({ ...prev, textbook: "" }));
	};

	const handleTopicSelection = (topicId) => {
		setEvaluationData((prev) => ({
			...prev,
			topics: prev.topics.includes(topicId)
				? prev.topics.filter((id) => id !== topicId)
				: [...prev.topics, topicId],
		}));
		setErrors((prev) => ({ ...prev, topics: "" }));
	};

	const handleStudentSelection = (student) => {
		setEvaluationData((prev) => ({
			...prev,
			students: prev.students.includes(student)
				? prev.students.filter((s) => s !== student)
				: [...prev.students, student],
		}));
		setErrors((prev) => ({ ...prev, students: "" }));
	};
	const validateStep = () => {
		const newErrors = {};
		if (step === 1) {
			if (!evaluationData.name.trim())
				newErrors.name = "Evaluation name is required";
			if (!evaluationData.subject) newErrors.subject = "Subject is required";
			if (!evaluationData.textbook)
				newErrors.textbook = "Textbook file is required";
		} else if (step === 2) {
			if (
				evaluationData.topics.length < 4 ||
				evaluationData.topics.length > 6
			) {
				newErrors.topics = "Please select 4 to 6 topics";
			}
		} else if (step === 3) {
			if (evaluationData.students.length === 0)
				newErrors.students = "Please select at least one student";
			if (!evaluationData.difficultyLevel)
				newErrors.difficultyLevel = "Please select a difficulty level";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleNextStep = () => {
		if (validateStep()) {
			if (step < 3) {
				setStep((prev) => prev + 1);
			} else {
				onCreateEvaluation(evaluationData);
				onClose();
			}
		}
	};
	const renderStepper = () => (
		<ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-6">
			<li
				className={`flex md:w-full items-center ${step >= 1 ? "text-blue-600 dark:text-blue-500" : ""} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
			>
				<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
					{step > 1 ? (
						<svg
							className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
						</svg>
					) : (
						<span className="me-2">1</span>
					)}
					Evaluation{" "}
					<span className="hidden sm:inline-flex sm:ms-2">Details</span>
				</span>
			</li>
			<li
				className={`flex md:w-full items-center ${step >= 2 ? "text-blue-600 dark:text-blue-500" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}
			>
				<span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
					{step > 2 ? (
						<svg
							className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
						</svg>
					) : (
						<span className="me-2">2</span>
					)}
					Topic <span className="hidden sm:inline-flex sm:ms-2">Selection</span>
				</span>
			</li>
			<li
				className={`flex items-center ${step === 3 ? "text-blue-600 dark:text-blue-500" : ""}`}
			>
				<span className="me-2">3</span>
				Confirmation
			</li>
		</ol>
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[80%]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-center">
						Create New Evaluation
					</DialogTitle>
				</DialogHeader>
				{renderStepper()}
				<Card>
					<CardContent className="pt-6">
						{step === 1 && (
							<div className="space-y-4">
								<div>
									<Label htmlFor="name" className="text-sm font-medium">
										Evaluation Name
									</Label>
									<Input
										id="name"
										name="name"
										value={evaluationData.name}
										onChange={handleInputChange}
										className="mt-1"
										placeholder="Enter evaluation name"
									/>
									{errors.name && (
										<p className="text-red-500 text-sm mt-1">{errors.name}</p>
									)}
								</div>
								<div>
									<Label htmlFor="subject" className="text-sm font-medium">
										Subject
									</Label>
									<Select
										id="subject"
										value={evaluationData.subject}
										onValueChange={(value) =>
											setEvaluationData((prev) => ({ ...prev, subject: value }))
										}
									>
										<SelectTrigger className="w-full mt-1">
											<SelectValue placeholder="Select Subject" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="hindi">Hindi</SelectItem>
											<SelectItem value="history">History</SelectItem>
											<SelectItem value="computer_science">
												Computer Science
											</SelectItem>
										</SelectContent>
									</Select>
									{errors.subject && (
										<p className="text-red-500 text-sm mt-1">
											{errors.subject}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="textbook" className="text-sm font-medium">
										Upload Textbook
									</Label>
									<Input
										id="textbook"
										name="textbook"
										type="file"
										onChange={handleFileUpload}
										className="mt-1"
									/>
									{errors.textbook && (
										<p className="text-red-500 text-sm mt-1">
											{errors.textbook}
										</p>
									)}
								</div>
							</div>
						)}
						{step === 2 && (
							<div className="space-y-4">
								<h2 className="text-lg font-semibold">Select 4 to 6 topics:</h2>
								{isLoading ? (
									<div className="flex justify-center items-center h-40">
										<div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
									</div>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{visibleTopics.map((topic, index) => (
											<TopicCard
												key={topic.id}
												topic={topic}
												isSelected={evaluationData.topics.includes(topic.id)}
												onToggle={handleTopicSelection}
												index={index}
											/>
										))}
									</div>
								)}
								{errors.topics && (
									<p className="text-red-500 text-sm mt-1">{errors.topics}</p>
								)}
							</div>
						)}
						{step === 3 && (
							<div className="space-y-6">
								<div>
									<h3 className="text-lg font-semibold mb-3">
										Select Students
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{students.map((student) => (
											<div
												key={student.id}
												className="flex items-center space-x-3 p-2 border rounded-md hover:bg-gray-50"
											>
												<Checkbox
													id={`student-${student.id}`}
													checked={evaluationData.students.includes(student.id)}
													onCheckedChange={() =>
														handleStudentSelection(student.id)
													}
												/>
												<label
													htmlFor={`student-${student.id}`}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow"
												>
													<div>{student.name}</div>
													<div className="text-xs text-gray-500">
														ID: {student.id} | Grade: {student.grade}
													</div>
												</label>
											</div>
										))}
									</div>
									{errors.students && (
										<p className="text-red-500 text-sm mt-1">
											{errors.students}
										</p>
									)}
								</div>
								<div>
									<Label htmlFor="difficulty" className="text-lg font-semibold">
										Difficulty Level
									</Label>
									<Select
										id="difficulty"
										value={evaluationData.difficultyLevel}
										onValueChange={(value) =>
											setEvaluationData((prev) => ({
												...prev,
												difficultyLevel: value,
											}))
										}
									>
										<SelectTrigger className="w-full mt-2">
											<SelectValue placeholder="Select difficulty" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="easy">Easy</SelectItem>
											<SelectItem value="medium">Medium</SelectItem>
											<SelectItem value="hard">Hard</SelectItem>
										</SelectContent>
									</Select>
									{errors.difficultyLevel && (
										<p className="text-red-500 text-sm mt-1">
											{errors.difficultyLevel}
										</p>
									)}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handleNextStep}
						className="w-full"
						disabled={isLoading}
					>
						{step === 3 ? "Create Evaluation" : "Next"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateEvaluationModal;
