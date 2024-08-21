import React from 'react'
import vite from '../../public/vite.svg' 
import useMousepos from '../Hooks/mousepos'
 
export default function Mousemove() {
    const pos = useMousepos()
    return (
        <div>
        <img src={vite} style={ { position:"absolute", left: pos.x, top: pos.y } }></img>
        </div>
    )
}