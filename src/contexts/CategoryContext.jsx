import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);

  // Get All Categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/categories/public/get-all-category`);
      if(response.data.success){
        setCategories(response.data.data)
      }
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories()
  }, [setCategories])

  const value = {categories, setCategories};

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

const useCategoryContext = () => {
  return useContext(CategoryContext);
};

export default useCategoryContext;
