import React from "react";
import { Star, BookOpen, Brain, Lightbulb, MessageSquare } from "lucide-react";

const SingleEvaluationResult = ({ result }) => {
	const {
		mark,
		conceptual_understanding,
		problem_solving,
		clarity_of_expression,
		suggestions,
	} = result;

	const ScoreItem = ({ icon: Icon, title, score }) => (
		<div className="flex items-center space-x-2 mb-2">
			<Icon className="text-blue-500" size={20} />
			<span className="font-medium">{title}:</span>
			<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
				{score || 0}
			</span>
		</div>
	);

	return (
		<div className="mt-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
			<h3 className="text-xl font-bold mb-4 flex items-center">
				<Star className="text-yellow-400 mr-2" size={24} />
				Evaluation Results
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<ScoreItem icon={Star} title="Overall Mark" score={mark} />
				<ScoreItem
					icon={BookOpen}
					title="Conceptual Understanding"
					score={conceptual_understanding}
				/>
				<ScoreItem
					icon={Brain}
					title="Problem Solving"
					score={problem_solving}
				/>
				<ScoreItem
					icon={MessageSquare}
					title="Clarity of Expression"
					score={clarity_of_expression}
				/>
			</div>
			<div className="mt-4">
				<h4 className="font-semibold flex items-center mb-2">
					<Lightbulb className="text-yellow-500 mr-2" size={20} />
					Suggestions for Improvement
				</h4>
				<p className="text-gray-700 bg-yellow-50 p-3 rounded-md">
					{suggestions || "No suggestions provided."}
				</p>
			</div>
		</div>
	);
};

export default SingleEvaluationResult;
