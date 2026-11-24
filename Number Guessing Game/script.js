const MAX_NUMBER = 50;

let randomNumber = Math.floor(Math.random() * MAX_NUMBER) + 1;
let attempts = 0;

// Get Element HTML
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const restartButton = document.getElementById("restartButton");
const themesBox = document.getElementById("themes");

/* ===== TEMA ===== */
function setTheme(name) {
  document.documentElement.setAttribute("data-theme", name);
  document.querySelectorAll(".themes button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.t === name);
  });
  try {
    localStorage.setItem("guess-theme", name);
  } catch (e) {
    /* abaikan jika storage tidak tersedia */
  }
}

themesBox.addEventListener("click", (event) => {
  const btn = event.target.closest("button");
  if (btn) setTheme(btn.dataset.t);
});

try {
  const saved = localStorage.getItem("guess-theme");
  if (saved) setTheme(saved);
} catch (e) {
  /* abaikan */
}

/* ===== GAME ===== */
function showMessage(text, type = "") {
  message.textContent = text;
  message.className = type; // "", "high", "low", atau "win"
}

function checkGuess() {
  const userGuess = Number(guessInput.value);

  // Validasi input
  if (guessInput.value === "" || userGuess < 1 || userGuess > MAX_NUMBER) {
    showMessage(`Masukkan angka antara 1 sampai ${MAX_NUMBER} ya.`);
    guessInput.focus();
    return;
  }

  // Hanya hitung percobaan yang valid
  attempts++;
  attemptsText.textContent = `Percobaan: ${attempts}`;

  if (userGuess === randomNumber) {
    showMessage(`Selamat! Kamu berhasil menebak nomor ${randomNumber} dalam ${attempts} kesempatan`, "win");
    endGame();
  } else if (userGuess > randomNumber) {
    showMessage("Terlalu tinggi! Coba lagi.", "high");
  } else {
    showMessage("Terlalu rendah! Coba lagi.", "low");
  }

  guessInput.value = "";
  guessInput.focus();
}

function endGame() {
  guessInput.disabled = true;
  guessButton.disabled = true;
  restartButton.style.display = "inline-block";
}

function resetGame() {
  attempts = 0;
  randomNumber = Math.floor(Math.random() * MAX_NUMBER) + 1;
  guessInput.disabled = false;
  guessButton.disabled = false;
  showMessage("Semoga Beruntung! Mulai Tebak...");
  attemptsText.textContent = "";
  restartButton.style.display = "none";
  guessInput.value = "";
  guessInput.focus();
}

guessButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", resetGame);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
