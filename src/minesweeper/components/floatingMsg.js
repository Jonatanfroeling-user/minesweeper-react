import Style from '../Style.module.css';

const Floating = ( { onClickEvent, gameData}) => {
    return (
        <div className={Style.floatContent}>
            <p>{gameData.victory ? gameData.msg.win : gameData.msg.lose }</p>
            <div>
                <ul>
                    <li>level: {gameData.name}</li>  
                    <li>time: {gameData.time}</li>                          
                </ul>
            </div>
            <button onClick={()=>onClickEvent()()} id='resetClick'>Reset</button>
        </div>
    )
}

export default Floating;