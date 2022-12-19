import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';

import {setIsRunning} from '../stores/ManuelTimer';

function ManuelSetTimerComponent() {
    const dispatch = useDispatch();
    const {isRunning} = useSelector(state => state.manuelTimer);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(5);
    const [ms, setMs] = useState(localStorage.getItem('remainingTime') || 0);
    const [Seconds, SetSeconds] = useState(seconds);
    const [Minutes, SetMinutes] = useState(minutes);
    const [Hours, SetHours] = useState(hours);
    let interval;

    function play() {
        const audio = new Audio('/timer-finish-sound-1.mp3');
        audio.play();
    }

    useEffect(() => {
        if (isRunning) {
            interval = setInterval(() => {
                setMs(ms => ms - 10);
            }, 10);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (ms < 0) {
            toast.success('Time is up!');
            play();
            dispatch(setIsRunning(false));
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
            setMs(0);
            localStorage.removeItem('remainingTime');
            interval = null;

            return () => clearInterval(interval);
        }

        const date = Math.floor(ms / 1000);
        const h = Math.floor(date / 3600) % 24;
        const m = Math.floor(date / 60) % 60;
        const s = Math.floor(date % 60);

        SetHours(h);
        SetMinutes(m);
        SetSeconds(s);
        if (ms !== 0) {
            localStorage.setItem('remainingTime', isRunning ? Number(ms - 10) : ms);
        }
    }, [ms]);

    const set = () => {
        if (hours === 0 && minutes === 0 && seconds === 0) return;

        SetHours(hours);
        SetMinutes(minutes);
        SetSeconds(seconds);

        const time = (hours * 3600 + minutes * 60 + seconds) * 1000;

        setMs(time);
    }

    const start = () => {
        if (ms > 0) {
            dispatch(setIsRunning(true));
        }
    }

    const stop = () => {
        if (isRunning) {
            dispatch(setIsRunning(false));
            clearInterval(interval);
            interval = null;
        }
    }

    const cancel = () => {
        dispatch(setIsRunning(false));
        clearInterval(interval);
        interval = null;
        setHours(0);
        setMinutes(0);
        setSeconds(5);
        setMs(0);
        localStorage.removeItem('remainingTime');
    }

    return (
        <div className="w-9/12 ml-auto mr-auto">
            <div className="mt-5 flex gap-3">
                <select value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className="text-sm rounded bg-[#1f2024] w-full p-3.5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                        .map((number, index) => (
                            <option key={index} value={number}>{number}</option>
                        ))}
                </select>

                <select value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="text-sm rounded bg-[#1f2024] w-full p-3.5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                        .map((number, index) => (
                            <option key={index} value={number}>{number}</option>
                        ))}
                </select>

                <select value={seconds}
                        onChange={(e) => setSeconds(Number(e.target.value))}
                        className="text-sm rounded bg-[#1f2024] w-full p-3.5">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
                        .map((number, index) => (
                            <option key={index} value={number}>{number}</option>
                        ))}
                </select>
            </div>

            <div className="mt-2">
                {ms < 1000
                    ?
                    (
                        <button onClick={set} className="text-sm rounded bg-[#1f2024] w-full p-3">Set</button>
                    )
                    :
                    (
                        <div className="flex gap-2">
                            {isRunning
                                ?
                                (
                                    <button onClick={stop}
                                            className="text-sm rounded bg-[#1f2024] w-full p-3">Stop</button>
                                )
                                :
                                (
                                    <button onClick={start}
                                            className="text-sm rounded bg-[#1f2024] w-full p-3">Start</button>
                                )
                            }
                            <button onClick={cancel}
                                    className="text-sm rounded bg-red-800 bg-opacity-75 w-15 p-3">Cancel
                            </button>
                        </div>
                    )
                }
            </div>

            {ms > 0 && (
                <>
                    <br/><br/>
                    <div
                        // max-sm:text-3xl mr-auto ml-auto max-md:ml-10 max-lg:ml-3.5 lg:ml-3.5 max-sm:text-4xl sm:text-3xl md:text-5xl lg:text-5xl  stopwatch-s
                        className={`relative lg:ml-1 text-center cursor-default max-sm:text-4xl sm:text-3xl md:text-5xl lg:text-5xl`}>
                        <h1 className={`inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2`}>{Hours < 10 ? `0${Hours}` : Hours}</h1>
                        <h1 className={`inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2`}>{Minutes < 10 ? `0${Minutes}` : Minutes}</h1>
                        <h1 className={`inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2`}>{Seconds < 10 ? `0${Seconds}` : Seconds}</h1>
                    </div>
                </>
            )}
        </div>
    )
}

export default ManuelSetTimerComponent;
