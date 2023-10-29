import { animate } from "./index.js";

const loadingBar = document.querySelector("#loading-bar");
const loadingBarFill = document.querySelector("#loading-bar-fill");
const loadingText = document.querySelector("#loading-text");
const loadingImg = document.querySelector("#loading-img");

const startGame = () => {
  animate();

  setInterval(() => {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert-message");
    alertMessage.innerHTML = `<div class="alert-message-text">Play the full game on <a href="https://www.kongregate.com/games/AnastasiaKolendo/escape-from-the-forest" target="_blank">Kongregate</a>!</div>`;
    document.body.appendChild(alertMessage);
  }, 15000);
};

const loadGame = () => {
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      loadingBar.style.display = "none";
      loadingText.style.display = "none";
      let opacity = 1;
      const logoInterval = setInterval(() => {
        if (opacity <= 0) {
          clearInterval(logoInterval);
          loadingImg.style.display = "none";

          startGame();
        } else {
          opacity -= 0.04;
          loadingImg.style.opacity = opacity;
        }
      }, 25);
    } else {
      width++;
      loadingBarFill.style.width = `${width}%`;
    }
  }, 35);
};

loadGame();


