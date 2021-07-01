/* eslint-disable */

import './style2.scss';
import React from 'react';
import { useState, useEffect, useRef, useCallback} from 'react';

import Style from './Style.module.css';
import { WebStorage} from './helpers/functions'

import Blockfield from './components/blockField';
import Timer from './components/timer';
import FloatingElm from './components/floatingMsg'



/**
  BUGS/FIXES:

  Sommige velden hebben foutieve waarden:
    - ? de waarde van een veld op (eerste y rij):0 stijgt door een parallel vald aan (laaste y rij):0 omdat ze elkaar begrenzen

    game timer ? idk sukt
    - no idea




 */

const App = () => {
    const Levels = [
        {bombs: 20, x: 10, y: 10, name: 'Easy',   time: 0, maxtime: 2},
        {bombs: 30, x: 14, y: 14, name: 'Medium', time: 0, maxtime: 200},
        {bombs: 50, x: 20, y: 20, name: 'Hard',   time: 0, maxtime: 200},
        {bombs: 80, x: 30, y: 30, name: 'Insane', time: 0, maxtime: 200},
    ];

    /** HOOKS */
    const [ level, setLevel ] = useState(Levels[0]);
    const [ currentTime, setCurrentTime ] = useState(0)

    const timeRef = useRef()
    const floatingMenu = useRef();

    const [ gameState, setGameState ] = useState({
        start: false,
        end: false,
        victory: false,
        time: 0, 
        name: level.name, 
        msg: {
                win: 'You Won!', 
                lose: 'Blaming the system again?'
            }
    })

    let gamehasStarted = false;

    const startGame = ()=> {
        if(gamehasStarted) return
        gamehasStarted = true
        let i = setInterval(()=> {
            if(gamehasStarted) {
                if(currentTime >= level.maxtime) {
                    clearInterval(i)
                    return alert('Out of time')
                }
                console.log(level.maxtime, currentTime)
                setCurrentTime(prev=>prev+=1)
            } else {
                console.log('not started', gamehasStarted)
            }
        }, 1000)
    }

    window.onbeforeunload = ()=> {
        sessionStorage.clear();
    };


    return (
        <>
            <div className={Style.floating} ref={floatingMenu}>
                <FloatingElm onClickEvent={()=>Reset} gameData={gameState} />
            </div>
            <div id='App'>
                <div className={Style.setLevel}>
                    <p>Set level</p>

                    {
                        Levels.map((lv)=> (
                                <button key={`btnLevel${lv.name}`} onClick={()=>setLevel(lv)}>{lv.name}</button>
                        ))
                    }


                    {/* <button key={`btnReset${level.name}`} onClick={()=>Reset} id='btnReset'>reset</button> */}

                    <Timer ref={timeRef} time={currentTime} />
                </div>
                <div className='container gameField' key={level.name} onClick={()=>startGame()}>
                    <Blockfield level={level} />
                </div>
            </div>
        </>
    )
}

export default App;