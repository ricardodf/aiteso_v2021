import React from 'react'

import './TaxonomySidebar.css'
import { SIDEBAR } from './TaxonomySidebasConsts'

const TaxonomySidebar = ({ handleTaxonomySelection, handleGardenSelectionShow, handleSelectionReset }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content btn-group" role="group">
        { SIDEBAR.CONTENT.map((val, key) => {
          return (
            <div key={key} className="dropdown">
              <button
                className="btn sidebar-btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                { val.label }
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                { val.content.map((inside_val, inside_key) => {
                  return  (
                    <li key={inside_key}>
                      <button 
                        className="dropdown-item sidebar-sub-item"
                        onClick={() => handleTaxonomySelection(inside_val)}
                      >
                        { inside_val }
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        <div key="reset" className="sidebar-jardin-row">
          <button 
            type="button" 
            className="btn sidebar-btn filt-reset-btn" 
            onClick={() => handleSelectionReset()}
          >
            { SIDEBAR.RESET_SELECTION }
          </button>
        </div>
        <div key="jardin" className="sidebar-jardin-row">
          <button 
            type="button" 
            className="btn sidebar-btn filt-jardin-btn" 
            onClick={() => handleGardenSelectionShow()}
          >
            { SIDEBAR.FILT_JARDIN }
          </button>
        </div>
    </div>
  </div>
  )
}

export default TaxonomySidebar
