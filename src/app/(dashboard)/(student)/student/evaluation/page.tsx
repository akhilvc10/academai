import EvaluationStepper from "@/components/student/EvaluationStepper";
import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import React, { useState, useEffect } from "react";

const fetchQuestions = async (topicName: string) => {
	const url = `${BASE_URL}/api/v1/academai/questions?student_id=123456&difficulty_level=Medium&questions=3&topic_name=${encodeURIComponent(topicName)}&subject=history`;

	const response = await fetch(url, {
		method: "GET",
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();

	if (!data.questions || !Array.isArray(data.questions)) {
		throw new Error("Invalid data format received from the server");
	}

	return data;
};

const EvaluationPage = async ({ searchParams }) => {
	const topic = searchParams.topic;
	const data = await fetchQuestions(topic);
	console.log("🚀 ~ file: page.tsx ~ line 32 ~ EvaluationPage ~ data", data);
	const questions = data.questions;
	const selectedTopicstopics = cookies().get("selectedTopics").value;
	const selectedTopicsArray = JSON.parse(selectedTopicstopics);

	return (
		<EvaluationStepper
			questions={questions}
			currentTopic={topic}
			selectedTopicsArray={selectedTopicsArray}
		/>
	);
};

export default EvaluationPage;
