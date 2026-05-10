import { useState } from 'react';
import { auth, googleProvider, githubProvider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import LogoSvg from '../assets/image.svg';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Welcome!");
      navigate('/');
    } catch (err) {
      setError("Google Login failed. Please try again.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success("Welcome with GitHub!");
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error("GitHub Login failed.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        //Tell App.jsx to ignore this login
        localStorage.setItem('isSigningUp', 'true');

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: displayName
        });

        await signOut(auth);

        setIsSignUp(false);
        setDisplayName('');
        setPassword('');
        setEmail('');
        toast.success("Account created! Please sign in with your new details.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
        navigate('/');
      }
    } catch (err) {
      localStorage.removeItem('isSigningUp');
      console.error(err.code);
      console.error(err.message);
      toast.error(isSignUp ? "Failed to create account" : "Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md p-10 bg-[#2c203d]/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="p-1 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-2xl mb-6 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            <img src={LogoSvg} alt="Quiz Logo" className="w-28 h-28 rounded-xl drop-shadow-2xl" />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-purple-200/60 text-sm font-medium">Please login to start your quiz journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-xs font-bold text-center uppercase tracking-wider">{error}</p>
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-5">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] ml-1 opacity-70">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/20 transition-all"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] ml-1 opacity-70">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/20 transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em] ml-1 opacity-70">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/20 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black rounded-xl shadow-lg shadow-purple-500/20 transition-all transform active:scale-95 cursor-pointer mt-4"
          >
            {isSignUp ? "SIGN UP" : "SIGN IN"}
          </button>

          <p className="text-center text-sm text-purple-200/50 mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setEmail(''); setPassword(''); }}
              className="ml-2 text-purple-400 hover:text-purple-300 font-bold cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-wider text-white/40"><span className="bg-[#2c203d] px-4">or</span></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google icon" />
          Continue with Google
        </button>
          <div className="my-4"></div>
        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-all active:scale-95 cursor-pointer"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="w-6 h-6 invert opacity-80" alt="GitHub" />
          Continue with GitHub
        </button>
      </div>
    </div>
  );

}
