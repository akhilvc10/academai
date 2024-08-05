import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

const TopicCard = ({ topic, isSelected, onToggle, index }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: index * 0.5 }}
	>
		<Card
			className={`cursor-pointer transition-all ${isSelected ? "ring-2 ring-primary" : ""}`}
			onClick={() => onToggle(topic.id)}
		>
			<CardContent className="p-4">
				<div className="flex items-start space-x-3">
					<Checkbox
						checked={isSelected}
						onCheckedChange={() => onToggle(topic.id)}
						className="mt-1"
					/>
					<div>
						<h3 className="font-semibold text-lg">{topic.title}</h3>
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
							{topic.summary}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	</motion.div>
);

export default TopicCard;
