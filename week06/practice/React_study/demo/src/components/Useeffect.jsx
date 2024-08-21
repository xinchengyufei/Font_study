import React, { useEffect, useState } from 'react'

export default function Useeffect() {
    const [count, setCount] = useState(10)
    // const [age, setAge] = useState(18)

    useEffect(() => {
        
        const timer = setInterval( () => {
            setCount(count => count - 1)
            console.log(111);
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div>
        <p>{count}</p>
        </div>
    )
}
