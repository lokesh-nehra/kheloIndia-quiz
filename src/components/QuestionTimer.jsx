import { useState, useEffect } from "react";

export default function QuestionTimer({onTimeOut, timeout, mode}){
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(()=>{
        console.log('SETTING TIMEOUT');
        const timer = setTimeout(onTimeOut, timeout);
        return ()=>{
            clearTimeout(timer);
        };
    }, [timeout, onTimeOut]);

    useEffect(()=>{
        console.log('SETTING INTERVAL');
        const interval = setInterval(()=>{
            setRemainingTime((prevRemainingTime)=> prevRemainingTime - 50);
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return <progress id='question-time' max={timeout} value={remainingTime} className={mode}/>;
}