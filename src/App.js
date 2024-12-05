import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard.js';
import Controls from './components/Controls.js';
import './App.css';

const App = () => {
    const [desk, setDesk] = useState(Array.from({ length: 10 }, () => Array(10).fill(0)));
    const [whoTurn, setWhoTurn] = useState(true);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        resetGame();
    }, []);

    const foo = (n) => n > 0 ? 1 : n === 0 ? 0 : -1;

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
        if (whoTurn && logicClick(xClick, yClick)) {
            logicPaint(xClick, yClick);
        }
    };

    const botDoing = () => {
        let minDistances = [];

        let minDistance = Infinity;

        for (let i = 0; i < desk.length; i++) {
            for (let j = 0; j < desk[i].length; j++) {
                if (desk[i][j] % 3 === 1) {
                    for (let x = 0; x < desk.length; x++) {
                        for (let y = 0; y < desk[x].length; y++) {
                            if (desk[x][y] === 2) {
                                const distance = Math.abs(i - x) + Math.abs(j - y);
                                if (distance <= minDistance) {
                                    minDistance = distance;
                                    minDistances.push({ xi: i, yi: j, xj: x, yj: y, len: distance });
                                }
                            }
                        }
                    }
                }
            }
        }

        minDistances = minDistances.sort((a, b) => a.len - b.len);

        botClick(minDistances);
    };

    const botClick = (op) => {
        if (op.length === 0) {
            changePlayer(true); // Если нет доступных ходов, передаём ход игроку
            return;
        }

        let n = 0;
        let flag = false;
        let dx = op[0].xj - op[0].xi !== 0 ? foo(op[0].xj - op[0].xi) : 1;
        let dy = op[0].yj - op[0].yi !== 0 ? foo(op[0].yj - op[0].yi) : 1;

        let xClick = Math.abs(op[n].xj - op[n].xi) >= Math.abs(op[n].yj - op[n].yi) ? op[n].xi + dx : op[n].xi;
        let yClick = Math.abs(op[n].xj - op[n].xi) < Math.abs(op[n].yj - op[n].yi) ? op[n].yi + dy : op[n].yi;

        if (desk[xClick][yClick] !== 2 && desk[xClick][yClick] % 3 !== 0) {
            xClick = Math.abs(op[n].xj - op[n].xi) < Math.abs(op[n].yj - op[n].yi) ? op[n].xi + dx : op[n].xi;
            yClick = Math.abs(op[n].xj - op[n].xi) >= Math.abs(op[n].yj - op[n].yi) ? op[n].yi + dy : op[n].yi;
        }

        while (n < op.length) {
            if (logicClick(xClick, yClick) && (desk[xClick][yClick] === 2 || desk[xClick][yClick] === 0)) {
                logicPaint(xClick, yClick);
                break;
            } else {
                n++;
                if (n >= op.length) {
                    flag = !flag;
                    break;
                }

                xClick = Math.abs(op[n].xj - op[n].xi) >= Math.abs(op[n].yj - op[n].yi) ? op[n].xi + dx : op[n].xi;
                yClick = Math.abs(op[n].xj - op[n].xi) < Math.abs(op[n].yj - op[n].yi) ? op[n].yi + dy : op[n].yi;

                if (desk[xClick][yClick] !== 2 && desk[xClick][yClick] % 3 !== 0) {
                    xClick = Math.abs(op[n].xj - op[n].xi) < Math.abs(op[n].yj - op[n].yi) ? op[n].xi + dx : op[n].xi;
                    yClick = Math.abs(op[n].xj - op[n].xi) >= Math.abs(op[n].yj - op[n].yi) ? op[n].yi + dy : op[n].yi;
                }
            }
        }
        if (flag) {
            changePlayer(true);
        }
    };

    useEffect(() => {
        if (!whoTurn) {
            botDoing();
        }
    }, [whoTurn, desk]);

    useEffect(() => {
        let cPlayer = 0, cBot = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (desk[i][j] === 1) cPlayer++;
                if (desk[i][j] === 2) cBot++;
            }
        }

        if (cBot === 0 && cPlayer !== 0) {
            alert('Bot wins!');
            resetGame();
        }

        if (cPlayer === 0 && cBot !== 0) {
            alert('Player wins!');
            resetGame();
        }
    }, [desk]);

    return (
        <div className="App">
            <GameBoard desk={desk} handleCellClick={handleCellClick} whoTurn={whoTurn} />
            <Controls closeForm={closeForm} changePlayer={changePlayer} />
        </div>
    );
};

export default App;