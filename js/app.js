/* ═════════════════════════════════════════════════
   GLOBALS & CONFIG
═════════════════════════════════════════════════ */
const BGS={village:'assets/bg_village.jpg',village_park:'assets/bg_village_park.jpg',forest:'assets/bg_forest.jpg',forest_stream:'assets/bg_forest_stream.jpg',forest_clearing:'assets/bg_forest_clearing.jpg',forest_deep:'assets/bg_forest_deep.jpg',mountain_valley:'assets/bg_mountain_valley.jpg',mountain_ridge:'assets/bg_mountain_ridge.jpg',mountain_peak:'assets/bg_mountain_peak.jpg',house_entry:'assets/bg_house_entry.jpg',house_living:'assets/bg_house_living.jpg',snow:'assets/bg_snow.jpg',cherry:'assets/bg_cherry.jpg',volcano:'assets/bg_volcano.jpg',beach:'assets/bg_beach.jpg',sunset:'assets/bg_sunset.jpg',cave:'assets/bg_cave.jpg'};
const POKES=[
  {n:'Pikachu',e:'⚡',id:25},{n:'Charmander',e:'🔥',id:4},{n:'Bulbasaur',e:'🌿',id:1},
  {n:'Squirtle',e:'💧',id:7},{n:'Eevee',e:'🍂',id:133},{n:'Gengar',e:'👻',id:94},
  {n:'Snorlax',e:'💤',id:143},{n:'Mewtwo',e:'🌀',id:150},{n:'Jigglypuff',e:'🎵',id:39},
  {n:'Charizard',e:'🐉',id:6},{n:'Meowth',e:'🪙',id:52},{n:'Lucario',e:'🔵',id:448}
];

let lang='en';
let cry=null;
let animId=null,cleanFn=null;

const U={name:'',age:'',gender:'',pokemon:'',pokeId:0};
let currentStory=null;
let currentPageId='start';
let pageHistory=[];
let step=0;

/* ═════════════════════════════════════════════════
   LANGUAGE SYSTEM
═════════════════════════════════════════════════ */
const L={
  en:{
    menuSubtitle:'A Reading Quest',
    menuStart:'NEW STORY',
    menuNote:'Dynamic stories from your library',
    oakLabel:'⬡ PROF. OAK',
    endTitle:'THE END!',
    endSub:(n,p)=>`${n} and ${p} — friends forever!`,
    endMenuBtn:'⬡ MAIN MENU',
    swipeHint:'← SWIPE →',
    continueBtn:'Continue ▶',
    reallyBtn:'Really?! ▶',
    letsgoBtn:"Let's go! ▶",
    okBtn:'OK ▶',
    boy:'Boy', girl:'Girl',
    chooseBtn:'Choose! ▶',
    startBtn:'⚡ START ADVENTURE!',
    he:'he', she:'she', his:'his', her:'her',
    oakEnding:[
      d=>`Wonderful, ${d.name}! What an incredible adventure you and ${d.pokemon} shared!`,
      d=>`I hope you enjoyed your journey together. Every story is special, and this one was uniquely yours!`,
      d=>`Remember, ${d.name} — the best adventures are the ones we share with friends. Thank you for reading!`
    ],
    playAgainBtn:'📖 READ ANOTHER STORY',
    oakSteps:[
      "Hello there! Welcome to the world of Pokémon! My name is Oak — Professor Oak!",
      "I'll select the perfect story for you from our library!",
      "I need to ask a few questions first. Ready?",
      "First — what is your name, young trainer?",
      d=>`${d.name}! Great name! And how old are you, ${d.name}?`,
      d=>`${d.age} years old! Perfect. Are you a boy or a girl?`,
      d=>`A ${d.gender}! Which Pokémon would you like as your companion?`,
      d=>`${d.pokemon}! Excellent choice, ${d.name}! Let me find the perfect adventure for you!`
    ],
    namePh:'Your name...',nameErr:'Please tell me your name!',
    agePh:'Your age...',ageErr:'Please enter a valid age!',
  },
  is:{
    menuSubtitle:'Lestraræfing',
    menuStart:'NÝTT ÆVINTÝRI',
    menuNote:'Kraftmiklar sögur úr safninu þínu',
    oakLabel:'⬡ PRÓFESSOR EIK',
    endTitle:'LOKIÐ!',
    endSub:(n,p)=>`${n} og ${p} — vinir að eilífu!`,
    endMenuBtn:'⬡ AÐALVALMYND',
    swipeHint:'← STRJÚKA →',
    continueBtn:'Áfram ▶',
    reallyBtn:'Satt?! ▶',
    letsgoBtn:'Við skulum! ▶',
    okBtn:'Í lagi ▶',
    boy:'Drengur', girl:'Stúlka',
    chooseBtn:'Velja! ▶',
    startBtn:'⚡ HEFJA ÆVINTÝRI!',
    he:'hann', she:'hún', his:'hans', her:'hennar',
    oakEnding:[
      d=>`Dásamlegt, ${d.name}! Hvaða ótrúlegt ævintýri þú og ${d.pokemon} deilduð!`,
      d=>`Ég vona að þú hafir notið ferðarinnar ykkar saman. Hver saga er sérstök, og þessi var einstaklega þín!`,
      d=>`Mundu, ${d.name} — bestu ævintýrin eru þau sem við deilum með vinum. Takk fyrir að lesa!`
    ],
    playAgainBtn:'📖 LESA AÐRA SÖGU',
    oakSteps:[
      "Halló! Velkomin í heim Pokémon! Ég heiti Eik — Prófessor Eik!",
      "Ég mun velja fullkomna sögu fyrir þig úr safninu okkar!",
      "Ég þarf að spyrja nokkurra spurninga fyrst. Tilbúin/n?",
      "Fyrst — hvað heitir þú, ungi þjálfarinn?",
      d=>`${d.name}! Gott nafn! Og hversu gamall/gömul ert þú, ${d.name}?`,
      d=>`${d.age} ára! Frábært. Ert þú drengur eða stúlka?`,
      d=>`Ágætt! Hvaða Pokémon vilt þú sem félaga?`,
      d=>`${d.pokemon}! Frábær val, ${d.name}! Leyfðu mér að finna fullkomna ævintýrið fyrir þig!`
    ],
    namePh:'Nafnið þitt...',nameErr:'Vinsamlegast segðu mér nafnið þitt!',
    agePh:'Aldurinn þinn...',ageErr:'Vinsamlegast sláðu inn gilt aldur!',
  }
};

function t(key,...args){
  const v=L[lang][key];
  return typeof v==='function'?v(...args):v;
}

function setLang(l){
  lang=l;
  document.documentElement.lang=l;
  document.getElementById('flag-en').classList.toggle('active',l==='en');
  document.getElementById('flag-is').classList.toggle('active',l==='is');
  document.getElementById('m-subtitle').textContent=t('menuSubtitle');
  document.getElementById('m-start').textContent=t('menuStart');
  document.getElementById('m-note').textContent=t('menuNote');
}

/* ═════════════════════════════════════════════════
   READING LEVEL
═════════════════════════════════════════════════ */
function readingProfile(age){
  const a=+age;
  const IS=lang==='is';
  if(a<=5)  return{grade:'K',   style:IS?'Einfaldar 3-5 orða setningar.':'Simple 3-5 word sentences.'};
  if(a===6) return{grade:'1',   style:IS?'Stuttar 5-8 orða setningar.':'Short 5-8 word sentences.'};
  if(a===7) return{grade:'2',   style:IS?'Einfaldar setningar.':'Simple sentences.'};
  if(a===8) return{grade:'3',   style:IS?'Blanda af setningum.':'Mix of sentences.'};
  if(a===9) return{grade:'4',   style:IS?'Fjölbreytt setningabygging.':'Varied structure.'};
  if(a===10)return{grade:'5',   style:IS?'Flóknar setningar.':'Complex sentences.'};
  if(a<=12) return{grade:'6',   style:IS?'Fágaðar setningar.':'Sophisticated sentences.'};
  if(a<=14) return{grade:'7-8', style:IS?'Háþróaður orðaforði.':'Advanced vocabulary.'};
  return     {grade:'9+',  style:IS?'Þroskað bókmenntastil.':'Mature literary style.'};
}

