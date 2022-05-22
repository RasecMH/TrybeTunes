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

  async componentDidMount() {
    await this.getAlbumList();
  }

  getAlbumList = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const getAlbumListVar = await getMusics(id);
    const filteredSongs = getAlbumListVar.filter((song) => song.kind === 'song');
    this.setState({ albumList: filteredSongs,
      headerAlbum: getAlbumListVar[0].collectionName,
      headerBand: getAlbumListVar[0].artistName });
  };

  render() {
    const { albumList, headerAlbum, headerBand } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{headerBand}</p>
          <p data-testid="album-name">{headerAlbum}</p>
          <div>
            {
              albumList.map((song) => (
                <MusicCard
                  key={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf.isRequired,
};

export default Album;
