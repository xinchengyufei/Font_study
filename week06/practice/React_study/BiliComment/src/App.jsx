import React, { useState } from 'react'
import Tabs from './Components/Tabs'
import Form from './Components/Form'
import List from './Components/List'
import './css/index.css'

export default function App() {
  const [state,setState] = useState({
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: "热度",
        type: "hot",
      },
      {
        id: 2,
        name: "时间",
        type: "time",
      },
    ],
    active: "time",
    list: [
      {
        id: 1,
        author: "刘德华",
        comment: "给我一杯忘情水",
        time: "2021-11-10 09:09:00",
        img: "https://y.qq.com/music/photo_new/T001R300x300M000003aQYLo2x8izP.jpg?max_age=2592000",
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1,
      },
      {
        id: 2,
        author: "周杰伦",
        comment: "听妈妈的话",
        time: "2021-12-11 09:09:00",
        img: "https://y.qq.com/music/photo_new/T001R500x500M0000025NhlN2yWrP4.jpg?max_age=2592000",
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0,
      },
      {
        id: 3,
        author: "陈奕迅",
        comment: "十年",
        time: "2021-10-11 10:09:00",
        img: "https://y.qq.com/music/photo_new/T001R500x500M000003Nz2So3XXYek.jpg?max_age=2592000",
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1,
      },
    ],
  })

  const changeTabs = (item) => {
    setState({
      ...state,
      active : item.type,
    })
  }

  const delItem = (id) => {
    setState({
      ...state,
      list : state.list.filter((item) => item.id != id),
    })
  }

  const addItem = (content) => {
    const newContent = {
      id: Date.now(),
      author: "作者",
      comment: content,
      time: Date.now(),
      attitude: 0,
    }
    setState({
      ...state,
      list: [newContent, ...state.list],
    })
  }

  const changeAttitude = (id, attitude) => {
    setState({
      ...state,
      list : state.list.map( (item) => {
        if ( item.id === id ){
          item.attitude = attitude
        }
        return item
      }),
    })
  }

  return (
    <div className="App">
      <div className="comment-container">
        <div className="comment-head"><span>{ state.list.length } 评论</span></div>
        <Tabs tabs={state.tabs} active={state.active} changeTabs={changeTabs}></Tabs>
        <Form addItem={addItem}></Form>
        <List list={state.list} delItem={delItem} changeAttitude={changeAttitude}></List>
      </div>
    </div>
  ) 
}