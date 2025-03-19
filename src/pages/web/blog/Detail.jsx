import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { Api, LinkUrl } from "../../../api/index";
import Cookies from "js-cookie";
import { FiShare2 } from "react-icons/fi";
import { RWebShare } from "react-web-share";
import { toast } from "react-hot-toast";
import { ProfilePic } from "../../../assets";
import Comments from "../../../components/utilities/artikel/commentsection/Comments";
import { SkeletonBlogDetail } from "../../../components/utilities/skeleton";

function BlogDetail() {
	const token = Cookies.get("token");
	const { slug } = useParams();
	const [blog, setBlog] = useState({});
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [hideNullData, setHideNullData] = useState(true);
	const [comment, setComment] = useState("");
	const [seoTitle, setSeoTitle] = useState("");
	const [title, setTitle] = useState("");
	const [commentlist, setCommentsList] = useState([]);
	const [validation, setValidation] = useState({});

	useEffect(() => {
		const fetchDataBlog = async () => {
			try {
				const response = await Api.get(`blog/${slug}`);
				setBlog(response.data.data);
				setUser(response.data.data.user);
				setCommentsList(response.data.comments);
				setSeoTitle(response.data.data.seo_title);
				setTitle(response.data.data.title);
			} catch (error) {
				console.error("Error fetching blog data:", error);
			} finally {
				setLoading(false);
				setHideNullData(false);
			}
		};

		fetchDataBlog();
		document.title = seoTitle || `${title} | Traveling`;
		scrollToTop();
	}, [slug, seoTitle, title]);

	const PostComment = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await Api.post(
				"/blog",
				{ blog_id: blog.id, comment },
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			toast.success("Comment Posted!", {
				duration: 4000,
				position: "top-right",
				style: { background: "#333", color: "#fff" },
			});
			setComment("");
			// Re-fetch comments without reloading the page
			const updatedResponse = await Api.get(`blog/${slug}`);
			setCommentsList(updatedResponse.data.comments);
		} catch (error) {
			setValidation(error.response?.data || {});
		} finally {
			setLoading(false);
		}
	};

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<LayoutWeb>
			{loading && <SkeletonBlogDetail />}
			{!loading && !hideNullData && (
				<div>
					{/* Profile and Share Section */}
					<section className="mt-16 mb-4 inline-flex items-center gap-x-[40vw] mx-[24vw]">
						<div className="inline-flex items-center">
							<img
								alt="profile pic"
								height={50}
								width={50}
								src={ProfilePic}
								className="rounded-full"
							/>
							<p className="font-semibold ml-2 text-md text-gray-500">{user.name}</p>
						</div>
						<div>
							<RWebShare
								data={{
									text: "Check out this blog post!",
									url: LinkUrl + "/blog/" + blog.slug,
									title: blog.title,
									sites: [],
								}}
								onClick={() => console.log("Shared!")}
							>
								<button className="px-2 py-2 bg-gray-300 rounded-lg">
									<FiShare2 />
								</button>
							</RWebShare>
						</div>
					</section>

					{/* Blog Title and Content */}
					<section>
						<h1 className="text-center mt-8 text-gray-500">{blog.title}</h1>
						<div
							className="w-[51vw] mx-[24vw]"
							dangerouslySetInnerHTML={{ __html: blog.content }}
						></div>
					</section>

					{/* Comment Section */}
					<hr className="my-10 w-[60vw] mx-[20vw]" />
					<section className="mx-[25vw]">
						<div className="inline-flex items-center mb-1">
							<h3 className="text-lg font-semibold text-gray-500">Kirim Komentar</h3>
						</div>
						<form className="mb-20" onSubmit={PostComment}>
							<textarea
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								type="text"
								placeholder="Masukkan komentarmu disini"
								className="w-full pt-1 h-20 border rounded-xl border-black outline-none px-4"
							></textarea>
							{validation.comment && (
								<div className="text-red-500">{validation.comment[0]}</div>
							)}
							{token ? (
								<button className="float-right mt-2 bg-black rounded-lg text-white font-bold px-3 py-2">
									{loading ? "Loading..." : "Kirim"}
								</button>
							) : (
								<Link
									to="/login"
									className="float-right mt-2 bg-black rounded-lg text-white font-bold px-3 py-2"
								>
									Kirim
								</Link>
							)}
						</form>
					</section>

					{/* Display Comments */}
					<section className="mx-[25vw]">
						<div className="inline-flex items-center mb-1">
							<h3 className="text-lg font-semibold text-gray-500">Komentar</h3>
							<p className="text-sm ml-1 text-gray-600">({commentlist.length})</p>
						</div>
						{commentlist.length > 0 ? (
							<Comments comments={commentlist} fetchDataBlog={fetchDataBlog} />
						) : (
							<div hidden={hideNullData}>
								<p>Belum ada komentar.</p>
							</div>
						)}
					</section>
				</div>
			)}
		</LayoutWeb>
	);
}

export default BlogDetail;
