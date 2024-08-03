import React from "react";

interface TimeStampProps {
	time: string;
}

const TimeStamp: React.FC<TimeStampProps> = ({ time }) => {
	return (
		<div className="flex gap-1.5 items-center self-start mt-1.5 text-sm leading-none text-gray-500">
			<img
				loading="lazy"
				src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a756da015ba77a7e21cec1785043c38c27c9daaafecb38883ba90ce583db5b8?apiKey=1949d922af864f9db80ed5b02b791a91&&apiKey=1949d922af864f9db80ed5b02b791a91"
				alt=""
				className="object-contain shrink-0 self-stretch my-auto w-3 aspect-square"
			/>
			<time className="self-stretch my-auto">{time}</time>
		</div>
	);
};

export default TimeStamp;
