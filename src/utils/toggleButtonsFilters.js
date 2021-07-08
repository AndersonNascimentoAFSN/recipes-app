function changeStateButtons(buttonName, setState) {
  const buttonsInitialState = {
    buttonFilter0: false,
    buttonFilter1: false,
    buttonFilter2: false,
    buttonFilter3: false,
    buttonFilter4: false,
  };
  setState((prevState) => (
    { ...buttonsInitialState, [buttonName]: !prevState[buttonName] }));
}

function setStateButtonsFilters(target, setState, recipesCategories) {
  switch (target.textContent) {
  case recipesCategories[0].strCategory:
    changeStateButtons('buttonFilter0', setState);
    break;
  case recipesCategories[1].strCategory:
    changeStateButtons('buttonFilter1', setState);
    break;
  case recipesCategories[2].strCategory:
    changeStateButtons('buttonFilter2', setState);
    break;
  case recipesCategories[3].strCategory:
    changeStateButtons('buttonFilter3', setState);
    break;
  case recipesCategories[4].strCategory:
    changeStateButtons('buttonFilter4', setState);
    break;
  default:
    break;
  }
}

export default setStateButtonsFilters;
