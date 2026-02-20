/* ═════════════════════════════════════════════════
   GLOBALS & CONFIG
═════════════════════════════════════════════════ */
const BGS={village:'assets/bg_village.jpg',village_park:'assets/bg_village_park.jpg',forest:'assets/bg_forest.jpg',forest_stream:'assets/bg_forest_stream.jpg',forest_clearing:'assets/bg_forest_clearing.jpg',forest_deep:'assets/bg_forest_deep.jpg',mountain_valley:'assets/bg_mountain_valley.jpg',mountain_ridge:'assets/bg_mountain_ridge.jpg',mountain_peak:'assets/bg_mountain_peak.jpg',house_entry:'assets/bg_house_entry.jpg',house_living:'assets/bg_house_living.jpg',snow:'assets/bg_snow.jpg',cherry:'assets/bg_cherry.jpg',volcano:'assets/bg_volcano.jpg',beach:'assets/bg_beach.jpg',sunset:'assets/bg_sunset.jpg',cave:'assets/bg_cave.jpg'};

const ITEMS={
  oran_berry:{name:'Oran Berry',emoji:'🫐',description:'A sweet blue berry that restores energy. Most Pokémon love its taste!'},
  pecha_berry:{name:'Pecha Berry',emoji:'🍑',description:'A soft, juicy pink berry with healing properties. Smells wonderful!'},
  pokesnack:{name:'Pokésnack',emoji:'🍪',description:'A crunchy treat that all Pokémon enjoy. Perfect for making friends!'},
  honey_jar:{name:'Honey Jar',emoji:'🍯',description:'Sweet and sticky honey. Bug-type Pokémon find it irresistible!'},
  fresh_water:{name:'Fresh Water',emoji:'💧',description:'Cool, refreshing water. Water-type Pokémon especially love it.'},
  moomoo_milk:{name:'Moomoo Milk',emoji:'🥛',description:'Creamy, nutritious milk from Miltank. Very popular with Normal-types!'},
  rainbow_herb:{name:'Rainbow Herb',emoji:'🌿',description:'An aromatic herb with a calming scent. Grass-types are drawn to it.'},
  stardust:{name:'Stardust',emoji:'✨',description:'Sparkly powder with a mystical glow. Psychic and Fairy Pokémon love it!'},
  charcoal:{name:'Charcoal',emoji:'🔥',description:'Warm, glowing charcoal. Fire-type Pokémon gather around it.'},
  silver_leaf:{name:'Silver Leaf',emoji:'🍃',description:'A rare, shimmering leaf. Flying-type Pokémon treasure it.'}
};

const TYPE_ITEM_MAP={
  fire:'charcoal',
  water:'fresh_water',
  grass:'rainbow_herb',
  bug:'honey_jar',
  normal:'pokesnack',
  psychic:'stardust',
  fairy:'stardust',
  flying:'silver_leaf',
  electric:'oran_berry',
  poison:'pecha_berry',
  ground:'fresh_water',
  rock:'fresh_water',
  fighting:'moomoo_milk',
  ice:'fresh_water',
  ghost:'stardust',
  dragon:'silver_leaf',
  dark:'charcoal',
  steel:'silver_leaf'
};

const POKES=[
  {n:'Bulbasaur',e:'🌱',id:1},{n:'Ivysaur',e:'🌿',id:2},{n:'Venusaur',e:'🌺',id:3},
  {n:'Charmander',e:'🔥',id:4},{n:'Charmeleon',e:'🔥',id:5},{n:'Charizard',e:'🐉',id:6},
  {n:'Squirtle',e:'💧',id:7},{n:'Wartortle',e:'🌊',id:8},{n:'Blastoise',e:'🐢',id:9},
  {n:'Caterpie',e:'🐛',id:10},{n:'Metapod',e:'🟢',id:11},{n:'Butterfree',e:'🦋',id:12},
  {n:'Weedle',e:'🐛',id:13},{n:'Kakuna',e:'🟡',id:14},{n:'Beedrill',e:'🐝',id:15},
  {n:'Pidgey',e:'🐦',id:16},{n:'Pidgeotto',e:'🦅',id:17},{n:'Pidgeot',e:'🦅',id:18},
  {n:'Rattata',e:'🐀',id:19},{n:'Raticate',e:'🐀',id:20},{n:'Spearow',e:'🐦',id:21},
  {n:'Fearow',e:'🦅',id:22},{n:'Ekans',e:'🐍',id:23},{n:'Arbok',e:'🐍',id:24},
  {n:'Pikachu',e:'⚡',id:25},{n:'Raichu',e:'⚡',id:26},{n:'Sandshrew',e:'🦔',id:27},
  {n:'Sandslash',e:'🦔',id:28},{n:'Nidoran♀',e:'💜',id:29},{n:'Nidorina',e:'💜',id:30},
  {n:'Nidoqueen',e:'👑',id:31},{n:'Nidoran♂',e:'💙',id:32},{n:'Nidorino',e:'💙',id:33},
  {n:'Nidoking',e:'👑',id:34},{n:'Clefairy',e:'⭐',id:35},{n:'Clefable',e:'✨',id:36},
  {n:'Vulpix',e:'🦊',id:37},{n:'Ninetales',e:'🦊',id:38},{n:'Jigglypuff',e:'🎵',id:39},
  {n:'Wigglytuff',e:'🎵',id:40},{n:'Zubat',e:'🦇',id:41},{n:'Golbat',e:'🦇',id:42},
  {n:'Oddish',e:'🌱',id:43},{n:'Gloom',e:'🌺',id:44},{n:'Vileplume',e:'🌸',id:45},
  {n:'Paras',e:'🍄',id:46},{n:'Parasect',e:'🍄',id:47},{n:'Venonat',e:'🐛',id:48},
  {n:'Venomoth',e:'🦋',id:49},{n:'Diglett',e:'⛏️',id:50},{n:'Dugtrio',e:'⛏️',id:51},
  {n:'Meowth',e:'🪙',id:52},{n:'Persian',e:'😼',id:53},{n:'Psyduck',e:'🦆',id:54},
  {n:'Golduck',e:'🦆',id:55},{n:'Mankey',e:'🐵',id:56},{n:'Primeape',e:'🦍',id:57},
  {n:'Growlithe',e:'🐕',id:58},{n:'Arcanine',e:'🐕',id:59},{n:'Poliwag',e:'🐸',id:60},
  {n:'Poliwhirl',e:'🐸',id:61},{n:'Poliwrath',e:'🐸',id:62},{n:'Abra',e:'🔮',id:63},
  {n:'Kadabra',e:'🔮',id:64},{n:'Alakazam',e:'🔮',id:65},{n:'Machop',e:'💪',id:66},
  {n:'Machoke',e:'💪',id:67},{n:'Machamp',e:'💪',id:68},{n:'Bellsprout',e:'🌿',id:69},
  {n:'Weepinbell',e:'🌿',id:70},{n:'Victreebel',e:'🌿',id:71},{n:'Tentacool',e:'🦑',id:72},
  {n:'Tentacruel',e:'🦑',id:73},{n:'Geodude',e:'🪨',id:74},{n:'Graveler',e:'🪨',id:75},
  {n:'Golem',e:'🪨',id:76},{n:'Ponyta',e:'🐴',id:77},{n:'Rapidash',e:'🐴',id:78},
  {n:'Slowpoke',e:'🦛',id:79},{n:'Slowbro',e:'🦛',id:80},{n:'Magnemite',e:'🧲',id:81},
  {n:'Magneton',e:'🧲',id:82},{n:'Farfetch\'d',e:'🦆',id:83},{n:'Doduo',e:'🦤',id:84},
  {n:'Dodrio',e:'🦤',id:85},{n:'Seel',e:'🦭',id:86},{n:'Dewgong',e:'🦭',id:87},
  {n:'Grimer',e:'💜',id:88},{n:'Muk',e:'💜',id:89},{n:'Shellder',e:'🐚',id:90},
  {n:'Cloyster',e:'🐚',id:91},{n:'Gastly',e:'👻',id:92},{n:'Haunter',e:'👻',id:93},
  {n:'Gengar',e:'👻',id:94},{n:'Onix',e:'🐍',id:95},{n:'Drowzee',e:'😴',id:96},
  {n:'Hypno',e:'😴',id:97},{n:'Krabby',e:'🦀',id:98},{n:'Kingler',e:'🦀',id:99},
  {n:'Voltorb',e:'⚡',id:100},{n:'Electrode',e:'⚡',id:101},{n:'Exeggcute',e:'🥚',id:102},
  {n:'Exeggutor',e:'🌴',id:103},{n:'Cubone',e:'🦴',id:104},{n:'Marowak',e:'🦴',id:105},
  {n:'Hitmonlee',e:'🥋',id:106},{n:'Hitmonchan',e:'🥊',id:107},{n:'Lickitung',e:'👅',id:108},
  {n:'Koffing',e:'☁️',id:109},{n:'Weezing',e:'☁️',id:110},{n:'Rhyhorn',e:'🦏',id:111},
  {n:'Rhydon',e:'🦏',id:112},{n:'Chansey',e:'💖',id:113},{n:'Tangela',e:'🌿',id:114},
  {n:'Kangaskhan',e:'🦘',id:115},{n:'Horsea',e:'🐴',id:116},{n:'Seadra',e:'🐉',id:117},
  {n:'Goldeen',e:'🐠',id:118},{n:'Seaking',e:'🐠',id:119},{n:'Staryu',e:'⭐',id:120},
  {n:'Starmie',e:'💎',id:121},{n:'Mr. Mime',e:'🎭',id:122},{n:'Scyther',e:'🪲',id:123},
  {n:'Jynx',e:'💋',id:124},{n:'Electabuzz',e:'⚡',id:125},{n:'Magmar',e:'🔥',id:126},
  {n:'Pinsir',e:'🪲',id:127},{n:'Tauros',e:'🐂',id:128},{n:'Magikarp',e:'🐟',id:129},
  {n:'Gyarados',e:'🐉',id:130},{n:'Lapras',e:'🦕',id:131},{n:'Ditto',e:'💧',id:132},
  {n:'Eevee',e:'🦊',id:133},{n:'Vaporeon',e:'💧',id:134},{n:'Jolteon',e:'⚡',id:135},
  {n:'Flareon',e:'🔥',id:136},{n:'Porygon',e:'💾',id:137},{n:'Omanyte',e:'🐚',id:138},
  {n:'Omastar',e:'🐚',id:139},{n:'Kabuto',e:'🦀',id:140},{n:'Kabutops',e:'🦀',id:141},
  {n:'Aerodactyl',e:'🦕',id:142},{n:'Snorlax',e:'💤',id:143},{n:'Articuno',e:'❄️',id:144},
  {n:'Zapdos',e:'⚡',id:145},{n:'Moltres',e:'🔥',id:146},{n:'Dratini',e:'🐉',id:147},
  {n:'Dragonair',e:'🐉',id:148},{n:'Dragonite',e:'🐉',id:149},{n:'Mewtwo',e:'🌀',id:150},
  {n:'Mew',e:'✨',id:151}
];

