import React from 'react'

const Timer = React.forwardRef(
    ( { time}, ref
    ) => {
    return (
        <div>
            <span ref={ref}>{time}</span>
        </div>
    )
});

export default Timer;