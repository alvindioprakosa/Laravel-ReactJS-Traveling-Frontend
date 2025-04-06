import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Dashboard";

function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simple validation
		if (newPassword !== confirmPassword) {
			alert("New password and confirmation do not match!");
			return;
		}

		// TODO: Send request to backend here
		console.log({
			currentPassword,
			newPassword,
			confirmPassword,
		});
	};

	return (
		<LayoutAdmin>
			<div className="px-8 py-6 mx-4 mt-4 text-left bg-white border-2 border-gray-100 md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-xl">
				<h3 className="text-2xl font-bold">Change Password</h3>
				<hr className="my-2" />
				<form onSubmit={handleSubmit}>
					<div className="mt-4">
						<label className="block font-bold" htmlFor="current-password">
							Current Password
						</label>
						<input
							id="current-password"
							type="password"
							placeholder="Enter your current password"
							className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="block font-bold" htmlFor="new-password">
							New Password
						</label>
						<input
							id="new-password"
							type="password"
							placeholder="Enter your new password"
							className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div className="mt-4">
						<label className="block font-bold" htmlFor="confirm-password">
							Confirm Password
						</label>
						<input
							id="confirm-password"
							type="password"
							placeholder="Enter your new password again"
							className="w-full px-4 py-2 mt-2 placeholder:text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="flex">
						<button
							type="submit"
							className="ml-auto w-48 px-6 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-[#003580]"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</LayoutAdmin>
	);
}

export default ChangePassword;
