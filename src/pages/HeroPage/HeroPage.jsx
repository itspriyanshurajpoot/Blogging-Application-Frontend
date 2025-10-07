import axios from "axios";
import { assets } from "../../assets/assets";
import "./HeroPage.css";
import { useEffect, useState } from "react";
import useBlogContext from "../../contexts/BlogContext";

const HeroPage = () => {
  const [query, setQuery] = useState("");


  const {
    blogs,
    setBlogs,
    getBlogs,
    isFirstPage,
    setIsFirstPage,
    isLastPage,
    setIsLastPage,
    BASE_URL,
  } = useBlogContext();

  const handleChange = (e) => {
    setQuery(e.target.value);
    // searchBlogByTitleAndContent(e);
  };

  const searchBlogByTitleAndContent = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blogs/public/search?query=${query}`
      );

      if (data.success) {
        setBlogs(data.data.blogs);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchBlogByTitleAndContent();
  }, [query]);

  return (
    <div className="main-container">
      <button className="ai-button">
        <p className="ai-text">New: AI feature integrated</p>
        <img src={assets.star_icon} alt="" />
      </button>
      <div className="hero-title">
        <p>
          Your own <span>blogging</span> <br /> platform.
        </p>
      </div>
      <div className="hero-subtitle">
        <p>
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>
      </div>
      <div className="search">
        <input type="text" value={query} onChange={handleChange} id="" placeholder="Search for blogs" />
        <button onClick={searchBlogByTitleAndContent} type="button">Search</button>
      </div>
    </div>
  );
};

export default HeroPage;
