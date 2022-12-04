import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import NavbarComponent from './Navbar.component';
import ToolsComponent from './Tools.component';
import IconComponent from './Icon.component';

import {setData} from '../stores/user';
import getDiscordData from '../utils/getDiscordData';
import StopWatchComponent from "./StopWatch.component";
import {Toaster} from "react-hot-toast";

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
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />

            <br/>
            {!fullScreenMode && <NavbarComponent data={data}/>}
            <ToolsComponent/>
        </div>
    )
}

export default HomeComponent;
