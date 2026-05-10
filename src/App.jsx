import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";
import Home from "./components/Home.jsx";
import HomeSkeleton from "./components/HomeSkeleton.jsx";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import UserProfile from './components/UserProfile.jsx';
import logo from "./assets/quiz-logo.png"
import { Toaster } from './components/sonner';


function App() {
  const [user, setUser] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
       if (currentUser && localStorage.getItem('isSigningUp')) {
        localStorage.removeItem('isSigningUp');
        await signOut(auth);
        setLoading(false);
        return;
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

   if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <HomeSkeleton />
      </div>
    );
  }

  if (!user) {
    return <>
      <header className="flex  justify-center my-8 gap-4">
        <img src={logo} alt='Logo of the quiz' className="w-16 h-16 drop-shadow-xl mb-4" />
        <h1 className="text-4xl font-bold tracking-[0.6rem] uppercase bg-gradient-to-r from-[#e781fb] to-[#8e76fa] bg-clip-text text-transparent"> khelo india</h1>
      </header>
      <Login /></>;
  }

  function handleStartQuiz() {
    setQuizStarted(true);
  }

  return (
    <>
      <UserProfile user={user} onGoHome={() => navigate('/')}/>
        <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home onStart={() => navigate('/quiz')} />} />
          <Route path="/quiz" element={<Quiz soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled}/>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
