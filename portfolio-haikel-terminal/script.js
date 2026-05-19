const bootLines=[
  '<span class="prompt">C:\\Users\\Haikel&gt;</span> start personal-profile',
  '<span class="success">[OK]</span> Loading identity: Muhammad Haikel Saleh',
  '<span class="success">[OK]</span> Education: SMKN 22 Jakarta / TKJ',
  '<span class="success">[OK]</span> Interests: IT, Editing, Multimedia, Content Creation',
  '<span class="warn">[INFO]</span> Preparing professional portfolio interface...',
  '<span class="success">[READY]</span> Welcome to Haikel Profile System'
];
const terminalLines=document.getElementById('terminalLines'),enterPanel=document.getElementById('enterPanel'),enterBtn=document.getElementById('enterBtn'),boot=document.getElementById('boot'),page=document.getElementById('page'),musicBtn=document.getElementById('musicBtn'),revealItems=document.querySelectorAll('.reveal'),heroType=document.getElementById('heroType'),bgMusic=document.getElementById('bgMusic');
let audioCtx=null,masterGain=null,musicTimer=null,synthOn=false,audioFileOn=false,heroStarted=false;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function typeHTMLLine(html,speed=16){const line=document.createElement('div');line.className='terminal-line';terminalLines.appendChild(line);const temp=document.createElement('div');temp.innerHTML=html;const text=temp.textContent;for(let i=0;i<=text.length;i++){line.textContent=text.slice(0,i);await sleep(speed)}line.innerHTML=html}
async function runBoot(){for(const line of bootLines){await typeHTMLLine(line,15);await sleep(130)}const cursor=document.createElement('div');cursor.className='terminal-line';cursor.innerHTML='<span class="prompt">C:\\Users\\Haikel&gt;</span> <span class="cursor"></span>';terminalLines.appendChild(cursor);enterPanel.classList.add('show')}
function initSynth(){if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();masterGain=audioCtx.createGain();masterGain.gain.value=.045;masterGain.connect(audioCtx.destination)}}
function note(freq,dur,type='sine',delay=0){if(!audioCtx)return;const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type=type;osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,audioCtx.currentTime+delay);gain.gain.linearRampToValueAtTime(.75,audioCtx.currentTime+delay+.025);gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+delay+dur);osc.connect(gain);gain.connect(masterGain);osc.start(audioCtx.currentTime+delay);osc.stop(audioCtx.currentTime+delay+dur+.05)}
function startSynth(){initSynth();if(audioCtx.state==='suspended')audioCtx.resume();if(musicTimer)clearInterval(musicTimer);synthOn=true;musicBtn.classList.add('active');const melody=[196,247,294,330,294,247,220,247];let step=0;function loop(){const n=melody[step%melody.length];note(n,.55,'sine');note(n/2,.9,'triangle');if(step%4===0)note(98,1.2,'sawtooth');step++}loop();musicTimer=setInterval(loop,520)}
function stopSynth(){synthOn=false;if(musicTimer)clearInterval(musicTimer);musicTimer=null}
async function startMusic(){try{bgMusic.volume=.35;await bgMusic.play();audioFileOn=true;synthOn=false;musicBtn.classList.add('active')}catch(e){audioFileOn=false;startSynth()}}
function stopMusic(){bgMusic.pause();audioFileOn=false;stopSynth();musicBtn.classList.remove('active')}
enterBtn.addEventListener('click',()=>{boot.classList.add('hide');page.classList.add('show');startMusic();revealOnScroll();if(!heroStarted){heroStarted=true;typeHeroLoop()}});
musicBtn.addEventListener('click',()=>{(audioFileOn||synthOn)?stopMusic():startMusic()});
const heroTexts=['IT Enthusiast from TKJ background','Digital Creative with detail-oriented mindset','Video Editing • Design • Multimedia • Content Creation'];
async function typeHeroLoop(){let idx=0;while(true){const text=heroTexts[idx%heroTexts.length];for(let i=0;i<=text.length;i++){heroType.textContent=text.slice(0,i);await sleep(45)}await sleep(1200);for(let i=text.length;i>=0;i--){heroType.textContent=text.slice(0,i);await sleep(22)}await sleep(260);idx++}}
function revealOnScroll(){const trigger=innerHeight*.86;revealItems.forEach(item=>{if(item.getBoundingClientRect().top<trigger)item.classList.add('active')})}
addEventListener('scroll',revealOnScroll);addEventListener('load',()=>{runBoot();revealOnScroll()});
