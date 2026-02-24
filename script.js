// VARIABLES
let spinning = false;
const rewards = [
  "Netkit",
  "Try Again",
  "100k",
  "1-Hit Sword",
  "Try Again",
  "Try Again"
];

const spinner = document.getElementById("spinner");
const spinnerBox = document.getElementById("spinnerBox");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");
const usernameInput = document.getElementById("username");

// PAGE NAVIGATION
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// DAILY REWARD
function dailyReward() {
  const user = usernameInput.value.trim();
  if (!user) return alert("Enter username");

  const key = "daily_" + user;
  const today = new Date().toDateString();

  if (localStorage.getItem(key) === today) {
    result.innerText = "⏳ Daily reward already claimed";
    return;
  }

  localStorage.setItem(key, today);
  result.innerText = "✅ Daily reward claimed — use /daily";
}

// SPIN REWARD
function startSpin() {
  const user = usernameInput.value.trim();
  if (!user) return alert("Enter username");

  const key = "spin_" + user;
  const today = new Date().toDateString();

  if (localStorage.getItem(key) === today) {
    result.innerText = "⏳ You already spun today";
    return;
  }

  localStorage.setItem(key, today);
  spinNow();
}

// RESET SPINNER
function resetSpin() {
  localStorage.removeItem("spin_" + usernameInput.value.trim());
  result.innerText = "🔄 Spinner reset. You can spin again!";
}

// SPIN LOGIC
function spinNow() {
  if (spinning) return;
  spinning = true;

  spinnerBox.classList.remove("hidden");
  spinBtn.classList.add("disabled");

  // Determine reward index with rare 1-Hit Sword
  let index;
  const r = Math.random();
  if (r < 0.01) index = 3; // 1% chance 1-Hit Sword
  else index = Math.floor(Math.random() * rewards.length);

  // ROTATE THE WHEEL (fixed conic-gradient spinner)
  const rotation = 360 * 5 + index * (360 / rewards.length);
  spinner.style.transition = "transform 2s ease-out";
  spinner.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.innerText = `🎉 You won: ${rewards[index]} — use /spin`;
    spinning = false;
    spinBtn.classList.remove("disabled");
  }, 2200);
}
