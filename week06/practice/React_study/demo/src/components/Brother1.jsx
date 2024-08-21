import React from 'react'

export default function Brother1({ upDownBoold }) {
  return (
    <div>
        <button onClick={() => upDownBoold(2)}>点击(+2)</button>
        <button onClick={() => upDownBoold(-3)}>点击(-3)</button>
    </div>
  )
}
