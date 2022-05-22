import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    albumList: [],
    headerBand: '',
    headerAlbum: '',
    loading: false,
    favoriteList: [],
  }

  async componentDidMount() {
    await this.getAlbumList();
    this.setState({ loading: true });
    const recoverFavorites = await getFavoriteSongs();
    this.setState({ favoriteList: recoverFavorites, loading: false });
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

  addFavoriteSong = async (e) => {
    const { name, checked } = e.target;
    const { albumList } = this.state;
    const selectedFavorite = albumList.find((song) => song.trackName === name);
    if (checked) {
      this.setState({ loading: true });
      await addSong(selectedFavorite);
      this.setState((prevState) => ({ loading: false,
        favoriteList: [...prevState.favoriteList, selectedFavorite] }));
    }

    if (!checked) {
      this.setState({ loading: true });
      await removeSong(selectedFavorite);
      const recoverFavoritesClick = await getFavoriteSongs();
      this.setState({ favoriteList: recoverFavoritesClick, loading: false });
    }
  }

  render() {
    const { albumList, headerAlbum, headerBand, loading, favoriteList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <p data-testid="artist-name">{headerBand}</p>
          <p data-testid="album-name">{headerAlbum}</p>
          <div>
            {loading ? <Loading /> : (
              <div>
                {albumList.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    trackId={ song.trackId }
                    favoriteList={ favoriteList }
                    addFavoriteSong={ this.addFavoriteSong }
                  />
                ))}
              </div>
            )}
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
