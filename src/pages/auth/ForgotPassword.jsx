import React, { useState, useEffect } from "react";
import { Api } from "../../api";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import LayoutWeb from "../../layouts/Web";

function ForgotPassword() {
	document.title = "Traveling | Forgot Password";

	const [email, setEmail] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [validation, setValidation] = useState({});
	const history = useHistory();

	const forgotHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setValidation({});

		try {
			await Api.post("/forgot-password", { email });

			toast.success("Please check your mailbox to reset password!", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: { background: "#333", color: "#fff" },
			});

			history.push("/login");
		} catch (error) {
			if (error.response?.data) {
				setValidation(error.response.data);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<LayoutWeb>
			<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl mt-24 mb-44">
				<h5 className="lg:text-[32px] font-semibold">Atur Ulang Kata Sandi</h5>
				<form onSubmit={forgotHandler}>
					<div className="space-y-2 mt-8">
						{validation.message && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<span className="block sm:inline">{validation.message}</span>
							</div>
						)}
						<section className="flex flex-col gap-y-2">
							<label htmlFor="email" className="block font-bold">
								Alamat Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full px-4 py-2 placeholder:text-sm bg-gray-100 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-50"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email Address"
								required
							/>
							{validation.email && (
								<div className="text-red-500">{validation.email[0]}</div>
							)}
						</section>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-blue-900 disabled:opacity-50"
					>
						{isLoading ? "Loading..." : "Kirim"}
					</button>
				</form>
			</div>
		</LayoutWeb>
	);
}

export default ForgotPassword;