/* ═════════════════════════════════════════════════
   UTILITY FUNCTIONS
═════════════════════════════════════════════════ */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('off'));document.getElementById(id).classList.remove('off');}
function toast(m,d=4000,success=false){const el=document.getElementById('toast');el.textContent=m;el.className='toast'+(success?' success':'')+' show';setTimeout(()=>el.classList.remove('show'),d);}
function mkB(label,cls,fn){const b=document.createElement('button');b.className=cls;b.textContent=label;b.onclick=fn;return b;}
let tw=null;
function typewrite(id,txt){const el=document.getElementById(id);el.textContent='';if(tw)clearInterval(tw);let i=0;tw=setInterval(()=>{if(i<txt.length){el.textContent+=txt[i++];}else clearInterval(tw);},18);}
function loadCry(id){cry=new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);}
function playCry(){if(!cry)return;cry.currentTime=0;cry.play().catch(()=>toast('🔇 Enable audio!'));}
function spriteUrl(id){return`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;}
function backToMenu(){Object.keys(U).forEach(k=>U[k]=k==='pokeId'?0:'');currentStory=null;currentPageId='start';pageHistory=[];step=0;if(animId){cancelAnimationFrame(animId);animId=null;}if(cleanFn){cleanFn();cleanFn=null;}document.getElementById('end-veil').classList.remove('show');show('s-menu');}
function goCreate(){show('s-create');document.getElementById('theme').addEventListener('change',e=>{document.getElementById('theme-custom').style.display=e.target.value==='custom'?'block':'none';});document.querySelectorAll('input[name="pokemon-compat"]').forEach(r=>r.addEventListener('change',e=>{document.getElementById('pokemon-specific').style.display=e.target.value==='specific'?'block':'none';}));}
function goManage(){show('s-manage');renderLibrary();}

/* ═════════════════════════════════════════════════
   STARS ANIMATION
═════════════════════════════════════════════════ */
(()=>{const c=document.getElementById('stars');for(let i=0;i<90;i++){const s=document.createElement('div');s.className='st';const z=(Math.random()*2+1).toFixed(1);s.style.cssText=`width:${z}px;height:${z}px;left:${(Math.random()*100).toFixed(2)}%;top:${(Math.random()*100).toFixed(2)}%;--d:${(2+Math.random()*5).toFixed(1)}s;--dl:${(Math.random()*5).toFixed(1)}s;`;c.appendChild(s);}})();

/* ═════════════════════════════════════════════════
   TEMPLATE VARIABLE REPLACEMENT
═════════════════════════════════════════════════ */
function replaceVars(text,userData){
  if(!text)return'';
  const{name,pokemon,age,gender}=userData;
  const pronouns=lang==='is'?{
    he:gender==='Boy'?'hann':'hún',
    his:gender==='Boy'?'hans':'hennar',
    him:gender==='Boy'?'honum':'henni'
  }:{
    he:gender==='Boy'?'he':'she',
    his:gender==='Boy'?'his':'her',
    him:gender==='Boy'?'him':'her'
  };
  
  let result=text;
  result=result.replace(/\{\{name\}\}/g,name);
  result=result.replace(/\{\{pokemon\}\}/g,pokemon);
  result=result.replace(/\{\{age\}\}/g,age);
  result=result.replace(/\{\{he\}\}/g,pronouns.he);
  result=result.replace(/\{\{He\}\}/g,pronouns.he.charAt(0).toUpperCase()+pronouns.he.slice(1));
  result=result.replace(/\{\{she\}\}/g,pronouns.he);
  result=result.replace(/\{\{She\}\}/g,pronouns.he.charAt(0).toUpperCase()+pronouns.he.slice(1));
  result=result.replace(/\{\{his\}\}/g,pronouns.his);
  result=result.replace(/\{\{His\}\}/g,pronouns.his.charAt(0).toUpperCase()+pronouns.his.slice(1));
  result=result.replace(/\{\{her\}\}/g,pronouns.his);
  result=result.replace(/\{\{Her\}\}/g,pronouns.his.charAt(0).toUpperCase()+pronouns.his.slice(1));
  result=result.replace(/\{\{him\}\}/g,pronouns.him);
  result=result.replace(/\{\{boyOnly:(.*?)\}\}/g,gender==='Boy'?'$1':'');
  result=result.replace(/\{\{girlOnly:(.*?)\}\}/g,gender==='Girl'?'$1':'');
  
  return result;
}

/* ═════════════════════════════════════════════════
   STORY LIBRARY MANAGEMENT
═════════════════════════════════════════════════ */
const STORAGE_KEY='pokemonStoryLibrary';

function loadLibrary(){
  try{
    const stored=localStorage.getItem(STORAGE_KEY);
    if(!stored)return getDefaultLibrary();
    const lib=JSON.parse(stored);
    return mergeWithDefaults(lib);
  }catch(e){
    console.error('Failed to load library:',e);
    return getDefaultLibrary();
  }
}

function saveLibrary(lib){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(lib));
    return true;
  }catch(e){
    console.error('Failed to save library:',e);
    toast('⚠️ Storage full. Delete some stories.');
    return false;
  }
}

function getDefaultLibrary(){
  return{
    version:'1.0',
    stories:{
      default_simple_en:DEFAULT_SIMPLE_EN,
      default_medium_en:DEFAULT_MEDIUM_EN
    },
    settings:{playCount:{}}
  };
}

function mergeWithDefaults(lib){
  const defaults=getDefaultLibrary();
  lib.stories=lib.stories||{};
  
  // Force update default stories (to fix cached old versions)
  Object.keys(defaults.stories).forEach(k=>{
    if(k.startsWith('default_')){
      // Always overwrite built-in stories with latest version
      lib.stories[k]=defaults.stories[k];
    } else if(!lib.stories[k]){
      // Only add new non-default stories if they don't exist
      lib.stories[k]=defaults.stories[k];
    }
  });
  return lib;
}

/* ═════════════════════════════════════════════════
   STORY SELECTION ALGORITHM
═════════════════════════════════════════════════ */
function selectBestStory(userData){
  const{age,gender}=userData;
  const lib=loadLibrary();
  
  const candidates=Object.values(lib.stories).filter(story=>{
    if(story.meta.language!==lang)return false;
    const genderKey=gender.toLowerCase();
    if(!story.meta.genderSupport||!story.meta.genderSupport[genderKey])return false;
    if(age<story.meta.ageRange.min||age>story.meta.ageRange.max)return false;
    return true;
  });
  
  if(candidates.length===0){
    console.warn('No matching stories, using fallback');
    return lang==='en'?DEFAULT_SIMPLE_EN:DEFAULT_SIMPLE_EN;
  }
  
  const selected=candidates[Math.floor(Math.random()*candidates.length)];
  
  lib.settings.playCount[selected.meta.id]=(lib.settings.playCount[selected.meta.id]||0)+1;
  saveLibrary(lib);
  
  return selected;
}

/* ═════════════════════════════════════════════════
   STORY VALIDATION
═════════════════════════════════════════════════ */
function validateStory(json){
  const errors=[];
  const warnings=[];
  
  if(!json.meta)errors.push("Missing 'meta' object");
  if(!json.pages)errors.push("Missing 'pages' object");
  if(!json.startPage)errors.push("Missing 'startPage' field");
  
  if(json.startPage&&!json.pages[json.startPage]){
    errors.push(`Start page '${json.startPage}' not found`);
  }
  
  Object.values(json.pages||{}).forEach(page=>{
    if(page.choices){
      page.choices.forEach(choice=>{
        if(!json.pages[choice.next]){
          errors.push(`Page '${page.id}' references non-existent page '${choice.next}'`);
        }
      });
    }
  });
  
  const hasEnding=Object.values(json.pages||{}).some(p=>!p.choices||p.choices.length===0);
  if(!hasEnding)errors.push("Story must have at least one ending");
  
  // Check minimum story depth (5 pages to any ending)
  if(json.pages&&json.startPage){
    const checkDepth=(pageId,visited=new Set(),depth=0)=>{
      if(visited.has(pageId))return Infinity;
      visited.add(pageId);
      
      const page=json.pages[pageId];
      if(!page)return Infinity;
      if(!page.choices||page.choices.length===0)return depth; // Found ending
      
      let minDepth=Infinity;
      page.choices.forEach(choice=>{
        const d=checkDepth(choice.next,new Set(visited),depth+1);
        if(d<minDepth)minDepth=d;
      });
      return minDepth;
    };
    
    const shortestPath=checkDepth(json.startPage);
    if(shortestPath<5){
      warnings.push(`Story has path to ending in only ${shortestPath} pages. Recommended minimum: 5 pages`);
    }
  }
  
  const validScenes=['village','village_park','forest','forest_stream','forest_clearing','forest_deep','mountain_valley','mountain_ridge','mountain_peak','house_entry','house_living','snow','cherry','volcano','beach','sunset','cave'];
  Object.values(json.pages||{}).forEach(page=>{
    if(!validScenes.includes(page.scene)){
      warnings.push(`Invalid scene '${page.scene}' in page '${page.id}'`);
    }
  });
  
  return{valid:errors.length===0,errors,warnings};
}

/* ═════════════════════════════════════════════════
   OAK DIALOGUE
═════════════════════════════════════════════════ */
function goOak(){show('s-oak');step=0;renderStep();}

function renderStep(){
  const steps=L[lang].oakSteps;
  const raw=typeof steps[step]==='function'?steps[step](U):steps[step];
  typewrite('oak-txt',raw);
  document.getElementById('oak-lbl').textContent=t('oakLabel');
  const ctrl=document.getElementById('oak-ctrl');
  ctrl.innerHTML='';

  if(step===0)ctrl.appendChild(mkB(t('continueBtn'),'pxbtn pb-grn',()=>{step++;renderStep();}));
  else if(step===1)ctrl.appendChild(mkB(t('reallyBtn'),'pxbtn pb-grn',()=>{step++;renderStep();}));
  else if(step===2)ctrl.appendChild(mkB(t('letsgoBtn'),'pxbtn pb-grn',()=>{step++;renderStep();}));
  else if(step===3||step===4){
    const isAge=step===4;
    const row=document.createElement('div');row.className='inp-row';
    const inp=document.createElement('input');
    inp.className='tinp';
    inp.placeholder=isAge?t('agePh'):t('namePh');
    inp.type=isAge?'number':'text';
    inp.maxLength=40;
    const validate=v=>isAge?(+v>0&&+v<120):v.trim().length>0;
    const errMsg=isAge?t('ageErr'):t('nameErr');
    const ok=mkB(t('okBtn'),'pxbtn pb-grn',()=>{
      if(!validate(inp.value)){inp.style.borderColor='var(--red)';inp.placeholder=errMsg;return;}
      U[isAge?'age':'name']=inp.value.trim();step++;renderStep();
    });
    inp.onkeydown=e=>{if(e.key==='Enter')ok.click();};
    row.appendChild(inp);row.appendChild(ok);ctrl.appendChild(row);
    setTimeout(()=>inp.focus(),350);
  }
  else if(step===5){
    const row=document.createElement('div');row.className='crow';
    [{key:'Boy',lbl:t('boy'),cls:'gb-boy'},{key:'Girl',lbl:t('girl'),cls:'gb-girl'}].forEach(({key,lbl,cls})=>{
      const b=document.createElement('button');b.className=`gbtn ${cls}`;
      b.textContent=(key==='Boy'?'👦 ':'👧 ')+lbl;
      b.onclick=()=>{U.gender=key;step++;renderStep();};
      row.appendChild(b);
    });
    ctrl.appendChild(row);
  }
  else if(step===6){
    const grid=document.createElement('div');grid.className='pk-grid';let sel=null;
    POKES.forEach(p=>{
      const c=document.createElement('button');c.className='pk-card';
      c.innerHTML=`<span class="em">${p.e}</span>${p.n}`;
      c.onclick=()=>{grid.querySelectorAll('.pk-card').forEach(x=>x.classList.remove('sel'));c.classList.add('sel');sel=p;};
      grid.appendChild(c);
    });
    const r2=document.createElement('div');r2.style.marginTop='9px';
    const ok2=mkB(t('chooseBtn'),'pxbtn pb-grn',()=>{
      if(!sel)return;U.pokemon=sel.n;U.pokeId=sel.id;step++;renderStep();
    });
    r2.appendChild(ok2);ctrl.appendChild(grid);ctrl.appendChild(r2);
  }
  else if(step===7){
    const b=mkB(t('startBtn'),'pxbtn pb-red',()=>loadStoryAndStart());
    b.style.marginTop='11px';ctrl.appendChild(b);
  }
}

/* ═════════════════════════════════════════════════
   STORY LOADING & RENDERING
═════════════════════════════════════════════════ */
function loadStoryAndStart(){
  show('s-gen');
  document.getElementById('gen-ttl').innerHTML='LOADING YOUR<br>STORY...';
  document.getElementById('gen-st').textContent='Selecting best adventure...';
  
  setTimeout(()=>{
    currentStory=selectBestStory(U);
    currentPageId=currentStory.startPage;
    pageHistory=[currentPageId];
    
    loadCry(U.pokeId);
    document.getElementById('pk-spr').src=spriteUrl(U.pokeId);
    
    show('s-book');
    renderPage(currentPageId);
  },1500);
}

function renderPage(pageId){
  const page=currentStory.pages[pageId];
  if(!page){
    toast('⚠️ Page not found!');
    return;
  }
  
  const rp=readingProfile(U.age);
  const pageNum=pageHistory.indexOf(pageId)+1;
  
  document.getElementById('pg-badge').textContent=`PAGE ${pageNum}`;
  document.getElementById('pg-ch').textContent=replaceVars(page.title,U);
  document.getElementById('pg-body').innerHTML=`<p>${replaceVars(page.text,U)}</p>`;
  document.getElementById('foot-num').textContent=`◂ ${pageNum} ▸`;
  document.getElementById('lvl-badge').textContent=`GR.${rp.grade}`;
  document.getElementById('btn-prev').disabled=pageHistory.length<=1;
  document.getElementById('end-ttl').textContent=t('endTitle');
  document.getElementById('end-sub').textContent=t('endSub',U.name,U.pokemon);
  document.getElementById('end-menu-btn').textContent=t('endMenuBtn');
  const sh=document.getElementById('swipe-hint');if(sh)sh.textContent=t('swipeHint');
  
  // Load background - use exact scene name or fallback to village
  const bgSrc=BGS[page.scene]||BGS.village;
  document.getElementById('bg-img').src=bgSrc;
  
  // Use base scene name for particles (e.g., 'forest_stream' → 'forest')
  const sceneBase=page.scene.split('_')[0];
  startParticles(sceneBase);
  
  const choiceContainer=document.getElementById('choice-container');
  choiceContainer.innerHTML='';
  
  // Check if this is an ending page (no choices)
  const isEndingPage=!page.choices||page.choices.length===0;
  
  // Enforce minimum 5 pages before allowing endings
  // Use pageHistory.length (total pages visited) not pageNum (which uses indexOf)
  const MIN_PAGES=5;
  if(isEndingPage&&pageHistory.length<MIN_PAGES){
    // Story is too short - show error and go back
    toast(`⚠️ Story too short! Minimum ${MIN_PAGES} pages required. Visited: ${pageHistory.length}. Going back...`,4000);
    setTimeout(()=>navBack(),2000);
    return;
  }
  
  if(isEndingPage){
    // Show "The End" button instead of auto-fade
    const choiceDiv=document.createElement('div');
    choiceDiv.className='choice-buttons';
    const endBtn=document.createElement('button');
    endBtn.className='choice-btn end-btn';
    endBtn.textContent='📖 THE END';
    endBtn.onclick=()=>showOakEnding();
    choiceDiv.appendChild(endBtn);
    choiceContainer.appendChild(choiceDiv);
  }else{
    const choiceDiv=document.createElement('div');
    choiceDiv.className='choice-buttons';
    page.choices.forEach(choice=>{
      const btn=document.createElement('button');
      btn.className='choice-btn';
      btn.textContent=replaceVars(choice.text,U);
      btn.onclick=()=>makeChoice(choice.next);
      choiceDiv.appendChild(btn);
    });
    choiceContainer.appendChild(choiceDiv);
  }
  
  if(pageNum===4)setTimeout(()=>playCry(),700);
}

function showOakEnding(){
  // Step 1: Fade to black (2 seconds)
  const fadeOverlay=document.getElementById('fade-overlay');
  fadeOverlay.classList.add('active');
  
  setTimeout(()=>{
    // Step 2: Switch to Oak screen
    document.getElementById('s-book').classList.add('off');
    const oakScreen=document.getElementById('s-oak');
    oakScreen.classList.remove('off');
    oakScreen.classList.add('ending');
    
    // Step 3: Start Oak ending dialogue
    step=0;
    renderOakEnding();
    
    // Step 4: Fade in Oak screen
    setTimeout(()=>{
      fadeOverlay.classList.remove('active');
    },100);
  },2000);
}

function renderOakEnding(){
  const endings=L[lang].oakEnding;
  const msg=typeof endings[step]==='function'?endings[step](U):endings[step];
  typewrite('oak-txt',msg);
  document.getElementById('oak-lbl').textContent=t('oakLabel');
  
  const ctrl=document.getElementById('oak-ctrl');
  ctrl.innerHTML='';
  
  if(step<endings.length-1){
    // Continue button
    ctrl.appendChild(mkB(t('continueBtn'),'pxbtn pb-grn',()=>{step++;renderOakEnding();}));
  }else{
    // Final screen - show Play Again and Main Menu
    const row=document.createElement('div');
    row.style.display='flex';
    row.style.gap='10px';
    row.style.flexWrap='wrap';
    row.style.marginTop='15px';
    
    const playAgain=mkB(t('playAgainBtn'),'pxbtn pb-blue',()=>{
      document.getElementById('s-oak').classList.remove('ending');
      step=0;
      goOak();
    });
    
    const mainMenu=mkB(t('endMenuBtn'),'pxbtn pb-red',()=>{
      document.getElementById('s-oak').classList.remove('ending');
      backToMenu();
    });
    
    row.appendChild(playAgain);
    row.appendChild(mainMenu);
    ctrl.appendChild(row);
  }
}

function makeChoice(nextPageId){
  currentPageId=nextPageId;
  pageHistory.push(nextPageId);
  renderPage(nextPageId);
}

function navBack(){
  if(pageHistory.length<=1)return;
  pageHistory.pop();
  currentPageId=pageHistory[pageHistory.length-1];
  renderPage(currentPageId);
}

/* ═════════════════════════════════════════════════
   PARTICLES
═════════════════════════════════════════════════ */
function startParticles(scene){
  if(animId){cancelAnimationFrame(animId);animId=null;}
  if(cleanFn){cleanFn();cleanFn=null;}
  const canvas=document.getElementById('p-canvas');
  const pl=document.getElementById('p-left');
  
  // Wait for element to be visible and have dimensions
  if(!canvas||!pl||!pl.offsetWidth||!pl.offsetHeight){
    setTimeout(()=>startParticles(scene),100);
    return;
  }
  
  const ctx=canvas.getContext('2d');
  canvas.width=pl.offsetWidth;canvas.height=pl.offsetHeight;
  const W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);let pts=[];
  if(scene==='forest'||scene==='cherry'){
    const col=scene==='cherry'?['#ffb7c5','#ff8fa3','#ffd4df']:['#4a8a20','#6aaa30','#88cc44'];
    for(let i=0;i<26;i++)pts.push({x:Math.random()*W,y:Math.random()*H,sz:3+Math.random()*5,sp:.3+Math.random()*.5,dx:(Math.random()-.5)*.4,rot:Math.random()*Math.PI*2,rs:(Math.random()-.5)*.04,c:col[Math.floor(Math.random()*col.length)]});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.globalAlpha=.75;ctx.beginPath();ctx.ellipse(0,0,p.sz,p.sz*.5,0,0,Math.PI*2);ctx.fill();ctx.restore();p.y+=p.sp;p.x+=p.dx;p.rot+=p.rs;if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }else if(scene==='snow'){
    for(let i=0;i<55;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2.5,sp:.4+Math.random()*.7,dx:(Math.random()-.5)*.3});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.fillStyle='rgba(255,255,255,.72)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.sp;p.x+=p.dx;if(p.y>H+5){p.y=-5;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }else if(scene==='volcano'){
    const iv=setInterval(()=>{pts.push({x:W*.5+(Math.random()-.5)*W*.15,y:H*.35,vx:(Math.random()-.5)*2.5,vy:-(2+Math.random()*3.5),r:2+Math.random()*3,life:1,c:['#ff8820','#ff4410','#ffcc30'][Math.floor(Math.random()*3)]});},90);
    cleanFn=()=>clearInterval(iv);
    function draw(){ctx.clearRect(0,0,W,H);pts=pts.filter(p=>p.life>0);pts.forEach(p=>{ctx.globalAlpha=p.life*.9;ctx.fillStyle=p.c;ctx.shadowBlur=8;ctx.shadowColor=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.life-=.018;});ctx.globalAlpha=1;ctx.shadowBlur=0;animId=requestAnimationFrame(draw);}draw();
  }else if(scene==='sunset'||scene==='cave'){
    for(let i=0;i<28;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2,vy:-(0.2+Math.random()*.4),vx:(Math.random()-.5)*.2,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.5;ctx.fillStyle=scene==='cave'?'#aa88ff':'#ffdd88';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.vy;p.x+=p.vx;p.life+=.004;if(p.life>1||p.y<-5){p.life=0;p.y=H;p.x=Math.random()*W;}});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }else if(scene==='beach'){
    for(let i=0;i<20;i++)pts.push({x:Math.random()*W,y:.78*H+Math.random()*.15*H,r:1.5+Math.random()*3,vx:(Math.random()-.5)*.4,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.45;ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.stroke();p.x+=p.vx;p.life+=.007;if(p.life>1){p.life=0;p.x=Math.random()*W;}});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }else{
    for(let i=0;i<15;i++)pts.push({x:Math.random()*W,y:Math.random()*H*.8,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.3,r:1.5+Math.random()*2,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.55;ctx.fillStyle='#ffcc00';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;p.life+=.005;if(p.life>1){p.life=0;p.x=Math.random()*W;p.y=Math.random()*H*.8;}if(p.x<0)p.x=W;if(p.x>W)p.x=0;});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }
}

window.addEventListener('resize',()=>{if(currentStory&&!document.getElementById('s-book').classList.contains('off')){startParticles(currentStory.pages[currentPageId]?.scene||'village');}});

/* TOUCH SWIPE - Disabled for branching stories, use choice buttons instead */

/* ═════════════════════════════════════════════════
   PROMPT GENERATOR
═════════════════════════════════════════════════ */
function generatePrompt(){
  const theme=document.getElementById('theme').value==='custom'?document.getElementById('theme-custom').value:document.getElementById('theme').value;
  const ageRange=document.getElementById('age-range').value;
  const langGen=document.querySelector('input[name="lang-gen"]:checked').value;
  const numPages=document.getElementById('num-pages').value;
  const branchStyle=document.querySelector('input[name="branch-style"]:checked').value;
  const scenes=Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked')).map(cb=>cb.value).filter(v=>v!=='on');
  const genderBoy=document.getElementById('gender-boy').checked;
  const genderGirl=document.getElementById('gender-girl').checked;
  const pokemonCompat=document.querySelector('input[name="pokemon-compat"]:checked').value;
  const pokemonSpecific=document.getElementById('pokemon-specific').value;
  const mood=document.getElementById('mood').value;
  const additional=document.getElementById('additional').value;
  
  if(scenes.length<3){
    toast('⚠️ Please select at least 3 scenes');
    return;
  }
  if(!genderBoy&&!genderGirl){
    toast('⚠️ Story must support at least one gender');
    return;
  }
  
  const [minAge,maxAge]=ageRange.split('-').map(n=>n.trim().replace('+',''));
  const ageTier=+maxAge<=6?'simple':+maxAge<=10?'medium':'advanced';
  const numChoices=branchStyle==='linear'?0:branchStyle==='simple'?2:3;
  
  const readingGuidelines={
    '5-6':'Grade K - Use ONLY 3-5 word sentences. Use only the 100 most common words. Heavy repetition required. Maximum 3 sentences per paragraph. Example: "The sun was up. It was warm. The sun was bright."',
    '7-8':'Grades 1-2 - Short 5-8 word simple sentences. Basic phonics vocabulary. 3-4 sentences per paragraph. One idea per sentence. Example: "Today was a special day. The birds were singing loudly."',
    '9-10':'Grades 3-4 - Mix of simple and compound sentences. Grade 3-4 vocabulary. Some descriptive adjectives. 5-6 sentences per paragraph. Light adventure tone.',
    '11-12':'Grades 5-6 - Complex and simple sentences mixed. Strong vocabulary. Metaphors and vivid imagery. 7-8 sentences per paragraph. Exciting page-turning narrative.',
    '13-14':'Grades 7-8 - Complex sentences. Advanced vocabulary. Layered descriptions. Thematic depth. Immersive literary storytelling with subtext.',
    '15+':'Grade 9+ - Mature literary style. Advanced vocabulary and figurative language. Complex themes and rich narrative voice. Atmospheric and introspective.'
  };
  
  const prompt=`You are a professional children's story author specializing in Pokémon adventures for young readers.

Create an interactive branching story in JSON format following these EXACT specifications:

═══════════════════════════════════════════════════════════
📋 STORY REQUIREMENTS
═══════════════════════════════════════════════════════════

THEME: ${theme}
TARGET AGE: ${ageRange} years old
READING LEVEL: ${readingGuidelines[ageRange]}

LANGUAGE: ${langGen==='is'?'Icelandic - Write entirely in natural, fluent Icelandic. Use Icelandic names for locations where appropriate.':'English'}

STORY STRUCTURE:
  - Total pages: ${numPages}
  - Branching style: ${branchStyle==='linear'?'Linear (no choices)':branchStyle==='simple'?'Simple (2 choices per page, 2-3 endings)':'Complex (3 choices per page, 4-6 endings)'}
  ${branchStyle!=='linear'?`- Each page (except ending) must have ${numChoices} choices`:''}
  - Final page(s) have NO choices (endings)
  - ⚠️ CRITICAL: MINIMUM 5 pages before ANY ending (do not create shortcuts to endings!)

CRITICAL - USE 3-ACT STRUCTURE:
  ACT 1 (Beginning - First ${Math.ceil(numPages*0.25)}-${Math.ceil(numPages*0.3)} pages):
    - Introduce the world and characters
    - {{name}} and {{pokemon}} begin their adventure
    - Inciting incident - something happens that starts the story
    - First meaningful choice
  
  ACT 2 (Middle - Next ${Math.ceil(numPages*0.5)}-${Math.ceil(numPages*0.55)} pages):
    - Journey and exploration
    - Face challenges and make important decisions
    - Multiple branching paths (this is where stories diverge most)
    - Build tension and stakes
    - Show {{name}} and {{pokemon}}'s bond growing
    - Include consequence callbacks (reference earlier choices)
  
  ACT 3 (End - Final ${Math.ceil(numPages*0.25)}-${Math.ceil(numPages*0.3)} pages):
    - Paths may reconverge for shared climactic moment
    - Final major decision
    - Resolution of the adventure
    - Satisfying endings that reflect player choices
    - Emotional payoff

DEPTH REQUIREMENTS:
  - ⚠️ MANDATORY: Do NOT create ANY path that reaches an ending in less than 5 pages
  - Every possible story path must be at least 5 pages deep
  - Create meaningful branching - choices should lead to different experiences
  - Some paths can reconverge for shared moments before diverging again
  - Aim for ${branchStyle==='simple'?'3-4':'5-6'} unique endings
  - Each ending should feel earned and distinct
  - Think: Can a player reach an ending in 2-3 clicks? If YES, add more pages!

REQUIRED SCENES:
  - Must use these scenes: ${scenes.join(', ')}
  - Available: village, village_park, forest, forest_stream, forest_clearing, forest_deep, mountain_valley, mountain_ridge, mountain_peak, house_entry, house_living, snow, cherry, volcano, beach, sunset, cave

STORY MOOD: ${mood}

${additional?`ADDITIONAL INSTRUCTIONS: ${additional}`:''}

═══════════════════════════════════════════════════════════
📐 JSON STRUCTURE (CRITICAL - FOLLOW EXACTLY)
═══════════════════════════════════════════════════════════

Return ONLY valid JSON in this exact format (no markdown, no explanation):

{
  "meta": {
    "id": "story_${theme}_${Date.now()}",
    "title": "Story Title Here",
    "language": "${langGen}",
    "author": "AI Generated",
    "created": "${new Date().toISOString().split('T')[0]}",
    "ageRange": {
      "min": ${minAge},
      "max": ${maxAge==='+'?99:maxAge},
      "tier": "${ageTier}"
    },
    "genderSupport": {
      "boy": ${genderBoy},
      "girl": ${genderGirl}
    },
    "pokemonFlexible": ${pokemonCompat==='flexible'},
    "requiredPokemon": ${pokemonCompat==='flexible'?'[]':`["${pokemonSpecific.split(',').map(s=>s.trim()).join('","')}"]`},
    "theme": "${theme}",
    "mood": "${mood}",
    "totalPages": ${numPages},
    "scenesUsed": ["${scenes.join('","')}"]
  },
  "pages": {
    "start": {
      "id": "start",
      "title": "Chapter Title (≤5 words)",
      "scene": "${scenes[0]}",
      "text": "Story text here. CRITICAL: Use {{name}} for child's name, {{pokemon}} for their Pokémon, {{he}} or {{she}} for pronouns, {{his}} or {{her}} for possessive. Write at the specified reading level.",
      ${branchStyle!=='linear'?`"choices": [
        {
          "text": "Choice button text (≤6 words)",
          "next": "page_2a"
        },
        {
          "text": "Choice button text (≤6 words)",
          "next": "page_2b"
        }${numChoices>=3?`,
        {
          "text": "Choice button text (≤6 words)",
          "next": "page_2c"
        }`:''}
      ]`:`"choices": []`}
    },
    "page_2a": {
      "id": "page_2a",
      "title": "Next Chapter",
      "scene": "${scenes[1]||scenes[0]}",
      "text": "Continue story based on previous choice...",
      "choices": [...]
    }
    // ... create ${numPages} total pages
    // ... ending pages have "choices": []
  },
  "startPage": "start"
}

═══════════════════════════════════════════════════════════
✅ VALIDATION CHECKLIST
═══════════════════════════════════════════════════════════

Before returning, verify:
✓ All page IDs referenced in "next" fields exist in "pages"
✓ "startPage" exists in "pages"
✓ At least one page has empty "choices" array (ending)
✓ ALL text uses template variables: {{name}}, {{pokemon}}, {{he}}, {{she}}, {{his}}, {{her}}
✓ Reading level is STRICTLY followed (sentence length, vocabulary)
✓ Scene names are EXACT: village, village_park, forest, forest_stream, forest_clearing, forest_deep, mountain_valley, mountain_ridge, mountain_peak, house_entry, house_living, snow, cherry, volcano, beach, sunset, cave
✓ Story has clear beginning, middle, and satisfying ending(s)
✓ Total page count matches ${numPages}
✓ Language is consistent (${langGen==='is'?'all Icelandic':'all English'})
✓ NO hardcoded names or Pokémon — ONLY template variables

═══════════════════════════════════════════════════════════
💡 TEMPLATE VARIABLE USAGE (CRITICAL)
═══════════════════════════════════════════════════════════

✓ CORRECT: "{{name}} opened {{his}} backpack. {{He}} found a Potion!"
✓ CORRECT: "{{pokemon}} nuzzled against {{name}}'s hand."
✗ WRONG: "Emma opened her backpack." (hardcoded name/gender)
✗ WRONG: "Pikachu used Thunderbolt." (hardcoded pokemon)

The app automatically replaces these based on user choices.

═══════════════════════════════════════════════════════════
🎯 OUTPUT FORMAT
═══════════════════════════════════════════════════════════

Return ONLY the JSON object. No markdown code fences, no explanations, no preamble.
Start your response with { and end with }`;

  document.getElementById('generated-prompt').value=prompt;
  toast('✨ Prompt generated! Copy and paste into AI.',4000,true);
}

function copyPrompt(){
  const prompt=document.getElementById('generated-prompt').value;
  if(!prompt){
    toast('⚠️ Generate prompt first');
    return;
  }
  navigator.clipboard.writeText(prompt).then(()=>{
    toast('📋 Prompt copied to clipboard!',3000,true);
  }).catch(()=>{
    toast('⚠️ Copy failed. Select and copy manually.');
  });
}



/* ═════════════════════════════════════════════════
   STORY MANAGEMENT
═════════════════════════════════════════════════ */
function renderLibrary(){
  const lib=loadLibrary();
  const container=document.getElementById('story-library');
  container.innerHTML='';
  
  if(Object.keys(lib.stories).length===0){
    container.innerHTML='<p style="text-align:center;color:#6b7280;padding:40px;">No stories yet. Create or import one!</p>';
    return;
  }
  
  Object.values(lib.stories).forEach(story=>{
    const isDefault=story.meta.id.startsWith('default_');
    const playCount=lib.settings.playCount[story.meta.id]||0;
    
    const card=document.createElement('div');
    card.className='story-card'+(isDefault?' default':'');
    
    const genderIcons=[];
    if(story.meta.genderSupport?.boy)genderIcons.push('👦');
    if(story.meta.genderSupport?.girl)genderIcons.push('👧');
    
    card.innerHTML=`
      <div class="story-header">
        <div class="story-title">${story.meta.title}</div>
      </div>
      <div class="story-meta">
        ${story.meta.language.toUpperCase()} • Ages ${story.meta.ageRange.min}-${story.meta.ageRange.max} • ${genderIcons.join('')} • ${story.meta.pokemonFlexible?'Any Pokémon':'Specific Pokémon'}<br>
        Theme: ${story.meta.theme} • ${story.meta.totalPages} pages • Played ${playCount} times
      </div>
      <div class="story-tags">
        ${story.meta.scenesUsed.map(s=>`<span class="tag">${s}</span>`).join('')}
      </div>
      <div class="story-actions">
        <button class="pxbtn pb-blue" style="font-size:9px;padding:8px 14px;" onclick="exportStory('${story.meta.id}')">📤 EXPORT</button>
        ${!isDefault?`<button class="pxbtn pb-red" style="font-size:9px;padding:8px 14px;" onclick="deleteStory('${story.meta.id}')">🗑️ DELETE</button>`:''}
      </div>
    `;
    
    container.appendChild(card);
  });
}

function importStory(){
  const jsonText=document.getElementById('json-paste').value.trim();
  if(!jsonText){
    toast('⚠️ Please paste JSON or upload file');
    return;
  }
  
  try{
    const story=JSON.parse(jsonText);
    const validation=validateStory(story);
    
    if(!validation.valid){
      toast('❌ Validation failed:\n' + validation.errors.join('\n'),6000);
      return;
    }
    
    if(validation.warnings.length>0){
      console.warn('Story warnings:',validation.warnings);
    }
    
    const lib=loadLibrary();
    lib.stories[story.meta.id]=story;
    
    if(saveLibrary(lib)){
      toast('✅ Story imported successfully!',3000,true);
      clearImport();
      renderLibrary();
    }
  }catch(e){
    toast(`❌ Invalid JSON: ${e.message}`,5000);
  }
}

function handleFileUpload(event){
  const file=event.target.files[0];
  if(!file)return;
  
  const reader=new FileReader();
  reader.onload=(e)=>{
    document.getElementById('json-paste').value=e.target.result;
    toast('📁 File loaded. Click IMPORT.',3000,true);
  };
  reader.onerror=()=>toast('❌ File read failed');
  reader.readAsText(file);
}

function clearImport(){
  document.getElementById('json-paste').value='';
  document.getElementById('file-upload').value='';
}

function exportStory(storyId){
  const lib=loadLibrary();
  const story=lib.stories[storyId];
  if(!story){
    toast('⚠️ Story not found');
    return;
  }
  
  const json=JSON.stringify(story,null,2);
  const blob=new Blob([json],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`${storyId}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('📤 Story exported!',3000,true);
}

