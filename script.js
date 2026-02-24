let spinning = false;

const rewards = [
  "Try Again",
  "100 Coins",
  "Diamond",
  "Iron Kit",
  "Netherite Kit",
  "VIP Rank"
];

function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

function dailyReward() {
  const user = username.value.trim();
  if (!user) return alert("Enter username");

  const today = new Date().toDateString();
  const key = "daily_" + user;

  if (localStorage.getItem(key) === today) {
    result.innerText = "⏳ Daily reward already claimed";
    return;
  }

  localStorage.setItem(key, today);
  result.innerText = "✅ You got 50 coins!";
}

function startSpin() {
  if (spinning) return;

  const user = username.value.trim();
  if (!user) return alert("Enter username");

  const today = new Date().toDateString();
  const key = "spin_" + user;

  if (localStorage.getItem(key) === today) {
    result.innerText = "⏳ You already spun today";
    return;
  }

  localStorage.setItem(key, today);
  spinNow(false);
}

function testSpin() {
  spinNow(true);
}

function spinNow(isTest) {
  spinning = true;
  result.innerText = "";

  spinnerBox.classList.remove("hidden");

  const spin = Math.floor(Math.random() * rewards.length);
  const angle = 360 * 5 + spin * (360 / rewards.length);

  spinner.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    result.innerText =
      (isTest ? "🧪 TEST: " : "🎉 You won: ") + rewards[spin];
    spinning = false;
  }, 4000);
}
