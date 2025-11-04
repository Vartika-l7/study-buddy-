import React from "react";
import mascot from "../assets/mascot.jpg";

const SummariesDisplay = () => {
  return (
    <div className="min-h-screen bg-[#fff6ef] flex flex-col items-center justify-start pt-16">
      {/* Mascot */}
      <img
        src={mascot}
        alt="Mascot"
        className="w-28 h-28 mb-4 rounded-2xl shadow-sm"
      />

      {/* Title and subtitle */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Your Summaries Are Ready! 📚
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Here’s what I’ve prepared from your notes.
      </p>

      {/* Summary box */}
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-white rounded-2xl p-6 shadow-lg border border-orange-100 max-h-[400px] overflow-y-auto">
        <p className="text-gray-800 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          facilisis turpis at tellus dapibus, non luctus neque feugiat.
          Vestibulum nec dictum nulla. Curabitur quis sem nec arcu commodo
          tincidunt.
          <br />
          <br />
          ✅ This is a placeholder summary — later you can replace it with real
          AI-generated summaries from uploaded notes!
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md">
          Generate Again
        </button>
        <button
          className="bg-white border border-orange-400 text-orange-500 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-50"
          onClick={() => (window.location.href = "/upload")}
        >
          Back to Upload
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-500">
        © 2024 AI Study Buddy. Made with ♡ for students.
      </footer>
    </div>
  );
};

export default SummariesDisplay;

