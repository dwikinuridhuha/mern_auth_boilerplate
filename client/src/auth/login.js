import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from "axios";
import UserContext from '../context/userContext';
import ErrorMessage from "../misc/ErrorMessage";

const Login = () => {
    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const logInUser = {email, password};
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login",
                {
                    email: logInUser.email,
                    password: logInUser.password
                });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (e) {
            if (e.response.data.msg) {
                setError(e.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && (
                <ErrorMessage message={error} clearError={() => setError(undefined)}/>
            )}
            <form onSubmit={submit} className="form">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email"
                       onChange={(e) => {
                           setEmail(e.target.value);
                       }}
                />

                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password"
                       onChange={(e) => {
                           setPassword(e.target.value);
                       }}
                />

                <input type="submit" value="Register"/>
            </form>
        </div>

    )
};

export default Login;