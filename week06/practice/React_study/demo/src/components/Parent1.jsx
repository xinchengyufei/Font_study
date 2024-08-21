import React, { useState } from 'react'
import Child2 from './Child2'

export default function Parent1() {
    const [state,setState] = useState({
        list:[
            {
              id: 1,
              name: "超级好吃的棒棒糖",
              price: 18.8,
              info: "开业大酬宾，全场8折",
            },
            {
              id: 2,
              name: "超级好吃的大鸡腿",
              price: 34.2,
              info: "开业大酬宾，全场8折",
            },
            {
              id: 3,
              name: "超级无敌的冰激凌",
              price: 14.2,
              info: "开业大酬宾，全场8折",
            },
        ],
        age : 18,
    })
    const handleClick = (id, downPrice) => {
        setState({
            ...state,
            list : state.list.map((item) => {
                if(item.id === id){
                    let newprice = (item.price - downPrice).toFixed(2)
                    if(newprice < 0) {
                        newprice = 0
                    }
                    item.price = newprice
                } 
                return { ...item }
            }),
        })
    }
    return (
        <>
            <ul>
                { state.list.map( (item) => (
                    <Child2 
                        key={ item.id } 
                        { ...item } 
                        handleClick={ (price) => handleClick(item.id,price) }
                    />
                ))
                }
            </ul>
            <div>age: {state.age}</div>
        </>
    )
}