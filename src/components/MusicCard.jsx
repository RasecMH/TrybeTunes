import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { albumList } = this.props;
    return (
      albumList.map((song) => (
        <div key={ song.trackId }>
          <span>{song.trackName}</span>
          <audio data-testid="audio-component" src={ song.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
      ))
    );
  }
}

MusicCard.propTypes = {
  albumList: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
