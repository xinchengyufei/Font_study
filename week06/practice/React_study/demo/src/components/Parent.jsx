import React, { useState } from 'react'
import Child1 from './Child1'

export default function Parent() {
    const [salary] = useState(100)

    return (
        <div>
        Parent: { salary }
        <Child1 salary={ salary }></Child1>
        </div>
    )
}
