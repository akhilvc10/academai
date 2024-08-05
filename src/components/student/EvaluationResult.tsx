import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const staticData = {
	results: [
		{
			question_id: "3ef0eb73-b40f-4727-b704-44c31d9a6d7c",
			mark: 3,
			conceptual_understanding: 2,
			problem_solving: 1,
			clarity_of_expression: 4,
			suggestions:
				"The answer provided is not specific to the question asked. It only mentions Stalingrad, but does not address its significance. The significance of the Battle of Stalingrad was that it was a turning point in the war, as it marked the first major defeat for Germany and eventually led to the Soviet counteroffensive.",
		},
	],
};

const chartConfig = {
	score: {
		label: "Score",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const EvaluationResult = () => {
	const [isOpen, setIsOpen] = useState(false);

	const result = staticData.results[0];
	const chartData = [
		{ topic: "Mark", score: result.mark },
		{
			topic: "Conceptual Understanding",
			score: result.conceptual_understanding,
		},
		{ topic: "Problem Solving", score: result.problem_solving },
		{ topic: "Clarity of Expression", score: result.clarity_of_expression },
	];

	const totalScore = chartData.reduce((sum, item) => sum + item.score, 0);
	const averageScore = (totalScore / (chartData.length * 5)) * 100;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="default">View Evaluation Result</Button>
			</DialogTrigger>
			<DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Detailed Evaluation Result</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Card>
						<CardHeader>
							<CardTitle>Overall Score: {averageScore.toFixed(2)}%</CardTitle>
							<CardDescription>Scores per Category</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig}>
								<BarChart data={chartData} width={600} height={300}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="topic"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<YAxis
										axisLine={false}
										tickLine={false}
										tickMargin={10}
										domain={[0, 5]}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="dashed" />}
									/>
									<Bar dataKey="score" fill="var(--color-score)" radius={4} />
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
					{chartData.map((item) => (
						<div key={item.topic} className="space-y-2">
							<h3 className="font-medium">{item.topic}</h3>
							<div className="flex items-center">
								<div className="h-4 w-full bg-gray-200 rounded-full">
									<div
										className="h-4 bg-yellow-400 rounded-full"
										style={{ width: `${(item.score / 5) * 100}%` }}
									></div>
								</div>
								<span className="ml-2 text-sm font-medium">{item.score}/5</span>
							</div>
						</div>
					))}
					<Card>
						<CardHeader>
							<CardTitle>Suggestions</CardTitle>
						</CardHeader>
						<CardContent>
							<p>{result.suggestions}</p>
						</CardContent>
					</Card>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EvaluationResult;
