import { animate, audioLoader, sound } from "./index.js";

const loadingBar = document.querySelector("#loading-bar");
const loadingBarFill = document.querySelector("#loading-bar-fill");
const loadingText = document.querySelector("#loading-text");
const loadingImg = document.querySelector(".loading-img");
const container = document.querySelector("#container");
const timeLeft = document.querySelector('#timeLeft');

const gameCanvas = document.querySelector("canvas");
const playAgain = document.querySelector("#play-again");

const startGame = () => {
  animate();
  container.style.display = "block";

  const timer = setInterval(() => {
    let time = parseInt(timeLeft.textContent);

    if (time === 0) {
      clearInterval(timer);
      gameCanvas.style.display = "none";
      container.style.display = "none";
      playAgain.style.display = "flex";
      playAgain.style.zIndex = "1";
    }

    time--;
    timeLeft.innerHTML = time;
  }, 1000);

  audioLoader.load("assets/sounds/ghetto.mp3", (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.15);
    sound.play();
  });
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


