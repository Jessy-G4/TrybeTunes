import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      favoritas: [],
      checado: false,
    };
  }

  componentDidMount() {
    this.onLoad();
  }

    handleClick = async (event) => {
      const { name, checked } = event.target;
      this.setState({
        carregando: true,
        [name]: checked,
      });
      const { results } = this.props;
      await addSong(results);
      this.setState({ carregando: false });
    }

    onLoad = async () => {
      const result = await getFavoriteSongs();
      this.setState({ favoritas: result }, () => {
        const { favoritas } = this.state;
        const { id } = this.props;
        const isFavorite = favoritas.some((music) => id === music.trackId);
        this.setState({ checado: isFavorite });
      });
    }

    render() {
      const { nomeDaMusica, id, preview } = this.props;
      const { carregando, checado } = this.state;
      return (
        <div>
          {carregando && <Carregando />}
          <div>
            <p>{nomeDaMusica}</p>
            <audio data-testid="audio-component" src={ preview } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ nomeDaMusica }
              data-testid={ `checkbox-music-${id}` }
            >
              favorita
              <input
                type="checkbox"
                id={ nomeDaMusica }
                onClick={ this.handleClick }
                checked={ checado }
                name="checado"
              />
            </label>

          </div>
        </div>
      );
    }
}

MusicCard.propTypes = {
  resultados: PropTypes.object,
  artista: PropTypes.object }.isRequired;
export default MusicCard;
