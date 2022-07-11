import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
    };
  }

    handleClick = async () => {
      this.setState({ carregando: true });
      const { resultados } = this.props;
      await addSong(resultados);
      this.setState({ carregando: false });
    }

    render() {
      const { resultados, artista } = this.props;
      const { carregando } = this.state;
      return (
        <div>
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
                  <label
                    htmlFor={ info.trackName }
                    data-testid={ `checkbox-music-${info.trackId}` }
                  >
                    favorita
                    <input
                      type="checkbox"
                      id={ info.trackName }
                      onClick={ this.handleClick }
                    />
                  </label>

                </div>);
            } return undefined;
          })}
        </div>
      );
    }
}

MusicCard.propTypes = {
  resultados: PropTypes.object,
  artista: PropTypes.object }.isRequired;
export default MusicCard;