let lang='en';
let cry=null;
let animId=null,cleanFn=null;

const U={name:'',age:'',gender:''};
let userInventory={items:[],pokemon:[]};
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
      "First — what is your name, young reader?",
      d=>`${d.name}! Great name! And how old are you, ${d.name}?`,
      d=>`${d.age} years old! Perfect. Are you a boy or a girl?`,
      d=>`A ${d.gender}! Excellent, ${d.name}! Let me find the perfect adventure for you!`
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
function goPokedex(){
  loadInventory();
  show('s-pokedex');
  renderPokedex();
}

function renderPokedex(){
  const grid=document.getElementById('pokemon-grid');
  if(!grid)return;
  grid.innerHTML='';
  
  POKES.forEach(p=>{
    const caught=userInventory.pokemon.includes(p.id);
    const card=document.createElement('div');
    card.className=`pokemon-card ${caught?'caught':'unknown'}`;
    
    if(caught){
      card.innerHTML=`
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png" alt="${p.n}">
        <span class="poke-number">#${String(p.id).padStart(3,'0')}</span>
        <span class="poke-name">${p.n}</span>
      `;
      card.onclick=()=>showPokedex(p.id,false);
    }else{
      card.innerHTML=`
        <div class="silhouette">?</div>
        <span class="poke-number">#${String(p.id).padStart(3,'0')}</span>
        <span class="poke-name">???</span>
      `;
    }
    
    grid.appendChild(card);
  });
  
  const countEl=document.getElementById('caught-count');
  if(countEl)countEl.textContent=userInventory.pokemon.length;
}


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

/* ═════════════════════════════════════════════════
   INVENTORY MANAGEMENT
═════════════════════════════════════════════════ */
function loadInventory(){
  try{
    const stored=localStorage.getItem('userInventory');
    if(stored){
      userInventory=JSON.parse(stored);
    }
  }catch(e){
    userInventory={items:[],pokemon:[]};
  }
}

function saveInventory(){
  try{
    localStorage.setItem('userInventory',JSON.stringify(userInventory));
  }catch(e){
    console.error('Failed to save inventory',e);
  }
}

function addItem(itemKey){
  if(!userInventory.items.includes(itemKey)){
    userInventory.items.push(itemKey);
    saveInventory();
    const item=ITEMS[itemKey];
    toast(`Found ${item.emoji} ${item.name}!`,3000,true);
    return true;
  }
  return false;
}

function hasItem(itemKey){
  return userInventory.items.includes(itemKey);
}

function addPokemon(pokemonId){
  if(!userInventory.pokemon.includes(pokemonId)){
    userInventory.pokemon.push(pokemonId);
    saveInventory();
    const poke=POKES.find(p=>p.id===pokemonId);
    toast(`${poke.e} ${poke.n} joined you!`,3000,true);
    return true;
  }
  return false;
}

function hasPokemon(pokemonId){
  return userInventory.pokemon.includes(pokemonId);
}

function renderInventory(){
  const container=document.getElementById('inventory-display');
  if(!container)return;
  
  container.innerHTML='';
  
  userInventory.items.forEach(itemKey=>{
    const item=ITEMS[itemKey];
    if(item){
      const span=document.createElement('span');
      span.className='inv-item';
      span.title=item.name;
      span.textContent=item.emoji;
      container.appendChild(span);
    }
  });
  
  if(userInventory.pokemon.length>0){
    const pokeCount=document.createElement('span');
    pokeCount.className='inv-pokemon-count';
    pokeCount.textContent=`⚡${userInventory.pokemon.length}`;
    pokeCount.title=`${userInventory.pokemon.length} Pokémon caught`;
    container.appendChild(pokeCount);
  }
}

