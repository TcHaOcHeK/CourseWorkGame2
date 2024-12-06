import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard.js';
import Controls from './components/Controls.js';
import Menu from './components/Menu.js';
import './App.css';

const App = () => {
    const [desk, setDesk] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [whoTurn, setWhoTurn] = useState(true);
    const [clickCount, setClickCount] = useState(0);
    const [gameMode, setGameMode] = useState(null);

    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        let cPlayer = 0, cBot = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (desk[i][j] === 1) cPlayer++;
                if (desk[i][j] === 2) cBot++;
            }
        }

        if (cBot === 0 && cPlayer !== 0) {
            alert('Player 2 wins!');
            resetGame();
        }

        if (cPlayer === 0 && cBot !== 0) {
            alert('Player 1 wins!');
            resetGame();
        }
    }, [desk]);


    const inRange = (value, left, right) => value >= left && value < right;

    const closeForm = () => {
        resetGame();
    };

    const resetGame = () => {
        const newDesk = Array.from({ length: 10 }, () => Array(10).fill(0));
        newDesk[0][0] = 1;
        newDesk[9][9] = 2;
        setDesk(newDesk);
        setClickCount(0);
        setWhoTurn(true);
    };

    const changePlayer = (click = false) => {
        if (clickCount === 2 || click) {
            setClickCount(0);
            setWhoTurn(!whoTurn);
        }
    };

    const logicPaint = (xClick, yClick) => {
        const newDesk = [...desk];
        switch (newDesk[xClick][yClick]) {
            case 1:
                if (whoTurn) {
                    setClickCount(clickCount + 1);
                    newDesk[xClick][yClick] = 5;
                }
                break;
            case 2:
                if (!whoTurn) {
                    setClickCount(clickCount + 1);
                    newDesk[xClick][yClick] = 4;
                }
                break;
            case 0:
                if (whoTurn) {
                    setClickCount(clickCount + 1);
                    newDesk[xClick][yClick] = 2;
                } else {
                    setClickCount(clickCount + 1);
                    newDesk[xClick][yClick] = 1;
                }
                break;
            default:
                break;
        }
        setDesk(newDesk);
        changePlayer(); // Передаем ход после каждого хода игрока
    };

    const logicClick = (xClick, yClick) => {
        let logic = false;

        logic = inRange(xClick + 1, 0, 10)
            ? logic || desk[xClick + 1][yClick] % 3 === 1 + Number(whoTurn)
            : logic;

        logic = inRange(yClick + 1, 0, 10)
            ? logic || desk[xClick][yClick + 1] % 3 === 1 + Number(whoTurn)
            : logic;

        logic = inRange(xClick - 1, 0, 10)
            ? logic || desk[xClick - 1][yClick] % 3 === 1 + Number(whoTurn)
            : logic;

        logic = inRange(yClick - 1, 0, 10)
            ? logic || desk[xClick][yClick - 1] % 3 === 1 + Number(whoTurn)
            : logic;

        return logic;
    };

    const handleCellClick = (xClick, yClick) => {
        if (logicClick(xClick, yClick)) {
            logicPaint(xClick, yClick);
        }
    };

    const startGame = (mode) => {
        setGameMode(mode);
        resetGame();
    };

    const goToMenu = () => {
        setGameMode(null);
        resetGame();
    };

    if (!gameMode) {
        return <Menu onStart={startGame} />;
    }

    return (
        <div className="App">
            <GameBoard desk={desk} handleCellClick={handleCellClick} whoTurn={whoTurn} />
            <Controls closeForm={closeForm} changePlayer={changePlayer} goToMenu={goToMenu} />
        </div>
    );
};

export default App;