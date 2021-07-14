import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';

import './Login.css'
import { history } from '../../helpers';
import { alertActions, userActions } from '../../actions';
import { MainNavbar } from '../utils';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());
        const { dispatch } = this.props;
        history.listen((location, action) => {
          dispatch(alertActions.clear());
        });
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        const { alert } = this.props;
        return (
          <>
            <MainNavbar />
            <div className="lg-container">
              <div className="lg-main">
                <div className="lg-hello">
                  Iniciar Sesión
                </div>
                <div className="lg-form">
                  {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                  }
                  <Form>
                    <Form.Group className="lg-group" controlId="formBasicEmail">
                      <Form.Label>Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                      {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </Form.Group>
                    <Form.Group className="lg-group" controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </Form.Group>
                    <div className="lg-btn-container">
                      <Button
                        className="lg-button"
                        variant="success"
                        onClick={this.handleSubmit}
                      >
                        Ingresar
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { loggingIn } = state.authentication;
    return {
      alert,
      loggingIn
    };
}

const connectLogin = connect(mapStateToProps)(Login);
export { connectLogin as Login}