/* ═════════════════════════════════════════════════
   POKEDEX SYSTEM
═════════════════════════════════════════════════ */
async function showPokedex(pokemonId,showBefriend=true){
  const modal=document.getElementById('pokedex-modal');
  modal.classList.add('loading');
  modal.classList.add('show');
  
  try{
    const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data=await response.json();
    const speciesRes=await fetch(data.species.url);
    const speciesData=await speciesRes.json();
    
    document.getElementById('pdex-sprite').src=data.sprites.other['official-artwork'].front_default;
    document.getElementById('pdex-name').textContent=data.name.toUpperCase();
    document.getElementById('pdex-height').textContent=`${(data.height/10).toFixed(1)}m`;
    document.getElementById('pdex-weight').textContent=`${(data.weight/10).toFixed(1)}kg`;
    
    const typesDiv=document.getElementById('pdex-types');
    typesDiv.innerHTML='';
    data.types.forEach(t=>{
      const typeSpan=document.createElement('span');
      typeSpan.className=`type-badge type-${t.type.name}`;
      typeSpan.textContent=t.type.name.toUpperCase();
      typesDiv.appendChild(typeSpan);
    });
    
    const flavorText=speciesData.flavor_text_entries.find(e=>e.language.name==='en');
    document.getElementById('pdex-description').textContent=flavorText?.flavor_text.replace(/\f/g,' ')||'A mysterious Pokémon!';
    
    if(showBefriend){
      const primaryType=data.types[0].type.name;
      const itemKey=TYPE_ITEM_MAP[primaryType]||'pokesnack';
      const item=ITEMS[itemKey];
      document.getElementById('pdex-befriend').innerHTML=`Give it <strong>${item.emoji} ${item.name}</strong>!<br>${item.description}`;
      document.querySelector('.befriend-section').style.display='block';
    }else{
      document.querySelector('.befriend-section').style.display='none';
    }
    
    modal.classList.remove('loading');
  }catch(e){
    console.error('Failed to load Pokémon data:',e);
    toast('⚠️ Failed to load Pokédex data');
    closePokedex();
  }
}

function closePokedex(){
  document.getElementById('pokedex-modal').classList.remove('show');
}

/* ═════════════════════════════════════════════════
   VOCABULARY QUIZ SYSTEM
═════════════════════════════════════════════════ */
function showVocabQuiz(){
  if(!currentStory.meta||!currentStory.meta.vocabularyWord){
    showOakEnding();
    return;
  }
  
  const word=currentStory.meta.vocabularyWord;
  const correctDef=currentStory.meta.vocabularyDefinition;
  const wrongDefs=currentStory.meta.vocabularyWrongAnswers||[];
  
  document.getElementById('vocab-word').textContent=word;
  document.getElementById('vocab-context').textContent=`Remember: "${currentStory.meta.vocabularyContext||''}"`;
  
  const answers=[correctDef,...wrongDefs].sort(()=>Math.random()-0.5);
  answers.forEach((ans,i)=>{
    const btn=document.getElementById(`vocab-opt-${i}`);
    btn.textContent=ans;
    btn.className='vocab-btn';
  });
  
  window.vocabCorrectIndex=answers.indexOf(correctDef);
  
  document.getElementById('vocab-quiz').classList.add('show');
}

function checkVocab(choice){
  const btns=document.querySelectorAll('.vocab-btn');
  btns.forEach(btn=>btn.disabled=true);
  
  const chosenBtn=document.getElementById(`vocab-opt-${choice}`);
  
  if(choice===window.vocabCorrectIndex){
    chosenBtn.classList.add('correct');
    toast('✅ Correct! Great job!',2000,true);
  }else{
    chosenBtn.classList.add('wrong');
    document.getElementById(`vocab-opt-${window.vocabCorrectIndex}`).classList.add('correct');
    toast('Not quite, but nice try!',2000);
  }
  
  setTimeout(()=>{
    document.getElementById('vocab-quiz').classList.remove('show');
    btns.forEach(btn=>{
      btn.disabled=false;
      btn.className='vocab-btn';
    });
    showOakEnding();
  },2500);
}

/* ═════════════════════════════════════════════════
   POKEMON ENCOUNTER & ITEM COLLECTION
═════════════════════════════════════════════════ */
function showPokemonEncounter(pokemonId){
  // Show pokemon sprite
  const pkSprite=document.getElementById('pk-spr');
  pkSprite.src=spriteUrl(pokemonId);
  pkSprite.style.display='block';
  
  // Load cry
  loadCry(pokemonId);
  
  // Show Pokedex after a moment
  setTimeout(()=>{
    showPokedex(pokemonId,true);
    
    // After pokedex closes, check if user can befriend
    setTimeout(()=>{
      const pokemon=POKES.find(p=>p.id===pokemonId);
      if(!pokemon)return;
      
      // Get required item from type mapping
      const primaryType=getPokemonType(pokemonId);
      const requiredItem=TYPE_ITEM_MAP[primaryType]||'pokesnack';
      
      // Check if already caught
      if(hasPokemon(pokemonId)){
        toast(`You already befriended ${pokemon.n}!`,3000);
        return;
      }
      
      // Check if user has the item
      if(hasItem(requiredItem)){
        showBefriendButton(pokemonId,requiredItem);
      }else{
        const item=ITEMS[requiredItem];
        toast(`${pokemon.n} appeared! You need ${item.emoji} ${item.name} to befriend it.`,4000);
        setTimeout(()=>{
          pkSprite.style.display='none';
        },3000);
      }
    },1000);
  },1500);
}

function collectItem(itemKey){
  if(addItem(itemKey)){
    renderInventory();
    const item=ITEMS[itemKey];
    toast(`Found ${item.emoji} ${item.name}! You can use this to befriend Pokémon!`,4000,true);
  }
}

function getPokemonType(pokemonId){
  // This would normally fetch from PokeAPI, but for speed we'll use a simple mapping
  const typeMap={
    1:'grass',4:'fire',7:'water',10:'bug',25:'electric',54:'water',74:'rock',
    // Add more as needed
  };
  return typeMap[pokemonId]||'normal';
}

function showBefriendButton(pokemonId,itemKey){
  const pokemon=POKES.find(p=>p.id===pokemonId);
  const item=ITEMS[itemKey];
  
  const choiceContainer=document.getElementById('choice-container');
  const befriendDiv=document.createElement('div');
  befriendDiv.className='befriend-action';
  befriendDiv.innerHTML=`
    <p class="befriend-text">✨ ${pokemon.n} is interested in your ${item.emoji} ${item.name}!</p>
    <button class="choice-btn befriend-btn" onclick="befriendPokemon(${pokemonId},'${itemKey}')">
      💝 BEFRIEND ${pokemon.n.toUpperCase()}
    </button>
  `;
  
  // Insert at top of choice container
  if(choiceContainer.firstChild){
    choiceContainer.insertBefore(befriendDiv,choiceContainer.firstChild);
  }else{
    choiceContainer.appendChild(befriendDiv);
  }
}

function befriendPokemon(pokemonId,itemKey){
  const pokemon=POKES.find(p=>p.id===pokemonId);
  
  // Remove the item
  const itemIndex=userInventory.items.indexOf(itemKey);
  if(itemIndex>-1){
    userInventory.items.splice(itemIndex,1);
    saveInventory();
    renderInventory();
  }
  
  // Show pokeball animation
  showPokeballAnimation(()=>{
    // Add pokemon to collection
    addPokemon(pokemonId);
    
    // Hide pokemon sprite
    document.getElementById('pk-spr').style.display='none';
    
    // Remove befriend button
    const befriendDiv=document.querySelector('.befriend-action');
    if(befriendDiv)befriendDiv.remove();
    
    toast(`🎉 ${pokemon.n} is now your friend!`,3000,true);
  });
}

