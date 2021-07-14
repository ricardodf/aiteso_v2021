import React from 'react'
import { Link } from 'react-router-dom'

import './Welcome.css'

export function Welcome() {
  return (
    <div className="wlm-container">
      <Link to="/home">
        <img 
          className="wlm__img"
          src={`${process.env.REACT_APP_FILE_ROOT}/images/LogoPAP_ArbolesITESO.svg`}
          alt=""
        />
      </Link>
    </div>
  )
}
