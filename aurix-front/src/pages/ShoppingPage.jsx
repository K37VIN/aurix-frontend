import React, { useState } from "react";
import axios from "axios";

const ShoppingPage = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/shop/ask", {
        text: input,
      });
      setQuery(res.data.query);
      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
      setQuery("Error fetching query");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 dark:text-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full dark:bg-gray-700 dark:text-white"
        placeholder="Ask about a product"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-purple-500 text-white px-4 py-2 mt-2"
      >
        {loading ? "Searching..." : "Ask"}
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Query: {query}</h2>
        <ul className="mt-2">
          {products.map((item, idx) => (
            <li key={idx} className="border p-2 my-2 dark:border-gray-600">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400"
              >
                {item.title}
              </a>
              <p>Price: {item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingPage;