function showPokeballAnimation(callback){
  const overlay=document.createElement('div');
  overlay.className='pokeball-overlay';
  overlay.innerHTML=`
    <div class="pokeball-animation">
      <div class="pokeball">
        <div class="pokeball-top"></div>
        <div class="pokeball-middle"></div>
        <div class="pokeball-bottom"></div>
        <div class="pokeball-button"></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  
  setTimeout(()=>{
    overlay.classList.add('catching');
  },100);
  
  setTimeout(()=>{
    overlay.classList.add('caught');
  },2000);
  
  setTimeout(()=>{
    overlay.remove();
    if(callback)callback();
  },3000);
}

function showInventoryModal(){
  loadInventory();
  const modal=document.getElementById('inventory-modal');
  const grid=document.getElementById('inventory-modal-grid');
  grid.innerHTML='';
  
  // Show all 10 items
  Object.entries(ITEMS).forEach(([key,item])=>{
    const count=userInventory.items.filter(i=>i===key).length;
    const itemCard=document.createElement('div');
    itemCard.className='inventory-item-card';
    itemCard.innerHTML=`
      <div class="item-emoji">${item.emoji}</div>
      <div class="item-name">${item.name}</div>
      <div class="item-count">x${count}</div>
      <div class="item-desc">${item.description}</div>
    `;
    if(count===0)itemCard.classList.add('empty');
    grid.appendChild(itemCard);
  });
  
  modal.classList.add('show');
}

function closeInventoryModal(){
  document.getElementById('inventory-modal').classList.remove('show');
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
      default_medium_en:DEFAULT_MEDIUM_EN,
      default_hard_en:DEFAULT_HARD_EN
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
    
    loadInventory();
    renderInventory();
    
    // Hide pokemon sprite initially - will show if story has one
    document.getElementById('pk-spr').style.display='none';
    
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
  
  // Check for Pokemon encounter on this page
  if(currentStory.meta.hasPokemon&&currentStory.meta.pokemonPage===pageId){
    showPokemonEncounter(currentStory.meta.pokemonId);
  }
  
  // Check for item collection on this page
  if(currentStory.meta.collectibleItem&&currentStory.meta.itemPage===pageId){
    collectItem(currentStory.meta.collectibleItem);
  }
  
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
    endBtn.onclick=()=>showVocabQuiz();
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
  
  if(!canvas||!pl||!pl.offsetWidth||!pl.offsetHeight){
    setTimeout(()=>startParticles(scene),100);
    return;
  }
  
  const ctx=canvas.getContext('2d');
  canvas.width=pl.offsetWidth;canvas.height=pl.offsetHeight;
  const W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);let pts=[];
  
  // Forest scenes - leaves
  if(scene==='forest'||scene==='forest_deep'||scene==='forest_clearing'){
    const col=['#4a8a20','#6aaa30','#88cc44'];
    const count=scene==='forest_clearing'?35:26;
    for(let i=0;i<count;i++)pts.push({x:Math.random()*W,y:Math.random()*H,sz:3+Math.random()*5,sp:.3+Math.random()*.5,dx:(Math.random()-.5)*.4,rot:Math.random()*Math.PI*2,rs:(Math.random()-.5)*.04,c:col[Math.floor(Math.random()*col.length)]});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.globalAlpha=.75;ctx.beginPath();ctx.ellipse(0,0,p.sz,p.sz*.5,0,0,Math.PI*2);ctx.fill();ctx.restore();p.y+=p.sp;p.x+=p.dx;p.rot+=p.rs;if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }
  // Forest stream - water droplets
  else if(scene==='forest_stream'){
    for(let i=0;i<40;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:.8+Math.random()*1.5,sp:.5+Math.random()*.8,dx:(Math.random()-.5)*.2});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.fillStyle='rgba(100,180,255,.6)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.sp;p.x+=p.dx;if(p.y>H+5){p.y=-5;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }
  // Cherry blossoms
  else if(scene==='cherry'){
    const col=['#ffb7c5','#ff8fa3','#ffd4df'];
    for(let i=0;i<30;i++)pts.push({x:Math.random()*W,y:Math.random()*H,sz:3+Math.random()*5,sp:.3+Math.random()*.5,dx:(Math.random()-.5)*.4,rot:Math.random()*Math.PI*2,rs:(Math.random()-.5)*.04,c:col[Math.floor(Math.random()*col.length)]});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.globalAlpha=.75;ctx.beginPath();ctx.ellipse(0,0,p.sz,p.sz*.5,0,0,Math.PI*2);ctx.fill();ctx.restore();p.y+=p.sp;p.x+=p.dx;p.rot+=p.rs;if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }
  // Snow and mountain scenes
  else if(scene==='snow'||scene==='mountain_peak'||scene==='mountain_ridge'||scene==='mountain_valley'){
    const count=scene==='mountain_valley'?35:55;
    for(let i=0;i<count;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2.5,sp:.4+Math.random()*.7,dx:(Math.random()-.5)*.3});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.fillStyle='rgba(255,255,255,.72)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.sp;p.x+=p.dx;if(p.y>H+5){p.y=-5;p.x=Math.random()*W;}});animId=requestAnimationFrame(draw);}draw();
  }
  // Volcano - embers
  else if(scene==='volcano'){
    const iv=setInterval(()=>{pts.push({x:W*.5+(Math.random()-.5)*W*.15,y:H*.35,vx:(Math.random()-.5)*2.5,vy:-(2+Math.random()*3.5),r:2+Math.random()*3,life:1,c:['#ff8820','#ff4410','#ffcc30'][Math.floor(Math.random()*3)]});},90);
    cleanFn=()=>clearInterval(iv);
    function draw(){ctx.clearRect(0,0,W,H);pts=pts.filter(p=>p.life>0);pts.forEach(p=>{ctx.globalAlpha=p.life*.9;ctx.fillStyle=p.c;ctx.shadowBlur=8;ctx.shadowColor=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.x+=p.vx;p.y+=p.vy;p.vy+=.08;p.life-=.018;});ctx.globalAlpha=1;ctx.shadowBlur=0;animId=requestAnimationFrame(draw);}draw();
  }
  // Sunset - fireflies
  else if(scene==='sunset'){
    for(let i=0;i<28;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2,vy:-(0.2+Math.random()*.4),vx:(Math.random()-.5)*.2,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.5;ctx.fillStyle='#ffdd88';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.vy;p.x+=p.vx;p.life+=.004;if(p.life>1||p.y<-5){p.life=0;p.y=H;p.x=Math.random()*W;}});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }
  // Cave - sparkles
  else if(scene==='cave'){
    for(let i=0;i<28;i++)pts.push({x:Math.random()*W,y:Math.random()*H,r:1+Math.random()*2,vy:-(0.2+Math.random()*.4),vx:(Math.random()-.5)*.2,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.5;ctx.fillStyle='#aa88ff';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();p.y+=p.vy;p.x+=p.vx;p.life+=.004;if(p.life>1||p.y<-5){p.life=0;p.y=H;p.x=Math.random()*W;}});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }
  // Beach - bubbles
  else if(scene==='beach'){
    for(let i=0;i<20;i++)pts.push({x:Math.random()*W,y:.78*H+Math.random()*.15*H,r:1.5+Math.random()*3,vx:(Math.random()-.5)*.4,life:Math.random()});
    function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{ctx.globalAlpha=Math.sin(p.life*Math.PI)*.45;ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.stroke();p.x+=p.vx;p.life+=.007;if(p.life>1){p.life=0;p.x=Math.random()*W;}});ctx.globalAlpha=1;animId=requestAnimationFrame(draw);}draw();
  }
  // Default village - sparkles
  else{
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
    title:'The Magic Forest Path',
    language:'en',
    author:'Built-in',
    created:'2026-02-20',
    ageRange:{min:5,max:6,tier:'simple'},
    genderSupport:{boy:true,girl:true},
    theme:'adventure',
    mood:'cheerful',
    totalPages:12,
    scenesUsed:['village','forest','forest_clearing','forest_stream','sunset'],
    vocabularyWord:'sparkle',
    vocabularyContext:'The stones began to sparkle in the sunlight',
    vocabularyDefinition:'To shine with small flashes of light',
    vocabularyWrongAnswers:['To make a loud noise','To feel very cold'],
    hasPokemon:true,
    pokemonId:10,
    pokemonPage:'butterfly_chase',
    collectibleItem:'oran_berry',
    itemPage:'flower_smell'
  },
  pages:{
    start:{
      id:'start',
      title:'A Sunny Morning',
      scene:'village',
      text:'{{name}} woke up to a beautiful sunny day. "I want to explore!" {{he}} said. {{name}} put on {{his}} shoes and walked outside.',
      choices:[
        {text:'Go to the forest',next:'forest_path'},
        {text:'Visit the garden',next:'garden_visit'}
      ]
    },
    forest_path:{
      id:'forest_path',
      title:'The Forest Path',
      scene:'forest',
      text:'{{name}} walked down a pretty forest path. Birds were singing in the trees. The leaves made nice shadows on the ground.',
      choices:[
        {text:'Follow the birds',next:'bird_follow'},
        {text:'Look at the flowers',next:'flower_stop'}
      ]
    },
    garden_visit:{
      id:'garden_visit',
      title:'The Village Garden',
      scene:'village_park',
      text:'{{name}} went to the village garden. There were red flowers and yellow flowers. A butterfly flew past {{his}} nose!',
      choices:[
        {text:'Chase the butterfly',next:'butterfly_chase'},
        {text:'Smell the flowers',next:'flower_smell'}
      ]
    },
    bird_follow:{
      id:'bird_follow',
      title:'Singing Birds',
      scene:'forest',
      text:'{{name}} followed the birds. They led {{him}} to a clearing. In the middle was a big old tree. It had a hole in it!',
      choices:[
        {text:'Look in the hole',next:'tree_hole'},
        {text:'Climb the tree',next:'tree_climb'}
      ]
    },
    flower_stop:{
      id:'flower_stop',
      title:'Pretty Flowers',
      scene:'forest_clearing',
      text:'{{name}} stopped to look at the flowers. They were purple and white. A rabbit hopped out from behind them!',
      choices:[
        {text:'Say hello to rabbit',next:'rabbit_friend'},
        {text:'Pick some flowers',next:'pick_flowers'}
      ]
    },
    butterfly_chase:{
      id:'butterfly_chase',
      title:'Flying High',
      scene:'village_park',
      text:'{{name}} chased the butterfly. It flew up and down! Then it landed on a special flower. The flower was bright blue!',
      choices:[
        {text:'Touch the flower',next:'magic_flower'},
        {text:'Keep watching',next:'watch_butterfly'}
      ]
    },
    flower_smell:{
      id:'flower_smell',
      title:'Sweet Smell',
      scene:'village_park',
      text:'{{name}} smelled the flowers. They smelled so sweet! Then {{he}} saw something shiny under a leaf. It was a pretty stone!',
      choices:[
        {text:'Pick up the stone',next:'find_stone'},
        {text:'Leave it there',next:'leave_stone'}
      ]
    },
    tree_hole:{
      id:'tree_hole',
      title:'A Surprise',
      scene:'forest_clearing',
      text:'{{name}} looked in the tree hole. Inside was a family of squirrels! They were eating acorns. Mama squirrel waved at {{name}}!',
      choices:[
        {text:'Wave back',next:'squirrel_friend'},
        {text:'Give them space',next:'walk_stream'}
      ]
    },
    tree_climb:{
      id:'tree_climb',
      title:'Up High',
      scene:'forest',
      text:'{{name}} climbed up the tree. {{He}} could see very far! There was a stream with sparkly water nearby.',
      choices:[
        {text:'Go to the stream',next:'walk_stream'},
        {text:'Stay in the tree',next:'tree_rest'}
      ]
    },
    rabbit_friend:{
      id:'rabbit_friend',
      title:'New Friend',
      scene:'forest_clearing',
      text:'The rabbit hopped closer. It had soft gray fur. {{name}} sat very still. The rabbit ate a carrot next to {{him}}!',
      choices:[
        {text:'Pet the rabbit',next:'gentle_pet'},
        {text:'Walk to the stream',next:'walk_stream'}
      ]
    },
    pick_flowers:{
      id:'pick_flowers',
      title:'A Bouquet',
      scene:'forest_clearing',
      text:'{{name}} picked some flowers. {{He}} made a pretty bouquet! It had five flowers in it. Time to head home and show everyone!',
      choices:[]
    },
    magic_flower:{
      id:'magic_flower',
      title:'Something Special',
      scene:'village_park',
      text:'{{name}} touched the blue flower. It felt warm! Suddenly lots of butterflies came. They danced all around {{name}}!',
      choices:[
        {text:'Dance with them',next:'butterfly_dance'},
        {text:'Stand very still',next:'butterfly_land'}
      ]
    },
    watch_butterfly:{
      id:'watch_butterfly',
      title:'Beautiful Wings',
      scene:'village_park',
      text:'{{name}} watched the butterfly. Its wings had orange and black spots. After a minute, it flew away to the forest. What a nice day!',
      choices:[]
    },
    find_stone:{
      id:'find_stone',
      title:'A Shiny Stone',
      scene:'village_park',
      text:'{{name}} picked up the stone. It was smooth and round. The stones began to sparkle in the sunlight! {{name}} put it in {{his}} pocket to keep forever.',
      choices:[]
    },
    leave_stone:{
      id:'leave_stone',
      title:'A Good Choice',
      scene:'village_park',
      text:'{{name}} left the stone there. Maybe another kid would find it! {{He}} felt happy. Time to go home for lunch!',
      choices:[]
    },
    squirrel_friend:{
      id:'squirrel_friend',
      title:'Happy Squirrels',
      scene:'forest_clearing',
      text:'{{name}} waved at the squirrels. They chittered happily! One baby squirrel peeked out and looked at {{name}}. So cute!',
      choices:[
        {text:'Say goodbye',next:'walk_home_forest'},
        {text:'Watch them play',next:'watch_squirrels'}
      ]
    },
    walk_stream:{
      id:'walk_stream',
      title:'The Pretty Stream',
      scene:'forest_stream',
      text:'{{name}} walked to the stream. The water was clear and cold. Little fish swam in it. {{name}} saw {{his}} reflection in the water!',
      choices:[
        {text:'Put feet in water',next:'wade_water'},
        {text:'Follow stream home',next:'stream_home'}
      ]
    },
    tree_rest:{
      id:'tree_rest',
      title:'High in the Tree',
      scene:'forest',
      text:'{{name}} stayed in the tree. The breeze felt nice. {{He}} could hear all the forest sounds. Birds, leaves, and water!',
      choices:[
        {text:'Climb down',next:'walk_home_forest'},
        {text:'Rest a bit more',next:'tree_nap'}
      ]
    },
    gentle_pet:{
      id:'gentle_pet',
      title:'Soft Fur',
      scene:'forest_clearing',
      text:'{{name}} gently pet the rabbit. Its fur was so soft! The rabbit closed its eyes. It liked {{name}} very much!',
      choices:[
        {text:'Stay with rabbit',next:'rabbit_play'},
        {text:'Walk home',next:'walk_home_forest'}
      ]
    },
    butterfly_dance:{
      id:'butterfly_dance',
      title:'A Magic Dance',
      scene:'village_park',
      text:'{{name}} danced with the butterflies! They flew in circles around {{him}}. It felt like magic! Then they all flew up into the sky.',
      choices:[]
    },
    butterfly_land:{
      id:'butterfly_land',
      title:'A Special Moment',
      scene:'village_park',
      text:'{{name}} stood very still. The butterflies landed on {{his}} arms and head! They tickled a little. After a minute, they flew away. Amazing!',
      choices:[]
    },
    watch_squirrels:{
      id:'watch_squirrels',
      title:'Playful Babies',
      scene:'forest_clearing',
      text:'{{name}} watched the baby squirrels play. They chased each other around the tree! One dropped an acorn on {{name}}`s head by mistake. {{name}} laughed!',
      choices:[]
    },
    wade_water:{
      id:'wade_water',
      title:'Cool Water',
      scene:'forest_stream',
      text:'{{name}} took off {{his}} shoes. {{He}} put {{his}} feet in the stream. The water was cool and felt good! Time to head home now.',
      choices:[]
    },
    stream_home:{
      id:'stream_home',
      title:'The Way Home',
      scene:'forest_stream',
      text:'{{name}} followed the stream. It led back toward the village! The sun was starting to set. What a perfect adventure day!',
      choices:[]
    },
    walk_home_forest:{
      id:'walk_home_forest',
      title:'Going Home',
      scene:'sunset',
      text:'{{name}} walked back home. The sky turned orange and pink. {{He}} had so many stories to tell! Tomorrow would be another fun day.',
      choices:[]
    },
    tree_nap:{
      id:'tree_nap',
      title:'A Little Rest',
      scene:'forest',
      text:'{{name}} rested in the tree. {{He}} closed {{his}} eyes for just a minute. When {{he}} opened them, the sun was lower. Time to go home!',
      choices:[]
    },
    rabbit_play:{
      id:'rabbit_play',
      title:'Best Friends',
      scene:'forest_clearing',
      text:'{{name}} and the rabbit played together. They hopped around the clearing! The rabbit showed {{name}} where it lived. What a good friend!',
      choices:[]
    }
  },
  startPage:'start'
};


