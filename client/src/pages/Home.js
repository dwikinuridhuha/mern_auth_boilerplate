import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/userContext';

const Home = () => {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        if (!userData.user) {
            history.push("/login");
        }
    });

    return (
        <h1>Home</h1>
    )
};

export default Home;