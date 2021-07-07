function changeButtonState(buttonState) {
  const buttonsState = { button0: false,
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  };
  delete buttonsState[buttonState];
  return buttonsState;
}

function setFilterStateButtons(buttonNumber, setState) {
  const state = changeButtonState(buttonNumber);
  setState((prevState) => (
    { [buttonNumber]: !prevState[buttonNumber], ...state,
    }));
}

export default function switchChangeStateButton(
  textContent, setFilterActiveButtons, recipesCategories,
) {
  switch (textContent) {
  case recipesCategories[0].strCategory:
    setFilterStateButtons('button0', setFilterActiveButtons);
    break;
  case recipesCategories[1].strCategory:
    setFilterStateButtons('button1', setFilterActiveButtons);
    break;
  case recipesCategories[2].strCategory:
    setFilterStateButtons('button2', setFilterActiveButtons);
    break;
  case recipesCategories[3].strCategory:
    setFilterStateButtons('button3', setFilterActiveButtons);
    break;
  case recipesCategories[4].strCategory:
    setFilterStateButtons('button4', setFilterActiveButtons);
    break;
  default:
    return '';
  }
}
