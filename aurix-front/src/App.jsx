import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TranscribePage from "./pages/TranscribePage";
import SpeakPage from "./pages/SpeakPage";
import ShoppingPage from "./pages/ShoppingPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="p-4 space-x-4 flex items-center justify-between bg-gray-200 dark:bg-gray-800 text-black dark:text-white border-b dark:border-gray-600">
        <div>
          <Link to="/transcribe" className="text-blue-500 dark:text-blue-300">
            Transcribe
          </Link>
          <Link to="/speak" className="ml-4 text-blue-500 dark:text-blue-300">
            Speak
          </Link>
          <Link to="/shop" className="ml-4 text-blue-500 dark:text-blue-300">
            Shop
          </Link>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <Routes>
        <Route path="/transcribe" element={<TranscribePage />} />
        <Route path="/speak" element={<SpeakPage />} />
        <Route path="/shop" element={<ShoppingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
