export default function checkIngredients(checkButtons) {
  if (checkButtons.length > 0) {
    for (let i = 0; i < checkButtons.length; i += 1) {
      if (checkButtons[i].checked === false) return false;
    }
  } else {
    return false;
  }
  return true;
}
