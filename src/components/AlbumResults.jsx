import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumResults extends React.Component {
  render() {
    const { searchResult, searchInput } = this.props;
    return (
      searchResult[0].length !== 0 ? (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            {searchInput}
          </h2>
          {searchResult[0].map((result) => (
            <div key={ result.artistId }>
              <p>{result.artistName}</p>
              <p>{result.collectionName}</p>
              <img src={ result.artworkUrl100 } alt="" />
              <Link
                to={ `/album/${result.collectionId}` }
                data-testid={ `link-to-album-${result.collectionId}` }
              >
                Ver Album

              </Link>
            </div>
          ))}
        </div>
      )
        : <p>Nenhum álbum foi encontrado</p>
    );
  }
}

AlbumResults.propTypes = {
  searchResult: PropTypes.arrayOf.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default AlbumResults;
