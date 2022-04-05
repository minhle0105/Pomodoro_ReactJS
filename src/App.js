import './App.css';
import {useEffect, useRef, useState} from "react";

function App() {
    const [isOn, setIsOn] = useState(false)
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(60);

    const intervalId1 = useRef(1);

    const playAlarm = () => {
        let audio = new Audio('/DiVeNha.m4a');
        audio.play().then(r => console.log("PLAYED"));
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
            }
        }
    }, [minute, second, isOn])

    const start = () => {
        setIsOn(true);
    }

    return (
        <div className="App">
            <button onClick={start}>Start</button>
            {isOn ? <h2>{minute < 10 ? `0${minute}` : minute} : {second < 10 ? `0${second}` : second}</h2> : null}


        </div>
    );
}

export default App;
