import React from 'react';
import { Link } from 'react-router-dom'

import './Home.css';
import { HOME } from './HomeConsts'
import { MainNavbar } from '../utils';

export function Home() {
  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 description-container">
            <h3>{ HOME.TITLE }</h3>
            <div className="home-card">
              <h4>
                { HOME.DSC_WHAT_IS }
              </h4>
              <p>
                { HOME.DSC_TEXT } 
              </p>
            </div>
            <h3 className="search-title">{ HOME.START_SEARCH_EX }</h3>
          </div>
        </div>
          <div className="row">
            <div className="col-md-6 search-op-container">
              <h3>{ HOME.NUMBER_TITLE }</h3>
              <div className="home-card">
                <h4>{ HOME.DESCRIPTON }</h4>
                <p>
                  { HOME.NUMBER_DESC } 
                </p>
                <Link to="/NID" className="landpage-btn-link">
                  <button type="button" className="btn search-btn">
                    { HOME.START_SEARCH }
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 search-op-container">
                <h3>{ HOME.SPECIES_TITLE }</h3>
                <div className="home-card">
                    <h4>{ HOME.DESCRIPTION }</h4>
                    <p>
                      { HOME.SPECIES_DESC } 
                    </p>
                    <Link to="/especies" className="landpage-btn-link">
                      <button type="button" className="btn search-btn">
                        { HOME.START_SEARCH }
                      </button>
                    </Link>
                </div>
            </div>
          </div>
      </div>
    </>
  )
}
