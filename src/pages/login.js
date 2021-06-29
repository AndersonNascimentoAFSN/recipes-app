import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      button: true,
    };
    this.validarEmail = this.validarEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validarEmail();
  }

  validarEmail() {
    const { email, password } = this.state;
    const passwordSize = 5;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) && password.length >= passwordSize) {
      this.setState({
        button: false,
      });
    }
  }

  render() {
    const { email, password, button } = this.state;
    return (
      <div>
        Login
        <div>
          <input
            name="email"
            type="text"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            name="password"
            type="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            disabled={ button }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}
export default Login;
