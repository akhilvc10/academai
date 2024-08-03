import React from "react";

interface NotificationContentProps {
	subject: string;
	sender: string;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
	subject,
	sender,
}) => {
	return (
		<div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
			<p className="text-base text-gray-900">
				New <span className="font-bold">{subject}</span> subject evaluation
				notification from <span className="text-gray-900">{sender}</span>
			</p>
		</div>
	);
};

export default NotificationContent;
