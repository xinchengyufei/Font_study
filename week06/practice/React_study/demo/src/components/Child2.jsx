import React from 'react'

export default function Child2({name, price, info, handleClick}) {
  return (
    <div>
      <h3>名字：{ name }</h3>
      <p>价格：{ price }</p>
      <p>{ info }</p>
      <button onClick={() => handleClick(1)}>砍价(-1)</button>
    </div>
  )
}