const DEFAULT_MEDIUM_EN={
  meta:{
    id:'default_medium_en',
    title:'The Mountain Treasure Hunt',
    language:'en',
    author:'Built-in',
    created:'2026-02-20',
    ageRange:{min:7,max:10,tier:'medium'},
    genderSupport:{boy:true,girl:true},
    theme:'adventure',
    mood:'exciting',
    totalPages:14,
    scenesUsed:['village','mountain_valley','mountain_ridge','mountain_peak','forest','sunset'],
    vocabularyWord:'summit',
    vocabularyContext:'They finally reached the summit of the mountain',
    vocabularyDefinition:'The highest point of a mountain',
    vocabularyWrongAnswers:['The bottom of a valley','A type of climbing rope'],
    hasPokemon:true,
    pokemonId:74,
    pokemonPage:'ledge_climb',
    collectibleItem:'fresh_water',
    itemPage:'river_path'
  },
  pages:{
    start:{
      id:'start',
      title:'The Mysterious Map',
      scene:'village',
      text:'{{name}} found an old map in {{his}} attic. It showed mountains with an X marking a secret location. "I wonder what treasure is up there!" {{he}} thought excitedly.',
      choices:[
        {text:'Start the journey today',next:'prepare_journey'},
        {text:'Ask for advice first',next:'seek_advice'}
      ]
    },
    prepare_journey:{
      id:'prepare_journey',
      title:'Getting Ready',
      scene:'village',
      text:'{{name}} packed a backpack with water, snacks, and a compass. {{He}} put on sturdy hiking boots and grabbed the map. Time to find that treasure!',
      choices:[
        {text:'Take the valley path',next:'valley_start'},
        {text:'Head straight uphill',next:'steep_climb'}
      ]
    },
    seek_advice:{
      id:'seek_advice',
      title:'Wise Words',
      scene:'village',
      text:'{{name}} showed the map to an old mountaineer. "Ah, I know this place!" she said. "The journey is challenging, but the view is worth it. Take the valley path - it`s safer."',
      choices:[
        {text:'Follow her advice',next:'valley_start'},
        {text:'Try the quick route',next:'steep_climb'}
      ]
    },
    valley_start:{
      id:'valley_start',
      title:'The Valley Path',
      scene:'mountain_valley',
      text:'{{name}} entered a beautiful valley surrounded by tall peaks. A clear river ran through it, and wildflowers grew everywhere. The path split into two directions.',
      choices:[
        {text:'Follow the river',next:'river_path'},
        {text:'Take the forest trail',next:'forest_path'}
      ]
    },
    steep_climb:{
      id:'steep_climb',
      title:'A Tough Choice',
      scene:'mountain_ridge',
      text:'{{name}} tried climbing straight up, but the rocks were slippery and steep. After a few scary moments, {{he}} decided this was too dangerous. Time to find another way.',
      choices:[
        {text:'Go back to valley',next:'valley_start'}
      ]
    },
    river_path:{
      id:'river_path',
      title:'Following the Water',
      scene:'mountain_valley',
      text:'{{name}} walked beside the sparkling river. The sound of water was peaceful. Suddenly, {{he}} spotted something shiny caught between rocks - a small golden key!',
      choices:[
        {text:'Take the key',next:'get_key'},
        {text:'Leave it there',next:'continue_upstream'}
      ]
    },
    forest_path:{
      id:'forest_path',
      title:'Into the Woods',
      scene:'forest',
      text:'{{name}} entered a thick forest at the mountain`s base. Sunlight filtered through leaves, creating beautiful patterns. {{He}} noticed claw marks on a tree pointing upward.',
      choices:[
        {text:'Follow the marks',next:'marking_trail'},
        {text:'Find another path',next:'alternate_route'}
      ]
    },
    get_key:{
      id:'get_key',
      title:'A Lucky Find',
      scene:'mountain_valley',
      text:'{{name}} carefully picked up the golden key. It felt warm in {{his}} hand. {{He}} put it in {{his}} pocket, wondering what it might unlock later.',
      choices:[
        {text:'Keep going upstream',next:'continue_upstream'}
      ]
    },
    continue_upstream:{
      id:'continue_upstream',
      title:'Higher Ground',
      scene:'mountain_ridge',
      text:'{{name}} followed the river to its source - a waterfall! Behind it, {{he}} saw a narrow ledge leading up the mountain. The path was getting steeper.',
      choices:[
        {text:'Climb the ledge',next:'ledge_climb'},
        {text:'Look for easier route',next:'easier_path'}
      ]
    },
    marking_trail:{
      id:'marking_trail',
      title:'Ancient Markings',
      scene:'forest',
      text:'{{name}} followed the claw marks from tree to tree. They led to a hidden cave entrance! Inside, {{he}} could hear the echo of dripping water.',
      choices:[
        {text:'Enter the cave',next:'cave_passage'},
        {text:'Go around it',next:'around_cave'}
      ]
    },
    alternate_route:{
      id:'alternate_route',
      title:'The Winding Trail',
      scene:'forest',
      text:'{{name}} found a gentler trail winding up through the forest. It took longer, but it was safer. Eventually, {{he}} emerged above the tree line.',
      choices:[
        {text:'Continue upward',next:'above_treeline'}
      ]
    },
    ledge_climb:{
      id:'ledge_climb',
      title:'Careful Steps',
      scene:'mountain_ridge',
      text:'{{name}} carefully climbed the narrow ledge. {{He}} had to focus on every step. Finally, {{he}} pulled {{himself}} up onto a wide ridge with an amazing view!',
      choices:[
        {text:'Rest and look around',next:'ridge_rest'},
        {text:'Keep climbing',next:'final_ascent'}
      ]
    },
    easier_path:{
      id:'easier_path',
      title:'Smart Decision',
      scene:'mountain_ridge',
      text:'{{name}} found switchback trails that zigzagged up the mountain. It took longer, but it was much safer. Soon {{he}} reached the same ridge as the other path.',
      choices:[
        {text:'Take a break',next:'ridge_rest'},
        {text:'Push to the top',next:'final_ascent'}
      ]
    },
    cave_passage:{
      id:'cave_passage',
      title:'Through the Mountain',
      scene:'cave',
      text:'{{name}} walked through the cave. {{His}} footsteps echoed. Small crystals in the walls caught the light from {{his}} flashlight. The cave led up through the mountain!',
      choices:[
        {text:'Exit the cave',next:'cave_exit'}
      ]
    },
    around_cave:{
      id:'around_cave',
      title:'The Outer Path',
      scene:'mountain_ridge',
      text:'{{name}} walked around the cave, following a rocky trail. It was steeper than expected, but soon {{he}} was high on the mountain with clouds below!',
      choices:[
        {text:'Continue to peak',next:'above_treeline'}
      ]
    },
    above_treeline:{
      id:'above_treeline',
      title:'Above the Trees',
      scene:'mountain_ridge',
      text:'{{name}} climbed above the treeline. The air was thinner here. Only grass and rocks remained. {{He}} could see the summit ahead - not far now!',
      choices:[
        {text:'Make final climb',next:'final_ascent'}
      ]
    },
    ridge_rest:{
      id:'ridge_rest',
      title:'A Moment to Breathe',
      scene:'mountain_ridge',
      text:'{{name}} sat on the ridge, catching {{his}} breath. The view was incredible! {{He}} could see the village far below and clouds drifting past. Then {{he}} spotted the summit above.',
      choices:[
        {text:'Go to the summit',next:'final_ascent'}
      ]
    },
    cave_exit:{
      id:'cave_exit',
      title:'Emerging Into Light',
      scene:'mountain_peak',
      text:'{{name}} emerged from the cave near the summit! The secret passage had led almost to the top. {{He}} just had to climb a few more steps.',
      choices:[
        {text:'Reach the summit',next:'summit_arrival'}
      ]
    },
    final_ascent:{
      id:'final_ascent',
      title:'One Last Push',
      scene:'mountain_peak',
      text:'{{name}} climbed the final slope. {{His}} legs were tired, but {{he}} kept going. Step by step, {{he}} got closer to the top. Almost there!',
      choices:[
        {text:'Reach the peak',next:'summit_arrival'}
      ]
    },
    summit_arrival:{
      id:'summit_arrival',
      title:'The Summit',
      scene:'mountain_peak',
      text:'{{name}} finally reached the summit of the mountain! They stood at the highest point, with the whole world spread below. The view was absolutely breathtaking.',
      choices:[
        {text:'Look for the treasure',next:'find_treasure'},
        {text:'Enjoy the view first',next:'summit_view'}
      ]
    },
    find_treasure:{
      id:'find_treasure',
      title:'The Treasure Revealed',
      scene:'mountain_peak',
      text:'{{name}} checked the map and looked around the summit. There, under a pile of rocks, {{he}} found it - a small box. Inside was a golden compass and a note: "The real treasure is reaching your goals."',
      choices:[]
    },
    summit_view:{
      id:'summit_view',
      title:'Worth Every Step',
      scene:'sunset',
      text:'{{name}} stood at the summit as the sun began to set. The sky turned orange and pink. {{He}} realized the journey itself was the real treasure - the challenges, the choices, and the amazing views. {{He}} felt proud.',
      choices:[]
    }
  },
  startPage:'start'
};

