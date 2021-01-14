import React from 'react';
import { Link } from "react-router-dom";
import AuthOptional from "../auth/AuthOptional";

const Header = () => {
    return (
        <header id="header">
            <Link to="/">
                <h1 className="title">MERN auth template</h1>
            </Link>

            <AuthOptional/>
        </header>
    )
};

export default Header;