function deleteStory(storyId){
  if(!confirm('Delete this story? This cannot be undone.'))return;
  
  const lib=loadLibrary();
  delete lib.stories[storyId];
  delete lib.settings.playCount[storyId];
  
  if(saveLibrary(lib)){
    toast('🗑️ Story deleted',3000,true);
    renderLibrary();
  }
}

/* ═════════════════════════════════════════════════
   DEFAULT STORIES
═════════════════════════════════════════════════ */
const DEFAULT_SIMPLE_EN={
  meta:{
    id:'default_simple_en',
    title:'The Lost Berry Adventure',
    language:'en',
    author:'Built-in',
    created:'2026-02-19',
    ageRange:{min:5,max:6,tier:'simple'},
    genderSupport:{boy:true,girl:true},
    pokemonFlexible:true,
    requiredPokemon:[],
    theme:'friendship',
    mood:'cheerful',
    totalPages:12,
    scenesUsed:['village','forest','cherry','beach','sunset']
  },
  pages:{
    // ACT 1: BEGINNING (Pages 1-4)
    start:{
      id:'start',
      title:'A Big Day',
      scene:'village',
      text:'{{name}} woke up early. The sun was shining bright! "Today will be fun!" {{name}} said. {{pokemon}} jumped up and down. They were ready to play!',
      choices:[
        {text:'Go to the forest',next:'forest_intro'},
        {text:'Go to the park',next:'park_intro'},
        {text:'Stay and play at home',next:'home_play'}
      ]
    },
    forest_intro:{
      id:'forest_intro',
      title:'Big Trees',
      scene:'forest',
      text:'{{name}} walked into the forest. The trees were so tall! {{pokemon}} ran ahead and found something. It was a berry! A big red berry.',
      choices:[
        {text:'Eat the berry',next:'eat_berry'},
        {text:'Save it for later',next:'save_berry'}
      ]
    },
    park_intro:{
      id:'park_intro',
      title:'Pretty Park',
      scene:'cherry',
      text:'{{name}} went to the park. Pink flowers were everywhere! {{pokemon}} jumped in the flowers. Then {{he}} heard a sound. A little cry!',
      choices:[
        {text:'Look for the sound',next:'find_oddish'},
        {text:'Keep playing',next:'play_more'}
      ]
    },
    home_play:{
      id:'home_play',
      title:'Home Fun',
      scene:'village',
      text:'{{name}} and {{pokemon}} played at home. They had toys and games. But then {{pokemon}} looked outside. {{He}} wanted to go out!',
      choices:[
        {text:'Go outside now',next:'forest_intro'},
        {text:'Play one more game',next:'one_more_game'}
      ]
    },
    eat_berry:{
      id:'eat_berry',
      title:'Yummy Berry',
      scene:'forest',
      text:'{{name}} ate the berry. It was so good! {{pokemon}} wanted one too. They looked around. No more berries here. They needed to find more!',
      choices:[
        {text:'Search the forest',next:'search_forest'},
        {text:'Go to the beach',next:'beach_trip'}
      ]
    },
    save_berry:{
      id:'save_berry',
      title:'Good Idea',
      scene:'forest',
      text:'{{name}} put the berry in {{his}} pocket. "We might need this!" {{name}} said. {{pokemon}} nodded. That was smart! Then they heard a cry.',
      choices:[
        {text:'Follow the sound',next:'find_oddish'},
        {text:'Keep exploring',next:'search_forest'}
      ]
    },
    
    // ACT 2: ADVENTURE (Pages 5-9)
    find_oddish:{
      id:'find_oddish',
      title:'A New Friend',
      scene:'forest',
      text:'{{name}} found a small Oddish! It looked sad. Its leaf was bent. "Oh no!" {{name}} said. {{pokemon}} looked worried too.',
      choices:[
        {text:'Help the Oddish',next:'help_oddish'},
        {text:'Find help',next:'get_help'},
        {text:'Give it the berry',next:'give_berry'}
      ]
    },
    play_more:{
      id:'play_more',
      title:'More Playing',
      scene:'cherry',
      text:'{{name}} and {{pokemon}} kept playing. They chased butterflies. They smelled flowers. It was so nice! Then {{pokemon}} found a path.',
      choices:[
        {text:'Follow the path',next:'secret_garden_entrance'},
        {text:'Stay in the park',next:'park_fun_continue'}
      ]
    },
    secret_garden_entrance:{
      id:'secret_garden_entrance',
      title:'Hidden Path',
      scene:'cherry',
      text:'The path was covered in flowers. {{pokemon}} walked ahead slowly. {{name}} followed. Where did this path go? It looked magical!',
      choices:[
        {text:'Keep following',next:'secret_path'}
      ]
    },
    park_fun_continue:{
      id:'park_fun_continue',
      title:'Happy Park Day',
      scene:'cherry',
      text:'{{name}} and {{pokemon}} played on the swings. They rolled down the hill. They laughed and laughed! The park was the best place ever.',
      choices:[
        {text:'Play more games',next:'park_fun'}
      ]
    },
    one_more_game:{
      id:'one_more_game',
      title:'One More',
      scene:'village',
      text:'They played hide and seek. {{pokemon}} was good at hiding! {{name}} counted. "Ready or not!" Then {{name}} heard something outside.',
      choices:[
        {text:'Go check it out',next:'forest_intro'},
        {text:'Finish the game',next:'park_intro'}
      ]
    },
    search_forest:{
      id:'search_forest',
      title:'Looking Around',
      scene:'forest',
      text:'{{name}} and {{pokemon}} walked deeper. They saw birds and bugs. Then they heard a cry! Something needed help!',
      choices:[
        {text:'Go help',next:'find_oddish'},
        {text:'Be careful',next:'careful_approach'}
      ]
    },
    beach_trip:{
      id:'beach_trip',
      title:'To the Beach',
      scene:'beach',
      text:'They walked to the beach. The water was blue! {{pokemon}} played in the sand. Then they saw something shiny! What was it?',
      choices:[
        {text:'Dig it up',next:'digging_sand'},
        {text:'Look at the water',next:'water_explore'}
      ]
    },
    digging_sand:{
      id:'digging_sand',
      title:'Sand Discovery',
      scene:'beach',
      text:'{{name}} and {{pokemon}} dug in the sand together. They dug deeper and deeper. Sand flew everywhere! This was fun!',
      choices:[
        {text:'Keep digging',next:'find_shell'}
      ]
    },
    water_explore:{
      id:'water_explore',
      title:'Ocean Waves',
      scene:'beach',
      text:'{{name}} walked to the water. The waves splashed! {{pokemon}} jumped in the water. It felt cool and nice. They played together.',
      choices:[
        {text:'Play more',next:'water_fun'}
      ]
    },
    
    // ACT 3: RESOLUTION (Pages 10-12)
    help_oddish:{
      id:'help_oddish',
      title:'Being Kind',
      scene:'forest',
      text:'{{name}} carefully fixed the leaf. The Oddish smiled! It was happy now. {{pokemon}} and Oddish became friends. They all played together!',
      choices:[
        {text:'Play more',next:'ending_friends'},
        {text:'Go home happy',next:'ending_home'}
      ]
    },
    get_help:{
      id:'get_help',
      title:'Good Thinking',
      scene:'village',
      text:'{{name}} ran to get Mom. Mom knew what to do! They came back and helped Oddish. Everyone was happy!',
      choices:[
        {text:'Thank Mom',next:'ending_grateful'},
        {text:'Play with Oddish',next:'ending_friends'}
      ]
    },
    give_berry:{
      id:'give_berry',
      title:'Sharing is Caring',
      scene:'forest',
      text:'{{name}} gave Oddish the berry! Oddish ate it and felt better. Its leaf stood up! "You saved it!" {{pokemon}} was so proud.',
      choices:[
        {text:'Celebrate together',next:'ending_friends'}
      ]
    },
    secret_path:{
      id:'secret_path',
      title:'A Secret Place',
      scene:'cherry',
      text:'The path led to a secret garden! Flowers everywhere! {{pokemon}} was amazed. This was the best day ever!',
      choices:[
        {text:'Pick flowers',next:'ending_flowers'}
      ]
    },
    park_fun:{
      id:'park_fun',
      title:'Happy Playing',
      scene:'cherry',
      text:'{{name}} and {{pokemon}} played until sunset. They were tired but happy. Time to go home!',
      choices:[
        {text:'Go home',next:'ending_home'}
      ]
    },
    careful_approach:{
      id:'careful_approach',
      title:'Careful Steps',
      scene:'forest',
      text:'{{name}} walked slowly. {{pokemon}} went first. They found the Oddish and helped it together. Teamwork!',
      choices:[
        {text:'Celebrate',next:'ending_friends'}
      ]
    },
    find_shell:{
      id:'find_shell',
      title:'Pretty Shell',
      scene:'beach',
      text:'{{name}} found a beautiful shell! It sparkled in the sun. {{pokemon}} loved it. They kept it as a treasure!',
      choices:[
        {text:'Take it home',next:'ending_treasure'}
      ]
    },
    water_fun:{
      id:'water_fun',
      title:'Beach Day',
      scene:'beach',
      text:'{{name}} and {{pokemon}} splashed in the water. They built sand castles. The ocean was warm and nice!',
      choices:[
        {text:'Stay and play',next:'ending_beach'}
      ]
    },
    
    // ENDINGS
    ending_friends:{
      id:'ending_friends',
      title:'Best Friends',
      scene:'sunset',
      text:'{{name}}, {{pokemon}}, and Oddish all played together. The sun went down. They were best friends now! "What a perfect day!" {{name}} smiled.',
      choices:[]
    },
    ending_home:{
      id:'ending_home',
      title:'Home Sweet Home',
      scene:'sunset',
      text:'{{name}} and {{pokemon}} walked home. They were tired but happy. Mom had dinner ready. "Did you have fun?" she asked. "The best!" {{name}} said.',
      choices:[]
    },
    ending_grateful:{
      id:'ending_grateful',
      title:'Thank You',
      scene:'village',
      text:'{{name}} hugged Mom. "Thank you for helping!" Mom smiled. "You were very kind to help Oddish." {{name}} felt proud. {{pokemon}} did too!',
      choices:[]
    },
    ending_flowers:{
      id:'ending_flowers',
      title:'Flower Crown',
      scene:'cherry',
      text:'{{name}} made a flower crown! {{pokemon}} wore it proudly. They danced in the secret garden until the sun set. Magic!',
      choices:[]
    },
    ending_treasure:{
      id:'ending_treasure',
      title:'Special Treasure',
      scene:'sunset',
      text:'{{name}} put the shell on {{his}} shelf at home. It would remind {{him}} of this special day. {{pokemon}} nuzzled {{his}} hand. Best friends forever!',
      choices:[]
    },
    ending_beach:{
      id:'ending_beach',
      title:'Perfect Beach Day',
      scene:'beach',
      text:'As the sun set over the ocean, {{name}} and {{pokemon}} sat on the sand. The sky was pink and orange. "This was the best day ever!" {{name}} whispered.',
      choices:[]
    }
  },
  startPage:'start'
};

