let isSpinning = false; // Prevent multiple spins
const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width/2;

const segments = [
  {text:"1 Netkit", color:"#22c55e", icon:"🧰"},
  {text:"Try Again", color:"#16a34a", icon:"❌"},
  {text:"100k", color:"#22c55e", icon:"💰"},
  {text:"Illegal Sword 1 Use", color:"#f59e0b", icon:"⚔️"},
  {text:"Try Again", color:"#16a34a", icon:"❌"},
  {text:"Try Again", color:"#22c55e", icon:"❌"}
];
const totalSegments = segments.length;

/* Utility */
function getToday(){ return new Date().toDateString(); }
function getWeekNumber(){
  const today = new Date();
  const firstJan = new Date(today.getFullYear(),0,1);
  const dayOfYear = ((today - firstJan + 86400000)/86400000);
  const week = Math.ceil(dayOfYear/7);
  return today.getFullYear()+"-W"+week;
}

/* Show content */
function showContent(section){
  const sections = document.getElementsByClassName("section");
  for (let s of sections) s.style.display = "none";
  ["daily-message","spin-message"].forEach(id=>document.getElementById(id).innerText="");
  canvas.style.transition="none";
  canvas.style.transform="rotate(0deg)";
  if(document.getElementById(section)) document.getElementById(section).style.display="block";
}

/* Daily Reward */
function dailyReward(){
  const user = document.getElementById("username").value.trim();
  const msg = document.getElementById("daily-message");
  if(!user){ msg.innerText="❌ Enter your username"; msg.style.color="red"; return; }
  const key = "daily_"+user;
  if(localStorage.getItem(key)===getToday()){ msg.innerText="⏳ Daily reward already claimed"; msg.style.color="orange"; return; }
  localStorage.setItem(key,getToday());
  msg.innerText="✅ Daily reward claimed! Use /daily in server";
  msg.style.color="lightgreen";
}

/* Draw wheel */
function drawWheel(){
  const angle = 2*Math.PI/totalSegments;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<totalSegments;i++){
    ctx.beginPath();
    ctx.moveTo(radius,radius);
    ctx.arc(radius,radius,radius,i*angle,(i+1)*angle);
    ctx.closePath();
    ctx.fillStyle = segments[i].color;
    ctx.fill();
    ctx.strokeStyle="#000"; ctx.stroke();

    ctx.save();
    ctx.translate(radius,radius);
    ctx.rotate(i*angle + angle/2);
    ctx.textAlign="right";
    ctx.fillStyle = (i===3)?"white":"black";
    ctx.font="16px Arial";
    ctx.fillText(segments[i].icon+" "+segments[i].text,radius-10,5);
    ctx.restore();
  }
}
drawWheel();

/* Spin Wheel */
function spinCanvasWheel(){
  const spinBtn = document.getElementById("spinBtn");
  if(isSpinning) return; // Ignore if spinning
  const user = document.getElementById("username").value.trim();
  const msg = document.getElementById("spin-message");
  if(!user){ msg.innerText="❌ Enter your username"; msg.style.color="red"; return; }

  const key = "spin_"+user;
  if(localStorage.getItem(key)===getToday()){ msg.innerText="⏳ You already spun today"; msg.style.color="orange"; return; }

  isSpinning = true;
  spinBtn.disabled = true;

  // Weekly 1-Hit Sword
  const swordKey = "sword_claimed_"+user;
  const currentWeek = getWeekNumber();
  const swordClaimed = localStorage.getItem(swordKey)===currentWeek;

  // Weighted random
  let weights = [1,1,1,0.01,1,1];
  if(swordClaimed) weights[3]=0;
  let total = weights.reduce((a,b)=>a+b,0);
  let rand = Math.random()*total;
  let selectedIndex=0, sum=0;
  for(let i=0;i<weights.length;i++){ sum+=weights[i]; if(rand<=sum){ selectedIndex=i; break; } }
  let reward = segments[selectedIndex].text;

  // Rotate wheel
  const segmentAngle = 360/totalSegments;
  const startAngle = -90; // pointer top
  const deg = 360*5 + startAngle - (segmentAngle*selectedIndex + segmentAngle/2);
  canvas.style.transition = "transform 5s cubic-bezier(0.25,1,0.5,1)";
  canvas.style.transform = `rotate(${deg}deg)`;

  setTimeout(()=>{
    localStorage.setItem(key,getToday());
    if(reward==="Illegal Sword 1 Use") localStorage.setItem(swordKey,currentWeek);
    msg.innerText = "🎉 You won: "+reward+" — use /spin in server";
    msg.style.color = (reward==="Illegal Sword 1 Use")?"#f59e0b":"lightgreen";
    isSpinning = false;
    spinBtn.disabled = false;
  },5200);
}

/* Reset */
function resetRewards(){
  localStorage.clear();
  alert("✅ Rewards reset for testing!");
  document.getElementById("daily-message").innerText="";
  document.getElementById("spin-message").innerText="";
  canvas.style.transition="none";
  canvas.style.transform="rotate(0deg)";
  isSpinning=false;
  document.getElementById("spinBtn").disabled=false;
}
