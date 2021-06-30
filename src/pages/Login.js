import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <div>
        <input
          name="email"
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ handleChangeEmail }
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChangePassword }
        />
      </div>
      <Link to="/comidas">
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
  );
}

export default Login;
