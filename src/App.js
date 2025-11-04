import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UploadSection from "./components/UploadSection";
import SummariesDisplay from "./components/SummariesDisplay";
import QuizSection from "./components/QuizSection";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<UploadSection />} />
          <Route path="/summaries" element={<SummariesDisplay />} />
          <Route path="/quiz" element={<QuizSection />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;



