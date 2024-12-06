import React from 'react';
import logo from './logo.png';
import './Menu.css';

const Menu = ({ onStart }) => {
    return (
        <div className="menu">
            <img src={logo} alt="Game Logo" className="App-logo" />
            <button onClick={() => onStart('twoPlayers')}>Play Two Players</button>
            <button onClick={() => onStart('bot')}>Play with Bot</button>
        </div>
    );
};

export default Menu;