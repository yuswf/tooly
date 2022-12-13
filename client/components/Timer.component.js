import {useState} from 'react';
import {useSelector} from 'react-redux';

import QuickTimerComponent from './QuickTimer.component';
import ManuelSetTimerComponent from './ManuelSetTimer.component';
import UsersTimerComponent from './UsersTimer.component';
import IconComponent from './Icon.component';

function TimerComponent() {
    const {data: {username, id}} = useSelector(state => state.user);
    const {isRunning} = useSelector(state => state.manuelTimer);
    const lists = [
        {
            status: 1,
            name: 'Quick Timer',
            component: <QuickTimerComponent/>,
        },
        {
            status: 0,
            name: `Manuel Set`,
            component: <ManuelSetTimerComponent/>,
        },
        {
            status: 1,
            name: `${username}'s Timer`,
            component: <UsersTimerComponent/>,
        },
    ];
    const [selected, setSelected] = useState(lists.findIndex(list => list.status === 0));
    const [component, setComponent] = useState(lists[selected].component);

    const changeComp = (index) => {
        setSelected(index);
        setComponent(lists[index].component);
    }

    const check = (item) => {
        return item.status > 0 && !process.env.admins.includes(id);
    }

    return (
        <div className={`ml-auto mr-auto`}>
            <ul className="flex flex-wrap gap-3 justify-center items-center mb-6">
                {lists.map((list, index) => (
                    <li key={index}
                        className={`${index === selected ? 'bg-[#093a5b]' : ''} ${index === selected ? false : isRunning || check(list) && list.status > 0 ? 'bg-[#1f2024] bg-opacity-25 cursor-not-allowed' : ''} transition-all ease bg-[#1f2024] rounded p-2.5 font-bold text-sm cursor-pointer`}
                        onClick={() => !isRunning ? check(list) && list.status > 0 ? '' : changeComp(index) : ''}>{list.name} {list.status > 0 ? <span><IconComponent icon="locked" size={16} color="gold" /></span> : ''}</li>
                ))}
            </ul>

            <div className="flex flex-wrap gap-3 justify-center items-center">
                {component}
            </div>
        </div>
    )
}

export default TimerComponent;
