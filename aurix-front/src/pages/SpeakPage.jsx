import React, { useState } from "react";
import axios from "axios";

const SpeakPage = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeak = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/voice/speak", { text });
    } catch (error) {
      console.error(error);
      alert("Error occurred while speaking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 dark:text-white">
      <textarea
        rows="4"
        className="w-full p-2 border dark:bg-gray-700 dark:text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to speak"
      ></textarea>
      <button
        onClick={handleSpeak}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 mt-2"
      >
        {loading ? "Speaking..." : "Speak"}
      </button>
    </div>
  );
};

export default SpeakPage;
