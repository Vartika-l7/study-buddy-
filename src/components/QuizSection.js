import React, { useState } from "react";
import mascot from "../assets/mascot.jpg";

const QuizSection = () => {
  const questions = [
    {
      question: "Which polymer is commonly used to make plastic bottles?",
      options: [
        "Polyethylene terephthalate (PET)",
        "Nylon",
        "PVC",
        "Polystyrene",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is a thermosetting plastic?",
      options: ["Bakelite", "PVC", "Polyethylene", "Nylon"],
      answer: 0,
    },
    {
      question: "Which process is used for making polymer fibers?",
      options: ["Spinning", "Casting", "Extrusion", "Molding"],
      answer: 0,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === null) return;
    if (selected === questions[current].answer) setScore(score + 1);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF8F2] text-center px-4">
      {/* Mascot Image */}
      <img
        src={mascot}
        alt="Mascot"
        className="w-36 h-36 object-contain mt-8 mb-6 rounded-xl shadow-sm"
      />

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        Let’s test your knowledge!
      </h1>
      <p className="text-gray-600 mb-8">
        Answer the following questions and see how well you remember your notes.
      </p>

      {!finished ? (
        <div className="bg-white/80 shadow-lg rounded-2xl p-8 w-full max-w-lg border border-orange-200">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
            Question {current + 1} of {questions.length}
          </h2>
          <p className="text-lg font-medium text-gray-800 mb-6">
            {questions[current].question}
          </p>

          <div className="flex flex-col gap-3">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-gray-800 font-medium border border-orange-300 rounded-full py-2 transition 
                ${selected === i ? "bg-orange-500 text-white" : "hover:bg-orange-100"}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2 rounded-full mt-6 shadow-md transition"
          >
            {current === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      ) : (
        <div className="bg-white/80 shadow-lg rounded-2xl p-8 w-full max-w-lg border border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Finished!</h2>
          <p className="text-lg text-gray-700 mb-6">
            You scored <span className="font-semibold text-orange-600">{score}</span> out of{" "}
            {questions.length}.
          </p>
          <button
            onClick={handleRestart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2 rounded-full shadow-md transition"
          >
            Restart
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm">
        © 2024 AI Study Buddy. Made with ♡ for students.
      </footer>
    </div>
  );
};

export default QuizSection;

