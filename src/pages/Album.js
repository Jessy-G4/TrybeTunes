import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/Carregando';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      resultados: [],
      carregando: false,
      artista: '',
    };
  }

  componentDidMount() {
    this.setState({ carregando: true });
    this.getInformations();
    this.setState({ carregando: false });
  }

getInformations = async () => {
  const { match: { params: { id } } } = this.props;
  const localizarMusicas = await getMusics(id);
  this.setState({ resultados: [...localizarMusicas] }, () => {
    this.setState({ artista: localizarMusicas[0] });
  });
}

render() {
  const { carregando, resultados, artista } = this.state;
  return (

    <div data-testid="page-album" onLoad={ this.getInformations }>
      <Header />
      {carregando && <Carregando />}
      <h2 data-testid="artist-name">{artista.artistName}</h2>
      <h3 data-testid="album-name">{artista.collectionName}</h3>
      {resultados.map((info, index) => {
        if (index > 0) {
          return (<MusicCard
            key={ info.trackName }
            nomeDaMusica={ info.trackName }
            id={ info.trackId }
            preview={ info.previewUrl }
          />);
        } return undefined;
      })}
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.object }.isRequired;
export default Album;
