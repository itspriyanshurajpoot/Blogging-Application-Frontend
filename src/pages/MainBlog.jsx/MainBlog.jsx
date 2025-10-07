import { useEffect, useRef, useState } from "react";
import useCategoryContext from "../../contexts/CategoryContext";
import "./MainBlog.css";
import { assets } from "../../assets/assets";
import useBlogContext from "../../contexts/BlogContext";
import { useNavigate } from "react-router";
import axios from "axios";

const MainBlog = () => {
  const navigate = useNavigate();


  const { categories } = useCategoryContext();
  const { blogs, setBlogs, getBlogs, isFirstPage, setIsFirstPage, isLastPage, setIsLastPage, BASE_URL, offset, setOffset } = useBlogContext();

  const [isActive, setIsActive] = useState("0");

  const findBlogByCategoryName = async (categoryName) => {
    try {
      if (categoryName === "All") {
        getBlogs();
        return;
      }
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blogs/public/by-category/${categoryName}`
      );
      if (data.success) {
        setBlogs(data.data.blogs);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectPreviousPage = () => {
    if (!isFirstPage) {
      setOffset((prevOffset) => prevOffset - 1);
    }
  };

  const selectNextPage = () => {
    if (!isLastPage) {
      setOffset((prevOffset) => prevOffset + 1);

    }
  };

  useEffect(() => {
    getBlogs();
  }, [offset]);


  return (
    <div className="main-div">
      <ul className="category">
        <li
          className="li-list"
          style={
            isActive === "0"
              ? { backgroundColor: "#5044e5", color: "white" }
              : null
          }
          onClick={() => {
            setIsActive("0");
            findBlogByCategoryName("All");
          }}
        >
          All
        </li>
        {categories?.map((category) => (
          <li
            style={
              isActive === category.id
                ? { backgroundColor: "#5044e5", color: "white" }
                : null
            }
            onClick={() => {
              setIsActive(category.id);
              findBlogByCategoryName(category.name);
            }}
            key={category.id}
            className="li-list"
          >
            {category.name}
          </li>
        ))}
      </ul>
      <div className="scroll-container">
        {blogs?.map((blog) => (
          <div className="blog-card" key={blog.id} onClick={() => navigate(`/blog/${blog.id}`)}>
            <img src={blog?.imageUrl} alt="" />
            <div className="blog-card-details">
              <div id="username">
                <img src={assets.user_icon} alt="" id="user-icon" />
                <p>{blog?.user.firstName.split(" ")[0]}</p>
              </div>
              <p id="category">{blog?.category}</p>
              <p id="title">{blog?.title}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-btns">
        <button className="slider-btn left" 
        disabled={isFirstPage}
        style={{
          opacity: isFirstPage ? 0.5 : 1, cursor: isFirstPage ? "not-allowed" : "pointer"
        }} onClick={() => {
          selectPreviousPage();
        }}>◀</button>
        <button className="slider-btn right" 
        disabled={isLastPage}
        style={{
          opacity: isLastPage ? 0.5 : 1, cursor: isLastPage ? "not-allowed" : "pointer"
        }} onClick={() => {
          selectNextPage();
        }}
        >▶</button>
      </div>
    </div>
  );
};

export default MainBlog;
