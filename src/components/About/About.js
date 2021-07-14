import React from 'react';

import './About.css'
import { MainNavbar } from '../utils';
import { ABOUT } from './AboutConsts'

export const About = () => {
  return (
    <>
      <MainNavbar />
      <div className="container">
        <div className="row about-container">
          <h3>{ ABOUT.ARBOLES } <span>{ ABOUT.ITESO }</span></h3>
          <div className="col-lg-7">
            <div id="what">
              <h4>{ ABOUT.WHAT_IS }</h4>
              <div className="about-card">
                <p>
                    { ABOUT.WHAT_TEXT } 
                </p>
              </div>
            </div>
            <div id="mision">
              <h4>{ ABOUT.MISION }</h4>
              <div className="about-card">
                <p dangerouslySetInnerHTML={{__html: ABOUT.JUST_TEXT}}>
                </p>
              </div>
            </div>
            <div id="vision">
              <h4>{ ABOUT.VISION }</h4>
              <div className="about-card">
                <p dangerouslySetInnerHTML={{__html: ABOUT.ANT_TEXT}}> 
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div id="students">
              <h4>{ ABOUT.ESTUDIANTES }</h4>
              <div className="about-card" dangerouslySetInnerHTML={{__html: ABOUT.STUDENTS}}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
