import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Spinner } from 'react-bootstrap'

import './Admin.css'
import { AdminBitacora } from './AdminTables/AdminBitacora';
import { AdminHistory } from './AdminTables/AdminHistory';
import { AdminTrees } from './AdminTables/AdminTrees';
import { MainNavbar } from '../utils';
import { userActions } from '../../actions';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrees: null,
      allSpecies: null,
      allGardens: null,
      allBitacoras: null,
      allHistory: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
    Promise.all([
      fetch('http://papvidadigital-test.com/V2021API/api/arboles/inventario').then(res => res.json()),
      fetch('http://papvidadigital-test.com/V2021API/api/arboles/tiposArboles').then(res => res.json()),
      fetch('http://papvidadigital-test.com/V2021API/api/arboles/jardines').then(res => res.json()),
      fetch('http://papvidadigital-test.com/V2021API/api/arboles/bitacoraArboles').then(res => res.json()),
      fetch('http://papvidadigital-test.com/V2021API/api/arboles/historicoArboles').then(res => res.json()),
    ]).then(([allTrees, allSpecies, allGardens, allBitacoras, allHistory]) => {
      this.setState({ allTrees, allSpecies, allGardens, allBitacoras, allHistory, isLoaded: true })
    })
  }

  render() {
    const { allTrees, allSpecies, allGardens, allBitacoras, allHistory } = this.state;
    return (
      <div>
        <MainNavbar />
        <div className="adm-container">
          <div className="adm-header">
            <h4>Panel Administrativo</h4>
          </div>
          {this.state.isLoaded ? (
            <div className="adm-body">
              <Tabs defaultActiveKey="Trees" id="adm-tabs">
                <Tab eventKey="Trees" title="Árboles">
                  <AdminTrees allTrees={allTrees} allSpecies={allSpecies} allGardens={allGardens} />
                </Tab>
                <Tab eventKey="profile" title="Bitacora">
                  <AdminBitacora allBitacoras={allBitacoras} />
                </Tab>
                <Tab eventKey="contact" title="Registro Histórico">
                  <AdminHistory allHistory={allHistory} />
                </Tab>
              </Tabs>
            </div>
          ) : <Spinner animation="grow" />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectAdmin = connect(mapStateToProps)(Admin);
export { connectAdmin as Admin };
