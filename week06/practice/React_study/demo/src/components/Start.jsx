import React from 'react'
// import '../index.css'

export default function start() {
    let name = 'tom'
    let age = 13
    let car = {
        brand : "玛莎拉蒂",
        price : 1200000,
    }
    let arr = ["李婶", "王妈", "赵姨"]
    let hi = () => "hi"
    const list1 = [
        { id: 1, name: "华中科技大学", salary: 30000 },
        { id: 2, name: "武汉大学", salary: 28888 },
        { id: 3, name: "武汉理工大学", salary: 27000 },
    ]

    const r2 = list1.map((item) => (
        <li key={item.id}>
            <h3 className="title">学校: { item.name }</h3>
            <p>工资: { item.salary }</p>
        </li>
    ));

  return (
    <div className="wrap">
        <h1 className="title">Hello World</h1>
        <p>React</p>
        <p>姓名: { name }</p>
        <p>年龄: { age }</p>
        <p>车辆: { car.brand } , $ { car.price }</p>
        <p>管家: { arr }</p>
        <p>打招呼: { hi() }</p>
        <ul>{ r2 }</ul>
    </div>
  )
}