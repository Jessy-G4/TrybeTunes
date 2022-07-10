import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      estaDesabilitado: true,
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

render() {
  const { estaDesabilitado } = this.state;
  return (

    <div data-testid="page-search">
      <Header />
      <input
        type="text"
        data-testid="search-artist-input"
        name="busca"
        onChange={ this.handleChange }
      />
      <button
        type="submit"
        disabled={ estaDesabilitado }
        data-testid="search-artist-button"
        // onClick={ this.handleClick }
      >
        Pesquisar

      </button>
    </div>
  );
}
}

export default Search;
