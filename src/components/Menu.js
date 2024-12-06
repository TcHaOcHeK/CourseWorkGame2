import React from 'react';

const Menu = ({ onStart }) => {
    return (
        <div className="menu">
            <h1>Выберите режим игры</h1>
            <button onClick={() => onStart('player')}>Играть с другом</button>
            <button onClick={() => onStart('bot')}>Играть с ботом</button>
        </div>
    );
};

export default Menu;