import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      estaDesabilitado: true,
      resultados: [],
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
  const { busca } = this.state;
  const resultado = await searchAlbumsAPI(busca);
  this.setState({ busca: '' });
  this.setState({ resultados: resultado });
};

render() {
  const { estaDesabilitado, busca, resultados } = this.state;
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
      {resultados.length > 1 ? resultados.map((albums) => (
        <ul
          key={ albums.collectionId }
        >
          <img src={ albums.artworkUrl100 } alt={ albums.collectionName } />
          <li>{albums.collectionName}</li>
          <li>{albums.artistName}</li>
          <li>{albums.collectionPrice}</li>
        </ul>))
        : <p>Nenhum álbum foi encontrado</p>}
    </div>
  );
}
}

export default Search;
