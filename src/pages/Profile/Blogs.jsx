import React, { useEffect } from "react";
import useUserContext from "../../contexts/UserContext";
import { assets } from "../../assets/assets";

import "./css/Blogs.css";

const Blogs = () => {
  const { getUserBlogs, userBlogs } = useUserContext();

  const changeDateFormat = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div className="blogs-page-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th className="blog-post-date">Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userBlogs
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((blog, index) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td className="blog-post-date">
                  {changeDateFormat(blog.createdAt)}
                </td>
                <td>
                  <img src={assets.cross_icon} alt="" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
