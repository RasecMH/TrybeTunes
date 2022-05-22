import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, addFavoriteSong, favoriteList } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackName }>
          Favorita
          <input
            type="checkbox"
            name={ trackName }
            id={ trackId }
            onChange={ addFavoriteSong }
            checked={ favoriteList.some((song) => song.trackId === trackId) }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  addFavoriteSong: PropTypes.func.isRequired,
  favoriteList: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
