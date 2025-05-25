import React, { useState } from "react";
import axios from "axios";

const TranscribePage = () => {
  const [audio, setAudio] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audio) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", audio);
    try {
      const res = await axios.post(
        "http://localhost:5000/voice/transcribe",
        formData
      );
      setTranscription(res.data.text);
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscription("Error occurred while transcribing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 dark:text-white">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 ml-2"
      >
        {loading ? "Transcribing..." : "Transcribe"}
      </button>
      <p className="mt-4">Transcription: {transcription}</p>
    </div>
  );
};

export default TranscribePage;
