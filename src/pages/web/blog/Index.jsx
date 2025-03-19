import React, { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { Link } from "react-router-dom";
import { Api } from "../../../api/index";
import CardBlog from "../../../components/utilities/artikel/CardBlog";
import PaginationComponent from "../../../components/utilities/Pagination";
import { SkeletonBlog } from "../../../components/utilities/skeleton";

function Blog() {
  // Title page
  document.title = "Traveling | Blog";

  // States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hideNullData, setHideNullData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); // Define perPage as constant (typically 10 or another fixed number)
  const [total, setTotal] = useState(0);

  const fetchDataBlogs = async (pageNumber = currentPage) => {
    try {
      setLoading(true);
      setHideNullData(true);
      
      const response = await Api.get(`/blog/list?page=${pageNumber}`);
      const { data } = response.data;

      setBlogs(data.data);
      setCurrentPage(data.current_page);
      setTotal(data.total);

      // Scroll to top when data is fetched
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      setHideNullData(false);
    }
  };

  useEffect(() => {
    fetchDataBlogs();
  }, []); // Empty dependency array, fetch data once on component mount

  return (
    <React.Fragment>
      <LayoutWeb>
        <div className="bg-gray-50 w-full h-64 my-8 md:h-16 px-12 md:px-24 space-y-5">
          <section className="pt-5 text-center md:text-left">
            <p className="text-sm text-gray-500">
              <Link to="/" className="text-black">Home</Link> / Blog
            </p>
          </section>
        </div>
        <div className="mt-2">
          <div className="ml-24">
            <h5 className="text-xl font-semibold text-gray-500">
              Temukan Artikel / Blog
            </h5>
          </div>
          <div className="flex justify-between px-12 md:flex-row flex-col">
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-[16px] gap-y-2 ml-12 my-12">
              {loading ? <SkeletonBlog /> : (
                blogs.length > 0 ? blogs.map(blog => (
                  <CardBlog
                    key={blog.id}
                    id={blog.id}
                    slug={blog.slug}
                    title={blog.title}
                    feature_image={blog.feature_image}
                    feature={blog.feature}
                    type={blog.category_blog.name}
                    user={blog.user.name}
                    commentCount={blog.comment_count}
                  />
                )) : !hideNullData && <p>Data Belum Tersedia.</p>
              )}
            </section>
          </div>
          <div>
            {/* Pagination */}
            {blogs.length > 0 && (
              <PaginationComponent
                currentPage={currentPage}
                perPage={perPage}
                total={total}
                onChange={(pageNumber) => fetchDataBlogs(pageNumber)}
                position="end"
              />
            )}
          </div>
        </div>
      </LayoutWeb>
    </React.Fragment>
  );
}

export default Blog;
