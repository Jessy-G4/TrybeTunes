import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { resultados, artista } = this.props;
    return (
      <div>
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

MusicCard.propTypes = {
  resultados: PropTypes.object,
  artista: PropTypes.object }.isRequired;
export default MusicCard;
