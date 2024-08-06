import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

const ImprovedFeedbackCard = ({ feedback }) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Feedbacks
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="bg-green-50 rounded-lg p-4">
					<h3 className="font-semibold text-lg mb-3 flex items-center text-green-700">
						<CheckCircle className="mr-2" size={24} />
						Strengths
					</h3>
					<ul className="space-y-2">
						{Object.values(feedback[0].strengths).map((strength, index) => (
							<li key={index} className="flex items-start">
								<span className="text-green-500 mr-2">•</span>
								<span>{strength}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="bg-amber-50 rounded-lg p-4">
					<h3 className="font-semibold text-lg mb-3 flex items-center text-amber-700">
						Areas for Improvement
					</h3>
					<ul className="space-y-2">
						{Object.values(feedback[0].gaps).map((gap, index) => (
							<li key={index} className="flex items-start">
								<span className="text-amber-500 mr-2">•</span>
								<span>{gap}</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export default ImprovedFeedbackCard;
