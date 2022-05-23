import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isButtonDisable: true,
    loading: false,
  }

  async componentDidMount() {
    const getUserData = await getUser();
    this.setState({ name: getUserData.name,
      email: getUserData.email,
      image: getUserData.image,
      description: getUserData.description }, this.validateButton);
  }

  handleTextChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value }, this.validateButton);
  }

  validateButton = () => {
    const { name, email, image, description } = this.state;
    if (name.length > 0
      && email.length > 0
      && image.length > 0
      && description.length > 0
      && email.length > 0
      && email.includes('@')) {
      this.setState({ isButtonDisable: false });
    } else {
      this.setState({ isButtonDisable: true });
    }
  }

  handleButtonClick = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    this.setState({ loading: true });
    await updateUser({ name,
      email,
      image,
      description });
    history.push('/profile');
  }

  render() {
    const { name, email, image, description, isButtonDisable, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <input
              type="text"
              id="name"
              value={ name }
              onChange={ this.handleTextChange }
              data-testid="edit-input-name"
              placeholder="Nome"
            />
            <input
              type="email"
              id="email"
              value={ email }
              onChange={ this.handleTextChange }
              data-testid="edit-input-email"
              placeholder="Email"
            />
            <input
              type="text"
              id="description"
              value={ description }
              onChange={ this.handleTextChange }
              data-testid="edit-input-description"
              placeholder="Descrição"
            />
            <input
              type="text"
              id="image"
              value={ image }
              onChange={ this.handleTextChange }
              data-testid="edit-input-image"
              placeholder="Imagem"
            />
            <button
              type="button"
              disabled={ isButtonDisable }
              onClick={ this.handleButtonClick }
              data-testid="edit-button-save"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.bool.isRequired,
};

export default ProfileEdit;
