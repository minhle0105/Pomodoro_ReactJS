import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
    const [isOn, setIsOn] = useState(false)
    const [minute, setMinute] = useState(25);
    const [second, setSecond] = useState(0);
    const [finished, setFinished] = useState(false);
    const [audio, setAudio] = useState(new Audio('/DiVeNha.m4a'))
    const [breakTitle, setBreakTitle] = useState('');

    const breakTimeTitle = 'BREAK TIME';
    const workingTimeTitle = 'WORKING TIME';

    const intervalId1 = useRef(1);


    useEffect(() => {
        if (isOn) {
            intervalId1.current = setInterval(() => {
                setSecond(prevState => {
                    if (prevState === 1) {
                        return 60;
                    }
                    else if (prevState === 0) {
                        setMinute(prevState => prevState - 1);
                        return 59;
                    }
                    else {
                        return prevState - 1;
                    }
                } );
            }, 1000);
        }
    }, [isOn])

    useEffect(() => {
        if (isOn) {
            if (second === 1) {
                setMinute(prevState => prevState - 1);
            }
        }
    }, [second, isOn])

    useEffect(() => {
        if (isOn) {
            if (minute === 0 && second === 1) {
                clearInterval(intervalId1.current);
                setSecond(0);
                setMinute(0);
                audio.play().then();
                setFinished(true);
                setBreakTitle(breakTimeTitle)
            }
        }
    }, [minute, second, isOn, audio])

    const start = () => {
        setIsOn(true);
        setBreakTitle(workingTimeTitle);
    }

    const reset = () => {
        audio.pause();
        setAudio(new Audio('/DiVeNha.m4a'));
        setIsOn(false);
        setMinute(25);
        setSecond(0);
        setFinished(false);
        setBreakTitle('');
    }

    const pause = () => {
        clearInterval(intervalId1.current);
        setIsOn(false);
        setBreakTitle('PAUSE');
    }

    return (
        <div className="App">
            <h1 style={{height: 40}}>{breakTitle}</h1>
            <button onClick={isOn ? pause : start} disabled={finished}>{isOn ? 'Pause' : 'Start'}</button>
            {finished ? <button onClick={reset}>Reset</button> : null}
            <h2>{minute < 10 ? `0${minute}` : minute} : {second < 10 ? `0${second}` : second}</h2>
        </div>
    );
}

export default App;
