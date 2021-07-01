import Style from '../Style.module.css';

const block = ({onClickEvent, children, coords}) => {
    return (
        <div className={Style.block + ' '+  Style.activeBlock} onClick={onClickEvent} data-coords={coords}>
            {children}
        </div>
    )
}

export default block;