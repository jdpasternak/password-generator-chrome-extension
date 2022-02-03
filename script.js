const $generateButton = document.querySelector("#generateButton");
const $copyButton = document.querySelector("#copyButton");
const $lowercaseCheckbox = document.querySelector(
  `input[type="checkbox"][value="lowercase"]`
);
const $uppercaseCheckbox = document.querySelector(
  `input[type="checkbox"][value="uppercase"]`
);
const $numbersCheckbox = document.querySelector(
  `input[type="checkbox"][value="numbers"]`
);
const $specialCharactersCheckbox = document.querySelector(
  `input[type="checkbox"][value="specialCharacters"]`
);

const $passwordLength = document.querySelector("#passwordLength");

const specialCharacters = [
  " ",
  "!",
  '"',
  "#",
  "$",
  "%",
  "&",
  "'",
  "(",
  ")",
  "*",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];

const getPasswordCriteria = () => {
  var passwordCriteria = [];
  if (document.querySelector(`input[value="lowercase"]`).checked) {
    passwordCriteria.push(0);
  }
  if (document.querySelector(`input[value="uppercase"]`).checked) {
    passwordCriteria.push(1);
  }
  if (document.querySelector(`input[value="numbers"]`).checked) {
    passwordCriteria.push(2);
  }
  if (document.querySelector(`input[value="specialCharacters"]`).checked) {
    passwordCriteria.push(3);
  }

  return passwordCriteria;
};

var copyPassword = function () {
  document.querySelector("#passwordText").focus();
  document.querySelector("#passwordText").select();

  document.execCommand("copy");
};

const correctLength = () => {};

const generatePassword = (criteria) => {
  let passwordText = "";
  let selection = 0;

  for (i = 0; i < $passwordLength.value; i++) {
    // Keep running this switch statement until randomly landing on one of the selected criteria
    var selected = false;
    while (!selected) {
      var characterType = Math.floor(Math.random() * 4);
      if (criteria.includes(characterType)) {
        switch (characterType) {
          case 0:
            selection = Math.floor(Math.random() * (122 - 97 + 1) + 97);
            passwordText += String.fromCharCode(selection);
            break;
          case 1:
            selection = Math.floor(Math.random() * (90 - 65 + 1) + 65);
            passwordText += String.fromCharCode(selection);
            break;
          case 2:
            selection = Math.floor(Math.random() * (57 - 48 + 1) + 48);
            passwordText += String.fromCharCode(selection);
            break;
          case 3:
            selection = Math.floor(Math.random() * specialCharacters.length);
            passwordText += specialCharacters[selection];
            break;
          default:
            break;
        }
        selected = true;
      }
    }
  }
  return passwordText;
};

const writePassword = () => {
  var password = generatePassword(getPasswordCriteria());
  if (!password) {
    return false;
  }
  var passwordText = document.querySelector("#passwordText");

  passwordText.value = password;
};

window.addEventListener("keyup", (event) => {
  console.log(event.code);

  switch (event.code) {
    case "KeyA":
      $lowercaseCheckbox.checked = !$lowercaseCheckbox.checked;
      break;
    case "KeyS":
      $uppercaseCheckbox.checked = !$uppercaseCheckbox.checked;
      break;
    case "KeyD":
      $numbersCheckbox.checked = !$numbersCheckbox.checked;
      break;
    case "KeyF":
      $specialCharactersCheckbox.checked = !$specialCharactersCheckbox.checked;
      break;
    case "KeyG":
      writePassword();
      break;
    case "KeyC":
      copyPassword();
      break;
    case "KeyJ":
      if ($passwordLength.value > 8) $passwordLength.value--;
      break;
    case "KeyK":
      if ($passwordLength.value < 128) $passwordLength.value++;
      break;
    default:
      console.log(getPasswordCriteria());
      break;
  }
});

$copyButton.addEventListener("click", copyPassword);

$generateButton.addEventListener("click", writePassword);
