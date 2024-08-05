"use server";

import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const setTopicsToCookies = ({ topics }) => {
	cookies().set("selectedTopics", JSON.stringify(topics));
	redirect(`/student/evaluation?topic=${topics[0]}`);
};

export const evaluateSingleTopicAnswers = async ({
	answers,
	student_id,
	subject,
	topic,
}) => {
	const url = `${BASE_URL}/api/v1/academai/evaluate`;

	const data = {
		student_id: student_id,
		subject: subject,
		topic: topic,
		...answers,
	};
	console.log("🚀 ~ file: actions.ts ~ line 27 ~ data", data);

	const response = await fetch(url, {
		method: "POST", // Specify the HTTP method
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data), // Convert the data object to a JSON string
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const responseData = response.json();

	return responseData;
};

export const getFinalReport = async ({ student_id, subject }) => {
	const url = `${BASE_URL}/api/v1/academai/final_report?student_id=${student_id}&subject=${subject}
`;

	const response = await fetch(url, {
		method: "GET", // Specify the HTTP method
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const responseData = response.json();
	console.log("🚀 ~ file: actions.ts ~ line 61 ~ getFinalReport ~ responseData", responseData)

	return responseData;
};

export const navigateToNextTopic = (nextTopic) => {
	
	redirect(`?topic=${nextTopic}`);
};
