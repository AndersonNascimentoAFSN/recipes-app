import React from 'react';
import userEvent from '@testing-library/user-event';
import RecipesFoods from '../pages/RecipesFoods';
import RecipesDrinks from '../pages/RecipesDrinks';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import ExploreFoods from '../pages/ExploreFoods';
import App from '../App';
import { render } from '../utils/custom-render';
import history from '../utils/history';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreIngredientsFood from '../pages/ExploreIngredientsFood';
import ExploreIngredientsDrinks from '../pages/ExploreIngredientsDrinks';
import ExploreAreaFood from '../pages/ExploreAreaFood';
import ExploreAreaDrinks from '../pages/ExploreAreaDrinks';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesFoodsDetails from '../pages/RecipesFoodsDetails';
import RecipesDrinksDetails from '../pages/RecipesDrinksDetails';
import RecipesFoodsInProgress from '../pages/RecipesFoodsInProgress';
import RecipesDrinksInProgress from '../pages/RecipesDrinksInProgress';

describe('Testa o componente headers', () => {
  beforeEach(() => {
    history.push('/');
    history.entries = [];
  });

  afterEach(() => {
    history.push('/');
    history.entries = [];
  });

  const hasHeader = (title, renderPage, withSearchButton = true) => {
    const { getByRole } = render(
      renderPage,
    );
    const profileIcon = getByRole('img', {
      name: /profile icon/i,
    });
    expect(profileIcon).toBeInTheDocument();

    expect(getByRole('heading', {
      name: new RegExp(title, 'i'),
    })).toBeInTheDocument();

    if (withSearchButton) {
      const exploreIcon = getByRole('img', {
        name: /explore icon/i,
      });
      expect(exploreIcon).toBeInTheDocument();
    }
  };

  const hasNoHeader = (renderPage) => {
    const { queryByRole } = render(
      renderPage,
    );
    const profileIcon = queryByRole('img', {
      name: /profile icon/i,
    });
    expect(profileIcon).not.toBeInTheDocument();
  };

  const enterThePage = (pathPage) => {
    history.push(pathPage);
    const path = history.location.pathname;
    expect(path).toBe(pathPage);
  };

  const redirectToProfile = () => {
    const { getByRole } = render(
      <App />,
    );
    const profileIcon = getByRole('img', {
      name: /profile icon/i,
    });
    userEvent.click(profileIcon);

    const profileTitle = getByRole('heading', {
      name: /perfil/i,
    });
    expect(profileTitle).toBeInTheDocument();
  };

  const toggleSearchBar = () => {
    const { getByRole, queryByText } = render(
      <App />,
    );

    const exploreIcon = getByRole('img', {
      name: /explore icon/i,
    });

    expect(queryByText('button', {
      name: /buscar/i,
    })).not.toBeInTheDocument();

    userEvent.click(exploreIcon);

    const ButtonSearch = getByRole('button', {
      name: /buscar/i,
    });
    expect(ButtonSearch).toBeInTheDocument();

    userEvent.click(exploreIcon);
    expect(expect(queryByText('button', {
      name: /buscar/i,
    })).not.toBeInTheDocument());
  };

  it('Header tela de comidas', () => {
    hasHeader('comidas', <RecipesFoods />);
  });

  it('Header tela de bebidas', () => {
    hasHeader('bebidas', <RecipesDrinks />);
  });

  it('Header tela de perfil', () => {
    hasHeader('perfil', <Profile />, false);
  });

  it('Header tela de explorar', () => {
    hasHeader('explorar', <Explore />, false);
  });

  it('Header tela de explorar comidas', () => {
    hasHeader('explorar comidas', <ExploreFoods />, false);
  });

  it('Header tela de explorar bebidas', () => {
    hasHeader('explorar bebidas', <ExploreDrinks />, false);
  });

  it('Header tela de explorar comidas por ingredientes', () => {
    hasHeader('explorar ingredientes', <ExploreIngredientsFood />, false);
  });

  it('Header tela de explorar bebidas por ingredientes', () => {
    hasHeader('explorar ingredientes', <ExploreIngredientsDrinks />, false);
  });

  it('Header tela de explorar comidas por area', () => {
    hasHeader('explorar origem', <ExploreAreaFood />);
  });

  it('Header tela de explorar bebidas por area', () => {
    hasHeader('explorar origem', <ExploreAreaDrinks />);
  });

  it('Header tela de receitas feitas', () => {
    hasHeader('receitas feitas', <DoneRecipes />, false);
  });

  it('Header tela de receitas favoritas', () => {
    hasHeader('receitas favoritas', <FavoriteRecipes />, false);
  });

  it('Não há header na tela de detalhes de uma receita de comida', () => {
    hasNoHeader(<RecipesDrinksDetails />);
  });

  it('Não há header na tela de detalhes de uma receita de bebida', () => {
    hasNoHeader(<RecipesFoodsDetails />);
  });

  it('Não há header na tela de receita em processo de comida', () => {
    hasNoHeader(<RecipesFoodsInProgress />);
  });

  it('Não há header na tela de receita em processo de bebida', () => {
    hasNoHeader(<RecipesDrinksInProgress />);
  });

  it('Redirecionamento para tela de perfil', () => {
    enterThePage('/comidas');
    redirectToProfile();
  });

  it('Toggle página de busca', () => {
    enterThePage('/comidas');
    toggleSearchBar();
  });
});
