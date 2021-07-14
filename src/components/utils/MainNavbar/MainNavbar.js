import React from 'react';
import { FaUserAlt } from 'react-icons/fa'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';

import './MainNavbar.css'
import { NAVBAR } from './MainNavbarConsts';

function MainNavbar(props) {
  return (
    <Navbar className="nav-container" expand="lg" collapseOnSelect>
      <Navbar.Brand className="nav-title-container">
        <img
          className="nav-img"
          src={`${process.env.REACT_APP_FILE_ROOT}/images/LogoPAP_ArbolesITESOBlanco.svg`}
          alt=""
        />
        { NAVBAR.AITESO_TITLE }
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="nav-items-collapse" />
      <Navbar.Collapse className="justify-content-end" id="nav-items-collapse">
        <Nav.Item className="nav-item">
          <Link to="/home" className="nav-text">{ NAVBAR.HOME }</Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          <Link to="/about" className="nav-text">{ NAVBAR.ABOUT }</Link>
        </Nav.Item>
        <Nav.Item className="nav-item">
          { props.user ? (
            <Link to="/admin" className="nav-text"><FaUserAlt size={20}/></Link>
          ) : (
            <Link to="/login" className="nav-text">{ NAVBAR.INICIAR_SESION }</Link>
          )}
        </Nav.Item>
      </Navbar.Collapse>
    </Navbar>
  )
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
      user,
      users
  };
}

const connectMainNavbar = connect(mapStateToProps)(MainNavbar);
export { connectMainNavbar as MainNavbar }
