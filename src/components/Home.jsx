import logo from '../assets/quiz-logo.png';

export default function Home({ onStart }) {
  return (
    <div id="quiz" className="flex flex-col items-center p-8 animate-in fade-in zoom-in duration-700">
      <img src={logo} alt="Quiz Logo" className="w-40 h-40 mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
      <h2 className="text-3xl font-bold mb-4 text-[#c1b2dd]">Welcome to Khelo India Quiz!</h2>
      <p className="text-[#9082a3] mb-8 text-center max-w-md">
        Test your knowledge and see how much you know. You'll have limited time for each question, so stay sharp!
      </p>
      <button
        onClick={onStart}
        className="relative group bg-gradient-to-r from-[#e781fb] to-[#8e76fa] hover:from-[#f0a1ff] hover:to-[#a189ff] text-white font-extrabold py-5 px-14 rounded-full text-2xl uppercase tracking-widest shadow-[0_0_25px_rgba(231,129,251,0.5)] hover:shadow-[0_0_40px_rgba(231,129,251,0.8)] transition-all duration-500 transform hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-3"
      >
        Start Quiz
        <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
      </button>
    </div>
  );
}
