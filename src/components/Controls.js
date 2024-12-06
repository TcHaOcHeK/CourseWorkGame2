import React from 'react';
import './Controls.css';

const Controls = ({ closeForm, changePlayer }) => {
    return (
        <div className="controls">
            <button onClick={closeForm}>Начать заново</button>
            <button onClick={() => changePlayer(true)}>Пропустить ход</button>
        </div>
    );
};

export default Controls;