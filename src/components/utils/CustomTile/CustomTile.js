import React from 'react'
import { Link } from 'react-router-dom'

import './CustomTile.css'

export const CustomTile = ({ color, id, imgSrc, label, link }) => {
  const addDefaultSrc = (e) => {
    e.preventDefault();
    e.target.src = "https://picsum.photos/id/10/120"
  }

  return (
    <Link to={link}>
      <div className="tile-container">
        <div className="tile" style={{backgroundColor: color}}>
          <img src={imgSrc} onError={addDefaultSrc} alt=""/>
          <p>{ id }</p>
          <p>{ label }</p>
        </div>
      </div>
    </Link>
  )
}
