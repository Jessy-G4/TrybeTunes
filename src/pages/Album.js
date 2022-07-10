import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      resultados: [],
      carregando: false,
    };
  }

  async componentDidMount() {
    this.setState({ carregando: true });
    await this.getInformations();
    this.setState({ carregando: false });
  }

getInformations = async () => {
  const { match: { params: { id } } } = this.props;
  const localizarMusicas = await getMusics(id);
  this.setState({ resultados: localizarMusicas });
}

render() {
  const { carregando, resultados } = this.state;
  return (

    <div data-testid="page-album" onLoad={ this.getInformations }>
      <Header />
      {carregando && <Carregando />}
      <h1>{resultados[0].artistName}</h1>
    </div>

  );
}
}

Album.propTypes = {
  match: PropTypes.object }.isRequired;
export default Album;
