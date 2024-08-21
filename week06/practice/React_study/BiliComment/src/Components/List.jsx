import React from 'react'

export default function List({list, delItem, changeAttitude}) {
    if(list.length < 0) {
        return <div style={{ textAlign: "center", color: "#ccc" }}>暂无更多评论~</div>
    }
    return (
        <div>
            <div className="comment-list">
                { list.map( (item) => (
                <div key={item.id} className="list-item">
                    <div className="user-face"><img className="user-head" src={ item.img } alt="" /></div>
                    <div className="comment">
                    <div className="user">{ item.author }</div>
                    <p className="text">{ item.comment }</p>
                    <div className="info">
                        <span className="time">{ item.time }</span>
                        <span className={`like ${ item.attitude === 1? "liked" : ""}`} onClick={() => changeAttitude(item.id, item.attitude === 1 ? 0 : 1)}>
                        <i className="icon"></i>
                        </span>
                        <span className={`hate ${ item.attitude === -1? "hated" : ""}`} onClick={() => changeAttitude(item.id, item.attitude === -1 ? 0 : -1)}>
                        <i className="icon"></i>
                        </span>
                        <span className="reply btn-hover" onClick={() => delItem(item.id)}>
                        删除
                        </span>
                    </div>
                    </div>
                </div>
                ) ) }
            </div> 
        </div>
    )
}
