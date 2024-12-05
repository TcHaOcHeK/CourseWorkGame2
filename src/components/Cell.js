import React from 'react';
import './Cell.css';

const Cell = ({ cell, x, y, handleCellClick, whoTurn }) => {
    const handleClick = () => {
        handleCellClick(x, y);
    };

    const getCellColor = () => {
        switch (cell) {
            case 1:
                return 'red';
            case 2:
                return 'green';
            case 4:
                return 'darkred';
            case 5:
                return 'darkgreen';
            default:
                return 'white';
        }
    };

    return (
        <div
            className={`cell ${whoTurn ? 'player-turn' : 'bot-turn'}`}
            onClick={handleClick}
            style={{ backgroundColor: getCellColor() }}
        ></div>
    );
};

export default Cell;