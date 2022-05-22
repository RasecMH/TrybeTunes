import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Favorites extends React.Component {
  state = {
    albumList: [],
    loading: false,
    favoriteList: [],
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const recoverFavorites = await getFavoriteSongs();
    this.setState({ favoriteList: recoverFavorites,
      albumList: recoverFavorites,
      loading: false });
  }

  getAlbumList = async (id) => {
    const getAlbumListVar = await getMusics(id);
    this.setState((prevState) => (
      { albumList: [...prevState.albumList, getAlbumListVar[0]] }));
  };

  addFavoriteSong = async (e) => {
    const { name, checked } = e.target;
    const { albumList } = this.state;
    const selectedFavorite = albumList.find((song) => song.trackName === name);

    if (!checked) {
      this.setState({ loading: true });
      await removeSong(selectedFavorite);
      const recoverFavoritesClick = await getFavoriteSongs();
      this.setState({ favoriteList: recoverFavoritesClick,
        albumList: recoverFavoritesClick,
        loading: false });
    }
  }

  render() {
    const { albumList, loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
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

export default Favorites;
