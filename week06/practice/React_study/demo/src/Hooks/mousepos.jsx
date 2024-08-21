import { useEffect, useState } from 'react'

export default function useMousepos() {
    const [pos,setPos] = useState({
        x:0,
        y:0,
    })
    useEffect( () => {
        const move = (e) => {
            const { clientX, clientY } = e;
            setPos({
                x : clientX,
                y : clientY,
            })
        }
        document.addEventListener('mousemove', move)
        
        return () => {
            document.removeEventListener('mousemove', move)
        }
        
    },[])
  return pos
}