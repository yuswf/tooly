import {useEffect, useState} from 'react';
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
    setFullScreenMode,
    setRecord
} from '../stores/StopWatch';

function StopWatchComponent() {
    const dispatch = useDispatch();
    const {
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
        dispatch(setRecord(JSON.parse(localStorage.getItem('records')) || []));
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
            function timenow() {
                var now = new Date().toLocaleString('tr-TR').split(' ')[1],
                    h = now.split(':')[0],
                    m = now.split(':')[1],
                    s = now.split(':')[2];

                return ' ' + h + ':' + m + ':' + s + ' ';
            }

            // const time = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
            // const time = msToTime(Date.now());
            const time = timenow();

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

            const records = [...myRecords, dataString];
            dispatch(setRecord(records));
            localStorage.setItem('records', JSON.stringify(records));
        }
    }

    const removeRecord = (item, index) => {
        if (myRecords.length === 1) {
            dispatch(setRecord([]));
            return localStorage.removeItem('records');
        }

        const newRecords = myRecords.filter((record, i) => i !== index);
        dispatch(setRecord(newRecords));
        localStorage.setItem('records', JSON.stringify(newRecords));
    }

    /*
    const saveToDB = async () => {
        setSaving(true);
        if (saving) return;

        // await SetRecordsToDatabase(data.id, Records) &&
        if (!(await sendToUser(data.id, myRecords, msToTime))) {
            toast.success('Records saved to database & Discord');
            setSaving(false);
        } else {
            toast.error('Error while saving records to database & Discord');
            setSaving(false);
        }
    }
    */

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

                <button disabled={myRecords.length !== 0 ? timeToMs(hours, minutes, seconds, milliseconds) - myRecords[myRecords?.length - 1]?.ms < 1000 : true && !isRunning && !(milliseconds > 0)}
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

            {!fullScreenMode && (
                <div className="rounded save-d mt-8 bg-[#1f2024] p-4 px-10 py-8">
                    {myRecords.length > 0 ? (
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

                    {myRecords.length > 0 && myRecords.map((item, index) => (
                        <div key={index} className="flex justify-between">
                            <div className="flex">
                                <span className="">{item.time}</span>
                            </div>
                            <span className="">
                            {msToTime(index === 0 ? item.ms : item.ms - myRecords[index - 1].ms)} <span
                                className="cursor-pointer" onClick={() => removeRecord(item, index)}><IconComponent
                                size={12} color="#5865F2" icon="cancel"/></span>
                        </span>
                        </div>
                    ))}
                </div>
            )}

            {/*
            {!fullScreenMode && (
                <>
                    {getGuilds?.length > 0 ? getGuilds?.filter(guild => guild.id === process.env.mainServer).length === 1
                            ?
                            <div className={`w-auto flex justify-center mt-5`}>
                                <button disabled={true} //Records.length === 0 || saving
                                        className={`${saving ? 'w-24' : ''} disabled:cursor-not-allowed disabled:bg-[#1f2024]-25 disabled:bg-opacity-25 border border-[#5865f2] border-opacity-25 btn rounded p-3 bg-[#1f2024] btn-primary mr-2`}
                                        onClick={saveToDB}>
                                    <span className="mr-1"></span>{/*<IconComponent icon="loader" size={26} color="#5865F2"/>
                        {saving ? <span className={`${saving ? 'animate-spin' : ''} ml-auto mr-auto`}>Loading...</span> : <><IconComponent icon="locked" size={16} color="gold"/> Save
                            to <span className="inline-block font-bold text-[#5865F2]">Discord</span>
                        </>}
                            </button>
                    </div>
                    :
                        <div className="flex justify-center mt-8">
                            Join our&nbsp;<a href={process.env.inviteUrl}
                                             className="font-bold text-[#5865F2]">Discord</a>&nbsp;Server
                        </div>
                    :
                        <div className="flex justify-center mt-5">
                            <Skeleton width={142} height={48}/>
                        </div>}
                    </>
            */}
        </div>
    )
}

export default StopWatchComponent;
