import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
    const [isOn, setIsOn] = useState(false)
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(60);
    const [finished, setFinished] = useState(false);

    const intervalId1 = useRef(1);

    let audio = new Audio('/DiVeNha.m4a');

    const playAlarm = () => {
        audio.play().then(r => console.log(r));
    }

    useEffect(() => {
        if (isOn) {
            intervalId1.current = setInterval(() => {
                setSecond(prevState => prevState === 1 ? 60 : prevState - 1);
            }, 100);
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
                playAlarm();
                setFinished(true);
            }
        }
    }, [minute, second, isOn])

    const start = () => {
        setIsOn(true);
    }

    const reset = () => {
        audio = null;
        setIsOn(false);
        setMinute(1);
        setSecond(60);
        setFinished(false);
    }

    return (
        <div className="App">
            <button onClick={start}>Start</button>
            {finished ? <button onClick={reset}>Reset</button> : null}
            {isOn ? <h2>{minute < 10 ? `0${minute}` : minute} : {second < 10 ? `0${second}` : second}</h2> : null}


        </div>
    );
}

export default App;
