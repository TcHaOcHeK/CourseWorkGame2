import React from 'react';
import Cell from './Cell';
import './GameBoard.css';

const GameBoard = ({ desk, handleCellClick, whoTurn }) => {
    return (
        <div className="game-board">
            {desk.map((row, i) => (
                <div key={i} className="row">
                    {row.map((cell, j) => (
                        <Cell
                            key={j}
                            cell={cell}
                            x={i}
                            y={j}
                            handleCellClick={handleCellClick}
                            whoTurn={whoTurn}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;