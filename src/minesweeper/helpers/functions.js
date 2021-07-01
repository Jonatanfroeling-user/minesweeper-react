/** FUNCTIONS (should be imported) */
const MakeChunks = (arr, len) => {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }
    return chunks;
}

const randInt = (min = 0, max = 9) => Math.floor(Math.random() * (max - min + 1) + min);

const numToArray = (num)=> Array.from(String(num), Number);

const getUniqueArrVal = (arr, maxVal)=> {
    const num = randInt(0, maxVal);
    return arr.includes(num) ? getUniqueArrVal(arr, maxVal) : num
}

const RepeatAction = (amount, action)=> {
    for(let i = 0; i < amount; i++ ) {
        action()
    }
};

const getOctalNeighbours = (x, y)=> {
    // xN1 = x negative 1 ...
    const xN1yN1 = {x: x - 1, y: y - 1};
    const xP0yN1 =  {x: x, y: y - 1} ;
    const xP1NyN1 =  {x: x + 1, y: y - 1};

    const xN1 = {x: x - 1, y: y};
    const xP1 = {x: x + 1, y: y};

    const xN1yP1 = {x: x - 1, y: y + 1};
    const xP0yP1 = {x: x, y: y + 1};
    const xP1NyP1 = {x: x + 1, y: y + 1};

    return [xN1yN1, xP0yN1, xP1NyN1, xN1, xP1, xN1yP1, xP0yP1, xP1NyP1];
}

const getRandomCoords = (x, y, x0= 0, y0 = 0)=> {
    const NX = randInt(x0, x)
    const NY = randInt(y0, y)
    
    return {name:`${NX};${NY}`, data: {coords: {x: NX, y:NY}}}
}


const SendError = (msg = 'An unknown error occured')=> {
    console.error(`Error: ${msg}`);
    alert(`An error occured: ${msg}`)
    return
}

const WebStorage = {
    set(key, val) {
        sessionStorage.setItem(key, JSON.stringify(val));
    },
    get(key) {
        return JSON.parse(sessionStorage.getItem(key))        
    },
    clear() {
        sessionStorage.clear()
    }
}

export {MakeChunks, randInt, getUniqueArrVal, RepeatAction, getOctalNeighbours, numToArray, getRandomCoords, SendError, WebStorage}