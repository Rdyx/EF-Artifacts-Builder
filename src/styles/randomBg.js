export function randomNumber() { return Math.floor(Math.random() * (0 - 36 + 1)) + 36 };

// https://css-tricks.com/tinted-images-multiple-backgrounds/
document.getElementById('bg').style.background = 'linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(\'' + process.env.REACT_APP_BG_IMG + 'lvl-bgs/' + randomNumber() + '.jpg\')';
