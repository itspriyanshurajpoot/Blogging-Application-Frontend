import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import useUserContext from "./UserContext";

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [ blogs, setBlogs ] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [offset, setOffset] = useState(0);

  const {setUserBlogs} = useUserContext();

  // Delete Blog by ID
  const deleteBlogById = async (blogId) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/blogs/${blogId}`,
        { 
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (data.success) {
        console.log("Blog deleted successfully");
        setUserBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        // Remove the deleted blog from the blogs state
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch All Blogs
  const getBlogs = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/blogs/public?offset=${offset}`
      );
      if (response.data.success) {
        setBlogs(response.data.data.blogs);

        // set isFirstPage and isLastPage
        setIsFirstPage(response.data.data.first);
        setIsLastPage(response.data.data.last);
      }
      
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getBlogs();
  }, [setBlogs]);

  const value = {blogs, setBlogs, getBlogs, deleteBlogById, isFirstPage, setIsFirstPage, isLastPage, setIsLastPage, BASE_URL, offset, setOffset};

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

const useBlogContext = () => {
  return useContext(BlogContext);
};

export default useBlogContext;
