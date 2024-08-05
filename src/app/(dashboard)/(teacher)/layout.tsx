import DashboardLayout from "@/components/teacher/DashboardLayout";

const TeacherDashboardLayout = ({ children }) => {
	return (
		<DashboardLayout>
			{children}
			{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"></div> */}
		</DashboardLayout>
	);
};

export default TeacherDashboardLayout;
