import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import IconComponent from './Icon.component';

import {
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    setStartedTime,
    setIsRunning,
    setLapTime,
    setFullScreenMode
} from '../stores/stopWatch';

function StopWatchComponent() {
    const dispatch = useDispatch();
    const {
        hours,
        minutes,
        seconds,
        milliseconds,
        startedTime,
        isRunning,
        lapTime,
        fullScreenMode
    } = useSelector(state => state.stopWatch);
    let interval;

    /*
    const startStopWatch = () => {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                setTimeout(() => {
                    dispatch(setIsRunning(!isRunning));

                    if (isRunning) {
                        stop();
                    } else {
                        start();
                    }
                }, 800);
            }
        });
    }
    */

    useEffect(() => {
        // startStopWatch();

        if (isRunning) {
            interval = setInterval(() => {
                pureTime();
            }, 10);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        // startStopWatch();

        if (lapTime > 0) {
            const date = Math.floor(lapTime / 1000);
            const hours = Math.floor(date / 3600) % 24;
            const minutes = Math.floor(date / 60) % 60;
            const seconds = Math.floor(date % 60);
            const milliseconds = Math.floor(lapTime % 1000);

            dispatch(setHours(hours));
            dispatch(setMinutes(minutes));
            dispatch(setSeconds(seconds));
            dispatch(setMilliseconds(milliseconds));
            setStartedTime(Date.now() + lapTime);
        }
    }, []);

    const pureTime = () => {
        if (startedTime !== null || lapTime !== 0) {
            const date = Math.floor((Date.now() - startedTime) / 1000);
            const hours = Math.floor(date / 3600) % 24;
            const minutes = Math.floor(date / 60) % 60;
            const seconds = Math.floor(date % 60);
            const milliseconds = Math.floor((Date.now() - startedTime) % 1000);

            dispatch(setHours(hours));
            dispatch(setMinutes(minutes));
            dispatch(setSeconds(seconds));
            dispatch(setMilliseconds(milliseconds));
            dispatch(setLapTime(Date.now() - startedTime));
            localStorage.setItem('lapTime', (Date.now() - startedTime).toString());
        }
    }

    const start = () => {
        if (!isRunning) {
            dispatch(setStartedTime(Date.now() - lapTime));
            dispatch(setIsRunning(true));
        }
    }

    const stop = () => {
        if (isRunning) {
            dispatch(setIsRunning(false));
            dispatch(setStartedTime(lapTime))
            clearInterval(interval);
            interval = null;
        }
    }

    const reset = () => {
        if (isRunning || milliseconds > 0) {
            localStorage.removeItem('lapTime');
            dispatch(setHours(0));
            dispatch(setMinutes(0));
            dispatch(setSeconds(0));
            dispatch(setMilliseconds(0));
            dispatch(setStartedTime(null));
            dispatch(setIsRunning(false));
            dispatch(setLapTime(0));
            clearInterval(interval);
            interval = null;
        }
    }

    return (
        <div className={`${fullScreenMode ? 'parentFs' : ''} ml-auto mr-auto`}>
            <span className={`${fullScreenMode ? 'mt-150 full-screen-style max-sm:text-3xl sm:text-5xl md:text-7xl lg:text-8xl' : 'max-sm:text-4xl sm:text-3xl md:text-5xl ml-auto mr-auto lg:text-5xl'} cursor-default stopwatch-s`}>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{hours < 10 ? `0${hours}` : hours}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{minutes < 10 ? `0${minutes}` : minutes}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{seconds < 10 ? `0${seconds}` : seconds}</h1>
                <h1 className="inline text-[#5865F2] text-bold sw-el p-4 rounded bg-[#1f2024]">{milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds}</h1>
            </span>

            <div className="flex justify-center mt-10">
                {isRunning ? (
                    <button className="btn rounded p-3 bg-[#1f2024] btn-primary mr-2" onClick={stop}>Stop</button>
                ) : (
                    <button className="btn rounded p-3 bg-[#1f2024] btn-primary mr-2" onClick={start}>Start</button>
                )}

                <button disabled={!isRunning && !(milliseconds > 0)}
                        className={`disabled:cursor-not-allowed disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary`}
                        onClick={reset}>Reset
                </button>

                {fullScreenMode
                    ?
                    (
                        <button onClick={() => dispatch(setFullScreenMode(false))}
                                className={`flex justify-center ml-4 ${fullScreenMode ? '' : 'mt-3'} cursor-pointer`}>
                            <IconComponent icon="shrink" size={25} color="#5865F2"/>
                        </button>
                    )
                    :
                    (
                        <button onClick={() => dispatch(setFullScreenMode(true))}
                                className={`flex justify-center ml-4 ${fullScreenMode ? '' : 'mt-3'} cursor-pointer`}>
                            <IconComponent icon="enlarge" size={25} color="#5865F2"/>
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default StopWatchComponent;
