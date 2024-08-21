import React, { useState } from 'react'
// import Counter from './components/State'
// import Start from './components/Start'
// import Parent from './components/Parent'
// import Parent1 from './components/Parent1'
// import CommonParent from './components/CommonParent'
// import Useeffect from './Components/Useeffect'
// import Mousemove from './Components/Mousemove'
import TestStore from './Components/TestStore'
import { incremen, decremen } from './store/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function App() {
  // const [state,setState] = useState(true)
  const count = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div>
      {/* <Mousemove></Mousemove> */}
      {/* { state && <Useeffect></Useeffect>}
      <button onClick={() => setState(!state)}>销毁/创建倒计时</button>
        <CommonParent />
        <hr />
        <Counter />
        <hr />
        <Parent />
        <hr />
        <Parent1 />
        <hr />
        <Start /> */}
        <p>counter : { count } </p>
        <button onClick={ () => dispatch(incremen(1)) }>+1</button>
        <button onClick={ () => dispatch(decremen(2)) }>-2</button>
        <button onClick={ () => dispatch(decremen(5)) }>异步-5</button>

        <TestStore></TestStore>
    </div>
  )
}