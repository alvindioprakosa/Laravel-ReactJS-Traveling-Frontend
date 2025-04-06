import React, { useState, useEffect } from "react";
import { Api } from "../../api";
import toast from "react-hot-toast";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link, useHistory, Redirect } from "react-router-dom";
import LayoutWeb from "../../layouts/Web";

function Login() {
	document.title = "Login | Traveling";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");
	const [isLoading, setLoading] = useState(false);
	const [validation, setValidation] = useState({});
	const history = useHistory();

	const togglePassword = () => {
		setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
	};

	const loginHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		setValidation({});

		try {
			const response = await Api.post("/login", { email, password });

			toast.success("Login Successfully.", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: { background: "#333", color: "#fff" },
			});

			Cookies.set("token", response.data.data.token);
			Cookies.set("user_id", response.data.user_id);
			Cookies.set("user_name", response.data.user_name);
			Cookies.set("status_verified", response.data.status_verified);

			history.push("/user/account");
		} catch (error) {
			setValidation(error.response?.data || {});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	if (Cookies.get("token")) {
		return <Redirect to="/user/dashboard" />;
	}

	return (
		<LayoutWeb>
			<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl mb-24 mt-20">
				<h5 className="lg:text-[32px] font-semibold">Login</h5>
				<form onSubmit={loginHandler}>
					<div className="space-y-2 mt-8">
						{validation.message && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
								<span className="block sm:inline">{validation.message}</span>
							</div>
						)}

						<section className="flex flex-col gap-y-2">
							<label htmlFor="email" className="block font-bold">Email</label>
							<input
								id="email"
								type="email"
								className="w-full px-4 py-2 placeholder:text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Masukkan email anda"
								required
							/>
							{validation.email && (
								<div className="text-red-500">{validation.email[0]}</div>
							)}
						</section>

						<section className="flex flex-col gap-y-2">
							<label htmlFor="password" className="block font-bold">Kata sandi</label>
							<div className="flex flex-row gap-2">
								<input
									id="password"
									type={passwordType}
									className="w-full px-4 py-2 placeholder:text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Masukkan kata sandi"
									required
								/>
								<button
									type="button"
									className="bg-gray-100 rounded-md px-3 text-black"
									onClick={togglePassword}
								>
									{passwordType === "password" ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
								</button>
							</div>
							{validation.password && (
								<div className="text-red-500">{validation.password[0]}</div>
							)}
						</section>
					</div>

					<div className="flex items-center justify-between mt-4">
						<label htmlFor="remember" className="flex items-center gap-2">
							<input type="checkbox" id="remember" className="border border-gray-200" />
							<span>Ingat saya</span>
						</label>
						<Link className="text-[#229396]" to="/forgot-password">Lupa kata sandi?</Link>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-[#005A98] disabled:opacity-50"
					>
						{isLoading ? "Loading..." : "Login"}
					</button>

					<p className="mt-4 text-center text-sm">
						Belum punya akun?{" "}
						<Link to="/register" className="text-[#229396] underline-offset-8">
							Buat sebuah akun
						</Link>
					</p>
				</form>
			</div>
		</LayoutWeb>
	);
}

export default Login;
