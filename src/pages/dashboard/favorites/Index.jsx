import React, { useState, useEffect } from "react";
import LayoutAdmin from "../../../layouts/Dashboard";
import { Api } from "../../../api/index";
import CardFavorite from "../../../components/utilities/my-favorite/CardFavorite";
import { SkeletonMyFavorite } from "../../../components/utilities/skeleton";
import Cookies from "js-cookie";

function Favorite() {
	// Set page title
	document.title = "Traveling | My Favorite";

	// State for favorite items and loading status
	const token = Cookies.get("token");
	const [myFavorite, setMyFavorite] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch favorite data from the API
	const fetchDataMyFavorite = async () => {
		setLoading(true); // Set loading to true before the request
		try {
			const response = await Api.get(`/favorite`, {
				headers: {
					Authorization: `Bearer ${token}`, // Bearer token for authentication
				},
			});
			setMyFavorite(response.data.data); // Set fetched data to state
		} catch (error) {
			setError("Failed to load your favorites."); // Handle error
			setMyFavorite([]); // If error, set empty array
		} finally {
			setLoading(false); // Set loading to false once the request is complete
		}
	};

	// Scroll to top when component mounts
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	// Use effect hook to call the fetchDataMyFavorite function when the component mounts
	useEffect(() => {
		scrollToTop();
		fetchDataMyFavorite(); // Fetch data when component mounts
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<LayoutAdmin>
				{/* Section to display favorites */}
				<section className="grid grid-cols-2 lg:grid-cols-4 gap-2">
					{/* Display skeleton loader if loading */}
					{loading && <SkeletonMyFavorite />}

					{/* If no favorites available, show a message */}
					{!loading && myFavorite.length === 0 && !error && (
						<div>
							<p>Data Belum Tersedia.</p>
						</div>
					)}

					{/* Show error message if there is any error */}
					{error && !loading && (
						<div>
							<p>{error}</p>
						</div>
					)}

					{/* Display favorite items if available */}
					{!loading && myFavorite.length > 0 && myFavorite.map((favorite) => (
						<CardFavorite
							key={favorite.item.tour.id}
							id={favorite.item.tour.id}
							slug={favorite.item.tour.slug}
							title={favorite.item.tour.title}
							featured_image={favorite.item.tour.featured_image}
							featured={favorite.item.tour.featured}
							premium={favorite.item.tour.premium}
							city={favorite.item.tour.city.name}
							type={favorite.type_tour}
							rating={favorite.item.tour.rating}
							review_count={favorite.item.tour.review_count}
						/>
					))}
				</section>
			</LayoutAdmin>
		</React.Fragment>
	);
}

export default Favorite;
