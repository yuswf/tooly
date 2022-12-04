import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NavbarComponent from './Navbar.component';
import ToolsComponent from './Tools.component';
import IconComponent from './Icon.component';

import {setData} from '../stores/user';
import getDiscordData from '../utils/getDiscordData';
import StopWatchComponent from "./StopWatch.component";

function HomeComponent() {
    const dispatch = useDispatch();
    const {user: {user, data}, stopWatch: {fullScreenMode}} = useSelector(state => state);

    const getUserData = async () => {
        const userData = await getDiscordData(user);

        dispatch(setData(userData));
    }

    useEffect(() => {
        getUserData();
    }, [user]);

    return (
        <div className="home-c">
            <br/>
            {!fullScreenMode && <NavbarComponent data={data}/>}
            <ToolsComponent/>
        </div>
    )
}

export default HomeComponent;

/*
{
    getGuilds ? getGuilds?.filter(guild => guild.id === process.env.mainServer).length === 1
        ?
        <div>
            <h1 className="title">Welcome to the {data?.username}#{data?.discriminator} page!</h1>
        </div>
        :
        <div>
            yoksun gelsene amk
            <br/>
            <a target="_blank" href={process.env.inviteUrl}>katil amk</a>
        </div>
        :
        <Skeleton width={15}/>
}
*/
