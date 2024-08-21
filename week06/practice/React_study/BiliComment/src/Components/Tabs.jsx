import React from 'react'

export default function Tabs({tabs, active, changeTabs}) {
  return (
    <div>
      <div className="tabs-order">
          <ul className="sort-container">
            { tabs.map( (item) => (
              <li key={ item.id } onClick={ () => changeTabs(item) } className={ item.type === active ? 'on' : ''}>
                按{item.name }排序
              </li>
            ) ) }
          </ul>
        </div>
    </div>
  )
}