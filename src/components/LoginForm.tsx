"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginForm({ userType }) {
	const router = useRouter();
	const [formData, setFormData] = useState({
		id: "",
		password: "",
	});
	const [error, setError] = useState("");

	const isStudent = userType === "student";
	const title = isStudent ? "Student Login" : "Teacher Login";
	const idLabel = isStudent ? "Student ID" : "Teacher ID";
	const idPlaceholder = isStudent ? "Enter student ID" : "Enter teacher ID";

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const validateForm = () => {
		if (!formData.id || !formData.password) {
			setError("Please fill in all fields");
			return false;
		}
		setError("");
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Here you would typically make an API call to validate credentials
			// For this example, we'll use a simple check
			if (formData.password === "Test@12345") {
				const dashboardRoute = isStudent
					? "/student/notification"
					: "/teacher/dashboard";
				router.push(dashboardRoute);
			} else {
				setError("Invalid credentials");
			}
		}
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<Link
					href="/"
					className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
				>
					AcademAI
				</Link>
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							{title}
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="id"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									{idLabel}
								</label>
								<input
									type="text"
									name="id"
									id="id"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={idPlaceholder}
									required
									value={formData.id}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
									value={formData.password}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
							</div>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<Button type="submit" className="w-full">
								Sign in
							</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
