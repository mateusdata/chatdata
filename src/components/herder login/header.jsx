import React from 'react';
import "./styles.css";
const HeaderLogin = ({children}) => {
    return (
        <header className="header">
            {children}
            <h1 style={{ color: "white" }}> Chatdata Mensegger</h1>
        </header>
    );
}

export default HeaderLogin;
