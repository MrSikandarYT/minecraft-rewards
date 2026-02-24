let spinning = false;
const rewards = [
  "Netkit",
  "Try Again",
  "100k",
  "1-Hit Sword",
  "Try Again",
  "Try Again"
];

// add segments dynamically
const spinner = document.getElementById("spinner");
rewards.forEach((r, i) => {
  const seg = document.createElement("div");
  seg.classList.add("segment");
  if (r === "1-Hit Sword") seg.classList.add("rare");
  const angle = (i * 60); // 6 segments = 60deg
  seg.style.transform = `rotate(${angle}deg) translateX(-50%) translateY(-50%)`;
  seg.innerText = r;
  spinner.appendChild(seg);
});

// PAGE NAVIGATION
function showPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// DAILY REWARD
function dailyReward() {
  const user = username.value.trim();
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
  const user = username.value.trim();
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

// RESET SPINNER BUTTON
function resetSpin() {
  localStorage.removeItem("spin_" + username.value.trim());
  result.innerText = "🔄 Spinner reset. You can spin again!";
}

// SPIN LOGIC
function spinNow() {
  if (spinning) return;
  spinning = true;

  const spinBtn = document.getElementById("spinBtn");
  spinBtn.classList.add("disabled");

  document.getElementById("spinnerBox").classList.remove("hidden");

  let index;
  const r = Math.random();
  if (r < 0.01) index = 3; // 1-Hit Sword 1% chance
  else index = Math.floor(Math.random() * rewards.length);

  const rotation = 360 * 5 + index * (360 / rewards.length);

  spinner.style.transition = "transform 2s ease-out";
  spinner.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.innerText = `🎉 You won: ${rewards[index]} — use /spin`;
    spinning = false;
    spinBtn.classList.remove("disabled");
  }, 2200);
}
