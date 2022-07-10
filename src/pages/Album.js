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
          return (
            <div key={ info.trackName }>
              <p>{info.trackName}</p>
              <audio data-testid="audio-component" src={ info.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>);
        } return undefined;
      })}
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.object }.isRequired;
export default Album;
