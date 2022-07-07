import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      desabilitar: true,
      carregando: false,
    };
  }

  desabilitar = () => {
    const { usuario } = this.state;
    const tres = 3;
    if (usuario.length < tres) {
      return this.setState({ desabilitar: true });
    } return this.setState({ desabilitar: false });
  }

  handleChange = (evento) => {
    const { name, type, checked, value } = evento.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value },
      () => this.desabilitar());
  }

  returnSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  handleClick = async () => {
    const { usuario } = this.state;
    this.setState({ carregando: true });
    await createUser({ name: usuario });
    this.setState({ carregando: false }, () => this.returnSearch());
  }

  render() {
    const { desabilitar, carregando } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="text"
          name="usuario"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={ this.handleClick }
          disabled={ desabilitar }
        >
          Entrar

        </button>
        { carregando && <Carregando /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object }.isRequired;

export default Login;
