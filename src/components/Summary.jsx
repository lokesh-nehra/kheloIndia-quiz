import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../Questions.js";

export default function Summary({ userAnswers, onRestart }) {

    const skippedAnswers = userAnswers.filter((answer)=> answer === null );
    const correctAnswers = userAnswers.filter((answer, index)=> answer === QUESTIONS[index].answers[0]);
    const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary" className="relative">
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-8 rounded-md shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          Play Again
        </button>
      </div>
      <img src={quizCompleteImg} alt="Trophy Icon" />
      <h2> Quiz Completed!</h2>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let cssClass = 'user-answer';
            if(answer === null){
                cssClass += ' skipped';
            }else if(answer === QUESTIONS[index].answers[0]){
                cssClass += ' correct';
            }else{
                cssClass += ' wrong';
            }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
