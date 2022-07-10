import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      estaDesabilitado: true,
      resultados: [],
      clicado: false,
      carregando: false,
      artista: '',
    };
  }

desabilitar = () => {
  const { busca } = this.state;
  if (busca.length > 1) {
    return this.setState({ estaDesabilitado: false });
  } return this.setState({ estaDesabilitado: true });
}

handleChange = (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value }, () => this.desabilitar());
};

handleClick = async () => {
  this.setState({ carregando: true });
  const { busca } = this.state;
  const resultado = await searchAlbumsAPI(busca);
  this.setState({ clicado: true }, () => this.limpar());
  this.setState({ resultados: resultado });
  this.setState({ carregando: false });
};

limpar = () => {
  const { busca } = this.state;
  this.setState({ artista: busca });
  this.setState({ busca: '' });
}

render() {
  const { estaDesabilitado,
    busca,
    resultados, clicado,
    carregando,
    artista,
  } = this.state;
  return (

    <div data-testid="page-search">
      <Header />
      <input
        type="text"
        data-testid="search-artist-input"
        name="busca"
        onChange={ this.handleChange }
        value={ busca }
      />
      <button
        type="submit"
        disabled={ estaDesabilitado }
        data-testid="search-artist-button"
        onClick={ this.handleClick }
      >
        Pesquisar

      </button>
      {carregando && <Carregando />}
      {clicado && <p>{`Resultado de álbuns de: ${artista}`}</p>}
      {resultados.length > 1 ? resultados.map((albums) => (
        <ul
          key={ albums.collectionId }
        >
          <img src={ albums.artworkUrl100 } alt={ albums.collectionName } />
          <li>{albums.collectionName}</li>
          <li>{albums.artistName}</li>
          <li>{albums.collectionPrice}</li>
          <Link
            to={ `/album/${albums.collectionId}` }
            data-testid={ `link-to-album-${albums.collectionId}` }
          >
            Saiba Mais

          </Link>
        </ul>))
        : <p>Nenhum álbum foi encontrado</p>}
    </div>
  );
}
}

export default Search;
