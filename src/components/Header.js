import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      nomeUsuario: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    this.setState({ carregando: true });
    const nome = await getUser();
    this.setState({
      nomeUsuario: nome.name,
      carregando: false,
    });
  }

  render() {
    const { carregando, nomeUsuario } = this.state;
    return (
      <header data-testid="header-component">
        {carregando && <Carregando />}
        <p data-testid="header-user-name">{nomeUsuario}</p>
      </header>
    );
  }
}

export default Header;
