import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    loading: false,
  }

  handleChange = (e) => {
    const { value, id } = e.target;
    this.setState({ [id]: value });
  }

   handleClick = async () => {
     const { userName } = this.state;
     const { history } = this.props;
     this.setState({ loading: true });
     await createUser({ name: userName });
     history.push('/search');
   }

   render() {
     const { userName, loading } = this.state;
     const minValueInput = 3;
     if (loading) {
       return (
         <Loading />
       );
     }
     return (
       <div data-testid="page-login">
         <label htmlFor="userNameInput">
           Username:
           <input
             type="text"
             id="userName"
             value={ userName }
             onChange={ this.handleChange }
             data-testid="login-name-input"
           />
         </label>
         <button
           type="button"
           id="isButtonDisable"
           disabled={ userName.length < minValueInput }
           onClick={ this.handleClick }
           data-testid="login-submit-button"
         >
           Entrar
         </button>
       </div>
     );
   }
}

Login.propTypes = {
  history: PropTypes.bool.isRequired,
};

export default Login;
