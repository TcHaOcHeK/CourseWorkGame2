import React from 'react';
import './Controls.css';

const Controls = ({ closeForm, changePlayer }) => {
    return (
        <div className="controls">
            <button onClick={closeForm}>Close Game</button>
            <button onClick={() => changePlayer(true)}>Change Player</button>
        </div>
    );
};

export default Controls;