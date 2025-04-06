import React, { useState, useEffect } from "react";
import { Api } from "../../api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Link, useHistory } from "react-router-dom";
import LayoutWeb from "../../layouts/Web";

function Register() {
	document.title = "Traveling | Register";

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");

	const [isLoading, setLoading] = useState(false);
	const [validation, setValidation] = useState({});
	const history = useHistory();

	const RegisterHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (password !== password_confirmation) {
			setValidation({
				password_confirmation: ["Konfirmasi kata sandi tidak cocok"],
			});
			setLoading(false);
			return;
		}

		try {
			const response = await Api.post("/register", {
				name,
				email,
				password,
				password_confirmation,
			});

			setLoading(false);
			toast.success("Register berhasil!", {
				duration: 4000,
				position: "top-right",
				className: "toast",
				style: {
					background: "#333",
					color: "#fff",
				},
			});

			Cookies.set("token", response.data.data.token);
			Cookies.set("user_id", response.data.user_id);
			Cookies.set("user_name", response.data.user_name);
			Cookies.set("status_verified", false);

			history.push("/verify-email");
		} catch (error) {
			setLoading(false);
			setValidation(error.response.data);
		}
	};

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<LayoutWeb>
			<div className="mx-auto w-96 bg-white px-6 py-6 rounded-xl shadow-2xl mb-24 mt-20">
				<h5 className="lg:text-[32px] font-semibold">Registrasi</h5>
				<form onSubmit={RegisterHandler}>
					<div className="space-y-2 mt-8">
						{validation.message && (
							<div
								className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
								role="alert"
							>
								<span className="block sm:inline">{validation.message}</span>
							</div>
						)}

						{/* Nama */}
						<section className="flex flex-col gap-y-2">
							<label htmlFor="name" className="block font-bold">
								Nama
							</label>
							<input
								type="text"
								className="input"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Masukan Nama Anda"
							/>
							{validation.name && (
								<div className="text-red-500">{validation.name[0]}</div>
							)}
						</section>

						{/* Email */}
						<section className="flex flex-col gap-y-2">
							<label htmlFor="email" className="block font-bold">
								Email
							</label>
							<input
								type="email"
								className="input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Alamat Email"
							/>
							{validation.email && (
								<div className="text-red-500">{validation.email[0]}</div>
							)}
						</section>

						{/* Password */}
						<section className="flex flex-col gap-y-2">
							<label htmlFor="password" className="block font-bold">
								Kata sandi
							</label>
							<input
								type="password"
								className="input"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Masukkan kata sandi"
							/>
							{validation.password && (
								<div className="text-red-500">{validation.password[0]}</div>
							)}
						</section>

						{/* Konfirmasi Password */}
						<section className="flex flex-col gap-y-2">
							<label htmlFor="password_confirmation" className="block font-bold">
								Konfirmasi kata sandi
							</label>
							<input
								type="password"
								className="input"
								value={password_confirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								placeholder="Masukkan ulang kata sandi"
							/>
							{validation.password_confirmation && (
								<div className="text-red-500">{validation.password_confirmation[0]}</div>
							)}
						</section>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full px-6 py-2 mt-4 text-white bg-[#229396] rounded-lg hover:bg-[#005A98]"
					>
						{isLoading ? "Loading..." : "Registrasi"}
					</button>

					<p className="mt-4 text-center text-sm font-normal">
						Sudah punya akun?{" "}
						<Link to="/login" className="text-[#229396] underline-offset-8">
							Login
						</Link>
					</p>
				</form>
			</div>
		</LayoutWeb>
	);
}

export default Register;
