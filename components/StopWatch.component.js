import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import toast from 'react-hot-toast';

import IconComponent from './Icon.component';

import {
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    setStartedTime,
    setIsRunning,
    setLapTime,
    setFullScreenMode,
    setRecord
} from '../stores/stopWatch';
import {
    setRecords as setRecordsToDatabase,
} from '../database/firebase';
import sendToUser from '../utils/sendToUser';

function StopWatchComponent() {
    const dispatch = useDispatch();
    const {
        user: {
            data,
            getGuilds,
        },
        stopWatch: {
            hours,
            minutes,
            seconds,
            milliseconds,
            startedTime,
            isRunning,
            lapTime,
            fullScreenMode,
            myRecords,
        }
    } = useSelector(state => state);
    const [Records, setRecords] = useState([]);
    const [saving, setSaving] = useState(false);
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
        setRecords(myRecords);
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

    const msToTime = (duration) => {
        let milliseconds = parseInt((duration % 1000) / 100),
            seconds = parseInt((duration / 1000) % 60),
            minutes = parseInt((duration / (1000 * 60)) % 60),
            hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        // milliseconds = (milliseconds < 10) ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

        return hours + ":" + minutes + ":" + seconds;
    }

    const timeToMs = (hours, minutes, seconds, milliseconds) => {
        return (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
    }

    const save = () => {
        if (lapTime > 0) {
            const date = new Date();
            const time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
            // const lap = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            // const data = {
            //    time,
            //    lap
            // }
            // const dataString = JSON.stringify(data);

            const dataString = {
                time,
                ms: timeToMs(hours, minutes, seconds, milliseconds)
            }

            const records = [...Records, dataString];
            setRecords(records);
            dispatch(setRecord(records));
            localStorage.setItem('records', JSON.stringify(records));
        }
    }

    const removeRecord = (item, index) => {
        const newRecords = Records.filter((record, i) => i !== index);
        setRecords(newRecords);
        dispatch(setRecord(newRecords));
        localStorage.setItem('records', JSON.stringify(newRecords));
    }

    const saveToDB = async () => {
        setSaving(true);
        if (saving) return;

        if (await setRecordsToDatabase(data.id, Records) && !(await sendToUser(data.id, Records, msToTime)).message) {
            toast.success('Records saved to database & Discord');
            setSaving(false);
        } else {
            toast.error('Error while saving records to database & Discord');
            setSaving(false);
        }
    }

    return (
        <div className={`${fullScreenMode ? 'parentFs' : ''} ml-auto mr-auto`}>
            <span
                className={`${fullScreenMode ? 'mt-150 ml-[22px] full-screen-style max-sm:text-5xl sm:text-5xl md:text-7xl lg:text-8xl' : 'max-sm:text-4xl sm:text-3xl md:text-5xl ml-auto mr-auto lg:text-5xl'} cursor-default stopwatch-s`}>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{hours < 10 ? `0${hours}` : hours}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{minutes < 10 ? `0${minutes}` : minutes}</h1>
                <h1 className="inline text-bold sw-el p-4 rounded bg-[#1f2024] mr-2">{seconds < 10 ? `0${seconds}` : seconds}</h1>
                {/*
                <h1 className="inline text-[#5865F2] text-bold sw-el p-4 rounded bg-[#1f2024]">{milliseconds < 10 ? `00${milliseconds}` : milliseconds < 100 ? `0${milliseconds}` : milliseconds}</h1>
                */}
            </span>

            <div className="flex justify-center mt-10">
                {isRunning ? (
                    <button className="btn rounded p-3 bg-[#1f2024] btn-primary mr-2" onClick={stop}>Stop</button>
                ) : (
                    <button className="btn rounded p-3 bg-[#1f2024] btn-primary mr-2" onClick={start}>Start</button>
                )}

                <button disabled={!isRunning && !(milliseconds > 0)}
                        className={`disabled:cursor-not-allowed mr-2 disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary`}
                        onClick={reset}>Reset
                </button>

                <button disabled={!isRunning && !(milliseconds > 0)}
                        className={`disabled:cursor-not-allowed disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary`}
                        onClick={save}>Save
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

            <div className="rounded save-d mt-10 bg-[#1f2024] p-4 px-10 py-8">
                {Records.length > 0 ? (
                    <div className="flex mb-5 justify-between">
                        <div>
                            <h1 className="text-[#00FFFF] opacity-75 titles flex">Time</h1>
                        </div>
                        <div>
                            <h1 className="text-[#00FFFF] opacity-75 titles flex">Lap Time</h1>
                        </div>
                    </div>
                ) : (
                    <div className="font-bold flex justify-center">
                        Not saved yet.
                    </div>
                )}

                {Records.map((item, index) => (
                    <div key={index} className="flex justify-between">
                        <div className="flex">
                            <span className="">{item.time}</span>
                        </div>
                        <span className="">
                            {msToTime(index === 0 ? item.ms : item.ms - Records[index - 1].ms)} <span
                            className="cursor-pointer" onClick={() => removeRecord(item, index)}><IconComponent
                            size={12} color="#5865F2" icon="cancel"/></span>
                        </span>
                    </div>
                ))}
            </div>
            {getGuilds ? getGuilds?.filter(guild => guild.id === process.env.mainServer).length === 1
                    ?
                    <div className={`flex justify-center mt-5`}>
                        <button disabled={Records.length === 0 || saving} className="disabled:cursor-not-allowed disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary mr-2" onClick={saveToDB}>
                            {saving ? <span className="small-loader"><IconComponent icon="loader" size={32} color="#5865F2" /></span> : <>Save to <span className="inline-block font-bold text-[#5865F2]">Discord</span></>}
                        </button>
                    </div>
                    :
                    <div className="flex justify-center mt-5">
                        If you join our <a href={process.env.inviteUrl} target="_blank"
                                           className="font-bold text-[#5865F2]">Discord</a> server, you can save your times to the
                        Discord.
                    </div>
                :
                <div className="flex justify-center mt-5">
                    <Skeleton width={142} height={48} />
                </div>}
        </div>
    )
}

export default StopWatchComponent;
