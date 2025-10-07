import React, { useEffect, useState } from "react";

import "./BlogPage.css";
import { useParams } from "react-router";
import axios from "axios";
// import { assets } from "../../assets/assets";
import Navbar from "../../components/Navbar/Navbar";

const BlogPage = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});

  const [comment, setComment] = useState({
    blogId: blogId,
    content: "",
  });

  const handleChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // post comment api call
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/comments/add`,
        comment,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (data?.success) {
        console.log("Comment added successfully");
        setComment({
          ...comment,
          content: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getchBlogDetailsById = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blogs/public/${blogId}`
      );

      if (data.success) {
        setBlog(data.data);
        console.log("Blog data by id ", data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getchBlogDetailsById();
  }, [comment]);

  const changeDateFormat = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="blog-page-main-container">
      <div className="blog-page-navbar">
        <Navbar />
      </div>
      <div className="blog-page-content-container">
        <p className="blog-post-date-title">
          Published on {changeDateFormat(blog?.createdAt)}
        </p>
        <h1 className="blog-page-title">{blog?.title}</h1>
        <img src={blog.imageUrl} alt="" className="blog-page-main-image" />
        <div
          className="blog-page-content"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>

      {/* Comment Part */}
      <div className="comment-div">
        <div className="comment-container">
          <p className="total-comment-count">Total comments : {blog.comments?.length}</p>
          <p className="comment-count">Comment</p>
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              value={comment.content}
              onChange={handleChange}
              id="comment"
              cols="30"
              rows="10"
              placeholder="Write your comment here..."
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
