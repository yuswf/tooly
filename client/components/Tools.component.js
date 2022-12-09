import {useSelector} from 'react-redux';
import {useState} from 'react';

import IconComponent from './Icon.component';
import StopWatchComponent from './StopWatch.component';
import TimerComponent from './Timer.component';
import PomodoroComponent from './Pomodoro.component';
import InvestmentComponent from './Investment.component';

function ToolsComponent() {
    const {user: {data}, stopWatch: {fullScreenMode, isRunning}} = useSelector(state => state);

    const perms = [
        {
            perm: -1,
            access: 'fire',
            color: 'red',
        },
        {
            perm: 0,
            access: 'unlocked',
            color: 'goldenrod',
        },
        {
            perm: 1,
            access: 'maintenance',
            color: 'saddlebrown',
        },
        {
            perm: 2,
            access: 'building',
            color: 'saddlebrown',
        },
        {
            perm: 3,
            access: 'hour-glass',
            color: 'green',
        },
        {
            perm: 8,
            access: 'locked',
            color: 'goldenrod',
        }
    ]
    const tools = [
        {
            name: 'Timer',
            component: <TimerComponent/>,
            description: 'A simple timer to time your tasks.',
            perm: 3,
        },
        {
            name: 'Stopwatch',
            component: <StopWatchComponent/>,
            description: 'A simple stopwatch to time your tasks.',
            perm: -1,
        },
        {
            name: 'Pomodoro',
            component: <PomodoroComponent/>,
            description: 'A simple pomodoro timer to time your tasks.',
            perm: 8,
        },
        {
            name: 'Investment',
            component: <InvestmentComponent/>,
            description: 'A simple investment for checking.',
            perm: 8,
        },
    ];

    const [component, setComponent] = useState(!process.env.admins.includes(data.id) ? tools.filter(tool => tool.perm <= 0)[0]?.component || 'No tools available.' : tools[0].component);
    const [i, setI] = useState(!process.env.admins.includes(data.id) ? tools.findIndex(tool => tool.perm <= 0) : 0);

    const toolViewer = (i) => {
        const component = tools[i].component;

        setI(i);
        setComponent(component);
    }

    const check = (item) => {
        return item.perm > 0 && !process.env.admins.includes(data.id)
    }

    const getIcon = (item) => {
        return <IconComponent color={perms.filter(perm => perm.perm === item.perm)[0].color}
                              icon={perms.filter(perm => perm.perm === item.perm)[0].access} size={16}/>;
    }

    return (
        <div className="mt-1 shadow-sm">
            {!fullScreenMode && (
                <div className="max-w-screen-xl px-4 py-5 mx-auto sm:grid-cols-2 md:px-6">
                    <ul className="grid grid-cols-2 gap-2">
                        {tools.map((item, index) => (
                            <li
                                onClick={() => check(item) ? '' : isRunning ? '' : toolViewer(index)}
                                className={`${check(item) ? 'bg-[#1f2024] bg-opacity-25 cursor-not-allowed' : index !== i && isRunning ? 'bg-[#1f2024] bg-opacity-25 cursor-not-allowed' : `${index === i ? 'bg-[#093a5b]' : 'bg-[#1f2024] bg-opacity-55'} cursor-pointer`} transition rounded`}
                                key={index}>
                                <a className="block p-3 rounded-lg">
                                    <div>
                                        <span className="font-bold">{item.name}</span>

                                        <span className="float-right">
                                        {
                                            getIcon(item)
                                        }
                                    </span>
                                    </div>
                                    <span className="text-sm font-light">{item.description}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid max-w-screen-xl px-4 py-5 mx-auto mt-10 md:px-6">
                {component}
            </div>
        </div>
    )
}

export default ToolsComponent;
