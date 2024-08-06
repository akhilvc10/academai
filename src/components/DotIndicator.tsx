interface DotIndicatorProps {
	color: string;
	shouldAnimate?: boolean;
}

const DotIndicator: React.FC<DotIndicatorProps> = ({
	color,
	shouldAnimate = true,
}) => {
	return (
		<span
			className={`w-2 flex rounded-full aspect-square ${color} ${
				shouldAnimate ? "animate-pulse" : ""
			}`}
		/>
	);
};

export default DotIndicator;
