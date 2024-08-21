import React, { useState } from 'react'

export default function State() {
  // 初始化状态值为 0
  const [count, setCount] = useState(0)

  // 增加计数器
  const increment = () => {
    setCount(count + 1);
  }

  // 减少计数器
  const decrement = () => {
    setCount(count - 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}