const DEFAULT_HARD_EN={
  meta:{
    id:'default_hard_en',
    title:'The Mysterious Island',
    language:'en',
    author:'Built-in',
    created:'2026-02-20',
    ageRange:{min:11,max:14,tier:'advanced'},
    genderSupport:{boy:true,girl:true},
    theme:'mystery',
    mood:'suspenseful',
    totalPages:16,
    scenesUsed:['beach','forest','cave','volcano','sunset'],
    vocabularyWord:'phenomenon',
    vocabularyContext:'This strange phenomenon had never been documented before',
    vocabularyDefinition:'A fact or event that is observed to exist or happen',
    vocabularyWrongAnswers:['A type of ancient building','A supernatural creature'],
    hasPokemon:true,
    pokemonId:54,
    pokemonPage:'stream_discovery',
    collectibleItem:'stardust',
    itemPage:'cave_entrance'
  },
  pages:{
    start:{
      id:'start',
      title:'The Storm',
      scene:'beach',
      text:'{{name}} woke up on a sandy beach, disoriented. The last thing {{he}} remembered was the storm that caught {{his}} boat. Looking around, {{he}} saw an island covered in dense jungle. Where was everyone else?',
      choices:[
        {text:'Explore the beach',next:'beach_search'},
        {text:'Head into the jungle',next:'jungle_entry'}
      ]
    },
    beach_search:{
      id:'beach_search',
      title:'Scattered Debris',
      scene:'beach',
      text:'{{name}} walked along the beach, finding pieces of the wrecked boat scattered across the sand. Among the debris, {{he}} discovered a waterproof emergency kit with a flare gun, matches, and a knife.',
      choices:[
        {text:'Take the supplies',next:'get_supplies'},
        {text:'Search for survivors',next:'search_survivors'}
      ]
    },
    jungle_entry:{
      id:'jungle_entry',
      title:'Into Unknown Territory',
      scene:'forest',
      text:'{{name}} pushed through thick vines and entered the jungle. Strange bird calls echoed through the trees. {{He}} noticed something odd - the plants here looked ancient, almost prehistoric.',
      choices:[
        {text:'Follow a stream',next:'stream_discovery'},
        {text:'Climb a tall tree',next:'tree_view'}
      ]
    },
    get_supplies:{
      id:'get_supplies',
      title:'Essential Resources',
      scene:'beach',
      text:'{{name}} packed the supplies carefully. The flare gun could signal rescuers, but {{he}} only had three flares. {{He}} needed to choose when to use them wisely.',
      choices:[
        {text:'Signal immediately',next:'early_signal'},
        {text:'Explore first',next:'explore_island'}
      ]
    },
    search_survivors:{
      id:'search_survivors',
      title:'Disturbing Signs',
      scene:'beach',
      text:'{{name}} searched for other survivors but found only tracks leading into the jungle. They were fresh - someone else was here! But the tracks looked strange, almost deliberate, as if leading {{him}} somewhere.',
      choices:[
        {text:'Follow the tracks',next:'track_follow'},
        {text:'Stay on the beach',next:'beach_camp'}
      ]
    },
    stream_discovery:{
      id:'stream_discovery',
      title:'Fresh Water',
      scene:'forest',
      text:'{{name}} found a clear stream flowing through the jungle. Following it upstream, {{he}} discovered it emerged from a cave entrance. Water echoed from deep within.',
      choices:[
        {text:'Enter the cave',next:'cave_entrance'},
        {text:'Continue along stream',next:'stream_path'}
      ]
    },
    tree_view:{
      id:'tree_view',
      title:'A Higher Perspective',
      scene:'forest',
      text:'{{name}} climbed to the top of a massive tree. From this vantage point, {{he}} could see the entire island. In the center was what looked like an active volcano, and on the opposite side, some kind of structure!',
      choices:[
        {text:'Head toward structure',next:'structure_approach'},
        {text:'Investigate volcano',next:'volcano_trek'}
      ]
    },
    early_signal:{
      id:'early_signal',
      title:'A Risky Choice',
      scene:'beach',
      text:'{{name}} fired a flare into the sky. It arced beautifully but attracted something unexpected - movement in the jungle. Something large was coming toward the beach.',
      choices:[
        {text:'Hide quickly',next:'hide_beach'},
        {text:'Stand ground',next:'face_unknown'}
      ]
    },
    explore_island:{
      id:'explore_island',
      title:'Careful Investigation',
      scene:'beach',
      text:'{{name}} decided to explore before signaling. {{He}} needed to understand this place. Walking along the shore, {{he}} found footprints that weren`t {{his}} own - and they were recent.',
      choices:[
        {text:'Follow footprints',next:'track_follow'},
        {text:'Go inland',next:'inland_path'}
      ]
    },
    track_follow:{
      id:'track_follow',
      title:'The Trail Deepens',
      scene:'forest',
      text:'{{name}} followed the tracks into the jungle. They led to a clearing where someone had made camp recently. There was a journal with strange notes about "temporal anomalies" and "the island`s secret."',
      choices:[
        {text:'Read the journal',next:'journal_discovery'},
        {text:'Keep following tracks',next:'deeper_jungle'}
      ]
    },
    beach_camp:{
      id:'beach_camp',
      title:'Establishing Base',
      scene:'beach',
      text:'{{name}} decided to make camp on the beach where rescuers could easily spot {{him}}. But as night fell, {{he}} saw lights moving in the jungle - not flashlights, but something that glowed naturally.',
      choices:[
        {text:'Investigate lights',next:'night_investigation'},
        {text:'Stay safe at camp',next:'camp_night'}
      ]
    },
    cave_entrance:{
      id:'cave_entrance',
      title:'Echoing Darkness',
      scene:'cave',
      text:'{{name}} entered the cave. As {{his}} eyes adjusted, {{he}} saw the walls were covered in ancient carvings showing people arriving on the island and never leaving. This strange phenomenon had never been documented before.',
      choices:[
        {text:'Go deeper',next:'cave_depths'},
        {text:'Turn back',next:'exit_cave'}
      ]
    },
    stream_path:{
      id:'stream_path',
      title:'Following the Flow',
      scene:'forest',
      text:'{{name}} followed the stream through the jungle. It led to a lagoon with crystal-clear water. At the bottom, {{he}} could see what looked like metal - possibly from other shipwrecks.',
      choices:[
        {text:'Dive to investigate',next:'underwater_discovery'},
        {text:'Continue exploring',next:'lagoon_path'}
      ]
    },
    structure_approach:{
      id:'structure_approach',
      title:'Remnants of Civilization',
      scene:'forest',
      text:'{{name}} pushed through the jungle toward the structure. It turned out to be ruins of an old research station, abandoned but not ancient. Equipment still hummed with power from solar panels.',
      choices:[
        {text:'Search the station',next:'station_search'},
        {text:'Check computers',next:'data_discovery'}
      ]
    },
    volcano_trek:{
      id:'volcano_trek',
      title:'Heat Rising',
      scene:'volcano',
      text:'{{name}} approached the volcano. The heat was intense, but {{he}} noticed something - vents releasing gas that made {{him}} feel strange, disoriented. {{He}} backed away quickly.',
      choices:[
        {text:'Retreat to jungle',next:'jungle_return'},
        {text:'Circle the volcano',next:'volcano_circle'}
      ]
    },
    hide_beach:{
      id:'hide_beach',
      title:'Concealment',
      scene:'beach',
      text:'{{name}} hid behind rocks as something massive moved through the jungle edge. It wasn`t an animal - it was a person! An old survivor wearing tattered clothes emerged, looking confused.',
      choices:[
        {text:'Call out to them',next:'survivor_contact'},
        {text:'Stay hidden',next:'observe_survivor'}
      ]
    },
    face_unknown:{
      id:'face_unknown',
      title:'Confrontation',
      scene:'beach',
      text:'{{name}} stood firm as a disheveled person emerged from the jungle. "You fired the flare," the stranger said. "I`ve been here three years. This island... it doesn`t let people leave easily."',
      choices:[
        {text:'Ask about escape',next:'learn_truth'},
        {text:'Demand explanation',next:'island_secret'}
      ]
    },
    journal_discovery:{
      id:'journal_discovery',
      title:'Revealing Truth',
      scene:'forest',
      text:'{{name}} read the journal. A scientist had studied this island before disappearing. The notes described magnetic anomalies affecting navigation, explaining why boats crashed here. But there was a map to a radio tower!',
      choices:[
        {text:'Find the tower',next:'tower_search'},
        {text:'Investigate anomalies',next:'anomaly_study'}
      ]
    },
    deeper_jungle:{
      id:'deeper_jungle',
      title:'The Heart of Mystery',
      scene:'forest',
      text:'{{name}} pushed deeper into the jungle. The tracks led to a sophisticated laboratory hidden in a cave, still operational. Someone was conducting secret research here.',
      choices:[
        {text:'Enter lab',next:'lab_discovery'},
        {text:'Look for inhabitants',next:'search_lab'}
      ]
    },
    night_investigation:{
      id:'night_investigation',
      title:'Bioluminescent Wonders',
      scene:'forest',
      text:'{{name}} followed the lights and discovered they came from bioluminescent plants and insects. The jungle was alive with natural glow. In the center was a clearing with communication equipment!',
      choices:[
        {text:'Use the equipment',next:'radio_contact'},
        {text:'Examine setup',next:'equipment_study'}
      ]
    },
    camp_night:{
      id:'camp_night',
      title:'A Restless Night',
      scene:'beach',
      text:'{{name}} stayed at camp, keeping a fire burning. In the morning, {{he}} found fresh supplies left near {{his}} camp - food, water, and a note: "Meet me at the volcano at sunset."',
      choices:[
        {text:'Go to meeting',next:'volcano_meeting'},
        {text:'Ignore the note',next:'suspicious_ignore'}
      ]
    },
    cave_depths:{
      id:'cave_depths',
      title:'Ancient Chamber',
      scene:'cave',
      text:'{{name}} ventured deep into the cave and found a chamber with modern equipment alongside ancient artifacts. Someone was studying the island`s history. There was also a working satellite phone!',
      choices:[
        {text:'Use the phone',next:'make_call'},
        {text:'Investigate equipment',next:'study_setup'}
      ]
    },
    make_call:{
      id:'make_call',
      title:'Connection to the Outside',
      scene:'cave',
      text:'{{name}} called for help using the satellite phone. Rescue was coming! But before leaving, {{he}} understood the island`s secret - it was a natural refuge that protected endangered species, which is why it was kept off maps.',
      choices:[]
    },
    radio_contact:{
      id:'radio_contact',
      title:'Signal Sent',
      scene:'forest',
      text:'{{name}} activated the radio and sent out a distress call. Within hours, a rescue helicopter arrived. As {{he}} flew away, {{name}} looked back at the mysterious island, grateful to have survived but knowing its secrets would stay with {{him}} forever.',
      choices:[]
    },
    tower_search:{
      id:'tower_search',
      title:'The Communication Tower',
      scene:'sunset',
      text:'{{name}} found the radio tower hidden on a cliff. {{He}} climbed up and activated it. As the sun set, {{he}} sent out a distress signal. Soon, {{he}} heard the beautiful sound of a rescue helicopter approaching.',
      choices:[]
    },
    lab_discovery:{
      id:'lab_discovery',
      title:'Scientific Truth',
      scene:'cave',
      text:'{{name}} entered the lab and found detailed research about the island. It was a protected zone for studying evolution in isolation. The scientist left detailed instructions for contacting rescue, which {{name}} followed.',
      choices:[]
    }
  },
  startPage:'start'
};
