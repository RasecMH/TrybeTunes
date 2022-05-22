import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumResults from '../components/AlbumResults';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputSearch: '',
    isLoading: false,
    hasSearch: false,
    searchResult: [],
    artist: '',
  }

  handleClick = async () => {
    const { inputSearch } = this.state;
    this.setState({ isLoading: true, artist: inputSearch });
    const artistAbuns = await searchAlbumsAPI(inputSearch);
    this.setState({ inputSearch: '',
      isLoading: false,
      hasSearch: true,
      searchResult: [artistAbuns] });
  }

  render() {
    const { inputSearch, isLoading, hasSearch, artist, searchResult } = this.state;
    const minLength = 2;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading />
          : (
            <form action="">
              <input
                type="text"
                value={ inputSearch }
                onChange={ (e) => this.setState({ inputSearch: e.target.value }) }
                data-testid="search-artist-input"
              />
              <button
                type="button"
                disabled={ inputSearch.length < minLength }
                onClick={ this.handleClick }
                data-testid="search-artist-button"
              >
                Pesquisar

              </button>
            </form>
          )}
        {hasSearch && <AlbumResults
          searchResult={ searchResult }
          searchInput={ artist }
        />}
      </div>
    );
  }
}

export default Search;
