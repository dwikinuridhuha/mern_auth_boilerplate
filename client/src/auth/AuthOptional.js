import React, {useContext} from 'react';
import {useHistory} from "react-router-dom";

import UserContext from "../context/userContext";

const AuthOptional = () => {
    const {userData, setUserData} = useContext(UserContext);
    const history = useHistory();

    const register = () => {
        history.push("/register");
    };

    const login = () => {
        history.push("/login");
    };

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <div className="auth-options">
            {userData.user ? (
                <button onClick={logout}>Log Out</button>
            ) : (
                <div>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Log in</button>
                </div>
            )}
        </div>
    )
};

export default AuthOptional;