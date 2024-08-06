"use client";

import { TrendingUp } from "lucide-react";
import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
	conceptual_understanding: {
		label: "Conceptual Understanding",
		color: "hsl(var(--chart-1))",
	},
	problem_solving: {
		label: "Problem Solving",
		color: "hsl(var(--chart-2))",
	},
	clarity_of_expression: {
		label: "Clarity of Expression",
		color: "hsl(var(--chart-3))",
	},
} satisfies ChartConfig;

export default function ScoreChart({ data }) {
	const startAngle = 90; // Start from top
	const sweepAngle = (data.score / 100) * 360; // Angle to sweep based on score
	const endAngle = startAngle - sweepAngle; // Subtract because we're going clockwise

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle className="text-md">{data.name}</CardTitle>
				<CardDescription className="text-xs">
					{data.score}% Proficiency
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<RadialBarChart
						data={[data]}
						startAngle={startAngle}
						endAngle={endAngle}
						innerRadius={80}
						outerRadius={110}
					>
						<PolarGrid
							gridType="circle"
							radialLines={false}
							stroke="none"
							className="first:fill-muted last:fill-background"
							polarRadius={[86, 74]}
						/>
						<RadialBar dataKey="score" background cornerRadius={10} />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-4xl font-bold"
												>
													{data.score}%
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Score
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
