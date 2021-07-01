import React from 'react';
// import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderSearchBarContext from '../utils/renderSearchBarContext';
import RecipesFoods from '../pages/RecipesFoods';
import App from '../App';
// import renderWithRouter from '../utils/renderWithRouter';

describe('Testa o componente header na tela de comidas', () => {
  it('Verifica se header é renderizado corretamente na tela de comidas', () => {
    const providerProps = { value: { searchBarShowHiden: false } };
    const { getByRole } = renderSearchBarContext(
      <BrowserRouter>
        <RecipesFoods />
      </BrowserRouter>,
      { providerProps },
    );

    const profileIcon = getByRole('img', {
      name: /profile icon/i,
    });
    expect(profileIcon).toBeInTheDocument();

    const exploreIcon = getByRole('img', {
      name: /explore icon/i,
    });
    expect(exploreIcon).toBeInTheDocument();

    const titleFoods = getByRole('heading', {
      name: /comidas/i,
    });
    expect(titleFoods).toBeInTheDocument();
  });

  it(`Verifica se o link no header na tela de comidas redireciona
   para a página de perfil`, () => {
    const providerProps = { value: { searchBarShowHiden: false } };
    const { getByRole, getByTestId } = renderSearchBarContext(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      { providerProps },
    );

    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    userEvent.type(inputEmail, 'email@com.br');
    userEvent.type(inputPassword, '1234567');

    const button = getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(button);

    const profileIcon = getByRole('img', {
      name: /profile icon/i,
    });
    userEvent.click(profileIcon);
    const profileTitle = getByRole('heading', {
      name: /perfil/i,
    });
    expect(profileTitle).toBeInTheDocument();
  });

  it('Verifica se ao clicar no icon de busca abre a barra de busca ', () => {

  });
});

// describe('Testa o header na tela de bebidas', () => {
//   it('Verifica se header é renderizado corretamente na tela de bebidas', () => {

//   });
// });
