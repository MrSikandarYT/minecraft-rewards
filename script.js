const wheel = document.getElementById("wheel");
const message = document.getElementById("message");

let spinning = false;

const rewards = [
  "Netkit",
  "Try Again",
  "100k",
  "1-Hit Sword",
  "Try Again",
  "Try Again"
];

// ===== DAILY LOCK =====
function dailyReward() {
  const user = document.getElementById("username").value.trim();
  if (!user) return alert("Enter username");

  const today = new Date().toDateString();
  if (localStorage.getItem("daily") === today) {
    message.innerText = "⏳ Daily reward already claimed";
    return;
  }

  localStorage.setItem("daily", today);
  message.innerText = "🎁 Daily reward claimed — use /daily";
}

// ===== SPIN =====
function spinReward() {
  if (spinning) return;

  const user = document.getElementById("username").value.trim();
  if (!user) return alert("Enter username");

  const today = new Date().toDateString();
  if (localStorage.getItem("spin") === today) {
    message.innerText = "⏳ Spin already used today";
    return;
  }

  spinning = true;
  localStorage.setItem("spin", today);

  // weighted chance (1-hit sword very rare)
  let index;
  const r = Math.random();
  if (r < 0.01) index = 3; // 1%
  else index = Math.floor(Math.random() * rewards.length);

  const degreesPer = 360 / rewards.length;
  const rotation =
    360 * 5 + (rewards.length - index) * degreesPer;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    message.innerText = `🎉 You won: ${rewards[index]} — use /spin`;
    spinning = false;
  }, 4000);
}
