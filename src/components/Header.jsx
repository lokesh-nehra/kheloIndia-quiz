import logo from '../assets/quiz-logo.png';

export default function Header(){
    return (
        <header className="flex flex-col items-center justify-center my-8">
            <img src={logo} alt='Logo of the quiz' className="w-16 h-16 drop-shadow-xl mb-4" />
            <h1 className="text-4xl font-bold tracking-[0.6rem] uppercase bg-gradient-to-r from-[#e781fb] to-[#8e76fa] bg-clip-text text-transparent"> khelo india</h1>
        </header>
    );
}