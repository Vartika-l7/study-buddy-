import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo / Title */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-orange-500 cursor-pointer"
        >
          AI Study Buddy
        </h1>

        {/* Navigation Buttons */}
        <div className="flex space-x-6 text-gray-700 font-medium">
          <button
            onClick={() => navigate("/")}
            className="hover:text-orange-500 transition"
          >
            Upload
          </button>
          <button
            onClick={() => navigate("/summaries")}
            className="hover:text-orange-500 transition"
          >
            Summaries
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="hover:text-orange-500 transition"
          >
            Quiz
          </button>
        </div>
      </div>
    </nav>
  );
}
