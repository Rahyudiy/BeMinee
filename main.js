const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const imgKucing = document.getElementById("img");
const text = document.getElementById("text");

const imageUrls = [
  "kucinf-01.jpg",
  "kucinf-02.jpg",
  "kucinf-03.jpg",
  "kucinf-04.jpg",
  "kucinf-05.jpg",
];

let currentIndex = 0;
let noBtnScale = 1;
let yesBtnScale = 1;
let loveStarted = false;
let stage, ticker, heartsContainer;

noBtn.addEventListener("click", () => {
  const randomLeft = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const randomTop = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomLeft}px`;
  noBtn.style.top = `${randomTop}px`;

  text.textContent = "Be my valentine, please! ❤️";
  currentIndex = (currentIndex + 1) % imageUrls.length;
  imgKucing.src = imageUrls[currentIndex];

  noBtnScale = Math.max(0.5, noBtnScale - 0.1);
  noBtn.style.transform = `scale(${noBtnScale})`;

  yesBtnScale += 0.1;
  yesBtn.style.transform = `scale(${yesBtnScale})`;

  if (loveStarted) {
    stopLoveAnimation();
  }
});

yesBtn.addEventListener("click", () => {
  imgKucing.src = "kucinf-06.gif";
  text.textContent = "Ubur ubur ikan lele, berhasil lee! 😻";
  yesBtn.style.transform = `scale(1.2)`;

  if (!loveStarted) {
    startLoveAnimation();
  }
});

// ---------------------------- //
// Heart Animation with CreateJS //
// ---------------------------- //
function startLoveAnimation() {
  loveStarted = true;

  const canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  heartsContainer = new createjs.Container();
  stage.addChild(heartsContainer);

  // Create heart shapes
  for (let i = 0; i < 50; i++) {
    const heart = new createjs.Shape();
    heart.graphics
      .beginFill("#ff69b4")
      .moveTo(0, -10)
      .curveTo(10, -30, 25, -10) // Right lobe
      .curveTo(25, 10, 0, 25) // Bottom point
      .curveTo(-25, 10, -25, -10) // Left lobe
      .curveTo(-10, -30, 0, -10) // Back to top
      .closePath();
    heart.x = Math.random() * canvas.width;
    heart.y = Math.random() * canvas.height;
    heart.scaleX = heart.scaleY = Math.random() * 1.5 + 0.5;
    heart.alpha = Math.random() * 0.8 + 0.2;

    heart.velocity = Math.random() * 2 + 1;
    heartsContainer.addChild(heart);
  }

  // Start animation
  ticker = createjs.Ticker.on("tick", () => {
    for (let i = 0; i < heartsContainer.numChildren; i++) {
      const heart = heartsContainer.getChildAt(i);
      heart.y -= heart.velocity;
      if (heart.y < -20) {
        heart.y = canvas.height + 20;
        heart.x = Math.random() * canvas.width;
      }
    }
    stage.update();
  });
  createjs.Ticker.framerate = 60;
}

function stopLoveAnimation() {
  loveStarted = false;

  if (ticker) {
    createjs.Ticker.off("tick", ticker); // Stop the ticker
  }

  if (stage && heartsContainer) {
    stage.removeChild(heartsContainer); // Remove hearts from the stage
    heartsContainer = null;
    stage.update(); // Clear the canvas
  }
}
