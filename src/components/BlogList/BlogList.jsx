import { useEffect, useState } from "react";
import useUserContext from "../../contexts/UserContext";
import ProfileCard from "../Card/ProfileCard";

import "./BlogList.css";
import { assets } from "../../assets/assets";
import useBlogContext from "../../contexts/BlogContext";

const BlogList = () => {
  const { getUserBlogs, userBlogs } = useUserContext();
  const { deleteBlogById } = useBlogContext();
  const [blogCount, setBlogCount] = useState(0);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    getUserBlogs();
  }, []);
  

  // count total number of comments in all blogs
  const countComments = () => {
    let count = 0;
    userBlogs?.forEach((blog) => {
      count += blog.comments.length;
    });

    setCommentCount(count);
  }


  useEffect(() => {
    setBlogCount(userBlogs?.length);
    countComments();
  }, [userBlogs]);

  const handleDelete = async (blogId) => {
    
    try {
      await deleteBlogById(blogId);
      setShowDeletePopup(true);
      setTimeout(() => setShowDeletePopup(false), 2000); // Hide after 2 seconds
    } catch (error) {
      console.log("Error deleting blog:", error);
      return;
    }
  };

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
    <div className="blog-list-container">
      {showDeletePopup && (
        <div className="delete-popup">
          <span>🗑️ Blog Deleted Successfully!</span>
        </div>
      )}
      <div className="blog-list-container-upper-part">
        <ProfileCard
          image={assets.dashboard_icon_1}
          count={blogCount}
          name={"Blogs"}
        />
        <ProfileCard
          image={assets.dashboard_icon_2}
          count={commentCount}
          name={"Comments"}
        />
      </div>
      <div className="blog-list-container-lower-part">
        <p className="latest-blogs-heading">
          <img src={assets.dashboard_icon_4} alt="" />
          Latest Blogs
        </p>
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
            {
              // find first 3 blogs from userBlogs and display them
              userBlogs
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5)
                .map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td className="blog-post-date">
                      {changeDateFormat(blog.createdAt)}
                    </td>
                    <td onClick={() => handleDelete(blog.id)}>
                      <img src={assets.cross_icon} alt="" />
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
