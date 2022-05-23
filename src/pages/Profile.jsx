import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  state = {
    loading: false,
    userData: {},
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const getUserData = await getUser();
    this.setState({ userData: getUserData, loading: false });
  }

  render() {
    const { loading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <img
              src={ userData.image }
              alt={ userData.image }
              data-testid="profile-image"
            />
            <p>{userData.name}</p>
            <p>{userData.email}</p>
            <p>{userData.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
