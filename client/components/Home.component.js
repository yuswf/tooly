import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Toaster} from 'react-hot-toast';
// import {io} from 'socket.io-client';

import NavbarComponent from './Navbar.component';
import ToolsComponent from './Tools.component';
import {setData, /*setOnlineUser*/} from '../stores/user';
import getDiscordData from '../utils/getDiscordData';
import LoaderComponent from './Loader.component';

function HomeComponent() {
    const dispatch = useDispatch();
    const {user: {user, data, /*onlineUsers*/}, stopWatch: {fullScreenMode}} = useSelector(state => state);

    const getUserData = async () => {
        const userData = await getDiscordData(user);

        dispatch(setData(userData));
    }

    useEffect(() => {
        getUserData();
    }, [user]);

    useEffect(() => {
        if (process.env.bannedUsers.includes(data.id)) {
            localStorage.removeItem('token')
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        }
    }, [data !== {}]);

    /*
    useEffect(() => {
        const socketInitializer = async () => {
            const socket = io('https://toooly-server.vercel.app', {
                auth: {
                    token: data.username + '#' + data.discriminator
                }
            });

            socket.on("connect", () => {});

            socket.on("message", (data) => {
                dispatch(setOnlineUser(data));
            });
        }

        socketInitializer();
    });
    */

    return (
        <div className="home-c">
            {data.id &&
                (
                    <>
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />

                        <br/>
                        {!fullScreenMode && <NavbarComponent data={data}/>}
                        <ToolsComponent/>
                    </>
                )
                ||
                <LoaderComponent color="#5865F2"/>
            }
        </div>
    )
}

export default HomeComponent;
