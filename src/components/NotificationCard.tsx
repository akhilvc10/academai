import React from "react";
import TimeStamp from "./TimeStamp";
import { Button } from "./ui/button";
import TopicModal from "./TopicModal";

interface NotificationCardProps {
	imageSrc: string;
	subject: string;
	sender: string;
	time: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	imageSrc,
	subject,
	sender,
	time,
}) => {
	return (
		<article className="flex flex-wrap gap-3 items-center p-4 bg-white rounded-lg shadow w-[80%] mt-5">
			<img
				loading="lazy"
				src={imageSrc}
				alt={`${sender}'s profile`}
				className="object-contain shrink-0 self-stretch my-auto w-11 aspect-square rounded-[100px]"
			/>
			<div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
				<p className="text-base text-gray-900">
					New <span className="font-bold">{subject}</span> subject evaluation
					notification from <span className="text-gray-900">{sender}</span>
				</p>
				<TimeStamp time={time} />
			</div>
			<TopicModal />
			{/* <Button variant="default">Take the Evaluation</Button> */}
		</article>
	);
};

export default NotificationCard;
