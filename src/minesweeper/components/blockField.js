/* eslint-disable */

import FieldRow from './fieldRow';
import Style from '../Style.module.css';
import * as iconBomb  from '../assets/icon_bomb.png';

import {MakeChunks, WebStorage, SendError} from '../helpers/functions';

import MainLogic from '../mainLogic';
import { useState } from 'react';

/*** !! tiles work in a "x;y" format !! ***/
const Field = ({level}) => {

    const [ error, setError] = useState(null)

    const dimensionX = level.x;
    const dimensionY = level.y;
    const dimensionField = dimensionX * dimensionY;

    let BombsMap = new Map();
    let FieldMap = new Map();


    const fieldOpenerMax = 15;
    const TEST_MODE = true;
    let gameStarted = false;
    let checkedTilesCount = 0;

    let EndGame = false;
    let fieldRowsAmount = [];





    /** Functions */
    const GameSetup = async (activeTile)=> {
        const { bombsData, fieldData } = await MainLogic.setupGameData({activeTile: activeTile, level: level})
        BombsMap = bombsData;
        FieldMap = fieldData;

        gameStarted = true;
        WebStorage.set('gameStarted', true)
    }

    const setEndGame = (victory)=> {
        EndGame = true;
        WebStorage.set('gameStarted', false)
        WebStorage.set('victory', victory ? 'defeat' : 'victory')

        if(victory) {
            alert('you won')
        } else {
            FieldMap.forEach((elm)=> {
                if(elm.bomb) {
                    elm.element.innerHTML = '';
                    elm.element.classList.remove(Style.activeBlock);
                    elm.element.style.backgroundColor = '#f22'
                    elm.element.style.backgroundImage = `url(${iconBomb.default})`;
                }
            });
        }
    }

    /** 2. tile onclick event */
    const TileOnclick = async (e)=> {
        e.preventDefault();
        if(EndGame) return

        const targ = e.target;
        const targName = targ.dataset.coords;

        if(!gameStarted) {
            await GameSetup(targName)
        }
        targ.classList.remove(Style.activeBlock);
        if(BombsMap.has(targName)) {
            return setEndGame(false);
        } else {
            // fieldOpenerMax is the amout of neighbour tile that will be removed
            if(TEST_MODE && checkedTilesCount > fieldOpenerMax) return;
            else checkAjectCells(targName)
        }
    }

    /** 2. check for empty cells  */
    const checkAjectCells = async(activeCell)=> {
        const {err, checkedTilesCnt}  = MainLogic.checkAjectCells(activeCell);
        if(err) setError(err)
        checkedTilesCount = checkedTilesCnt
    }

    /** 3. GAME SETUP */
    const fieldSettup = ()=> {        
        // create field
        const createField = () => {
            const field = [];
            const coords = {x: 0, y: 0}
            for(let i = 0; i < dimensionField; i++) {
                const obj = {x: coords.x, y: coords.y, key: `${coords.x};${coords.y}`}
                field.push(obj)

                coords.x++
                if(coords.x >= dimensionX) {
                    coords.x = 0;
                    coords.y++;
                }
            }
            fieldRowsAmount = MakeChunks(field, dimensionY);
        }
        createField()
    }

    if(!gameStarted) {
        fieldSettup()
    }

    
    
    return (
        <>
            {TEST_MODE ?? <div className='infoDiv'>
                <p>X:{dimensionX}, Y:{dimensionY}</p>
            </div>}
            <h5>Level: {level.name}</h5>
            <div className={Style.blockField}>
                <div className={Style.fieldRow} >
                {
                    
                !error ? fieldRowsAmount.map((i)=> (
                        <FieldRow key={`rowkey${i[0].key}$`} blockRows={i} tileOnclick={TileOnclick} playLevel={level}/>
                    )) : <h1 className='error'>{error}</h1>
                }
                </div>
            </div>
        </>

    )

}

export default Field;