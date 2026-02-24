const wheel = document.getElementById("wheel");
const message = document.getElementById("message");

let spinning = false;

// rewards in order of wheel
const rewards = [
  "Netkit",
  "Try Again",
  "100k",
  "1-Hit Sword",
  "Try Again",
  "Try Again"
];

// ===== LOCK SYSTEM =====
function getLockKey(type) {
  return type + "_lock";
}

// ===== DAILY REWARD =====
function dailyReward() {
  const user = document.getElementById("username").value.trim();
  if (!user) {
    alert("Enter username");
    return;
  }

  const today = new Date().toDateString();
  const last = localStorage.getItem(getLockKey("daily"));

  if (last === today) {
    message.innerText = "⏳ Daily reward already claimed";
    return;
  }

  localStorage.setItem(getLockKey("daily"), today);
  message.innerText = "🎁 Daily reward claimed — use /daily in server";
}

// ===== SPIN =====
function spinReward() {
  if (spinning) return;

  const user = document.getElementById("username").value.trim();
  if (!user) {
    alert("Enter username");
    return;
  }

  const today = new Date().toDateString();
  const lastSpin = localStorage.getItem(getLockKey("spin"));

  if (lastSpin === today) {
    message.innerText = "⏳ Spin already used today";
    return;
  }

  spinning = true;
  localStorage.setItem(getLockKey("spin"), today);

  // weighted result (1-Hit Sword VERY rare)
  let index;
  const rand = Math.random();

  if (rand < 0.01) index = 3;        // 1% chance
  else index = Math.floor(Math.random() * rewards.length);

  const angle = 360 * 5 + (360 / rewards.length) * index;

  wheel.style.transform = `rotate(${angle}deg)`;

  setTimeout(() => {
    message.innerText = `🎉 You won: ${rewards[index]} — use /spin`;
    spinning = false;
  }, 4000);
}
