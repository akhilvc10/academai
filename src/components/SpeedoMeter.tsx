"use client";
import React, { useMemo } from "react";
import SpeedoMeterSvg from "./SpeedoMeterSvg";
import DotIndicator from "./DotIndicator";
import AnimatedTitleStatus from "./AnimatedTitleStatus";

type SpeedoMeterProps = {
	percentage: number; // Define level as a number
	title: string; // Define title as a string
};

const baseColor: { [key: number]: string } = {
	1: "bg-red-400",
	2: "bg-orange-400",
	3: "bg-yellow-400",
	4: "bg-green-400",
};

export default function SpeedoMeter({ percentage, title }: SpeedoMeterProps) {
	const level = useMemo(() => {
		if (percentage <= 25) return 1;
		if (percentage <= 50) return 2;
		if (percentage <= 75) return 3;
		return 4;
	}, [percentage]);

	const color = useMemo(() => {
		return baseColor[level] || "bg-gray-400";
	}, [level]);

	return (
		<div className="flex items-center justify-center flex-col h-[200px] mt-5">
			<SpeedoMeterSvg initialLevel={level} />
			<div className="flex items-center justify-center gap-3 mt-5">
				<DotIndicator color={color} shouldAnimate={true} />
				<AnimatedTitleStatus title={title} />
				<DotIndicator color={color} shouldAnimate={true} />
			</div>
		</div>
	);
}