const DEFAULT_MEDIUM_EN={
  meta:{
    id:'default_medium_en',
    title:'The Crystal Cave Mystery',
    language:'en',
    author:'Built-in',
    created:'2026-02-19',
    ageRange:{min:7,max:10,tier:'medium'},
    genderSupport:{boy:true,girl:true},
    pokemonFlexible:true,
    requiredPokemon:[],
    theme:'mystery',
    mood:'exciting',
    totalPages:14,
    scenesUsed:['village','forest','cave','beach','volcano','sunset']
  },
  pages:{
    // ACT 1: BEGINNING (Pages 1-4)
    start:{
      id:'start',
      title:'A Strange Discovery',
      scene:'village',
      text:'{{name}} found an old map in the attic while cleaning. It showed a mysterious path through the forest, leading to something marked with a glowing star symbol. {{pokemon}} peered at the map curiously, tail wagging with excitement. This could be a real adventure!',
      choices:[
        {text:'Follow the map immediately',next:'eager_start'},
        {text:'Ask Mom about it first',next:'ask_mom'},
        {text:'Study the map carefully',next:'study_map'}
      ]
    },
    eager_start:{
      id:'eager_start',
      title:'Into Adventure',
      scene:'forest',
      text:'{{name}} and {{pokemon}} rushed into the forest with the map. The path was overgrown but the map showed the way clearly. After a while, they reached a fork in the path. The map showed both routes, but one was marked with a warning symbol.',
      choices:[
        {text:'Take the safe path',next:'safe_forest_path'},
        {text:'Take the marked path',next:'warning_path'},
        {text:'Climb a tree to look around',next:'tree_view'}
      ]
    },
    ask_mom:{
      id:'ask_mom',
      title:"Mom's Story",
      scene:'village',
      text:'Mom examined the map with surprise. "I remember this! Your grandfather used to talk about Crystal Cave - a place where rare crystals grow. He said it was beautiful but had challenges to reach it." She smiled warmly. "If you\'re going, take supplies and be careful!"',
      choices:[
        {text:'Pack supplies carefully',next:'pack_supplies'},
        {text:'Ask more questions',next:'learn_more'},
        {text:'Head out right away',next:'eager_start'}
      ]
    },
    study_map:{
      id:'study_map',
      title:'Map Secrets',
      scene:'village',
      text:'{{name}} noticed the map had more details than {{he}} first thought. There were three different symbols: a cave, a tree, and waves. Each seemed to mark a different route to the star location. {{pokemon}} pointed with {{his}} paw at the cave symbol.',
      choices:[
        {text:'Follow the cave route',next:'prepare_cave_journey'},
        {text:'Follow the tree route',next:'prepare_tree_journey'},
        {text:'Follow the wave route',next:'prepare_beach_journey'}
      ]
    },
    prepare_cave_journey:{
      id:'prepare_cave_journey',
      title:'Cave Preparation',
      scene:'village',
      text:'{{name}} decided to prepare for the cave journey. {{He}} packed a flashlight and warm jacket. Mom gave {{him}} a sandwich. "Caves can be dark and cold," she said. {{pokemon}} looked ready!',
      choices:[
        {text:'Head to the cave',next:'cave_route'}
      ]
    },
    prepare_tree_journey:{
      id:'prepare_tree_journey',
      title:'Tree Path Ready',
      scene:'village',
      text:'{{name}} got ready for the tree path. {{He}} packed rope and climbing gloves. {{pokemon}} practiced jumping. They were ready for an adventure in the trees!',
      choices:[
        {text:'Start the journey',next:'tree_route'}
      ]
    },
    prepare_beach_journey:{
      id:'prepare_beach_journey',
      title:'Beach Route Ready',
      scene:'village',
      text:'{{name}} prepared for the beach route. {{He}} packed towels and sunscreen. {{pokemon}} seemed excited about the water! They set off toward the coast together.',
      choices:[
        {text:'Go to the beach',next:'beach_route'}
      ]
    },
    
    // ACT 2: JOURNEY (Pages 5-10)
    pack_supplies:{
      id:'pack_supplies',
      title:'Well Prepared',
      scene:'village',
      text:'{{name}} packed a backpack with water, snacks, a flashlight, and rope. {{pokemon}} helped carry a smaller bag. Mom gave them sandwiches for the journey. "Being prepared makes adventures safer and more fun!" she said.',
      choices:[
        {text:'Take the forest path',next:'safe_forest_path'},
        {text:'Check the map again',next:'study_map'}
      ]
    },
    learn_more:{
      id:'learn_more',
      title:'Grandfather\'s Tale',
      scene:'village',
      text:'Mom told {{name}} that Grandfather found a beautiful crystal in the cave years ago. It glowed with inner light. "He left it there for others to discover," Mom said. "The journey itself was his real treasure - the friends he made along the way."',
      choices:[
        {text:'Feel inspired, head out',next:'eager_start'},
        {text:'Pack supplies first',next:'pack_supplies'}
      ]
    },
    safe_forest_path:{
      id:'safe_forest_path',
      title:'The Gentle Path',
      scene:'forest',
      text:'The safe path wound through beautiful parts of the forest. {{name}} and {{pokemon}} saw colorful birds and friendly Bug Pokémon. They came to a clearing where an old man sat resting. "Hello, young traveler!" he greeted them warmly.',
      choices:[
        {text:'Ask about the cave',next:'old_man_helps'},
        {text:'Share your snacks',next:'make_friend'},
        {text:'Keep going',next:'forest_deeper'}
      ]
    },
    warning_path:{
      id:'warning_path',
      title:'The Challenging Route',
      scene:'forest',
      text:'This path was more difficult with thick vines and fallen logs. But {{pokemon}} was excited by the challenge! They worked together, climbing and pushing through. {{pokemon}} seemed to grow more confident with each obstacle.',
      choices:[
        {text:'Continue bravely',next:'forest_deeper'},
        {text:'Rest and plan',next:'rest_planning'}
      ]
    },
    tree_view:{
      id:'tree_view',
      title:'A View From Above',
      scene:'forest',
      text:'{{name}} and {{pokemon}} climbed a tall tree. From up high, they could see the whole forest! In the distance, they spotted a cave entrance glowing faintly blue. They also saw smoke rising from another direction.',
      choices:[
        {text:'Head toward the glowing cave',next:'cave_route'},
        {text:'Investigate the smoke',next:'volcano_path'},
        {text:'Climb down and continue',next:'forest_deeper'}
      ]
    },
    cave_route:{
      id:'cave_route',
      title:'Cave Entrance',
      scene:'cave',
      text:'{{name}} found the cave entrance. Inside, it was cool and quiet. Strange blue crystals grew on the walls, providing a soft light. {{pokemon}} stayed close as they ventured deeper. The crystals seemed to hum quietly.',
      choices:[
        {text:'Touch a crystal',next:'crystal_touch_moment'},
        {text:'Follow the humming sound',next:'deeper_into_cave'},
        {text:'Look for another path',next:'cave_fork'}
      ]
    },
    crystal_touch_moment:{
      id:'crystal_touch_moment',
      title:'Crystal Glow',
      scene:'cave',
      text:'{{name}} gently touched a blue crystal. It glowed brighter! {{pokemon}} was amazed. The crystal felt warm and friendly. More crystals ahead glowed in response.',
      choices:[
        {text:'Go deeper',next:'crystal_reaction'}
      ]
    },
    deeper_into_cave:{
      id:'deeper_into_cave',
      title:'Following the Sound',
      scene:'cave',
      text:'The humming grew louder as they went deeper. {{pokemon}} led the way carefully. The path twisted and turned. They were getting close to something special!',
      choices:[
        {text:'Keep following',next:'crystal_chamber'}
      ]
    },
    tree_route:{
      id:'tree_route',
      title:'Through the Canopy',
      scene:'cherry',
      text:'Following tree symbols, {{name}} found a path through cherry blossom trees. Petals fell like pink snow. Hidden in the trees were wooden platforms - someone had built a tree path! It led toward the mountainside.',
      choices:[
        {text:'Follow the tree path',next:'tree_platforms'},
        {text:'Climb down to explore',next:'forest_deeper'}
      ]
    },
    beach_route:{
      id:'beach_route',
      title:'Coastal Discovery',
      scene:'beach',
      text:'The wave symbols led to a beautiful beach. {{pokemon}} played in the waves while {{name}} explored. Behind some rocks, {{he}} found a narrow path leading upward along the cliff face.',
      choices:[
        {text:'Take the cliff path',next:'cliff_climb'},
        {text:'Search the beach more',next:'beach_exploration'}
      ]
    },
    
    // ACT 2 CONTINUED (Pages 11-12)
    old_man_helps:{
      id:'old_man_helps',
      title:'Wise Words',
      scene:'forest',
      text:'The old man smiled. "Ah, seeking Crystal Cave! The crystals there reflect your heart. A kind person sees beauty, a brave person sees strength." He pointed to a hidden shortcut. "This way is faster."',
      choices:[
        {text:'Thank him and take shortcut',next:'crystal_chamber'},
        {text:'Stay and talk more',next:'make_friend'}
      ]
    },
    make_friend:{
      id:'make_friend',
      title:'New Friend',
      scene:'forest',
      text:'{{name}} shared the sandwiches with the old man. They talked about adventures and Pokémon. He was actually a famous explorer! "Your kindness reminds me why I loved exploring," he said, giving {{name}} a special stone. "This will light your way in the cave."',
      choices:[
        {text:'Continue to cave with gift',next:'crystal_chamber'}
      ]
    },
    forest_deeper:{
      id:'forest_deeper',
      title:'Deeper Woods',
      scene:'forest',
      text:'The forest grew denser. {{pokemon}} found tracks - someone else had been here recently. Following the tracks, they discovered the cave entrance was near!',
      choices:[
        {text:'Enter the cave',next:'cave_route'},
        {text:'Look around more',next:'rest_planning'}
      ]
    },
    rest_planning:{
      id:'rest_planning',
      title:'Strategic Rest',
      scene:'forest',
      text:'{{name}} and {{pokemon}} sat down to rest and plan. Looking at the map together, they noticed a detail they\'d missed - a small star near the cave entrance. It seemed to indicate something special.',
      choices:[
        {text:'Head to cave entrance',next:'cave_route'},
        {text:'Search for the small star',next:'find_marker'}
      ]
    },
    volcano_path:{
      id:'volcano_path',
      title:'Volcanic Trail',
      scene:'volcano',
      text:'The smoke led to an old volcanic area. The ground was warm! {{pokemon}} seemed nervous but {{name}} noticed the path was safe - just warm rocks. Beyond it, they could see the cave entrance.',
      choices:[
        {text:'Cross carefully',next:'crystal_chamber'},
        {text:'Find another way',next:'cave_route'}
      ]
    },
    
    // ACT 3: DISCOVERY & RESOLUTION (Pages 13-14)
    crystal_reaction:{
      id:'crystal_reaction',
      title:'Crystal Magic',
      scene:'cave',
      text:'When {{name}} touched the crystal, it glowed brighter! {{pokemon}} touched one too, and suddenly the cave filled with gentle rainbow light. The crystals were reacting to their friendship!',
      choices:[
        {text:'Explore the glowing chamber',next:'ending_discovery'}
      ]
    },
    crystal_chamber:{
      id:'crystal_chamber',
      title:'The Crystal Heart',
      scene:'cave',
      text:'Following the humming sound, {{name}} and {{pokemon}} found a huge chamber. In the center stood the largest crystal they\'d ever seen, glowing with soft blue and pink light. This was it - the treasure marked on the map!',
      choices:[
        {text:'Admire the crystal',next:'ending_discovery'},
        {text:'Touch it gently',next:'ending_magic'}
      ]
    },
    cave_fork:{
      id:'cave_fork',
      title:'Two Paths',
      scene:'cave',
      text:'The cave split into two passages. One glowed blue, the other sparkled. {{pokemon}} seemed drawn to the sparkling path.',
      choices:[
        {text:'Trust {{pokemon}}\'s instinct',next:'crystal_chamber'},
        {text:'Take the blue path',next:'crystal_reaction'}
      ]
    },
    tree_platforms:{
      id:'tree_platforms',
      title:'Ancient Tree Path',
      scene:'cherry',
      text:'The platforms led higher and higher through the trees. From the highest platform, {{name}} could see directly into the cave through a natural opening above! A rope ladder led down.',
      choices:[
        {text:'Take the secret entrance',next:'crystal_chamber'}
      ]
    },
    cliff_climb:{
      id:'cliff_climb',
      title:'Brave Ascent',
      scene:'beach',
      text:'{{name}} and {{pokemon}} carefully climbed the cliff path. It was challenging but the view was incredible! At the top, they found the cave entrance hidden behind a waterfall.',
      choices:[
        {text:'Enter through waterfall',next:'crystal_chamber'}
      ]
    },
    beach_exploration:{
      id:'beach_exploration',
      title:'Tide Pool Discovery',
      scene:'beach',
      text:'Exploring the beach, {{name}} found beautiful tide pools with small Water Pokémon. One pool had a carved stone showing the way to the cave. They followed the clues inland.',
      choices:[
        {text:'Follow the clues',next:'cave_route'}
      ]
    },
    find_marker:{
      id:'find_marker',
      title:'The Hidden Marker',
      scene:'forest',
      text:'{{name}} found a small star carved into a tree! Below it was a message: "The true treasure is the journey and who you share it with." {{pokemon}} nuzzled {{name}}\'s hand.',
      choices:[
        {text:'Continue to the cave',next:'crystal_chamber'}
      ]
    },
    
    // ENDINGS
    ending_discovery:{
      id:'ending_discovery',
      title:'True Treasure Found',
      scene:'sunset',
      text:'{{name}} and {{pokemon}} sat in the crystal chamber as sunset light filtered through cracks above, making the crystals dance with color. They realized Grandfather was right - the real treasure wasn\'t the crystals, but the adventure they\'d shared together. Their bond had grown stronger with every choice they made.',
      choices:[]
    },
    ending_magic:{
      id:'ending_magic',
      title:'Crystal\'s Gift',
      scene:'cave',
      text:'When {{name}} touched the great crystal, it pulsed with warm light. Images appeared showing all the moments of their journey - every choice, every challenge overcome together. The crystal was showing them their own story! {{pokemon}} and {{name}} hugged, understanding now that their friendship was the greatest treasure of all.',
      choices:[]
    }
  },
  startPage:'start'
};

