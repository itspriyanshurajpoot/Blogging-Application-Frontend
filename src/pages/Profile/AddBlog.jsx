import React, { useEffect, useRef, useState } from "react";

import "./css/AddBlog.css";
import { assets } from "../../assets/assets";
import useCategoryContext from "../../contexts/CategoryContext";
import Quill from "quill";
import useUserContext from "../../contexts/UserContext";
import useBlogContext from "../../contexts/BlogContext";
import axios from "axios";
import { useNavigate } from "react-router";

const AddBlog = () => {
  const { categories } = useCategoryContext();
  const { postHeader, getHeader, BASE_URL } = useUserContext();
  const { setBlogs } = useBlogContext();

  const navigate = useNavigate();
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  const generateAiContent = async () => {
    setGenerating(true);
    const title = formData.title;
    if (!title) {
      alert("Please enter a title first");
      return;
    }

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/ai/generate-content?title=${title}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (data.success) {
        quillRef.current.root.innerHTML = data.data;
      }

      setGenerating(false);
    } catch (error) {
      console.log("Error generating AI content", error);
      setGenerating(false);
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const content = quillRef.current.root.innerHTML;

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("content", content);
    blogData.append("category", formData.category);
    blogData.append("image", formData.image);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/blogs`, blogData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setBlogs((prev) => [...prev, data.data]);
        setFormData({
          title: "",
          image: null,
          category: "",
        });
        quillRef.current.root.innerHTML = "";
        navigate("/profile/dashboard");
      } else {
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 2000);
      }
    } catch (error) {
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }

    setLoading(false); // Stop loading after upload
  };

  return (
    <div className="blog-upload-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Uploading...</p>
        </div>
      )}
      {generating && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Generating...</p>
        </div>
      )}
      <form className="blog-upload-card" onSubmit={handleSubmit}>
        <label className="form-label">
          <p>Upload thumbnail</p>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            id="image"
            hidden
            required
          />
          <img
            src={
              !formData.image
                ? assets.upload_area
                : URL.createObjectURL(formData.image)
            }
          />
        </label>

        <div className="upload-blog-form-each-part">
          <label className="form-label">Blog title</label>
          <input
            className="form-input"
            type="text"
            placeholder="Type here"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="upload-blog-form-each-part">
          <label className="form-description">Description</label>
          <div ref={editorRef} className="quill"></div>
          <button
            className="generate-with-ai-button"
            type="button"
            onClick={generateAiContent}
          >
            Generate with AI
          </button>
        </div>

        <select
          name="category"
          id=""
          required
          onChange={handleChange}
          className="upload-blog-form-category-select"
        >
          <option value="Category" disabled>
            Category
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="upload-blog-button" type="submit">
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
