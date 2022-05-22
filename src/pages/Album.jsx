import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    albumList: [],
    headerBand: '',
    headerAlbum: '',
  }

  render() {
    const { albumList, headerAlbum, headerBand } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const getAlbumList = async () => {
      const getAlbumListVar = await getMusics(id);
      this.setState({ albumList: getAlbumListVar,
        headerAlbum: getAlbumListVar[0].collectionName,
        headerBand: getAlbumListVar[0].artistName });
    };

    getAlbumList();

    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{headerBand}</p>
        <p data-testid="album-name">{headerAlbum}</p>
        <MusicCard albumList={ albumList } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
