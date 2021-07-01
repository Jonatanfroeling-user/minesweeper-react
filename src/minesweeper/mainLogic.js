/* eslint-disable  */
import Style from './Style.module.css';
import { getOctalNeighbours, getRandomCoords, SendError } from './helpers/functions'
//import { useEffect, useState } from 'react';

const MainLogic = {
    runTimeLimit: 300,
    level: null,
    dimensionX: null,
    dimensionY: null,
    dimensionField: null,
    BombsMap: new Map(),
    FieldMap: new Map(),

    /** setupGameData */
    async setupGameData({activeTile, level}) { 
        this.level = level;
        this.dimensionX = level.x;
        this.dimensionY = level.y;
        this.dimensionField = level.x * level.y;

        const allTiles = [...document.querySelectorAll(`.${Style.block}`)];
        
        // settup bombs
        let runTimeOverload = 0
        while(this.BombsMap.size < this.level.bombs) {
            runTimeOverload++
            if(runTimeOverload > this.runTimeLimit) {
                return SendError('Error: run time overload');
            }
            let newCoords = getRandomCoords(this.dimensionX, this.dimensionY);
            if(!this.BombsMap.has(newCoords) && !this.BombsMap.has(activeTile)) this.BombsMap.set(newCoords.name, newCoords.data)
        }

        // decent tile info
        allTiles.forEach((elm, idx,) => {
            const cds = elm.dataset.coords;
            const sptCds = cds.split(';')
            this.FieldMap.set(cds, {
                index: idx,
                coords: {
                    name: cds,
                    x: +sptCds[0],
                    y: +sptCds[1],
                },
                bomb: this.BombsMap.has(cds),
                element: elm,
                val: 0,
                checked: false,
            })
        })

        // sets vals to tiles
        this.BombsMap.forEach((elm)=> {
            const neighbours = [...getOctalNeighbours(+elm.coords.x, +elm.coords.y)]
            neighbours.map((e)=> {
                const elm = `${e.x};${e.y}`
                if(this.FieldMap.has(elm)) {
                    if(!this.FieldMap.get(elm).bomb) {
                        this.FieldMap.get(elm).val++
                    } 
                }
            })
        })

        // adds value and class according to value
        this.FieldMap.forEach((elm) => {
            if (!elm.bomb) {
                elm.element.innerHTML = elm.val;
                elm.element.classList.add(`block-${elm.val}`);
            }
        });
        return {
            bombsData:this.BombsMap, 
            fieldData:this.FieldMap
        }
    },

    /** checkAjectCells */
    checkAjectCells (activeTile) {
        const returnMsg = {err: null, checkedTilesCnt: 0};
        const elm = this.FieldMap.get(activeTile);
        const directions = [...getOctalNeighbours(0, 0)]
        elm.checked = true;
        let runTimeOverload = 0;
        const checkNeigbours = (ElmX, ElmY)=> {
            runTimeOverload++
            if(runTimeOverload > this.runTimeLimit) {
                returnMsg.err = 'Error: run time overload, dont try later'
                return returnMsg;
            }
            const uncheckedDirections = [];
            directions.map((dir) => {
                const thisX = ElmX + dir.x;
                const thisY = ElmY + dir.y
                const targElm = this.FieldMap.get(`${thisX};${thisY}`);
                if(targElm && !targElm.bomb && !targElm.checked ) {
                    if(targElm.val <= 0) {
                        uncheckedDirections.push({x: thisX,y: thisY})
                    } 
                    targElm.element.classList.remove(Style.activeBlock);
                    targElm.checked = true;
                    returnMsg.checkedTilesCnt++;
                }
            })
            uncheckedDirections.map((uDir)=> {
                checkNeigbours(uDir.x, uDir.y);
            })
        }
        checkNeigbours(elm.coords.x, elm.coords.y);

        return returnMsg
    }
   
}

export default MainLogic



    /** 1. sets field data */
    // const setupGameData = async (activeTile)=> {
    //     if(gameStarted) return

    //     allTiles = [...document.querySelectorAll(`.${Style.block}`)];
        
    //     // settup bombs
    //     runTimeOverload = 0
    //     while(BombsMap.size < amountBombs) {
    //         runTimeOverload++
    //         if(runTimeOverload > runTimeLimit) {
    //             SendError('Error: run time overload')
    //             return
    //         }
    //         let newCoords = getRandomCoords(dimensionX, dimensionY);
    //         if(!BombsMap.has(newCoords) && !BombsMap.has(activeTile)) BombsMap.set(newCoords.name, newCoords.data)
    //     }

    //     // decent tile info
    //     allTiles.forEach((elm, idx,) => {
    //         const cds = elm.dataset.coords;
    //         const sptCds = cds.split(';')
    //         FieldMap.set(cds, {
    //             index: idx,
    //             coords: {
    //                 name: cds,
    //                 x: +sptCds[0],
    //                 y: +sptCds[1],
    //             },
    //             bomb: BombsMap.has(cds),
    //             element: elm,
    //             val: 0,
    //             checked: false,
    //         })
    //     })

    //     // sets vals to tiles
    //     BombsMap.forEach((elm)=> {
    //         const neighbours = [...getOctalNeighbours(+elm.coords.x, +elm.coords.y)]
    //         neighbours.map((e)=> {
    //             const elm = `${e.x};${e.y}`
    //             if(FieldMap.has(elm)) {
    //                 if(!FieldMap.get(elm).bomb) {
    //                     FieldMap.get(elm).val++
    //                 } 
    //             }
    //         })
    //     })

    //     // adds value and class according to value
    //     FieldMap.forEach((elm) => {
    //         if (!elm.bomb) {
    //             elm.element.innerHTML = elm.val;
    //             elm.element.classList.add(`block-${elm.val}`);
    //         }
    //     });
    //     return true
    // }