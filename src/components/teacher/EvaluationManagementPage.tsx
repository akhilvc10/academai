"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateEvaluationModal from "@/components/teacher/CreateEvaluationModal";

const EvaluationManagementPage = () => {
	const [evaluations, setEvaluations] = useState([
		{
			id: 1,
			name: "Math Midterm",
			subject: "Mathematics",
			topics: 5,
			students: 30,
			date: "2024-08-15",
		},
		{
			id: 2,
			name: "English Essay",
			subject: "English",
			topics: 3,
			students: 25,
			date: "2024-08-20",
		},
		{
			id: 3,
			name: "Science Quiz",
			subject: "Science",
			topics: 4,
			students: 28,
			date: "2024-08-25",
		},
		{
			id: 4,
			name: "History Test",
			subject: "History",
			topics: 6,
			students: 22,
			date: "2024-08-30",
		},
		{
			id: 5,
			name: "Geography Project",
			subject: "Geography",
			topics: 2,
			students: 20,
			date: "2024-09-05",
		},
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCreateEvaluation = (newEvaluation) => {
		setEvaluations((prev) => [
			...prev,
			{
				...newEvaluation,
				id: prev.length + 1,
				date: new Date().toISOString().split("T")[0],
				topics: newEvaluation.topics.length,
				students: newEvaluation.students.length,
			},
		]);
	};

	return (
		<section className="bg-gray-50 dark:bg-gray-900 ">
			<div className="mx-auto max-w-screen-xl mt-16">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
					<div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
						<div className="w-full md:w-1/2" />
						<div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
							<div className="flex items-center space-x-3 w-full md:w-auto">
								<Button variant="default" onClick={() => setIsModalOpen(true)}>
									<svg
										className="h-3.5 w-3.5 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											clipRule="evenodd"
											fillRule="evenodd"
											d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
										/>
									</svg>
									Add Evaluation
								</Button>
							</div>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-4 py-4">
										Evaluation name
									</th>
									<th scope="col" className="px-4 py-3">
										Subject
									</th>
									<th scope="col" className="px-4 py-3">
										Topics
									</th>
									<th scope="col" className="px-4 py-3">
										Students
									</th>
									<th scope="col" className="px-4 py-3">
										Date
									</th>
									<th scope="col" className="px-4 py-3">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{evaluations.map((evaluation) => (
									<tr
										key={evaluation.id}
										className="border-b dark:border-gray-700"
									>
										<th
											scope="row"
											className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{evaluation.name}
										</th>
										<td className="px-4 py-3">{evaluation.subject}</td>
										<td className="px-4 py-3">{evaluation.topics}</td>
										<td className="px-4 py-3">{evaluation.students}</td>
										<td className="px-4 py-3">{evaluation.date}</td>
										<td className="px-4 py-3 flex items-center justify-end">
											<Button
												variant="ghost"
												size="sm"
												className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
												type="button"
											>
												<svg
													className="w-5 h-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
												</svg>
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<nav
						className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
						aria-label="Table navigation"
					>
						<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
							Showing
							<span className="font-semibold text-gray-900 dark:text-white">
								1-10
							</span>
							of
							<span className="font-semibold text-gray-900 dark:text-white">
								1000
							</span>
						</span>
						<ul className="inline-flex items-stretch -space-x-px">
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									<span className="sr-only">Previous</span>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									1
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									2
								</a>
							</li>
							<li>
								<a
									href="#"
									aria-current="page"
									className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
								>
									3
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									...
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									100
								</a>
							</li>
							<li>
								<a
									href="#"
									className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									<span className="sr-only">Next</span>
									<svg
										className="w-5 h-5"
										aria-hidden="true"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<CreateEvaluationModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onCreateEvaluation={handleCreateEvaluation}
			/>
		</section>
	);
};

export default EvaluationManagementPage;
