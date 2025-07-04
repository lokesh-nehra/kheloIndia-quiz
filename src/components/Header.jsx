import logo from '../assets/quiz-logo.png';

export default function Header(){
    return (
        <header>
            <img src={logo} alt='Logo of the quiz'/>
            <h1> khelo india</h1>
        </header>
    );
}