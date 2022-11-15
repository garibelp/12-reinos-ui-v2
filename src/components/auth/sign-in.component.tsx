import {Button, Input} from 'antd';
import {useState} from 'react';

import {signIn} from '../../api/requests/auth';
import {setPlayer} from "../../redux/slices/player.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";

export function SignInComponent() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, isLoading] = useState(false);
    const player = useAppSelector((state: RootState) => state.player);
    const dispatch = useAppDispatch();

    function handleLogin() {
        isLoading(true)
        signIn(username, password).then(r => {
            const {data} = r;
            console.log(data);
            localStorage.setItem("jwt", data.jwt);
            dispatch(setPlayer(data));
        }).catch(ex => {
            console.error(ex);
        }).finally(() => isLoading(false));
    }

    return (
        <div>
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                loading={loading}
                color='primary'
                onClick={handleLogin}
            >
                Request
            </Button>
            <div>ID: {player.id}</div>
            <div>USER: {player.username}</div>
            <div>MAIL: {player.email}</div>
            <div>ROLES: {player.roles}</div>
        </div>
    );
}
