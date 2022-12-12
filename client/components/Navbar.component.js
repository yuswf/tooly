import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

function NavbarComponent({data}) {
    const [dropdown, setDropdown] = useState(false);
    const [openMBox, setOpenMBox] = useState(false);
    const [hours, setHours] = useState(new Date().getHours());
    const [minutes, setMinutes] = useState(new Date().getMinutes());
    const [seconds, setSeconds] = useState(new Date().getSeconds());

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    }, []);

    const handleClickOutside = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());

        if (!path.includes(document.getElementById('user-button')) && !path.includes(document.getElementById('dropdown'))) {
            setDropdown(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(new Date().getSeconds());
            setMinutes(new Date().getMinutes());
            setHours(new Date().getHours());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const open = () => {
        setDropdown(!dropdown);
    }

    const openBox = () => {
        setOpenMBox(!openMBox);
    }

    const routes = ['Home', 'Dashboard', 'Settings', 'Logout'];

    return (
        <nav className="navbar-c">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-7 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={() => openBox()} type="button"
                                className="inline-flex items-center justify-center rounded-md p-2"
                                aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-[-5] sm:block">
                            <div className="flex space-x-4">
                                {routes.map((route, index) => (
                                    <Link key={index} href={route === 'Logout' ? '/logout' : '/'} className="links bg-[#1f2024] px-3 py-2 rounded-md text-sm font-medium">
                                        {route}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="flex justify-center gap-5 text-lg items-center relative ml-3">
                            <span className="font-bold">{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>

                            <div id="user-button">
                                <button onClick={() => open()}
                                        className="flex rounded-full text-sm"
                                        id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    {data.avatar ? <Image width={32} height={32} className="h-8 w-8 rounded-full"
                                                          src={process.env.avatarBase + `/${data.id}/${data.avatar}`}
                                                          alt="avatar"/> : <Skeleton className="mb-1.5" circle={true} width={32} height={32} />}
                                </button>
                            </div>

                            {dropdown && (
                                <div
                                    id="dropdown"
                                    className="top-8 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-[#1f2024] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                    tabIndex="-1">

                                    <div className="px-4 py-3">
                                        <span className="block text-sm">{data.username + '#' + data.discriminator}</span>
                                        <span className="block mt-1 text-sm font-medium truncate">{data.email}</span>
                                    </div>
                                    <hr />
                                    <ul className="py-1" aria-labelledby="user-menu-button">
                                        {routes.map((route, index) => (
                                            <li key={index}>
                                                <Link href={route === 'Logout' ? '/logout' : '/'} className="block px-4 py-2 text-sm">
                                                    {route}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {openMBox && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 mt-[-5px] pb-3">
                        {routes.map((route, index) => (
                            <Link key={index} href={route === 'Logout' ? '/logout' : '/'} className="links bg-[#1f2024] text-white block px-3 py-2 rounded-md text-base font-medium">
                                {route}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default NavbarComponent;
