import React from 'react';
import './Controls.css';

const Controls = ({ closeForm, changePlayer, goToMenu }) => {
    return (
        <div className="controls">
            <button onClick={goToMenu}>В меню</button>
            <button onClick={() => changePlayer(true)}>Пропустить ход</button>
        </div>
    );
};

export default Controls;