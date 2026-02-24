// Elements
const pages = document.querySelectorAll(".page");
const showSpinnerBtn = document.getElementById("showSpinnerBtn");
const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const dailyBtn = document.getElementById("dailyBtn");
const usernameInput = document.getElementById("username");
const result = document.getElementById("result");
const wheelCanvas = document.getElementById("wheel");
const ctx = wheelCanvas.getContext("2d");

let spinning = false;
let rotation = 0;

// Rewards with emoji
const rewards = [
  {text:"Netkit", emoji:"🎒"},
  {text:"Try Again", emoji:"❌"},
  {text:"100k", emoji:"💰"},
  {text:"1-Hit Sword", emoji:"🗡️"},
  {text:"Try Again", emoji:"❌"},
  {text:"Try Again", emoji:"❌"}
];

// Draw wheel function
function drawWheel(){
  const segments = rewards.length;
  const angle = 2*Math.PI/segments;
  ctx.clearRect(0,0,400,400);
  for(let i=0;i<segments;i++){
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.arc(200,200,200,i*angle,(i+1)*angle);
    ctx.fillStyle = i%2===0 ? "#4caf50":"#2196f3";
    ctx.fill();
    ctx.save();
    ctx.translate(200,200);
    ctx.rotate((i+0.5)*angle);
    ctx.textAlign="right";
    ctx.fillStyle="#fff";
    ctx.font="16px Arial";
    ctx.fillText(rewards[i].emoji + " " + rewards[i].text,190,0);
    ctx.restore();
  }
}

// Page navigation
function showPage(page){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  wheelCanvas.style.display="none";
  spinBtn.style.display="none";
  result.innerText="";
}

// Spinner button
showSpinnerBtn.addEventListener("click", ()=>{
  const user=usernameInput.value.trim();
  if(!user){ alert("Enter username"); return; }

  // Show spinner and spin button
  wheelCanvas.style.display = "block";
  spinBtn.style.display = "block";

  // Reset wheel for fresh spin
  wheelCanvas.style.transition="none";
  wheelCanvas.style.transform="rotate(0deg)";
  rotation = 0;

  drawWheel();
  result.innerText = "🎡 Spinner ready! Press Spin.";
});

// Daily reward
dailyBtn.addEventListener("click",()=>{
  const user=usernameInput.value.trim();
  if(!user){ alert("Enter username"); return; }
  const key = "daily_"+user;
  const today = new Date().toDateString();
  if(localStorage.getItem(key)===today){
    result.innerText="⏳ Daily reward already claimed";
    wheelCanvas.style.display="none";
    spinBtn.style.display="none";
    return;
  }
  localStorage.setItem(key,today);
  result.innerText="✅ Daily reward claimed — use /daily";
  wheelCanvas.style.display="none";
  spinBtn.style.display="none";
});

// Reset spin (test only)
resetBtn.addEventListener("click",()=>{
  const user=usernameInput.value.trim();
  if(!user){ alert("Enter username"); return; }
  localStorage.removeItem("spin_"+user);
  result.innerText="🔄 Spinner reset, you can spin again!";
});

// Spin wheel
spinBtn.addEventListener("click",()=>{
  const user=usernameInput.value.trim();
  if(!user){ alert("Enter username"); return; }
  const key = "spin_"+user;
  const today = new Date().toDateString();
  if(localStorage.getItem(key)===today){
    result.innerText="⏳ You already spun today";
    return;
  }
  localStorage.setItem(key,today);

  if(spinning) return;
  spinning=true;
  spinBtn.classList.add("disabled");

  // Determine reward index with rare sword
  let index;
  const r = Math.random();
  if(r<0.01) index=3; // 1% 1-Hit Sword
  else index=Math.floor(Math.random()*rewards.length);

  const spins=6;
  rotation += spins*360 + index*(360/rewards.length) + Math.random()*10;

  wheelCanvas.style.transition="transform 8s cubic-bezier(0.25,0.1,0.25,1)";
  wheelCanvas.style.transform=`rotate(${rotation}deg)`;

  setTimeout(()=>{
    result.innerText=`🎉 You won: ${rewards[index].emoji} ${rewards[index].text} — use /spin`;
    spinning=false;
    spinBtn.classList.remove("disabled");
  },8000);
});
