import {useRouter} from 'next/router';

import IconComponent from './Icon.component';

import login from '../utils/login';

function LoginComponent() {
    const router = useRouter();

    const loginHandler = () => {
        login(router);
    }

    return (
        <button onClick={() => loginHandler()} className="login-b border border-[#5865F2] login-c py-4 bg-[#1f2024] px-6 rounded"><IconComponent icon="discord" color="#5865F2" size={28} />&nbsp;&nbsp;Sign In via&nbsp;<b style={{color: "#5865F2"}}>Discord</b></button>
    )
}

export default LoginComponent;
