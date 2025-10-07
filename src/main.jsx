import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import { CategoryContextProvider } from "./contexts/CategoryContext.jsx";
import { BlogContextProvider } from "./contexts/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContextProvider>
      <CategoryContextProvider>
        <BlogContextProvider>
          <App />
        </BlogContextProvider>
      </CategoryContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
