import EvaluationResultClient from "@/components/student/EvaluationResultClient";
import { BASE_URL } from "@/constants";

const getFinalReport = async ({ student_id, subject }) => {
	const url = `${BASE_URL}/api/v1/academai/final_report?student_id=${student_id}&subject=${subject}
	`;
	console.log("🚀 ~ file: actions.ts ~ line 47 ~ getFinalReport ~ url", url);

	const response = await fetch(url, {
		method: "GET", // Specify the HTTP method
		cache: "no-store",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}

	const responseData = await response.json();
	console.log(
		"🚀 ~ file: actions.ts ~ line 61 ~ getFinalReport ~ responseData",
		responseData,
	);

	return responseData;
};

const ReportPage = async () => {
	const res = await getFinalReport({
		student_id: "123456",
		subject: "history",
	});

	return <EvaluationResultClient data={res} />;
};

export default ReportPage;
