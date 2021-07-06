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

export default function switchChangeStateButton(textContent, setFilterActiveButtons) {
  let state = '';
  switch (textContent) {
  case 'Beef':
    state = changeButtonState('button0');
    setFilterActiveButtons((prevState) => (
      { button0: !prevState.button0, ...state,
      }));
    break;
  case 'Breakfast':
    state = changeButtonState('button1');
    setFilterActiveButtons((prevState) => (
      { button1: !prevState.button1, ...state }));
    break;
  case 'Chicken':
    state = changeButtonState('button2');
    setFilterActiveButtons((prevState) => (
      { button2: !prevState.button2, ...state }));
    break;
  case 'Dessert':
    state = changeButtonState('button3');
    setFilterActiveButtons((prevState) => (
      { button3: !prevState.button3, ...state }));
    break;
  case 'Goat':
    state = changeButtonState('button4');
    setFilterActiveButtons((prevState) => (
      { button4: !prevState.button4, ...state }));
    break;
  default:
    return '';
  }
}
