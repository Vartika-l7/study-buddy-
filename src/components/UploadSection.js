import React, { useState } from "react";
import mascot from "../assets/mascot.jpg";

const UploadSection = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // When a file is selected manually
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // When a file is dragged and dropped
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  };

  // To prevent browser from opening the file
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Temporary upload alert (will connect to backend later)
  const handleUpload = () => {
    if (file) {
      alert(`File "${file.name}" uploaded successfully!`);
    } else {
      alert("Please select or drop a file first.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F2] text-center px-4">
      {/* Mascot */}
      <img
        src={mascot}
        alt="Mascot"
        className="w-36 h-36 object-contain mt-8 mb-6 rounded-xl shadow-sm"
      />

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Ready to ace your tests?
      </h1>
      <p className="text-gray-600 mb-8">
        Just upload your notes, and I’ll help you get started!
      </p>

      {/* Upload Box */}
      <div
        className={`border-2 border-dashed rounded-2xl shadow-md p-8 w-full max-w-md bg-white/70 transition ${
          isDragging ? "border-orange-500 bg-orange-50" : "border-orange-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center">
          <span className="text-5xl mb-4">📄</span>
          <p className="text-gray-700 font-medium">
            Drag & drop your notes here
          </p>
          <p className="text-gray-500 text-sm mb-6">PDF, DOCX, or TXT</p>

          {/* Hidden file input */}
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Buttons (side by side) */}
          <div className="flex gap-4 justify-center">
            <label
              htmlFor="fileInput"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full cursor-pointer shadow-md transition"
            >
              Select File
            </label>

            <button
              onClick={handleUpload}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              Upload
            </button>
          </div>

          {/* File name */}
          {file && (
            <p className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-semibold">{file.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2024 AI Study Buddy. Made with ♡ for students.
      </footer>
    </div>
  );
};

export default UploadSection;





