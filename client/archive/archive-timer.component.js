import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function TimerComponent() {
    const dispatch = useDispatch();

    const {hours, minutes, seconds, isRunning, selected, time} = useSelector(state => state.timer);
    let interval;

    const handleTime = (e) => {
        dispatch(setTime(Number(e.target.value)));
    }

    const handleSelect = (e) => {
        dispatch(setSelected(e.target.value));
    }

    const quicklySet = () => {
        setMs(selected === 'secs' ? time * 1000 : selected === 'mins' ? time * 60000 : time * 3600000);

        console.log(ms)
        pureTime();
    }

    const quicklyStart = () => {
        if (isRunning) return;

        pureTime();
    }

    const pureTime = () => {
        const date = Math.floor((ms) / 1000);
        const hours = Math.floor(date / 3600) % 24;
        const minutes = Math.floor(date / 60) % 60;
        const seconds = Math.floor(date % 60);
        const milliseconds = Math.floor((ms) % 1000);

        dispatch(setHours(hours));
        dispatch(setMinutes(minutes));
        dispatch(setSeconds(seconds));
    }

    return (
        <div className={`ml-auto mr-auto`}>
            <div className="flex gap-2">
                <select value={time} onChange={(e) => handleTime(e)}
                        className="text-sm rounded bg-[#1f2024] w-full p-3.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                        .map((number, index) => (
                            <option key={index} value={number}>{number}</option>
                        ))}
                </select>

                <select value={selected} onChange={(e) => handleSelect(e)} id="base"
                        className="text-sm rounded bg-[#1f2024] w-full p-3.5">
                    <option value="secs">Seconds</option>
                    <option value="mins">Minutes</option>
                    <option value="hours">Hours</option>
                </select>
            </div>

            <div className="mt-2">
                {hours === 0 && minutes === 0 && seconds === 0 ? (
                    <button onClick={quicklySet} className="text-sm rounded bg-[#1f2024] w-full p-3">Set</button>
                ) : (
                    <button onClick={quicklyStart} className="text-sm rounded bg-[#1f2024] w-full p-3">Start</button>
                )}
            </div>

            <br/><br/>

            <span
                className={`max-sm:text-4xl sm:text-3xl md:text-5xl ml-2 lg:text-5xl cursor-default stopwatch-s`}>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{hours < 10 ? `0${hours}` : hours}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{minutes < 10 ? `0${minutes}` : minutes}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{seconds < 10 ? `0${seconds}` : seconds}</h1>
            </span>

            {/*
            <div className="flex justify-center mt-10">
                <button className="btn rounded p-3 bg-[#1f2024] btn-primary mr-2">Start</button>

                <button className={`disabled:cursor-not-allowed mr-2 disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary`}>
                    Reset
                </button>
            </div>
            */}
        </div>
    )
}

export default TimerComponent;
