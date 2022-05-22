import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    userName: '',
  }

  async componentDidMount() {
    this.setState({ userName: 'Carregando...' });
    const userNameReturn = await getUser();
    this.setState({ userName: userNameReturn.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          <span data-testid="header-user-name">{userName}</span>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </header>
      </div>
    );
  }
}

export default Header;
