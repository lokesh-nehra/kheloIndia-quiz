import { useState, useCallback } from "react";
import QUESTIONS from "../Questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

export default function Quiz({ soundEnabled, setSoundEnabled }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
    },
    []
  );

  const handleRestartQuiz = useCallback(
    function handleRestartQuiz() {
      setUserAnswers([]);
    }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );
  console.log(userAnswers);

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} onRestart={handleRestartQuiz} />
    );
  }
  return (
    <div id="quiz">
      <div className="flex justify-end gap-4 mb-6 px-4 ">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all cursor-pointer"
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center gap-2 px-3 py-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white transition-all cursor-pointer font-bold"
        >
          {isPaused ? (
            <><Play size={20} className="fill-current" /></>
          ) : (
            <><Pause size={20} className="fill-current" /></>
          )}
        </button>
      </div>
      {isPaused ? (
        <div className="flex items-center justify-center min-h-[50vh] px-4 animate-in fade-in duration-500">

          <div className="relative overflow-hidden  rounded-[2rem] p-10 text-center  max-w-md w-full">

            {/* Glow Background */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl"></div>

            {/* Animated Pause Icon */}
            <div className="relative flex justify-center mb-8">
              <div className="absolute w-28 h-28 rounded-full bg-purple-500/20 animate-ping" style={{ animationDuration: "1.1s" }}></div>

              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-bounce">
                <Pause
                  size={42}
                  className="text-white fill-white"
                />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-black text-white mb-3 tracking-wide">
              Game Paused
            </h2>

            {/* Subtitle */}
            <p className="text-white/60 mb-8 text-sm tracking-wide">
              Take a short break and continue your quiz journey.
            </p>

            {/* Resume Button */}
            <button
              onClick={() => setIsPaused(false)}
              className="group flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <Play
                size={22}
                className="fill-white group-hover:animate-spin transition-transform"
              />
              RESUME QUIZ
            </button>
          </div>
        </div>
      ) : (
        <Question
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
          soundEnabled={soundEnabled}
        />
      )}
    </div>
  );
}
