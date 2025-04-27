import React, { useState } from "react";
import { useParams } from "react-router";
import { Api } from "../../../../api";
import { toast } from "react-hot-toast";

function CommentForm({ submitLabel }) {
  let { id } = useParams();
  const [newcomment, setNewComment] = useState("");
  const isTextAreaDisabled = newcomment.length === 0;

  // Add comment API call
  const addComments = async () => {
    try {
      const response = await Api.post("/blog", { comment: newcomment, id: id });
      if (response.status === 200) {
        toast.success("Comment added successfully!", {
          duration: 4000,
          position: "top-right",
          className: "toast",
          style: {
            background: "#333",
            color: "#fff",
          },
        });
        // Reset comment field after successful submission
        setNewComment("");
      }
    } catch (error) {
      toast.error("Failed to post comment. Please try again.", {
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

  const onSubmit = (e) => {
    e.preventDefault();
    addComments(); // Call addComments when form is submitted
  };

  return (
    <form onSubmit={onSubmit} className="my-4">
      <textarea
        value={newcomment}
        onChange={(e) => setNewComment(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Write your comment..."
        className="border-2 p-2 w-full rounded-lg"
      />
      <button
        type="submit"
        disabled={isTextAreaDisabled}
        className="mt-3 bg-blue-500 text-white py-2 px-4 rounded"
      >
        {submitLabel || "Post Comment"}
      </button>
    </form>
  );
}

export default CommentForm;
