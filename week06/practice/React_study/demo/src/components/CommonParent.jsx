import React, { useState } from 'react'
import Brother1 from './Brother1'
import Brother2 from './Brother2'

export default function CommonParent() {
    const [state,setState] = useState(100)

    // 加减血
    let upDownBoold = (blood) => {
        setState(state + blood)
    }

    return (
        <div>
            <Brother2 blood={state}></Brother2>
            <br></br>
            <Brother1 upDownBoold={upDownBoold}></Brother1>
            <hr></hr>
        </div>
    )
}
