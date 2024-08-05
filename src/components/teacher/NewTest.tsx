"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const NewTest = () => {
	const [subject, setSubject] = useState("History");
	const [textbook, setTextbook] = useState(null);
	const [topics, setTopics] = useState([]);
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [difficultyLevel, setDifficultyLevel] = useState("medium");
	const [students, setStudents] = useState([
		{ id: 1, name: "Alice Johnson" },
		{ id: 2, name: "Bob Smith" },
		{ id: 3, name: "Charlie Brown" },
		{ id: 4, name: "Diana Ross" },
	]);
	const [selectedStudents, setSelectedStudents] = useState([]);
	const [step, setStep] = useState(1);

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		setTextbook(file);
		// In a real application, you would process the PDF here
		// and extract topics. For this example, we'll use dummy data.
		setTopics([
			"The Renaissance",
			"The French Revolution",
			"World War I",
			"The Industrial Revolution",
			"The Cold War",
		]);
		setStep(2);
	};

	const handleTopicSelection = (topic) => {
		setSelectedTopics((prev) =>
			prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
		);
	};

	const handleStudentSelection = (studentId) => {
		setSelectedStudents((prev) =>
			prev.includes(studentId)
				? prev.filter((id) => id !== studentId)
				: [...prev, studentId],
		);
	};

	const handleSubmit = () => {
		console.log("Submitting test with the following details:");
		console.log("Subject:", subject);
		console.log("Textbook:", textbook?.name);
		console.log("Selected Topics:", selectedTopics);
		console.log("Difficulty Level:", difficultyLevel);
		console.log("Assigned Students:", selectedStudents);
		alert("Test submitted successfully!");
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Create New Test</h1>

			{step === 1 && (
				<div>
					<div className="mb-4">
						<Label htmlFor="subject">Subject</Label>
						<Select value={subject} onValueChange={setSubject}>
							<SelectTrigger>
								<SelectValue placeholder="Select a subject" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="History">History</SelectItem>
								<SelectItem value="Science">Science</SelectItem>
								<SelectItem value="Mathematics">Mathematics</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="mb-4">
						<Label htmlFor="textbook">Upload Textbook (PDF)</Label>
						<Input
							id="textbook"
							type="file"
							accept=".pdf"
							onChange={handleFileUpload}
						/>
					</div>
				</div>
			)}

			{step === 2 && (
				<div>
					<h2 className="text-xl font-semibold mb-4">Select Topics</h2>
					<div className="grid grid-cols-2 gap-4 mb-6">
						{topics.map((topic) => (
							<div key={topic} className="flex items-center space-x-2">
								<Checkbox
									id={topic}
									checked={selectedTopics.includes(topic)}
									onCheckedChange={() => handleTopicSelection(topic)}
								/>
								<label
									htmlFor={topic}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{topic}
								</label>
							</div>
						))}
					</div>

					<div className="mb-6">
						<Label>Difficulty Level</Label>
						<RadioGroup
							value={difficultyLevel}
							onValueChange={setDifficultyLevel}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="easy" id="easy" />
								<Label htmlFor="easy">Easy</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="medium" id="medium" />
								<Label htmlFor="medium">Medium</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="hard" id="hard" />
								<Label htmlFor="hard">Hard</Label>
							</div>
						</RadioGroup>
					</div>

					<h2 className="text-xl font-semibold mb-4">Assign to Students</h2>
					<div className="grid grid-cols-2 gap-4 mb-6">
						{students.map((student) => (
							<div key={student.id} className="flex items-center space-x-2">
								<Checkbox
									id={`student-${student.id}`}
									checked={selectedStudents.includes(student.id)}
									onCheckedChange={() => handleStudentSelection(student.id)}
								/>
								<label
									htmlFor={`student-${student.id}`}
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{student.name}
								</label>
							</div>
						))}
					</div>

					<Button onClick={handleSubmit}>Submit Test</Button>
				</div>
			)}
		</div>
	);
};

export default NewTest;
