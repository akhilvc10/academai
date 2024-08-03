import NotificationCard from "@/components/NotificationCard";
import React from "react";

export default function NotificationPage() {
	return (
		<div className="container items-center flex flex-col">
			<NotificationCard
				imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/89b678848db61c56e5ad7012e1629030c51b3a7a2a12ff4018b56276ffa85339?apiKey=1949d922af864f9db80ed5b02b791a91&&apiKey=1949d922af864f9db80ed5b02b791a91"
				subject="History"
				sender="Leena"
				time="a few moments ago"
			/>
		</div>
	);
}
