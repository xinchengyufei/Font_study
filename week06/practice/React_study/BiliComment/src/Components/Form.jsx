import React, { useState } from 'react'
import avatar from '../../public/vite.svg'

export default function Form({ addItem }) {
    const [content, setContent] = useState("")

    const addComment = () => {
        if(!content.trim()){
            return alert("评论不能为空")
        }
        addItem(content)
        setContent("")
    }

    return (
        <div>
        <div className="comment-send">
            <div className="user-face"><img className="user-head" src={ avatar } alt="" /></div>
            <div className="textarea-container">
                <textarea cols="80" rows="5" placeholder="发条友善的评论" value={content} className="ipt-txt" onChange={(e) => setContent(e.target.value)}></textarea>
                <button className="comment-submit" onClick={addComment}>发表评论</button>
            </div>
            <div className="comment-emoji"><i className="face"></i><span className="text">表情</span></div>
            </div>
        </div>
    )
}
