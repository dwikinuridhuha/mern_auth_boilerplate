import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./layout/Header.js";
import Home from "./pages/Home";
import Login from "./auth/login";
import Register from "./auth/register";
import UserContext from "./context/userContext";

import './App.css';
import Axios from "axios";

export default function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined
    });

    useEffect(() => {
        const checkLoginIn = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
                "http://localhost:5000/users/tokenIsValid",
                null,
                {
                    headers: {"x-auth-token": token}
                });

            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/users",
                    {
                        headers: {"x-auth-token": token}
                    });
                setUserData({
                    token: token,
                    user: userRes.data
                })
            }
        };

        checkLoginIn();
    }, []);

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{userData, setUserData}}>
                    <div>
                        <Header/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route path='/login' component={Login}/>
                                <Route path='/register' component={Register}/>
                            </Switch>
                        </div>
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}