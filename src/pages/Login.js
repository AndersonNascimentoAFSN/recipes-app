import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
// import loginPageBanner from '../images/loginPageImg.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [button, setButton] = useState(true);

  function validarEmail(receivedEmail, receivedPassword) {
    const passwordSize = 6;
    const re = /\S+@\S+\.\S+/;
    if (re.test(receivedEmail) && receivedPassword.length >= passwordSize) {
      setButton(false);
    }
  }
  function handleChangeEmail({ target }) {
    setEmail(target.value);
  }

  function handleChangePassword({ target }) {
    setPassword(target.value);
    validarEmail(email, password);
  }
  function handleSubmit() {
    const user = { email };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }

  return (
    <div className="loginPage__container">
      {/* <img
        src={ loginPageBanner }
        alt="login img"
        className="loginPage__banner"
      /> */}
      <div className="loginPage__inputs">
        <input
          name="email"
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ handleChangeEmail }
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChangePassword }
          placeholder="Senha"
        />

        <Link
          to="/comidas"
          className="loginPage__button"
        >
          <button
            data-testid="login-submit-btn"
            onClick={ handleSubmit }
            disabled={ button }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
