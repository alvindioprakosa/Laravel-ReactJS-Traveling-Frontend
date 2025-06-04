import React from "react";
import { ProfilePic } from "../../../../assets";
import moment from "moment";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { Api } from "../../../../api/index";

function Comment({ comment, fetchDataBlog }) {
  const token = Cookies.get("token");
  const userId = parseInt(Cookies.get("user_id"));

  // Remove comment with error handling and optimized data refresh
  const removeComment = async (commentId) => {
    try {
      const response = await Api.post(
        "/delete-blog",
        { comment_id: commentId },
        {
          headers: {
            //header Bearer + Token
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment has been removed!", {
        duration: 4000,
        position: "top-right",
        className: "toast",
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      // Refresh comments without reloading the entire page
      fetchDataBlog();
    } catch (error) {
      toast.error("Failed to remove comment. Please try again later.", {
        duration: 4000,
        position: "top-right",
        className: "toast",
        style: {
          background: "#f44336", // Red background for error
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="rounded-xl w-full pb-[0.5px] pt-[5px] mb-3 bg-gray-100">
      <div className="inline-flex items-center ml-4 mt-1 mr-2">
        <img
          alt="Profile"
          src={ProfilePic}
          height={32}
          width={32}
          className="rounded-full"
        />
        <div className="flex-col">
          <p className="font-semibold text-md ml-1 text-gray-500">
            {comment.user.name}
          </p>
          <p className="ml-1 text-xs text-gray-500">
            {moment(comment.created_at).fromNow()}
          </p>
        </div>
      </div>

      {/* Delete button only for the logged-in user's own comments */}
      {comment.user.id === userId && (
        <button
          className="float-right mr-3 text-red-500"
          onClick={() => removeComment(comment.id)}
        >
          Delete
        </button>
      )}

      <p className="ml-5 mt-2 mb-4 text-gray-500">{comment.comment}</p>
    </div>
  );
}

export default Comment;
