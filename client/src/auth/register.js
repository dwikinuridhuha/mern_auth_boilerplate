import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Axios from "axios";
import UserContext from '../context/userContext';
import ErrorMessage from "../misc/ErrorMessage";

const Register = () => {
    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setpasswordCheck] = useState();
    const [displayName, setdisplayName] = useState();
    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = {email, password, passwordCheck, displayName};
            await Axios.post("http://localhost:5000/users/register", newUser);
            const loginRes = await Axios.post("http://localhost:5000/users/login",
                {
                    email,
                    password
                });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (e) {

            if(e.response.data.msg) {
                setError(e.response.data.msg);
            }
        }
    };

    return (
        <div className="page">
            <h1>Register</h1>

            {error && (
                <ErrorMessage message={error} clearError={() => setError(undefined)}/>
            )}

            <form onSubmit={submit} className="form">
                <label htmlFor="register-email">Email</label>
                <input type="email" id="register-email"
                       onChange={(e) => {
                           setEmail(e.target.value);
                       }}
                />

                <label htmlFor="register-display-name">Display Name</label>
                <input type="text" id="register-display-name"
                       onChange={(e) => {
                           setdisplayName(e.target.value);
                       }}
                />

                <label htmlFor="register-password">Password</label>
                <input type="password" id="register-password"
                       onChange={(e) => {
                           setPassword(e.target.value);
                       }}
                />
                <input type="password" placeholder="Verify password"
                       onChange={(e) => {
                           setpasswordCheck(e.target.value);
                       }}
                />

                <input type="submit" value="Register"/>
            </form>
        </div>
    )
};

export default Register;