import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Home</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
