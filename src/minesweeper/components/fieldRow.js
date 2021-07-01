import BlockItem from './block1';
import Style from '../Style.module.css';

const fieldRow = ({blockRows, tileOnclick}) => {


    return (
        <div className={Style.fieldRow}>
            {
                blockRows.map((i) => (
                    <BlockItem key={`blockitem${i.key}$`} children={i.key} onClickEvent={tileOnclick} coords={i.key}/>
                ))
            }
        </div>
    )
}

export default fieldRow;