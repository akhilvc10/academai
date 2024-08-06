"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface AnimatedTitleStatusProps {
	title: string;
}

const AnimatedTitleStatus: React.FC<AnimatedTitleStatusProps> = ({ title }) => {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const searchParams = useSearchParams();
	const search = searchParams.get("value");

	useEffect(() => {
		if (titleRef.current && search) {
			titleRef.current.classList.remove("animate-fadeSlideIn");

			// Force reflow to restart the animation
			void titleRef.current.offsetWidth;

			titleRef.current.classList.add("animate-fadeSlideIn");
		}
	}, [search]);

	return (
		<h1
			ref={titleRef}
			className="font-bold text-4xl capitalize dark:text-neutral-50"
		>
			{title}
		</h1>
	);
};

export default AnimatedTitleStatus;
