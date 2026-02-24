function daily() {
  document.getElementById("dailyMsg").innerText =
    "You got Daily Reward! Use /daily in server";
}

function spin() {
  const rewards = ["Try Again", "1 Diamond", "Netherite Kit"];
  const win = rewards[Math.floor(Math.random() * rewards.length)];
  document.getElementById("spinMsg").innerText =
    "You won: " + win + " — use /spin";
}
