/* ═══════════════════════════════════════════════════════════
   PROCEDURAL STORY BLUEPRINTS
   
   Each blueprint defines a story structure that generates
   different content on each playthrough using variables
═══════════════════════════════════════════════════════════ */

const STORY_BLUEPRINTS = {
  
  /* BLUEPRINT 1: THE LOST COMPANION */
  lost_companion: {
    id: 'lost_companion',
    title: () => `The ${randomChoice(['Lost','Missing','Hidden','Secret'])} ${randomChoice(['Friend','Companion','Helper','Buddy'])}`,
    theme: 'friendship',
    mood: 'adventurous',
    ageRange: {min:5, max:8, tier:'simple'},
    
    // Story variables randomized each playthrough
    getVariables: () => ({
      location1: randomChoice(['village','forest','beach','mountain_valley']),
      location2: randomChoice(['forest_clearing','cave','house_living','village_park']),
      location3: randomChoice(['forest_deep','mountain_peak','sunset','cherry']),
      npcName: randomChoice(['Sam','Alex','Riley','Jordan','Casey','Morgan']),
      lostItem: randomChoice(['toy','book','hat','ball','backpack']),
      hidingSpot: randomChoice(['tree','rock','bush','house','fence']),
      emotion: randomChoice(['worried','sad','confused','concerned']),
      reward: randomChoice(['hug','smile','gift','thank you']),
      obstacle: randomChoice(['river','hill','gate','fence','door']),
      helper: randomChoice(['friendly dog','kind person','helpful bird','smart cat'])
    }),
    
    // 3-Act structure with procedural pages
    generateStory: function(vars) {
      return {
        meta: {
          id: `lost_companion_${Date.now()}`,
          title: this.title(),
          language: 'en',
          author: 'Procedural',
          created: new Date().toISOString().split('T')[0],
          ageRange: this.ageRange,
          genderSupport: {boy:true, girl:true},
          theme: this.theme,
          mood: this.mood,
          totalPages: 12,
          scenesUsed: [vars.location1, vars.location2, vars.location3, 'sunset'],
          collectibleItem: randomChoice(['oran_berry','pokesnack','honey_jar','fresh_water']),
          itemPage: 'act2_search'
        },
        pages: {
          // ACT 1: Setup
          start: {
            id: 'start',
            title: 'A Surprise',
            scene: vars.location1,
            text: `{{name}} was playing outside. {{His}} friend ${vars.npcName} ran up looking ${vars.emotion}. "${vars.npcName} lost a ${vars.lostItem}!" {{name}} said.`,
            choices: [
              {text: 'Help find it', next: 'act1_decide'},
              {text: 'Ask what happened', next: 'act1_story'}
            ]
          },
          
          act1_decide: {
            id: 'act1_decide',
            title: 'Time to Help',
            scene: vars.location1,
            text: `"I will help you!" {{name}} said. ${vars.npcName} smiled. "Thank you!" Together they started looking.`,
            choices: [
              {text: `Go to the ${vars.location2.replace('_',' ')}`, next: 'act2_search'},
              {text: 'Look around here first', next: 'act1_nearby'}
            ]
          },
          
          act1_story: {
            id: 'act1_story',
            title: 'The Story',
            scene: vars.location1,
            text: `${vars.npcName} told {{name}} the whole story. "I had it this morning. Then it was gone!" {{name}} thought hard.`,
            choices: [
              {text: 'Start searching', next: 'act2_search'},
              {text: 'Think more', next: 'act1_think'}
            ]
          },
          
          act1_nearby: {
            id: 'act1_nearby',
            title: 'Looking Close',
            scene: vars.location1,
            text: `{{name}} looked all around. No ${vars.lostItem} here! "Let's try somewhere else," {{he}} said.`,
            choices: [
              {text: 'Go exploring', next: 'act2_search'}
            ]
          },
          
          act1_think: {
            id: 'act1_think',
            title: 'A Clue',
            scene: vars.location1,
            text: `{{name}} remembered seeing ${vars.npcName} near the ${vars.hidingSpot} yesterday. "Maybe it's there!" {{he}} said.`,
            choices: [
              {text: 'Check that spot', next: 'act2_clue'}
            ]
          },
          
          // ACT 2: Journey
          act2_search: {
            id: 'act2_search',
            title: 'The Search',
            scene: vars.location2,
            text: `They walked to the ${vars.location2.replace('_',' ')}. {{name}} looked everywhere. Then {{he}} found something shiny on the ground!`,
            choices: [
              {text: 'Pick it up', next: 'act2_continue'},
              {text: 'Keep looking for the ${vars.lostItem}', next: 'act2_continue'}
            ]
          },
          
          act2_continue: {
            id: 'act2_continue',
            title: 'Keep Going',
            scene: vars.location2,
            text: `${vars.npcName} pointed ahead. "Let's look over there!" They came to a ${vars.obstacle}. It was in the way!`,
            choices: [
              {text: 'Find a way around', next: 'act2_solve'},
              {text: 'Ask for help', next: 'act2_helper'}
            ]
          },
          
          act2_clue: {
            id: 'act2_clue',
            title: 'Following Clues',
            scene: vars.location2,
            text: `They went to the ${vars.hidingSpot}. {{name}} saw footprints! "The ${vars.lostItem} might be this way!" {{he}} said excitedly.`,
            choices: [
              {text: 'Follow the trail', next: 'act2_trail'},
              {text: 'Look around the ${vars.hidingSpot}', next: 'act2_near'}
            ]
          },
          
          act2_solve: {
            id: 'act2_solve',
            title: 'Smart Thinking',
            scene: vars.location3,
            text: `{{name}} found a way past the ${vars.obstacle}! "Good job!" said ${vars.npcName}. Now they could see the ${vars.location3.replace('_',' ')}.`,
            choices: [
              {text: 'Go there', next: 'act3_find'}
            ]
          },
          
          act2_helper: {
            id: 'act2_helper',
            title: 'New Friend',
            scene: vars.location2,
            text: `A ${vars.helper} came by! It helped them get past the ${vars.obstacle}. "Thank you!" {{name}} said.`,
            choices: [
              {text: 'Continue searching', next: 'act3_find'}
            ]
          },
          
          act2_trail: {
            id: 'act2_trail',
            title: 'On the Trail',
            scene: vars.location3,
            text: `The trail led to the ${vars.location3.replace('_',' ')}! {{name}} and ${vars.npcName} were getting close.`,
            choices: [
              {text: 'Look carefully', next: 'act3_find'}
            ]
          },
          
          act2_near: {
            id: 'act2_near',
            title: 'Very Close',
            scene: vars.location2,
            text: `{{name}} looked near the ${vars.hidingSpot}. {{He}} saw something! It might be the ${vars.lostItem}!`,
            choices: [
              {text: 'Go get it', next: 'act3_found'}
            ]
          },
          
          // ACT 3: Resolution
          act3_find: {
            id: 'act3_find',
            title: 'There It Is!',
            scene: vars.location3,
            text: `{{name}} spotted the ${vars.lostItem}! It was safe! ${vars.npcName} ran to get it. So happy!`,
            choices: [
              {text: 'Celebrate', next: 'ending_happy'}
            ]
          },
          
          act3_found: {
            id: 'act3_found',
            title: 'Success!',
            scene: vars.location3,
            text: `It was the ${vars.lostItem}! {{name}} gave it to ${vars.npcName}. "${vars.npcName} was so ${vars.emotion} before. Now {{he}} smiled big!`,
            choices: [
              {text: 'Walk home together', next: 'ending_together'}
            ]
          },
          
          ending_happy: {
            id: 'ending_happy',
            title: 'Best Friends',
            scene: 'sunset',
            text: `${vars.npcName} gave {{name}} a big ${vars.reward}. "You are the best friend ever!" {{name}} felt happy. Working together was fun!`,
            choices: []
          },
          
          ending_together: {
            id: 'ending_together',
            title: 'Great Day',
            scene: 'sunset',
            text: `{{name}} and ${vars.npcName} walked home as the sun set. They talked about their adventure. "We make a good team!" ${vars.npcName} said. {{name}} agreed!`,
            choices: []
          }
        },
        startPage: 'start'
      };
    }
  },
  
  /* BLUEPRINT 2: THE MYSTERIOUS DISCOVERY */
  mysterious_discovery: {
    id: 'mysterious_discovery',
    title: () => `The ${randomChoice(['Strange','Mysterious','Magical','Curious'])} ${randomChoice(['Discovery','Finding','Secret','Mystery'])}`,
    theme: 'mystery',
    mood: 'exciting',
    ageRange: {min:7, max:10, tier:'medium'},
    
    getVariables: () => ({
      location1: randomChoice(['forest','cave','beach','lab_hallway']),
      location2: randomChoice(['forest_stream','mountain_valley','lab_table','house_living']),
      location3: randomChoice(['mountain_peak','volcano','forest_deep','sunset']),
      discovery: randomChoice(['glowing stone','old map','mysterious box','strange key','ancient coin']),
      color: randomChoice(['blue','green','silver','gold','purple']),
      symbol: randomChoice(['star','circle','triangle','spiral','moon']),
      reaction: randomChoice(['amazed','curious','excited','surprised','fascinated']),
      expert: randomChoice(['scientist','teacher','grandparent','professor','explorer']),
      origin: randomChoice(['ancient times','long ago','a faraway place','the past','old legends']),
      power: randomChoice(['glow in the dark','change color','make music','feel warm','shine bright'])
    }),
    
    generateStory: function(vars) {
      return {
        meta: {
          id: `mysterious_discovery_${Date.now()}`,
          title: this.title(),
          language: 'en',
          author: 'Procedural',
          created: new Date().toISOString().split('T')[0],
          ageRange: this.ageRange,
          genderSupport: {boy:true, girl:true},
          theme: this.theme,
          mood: this.mood,
          totalPages: 14,
          scenesUsed: [vars.location1, vars.location2, vars.location3, 'sunset'],
          collectibleItem: randomChoice(['stardust','rainbow_herb','silver_leaf','charcoal']),
          itemPage: 'act1_explore'
        },
        pages: {
          start: {
            id: 'start',
            title: 'Something Strange',
            scene: vars.location1,
            text: `{{name}} was exploring the ${vars.location1.replace('_',' ')} when {{he}} saw something ${vars.color} glowing. {{He}} walked closer to look.`,
            choices: [
              {text: 'Pick it up', next: 'act1_pickup'},
              {text: 'Look closer first', next: 'act1_examine'}
            ]
          },
          
          act1_pickup: {
            id: 'act1_pickup',
            title: 'In {{His}} Hands',
            scene: vars.location1,
            text: `{{name}} carefully picked up the ${vars.discovery}. It was ${vars.color} and had a ${vars.symbol} on it! {{name}} felt ${vars.reaction}.`,
            choices: [
              {text: 'Take it home', next: 'act1_home'},
              {text: 'Explore more here', next: 'act1_explore'}
            ]
          },
          
          act1_examine: {
            id: 'act1_examine',
            title: 'A Closer Look',
            scene: vars.location1,
            text: `{{name}} bent down to see better. The ${vars.discovery} had markings on it! They looked like they were from ${vars.origin}.`,
            choices: [
              {text: 'Take it to show someone', next: 'act1_home'},
              {text: 'Search the area', next: 'act1_explore'}
            ]
          },
          
          act1_explore: {
            id: 'act1_explore',
            title: 'More to Find',
            scene: vars.location1,
            text: `{{name}} looked around more. {{He}} found some other interesting things nearby! This place was special.`,
            choices: [
              {text: 'Keep the ${vars.discovery}', next: 'act2_decide'},
              {text: 'Look for clues', next: 'act2_clues'}
            ]
          },
          
          act1_home: {
            id: 'act1_home',
            title: 'Sharing the News',
            scene: 'house_living',
            text: `{{name}} took the ${vars.discovery} home. "Look what I found!" {{he}} said. Everyone was interested!`,
            choices: [
              {text: 'Research it', next: 'act2_research'},
              {text: 'Go back to find more', next: 'act2_return'}
            ]
          },
          
          act2_decide: {
            id: 'act2_decide',
            title: 'What to Do',
            scene: vars.location2,
            text: `{{name}} thought about the ${vars.discovery}. Should {{he}} keep it secret or show someone? It might be important!`,
            choices: [
              {text: 'Show an expert', next: 'act2_expert'},
              {text: 'Investigate alone', next: 'act2_alone'}
            ]
          },
          
          act2_clues: {
            id: 'act2_clues',
            title: 'Following Clues',
            scene: vars.location2,
            text: `The ${vars.symbol} symbol led {{name}} to another location. There were more clues here! This was turning into a real mystery.`,
            choices: [
              {text: 'Follow the trail', next: 'act2_trail'},
              {text: 'Stop and think', next: 'act2_think'}
            ]
          },
          
          act2_research: {
            id: 'act2_research',
            title: 'Learning More',
            scene: vars.location2,
            text: `{{name}} looked in books and online. The ${vars.discovery} was from ${vars.origin}! It could ${vars.power}! Amazing!`,
            choices: [
              {text: 'Test it out', next: 'act3_test'},
              {text: 'Learn more', next: 'act2_expert'}
            ]
          },
          
          act2_return: {
            id: 'act2_return',
            title: 'Back Again',
            scene: vars.location1,
            text: `{{name}} went back to where {{he}} found the ${vars.discovery}. Maybe there were more like it!`,
            choices: [
              {text: 'Search carefully', next: 'act2_search'},
              {text: 'Try a different area', next: 'act3_new'}
            ]
          },
          
          act2_expert: {
            id: 'act2_expert',
            title: 'Expert Help',
            scene: vars.location2,
            text: `{{name}} showed the ${vars.discovery} to a ${vars.expert}. "This is incredible!" they said. "It's from ${vars.origin}!"`,
            choices: [
              {text: 'Ask more questions', next: 'act3_learn'},
              {text: 'Go explore more', next: 'act3_explore'}
            ]
          },
          
          act2_alone: {
            id: 'act2_alone',
            title: 'Solo Investigation',
            scene: vars.location3,
            text: `{{name}} decided to figure this out {{himself}}. {{He}} followed the ${vars.symbol} symbols to a new place!`,
            choices: [
              {text: 'Keep going', next: 'act3_solo'}
            ]
          },
          
          act2_trail: {
            id: 'act2_trail',
            title: 'The Path',
            scene: vars.location3,
            text: `The trail of clues led higher and higher! {{name}} was getting closer to solving the mystery.`,
            choices: [
              {text: 'Reach the top', next: 'act3_peak'}
            ]
          },
          
          act2_think: {
            id: 'act2_think',
            title: 'Thinking Hard',
            scene: vars.location2,
            text: `{{name}} sat down to think. The ${vars.symbol} meant something. {{He}} figured out the pattern!`,
            choices: [
              {text: 'Follow the pattern', next: 'act3_solve'}
            ]
          },
          
          act2_search: {
            id: 'act2_search',
            title: 'More Treasures',
            scene: vars.location1,
            text: `{{name}} found more things from ${vars.origin}! Each one had the ${vars.symbol}. They all fit together!`,
            choices: [
              {text: 'Put them together', next: 'act3_combine'}
            ]
          },
          
          act3_test: {
            id: 'act3_test',
            title: 'The Test',
            scene: vars.location3,
            text: `{{name}} tested the ${vars.discovery}. It really did ${vars.power}! "Wow!" {{name}} said. This was special indeed!`,
            choices: []
          },
          
          act3_learn: {
            id: 'act3_learn',
            title: 'New Knowledge',
            scene: 'sunset',
            text: `The ${vars.expert} taught {{name}} all about the ${vars.discovery}. Now {{name}} understood! {{He}} would take good care of it. What an adventure!`,
            choices: []
          },
          
          act3_explore: {
            id: 'act3_explore',
            title: 'More Adventures',
            scene: vars.location3,
            text: `With new knowledge, {{name}} went exploring again. Who knows what else {{he}} might find! The world was full of mysteries!`,
            choices: []
          },
          
          act3_solo: {
            id: 'act3_solo',
            title: 'The Discovery',
            scene: vars.location3,
            text: `{{name}} solved it alone! The ${vars.discovery} was part of something bigger from ${vars.origin}. {{He}} felt proud for figuring it out!`,
            choices: []
          },
          
          act3_peak: {
            id: 'act3_peak',
            title: 'At the Top',
            scene: vars.location3,
            text: `At the highest point, {{name}} found where the ${vars.discovery} came from! The view was amazing! {{He}} understood the mystery now.`,
            choices: []
          },
          
          act3_solve: {
            id: 'act3_solve',
            title: 'Mystery Solved',
            scene: 'sunset',
            text: `{{name}} solved the whole mystery! The ${vars.symbol} showed the way. The ${vars.discovery} was safe with {{him}}. What a day!`,
            choices: []
          },
          
          act3_combine: {
            id: 'act3_combine',
            title: 'All Together',
            scene: vars.location1,
            text: `When {{name}} put all the pieces together, they started to ${vars.power}! Beautiful! This treasure from ${vars.origin} was amazing!`,
            choices: []
          },
          
          act3_new: {
            id: 'act3_new',
            title: 'New Path',
            scene: vars.location3,
            text: `{{name}} found a completely new area! More ${vars.discovery}s were here! This mystery was bigger than {{he}} thought. Exciting!`,
            choices: []
          }
        },
        startPage: 'start'
      };
    }
  }
  
};

/* BLUEPRINT 3: THE BIG CHALLENGE */
STORY_BLUEPRINTS.big_challenge = {
  id: 'big_challenge',
  title: () => `${randomChoice(['Facing','Conquering','Overcoming','Defeating'])} the ${randomChoice(['Big Fear','Challenge','Obstacle','Test'])}`,
  theme: 'courage',
  mood: 'inspiring',
  ageRange: {min:6, max:9, tier:'medium'},
  
  getVariables: () => ({
    location1: randomChoice(['village_park','house_entry','forest','beach']),
    location2: randomChoice(['mountain_valley','forest_clearing','cave','volcano']),
    location3: randomChoice(['mountain_peak','forest_deep','sunset','cherry']),
    fear: randomChoice(['high places','dark caves','big jumps','deep water','loud noises']),
    support: randomChoice(['family','friend','teacher','coach']),
    achievement: randomChoice(['climb high','swim far','jump big','explore deep']),
    encouragement: randomChoice(['"You can do it!"','"I believe in you!"','"Try your best!"','"Don\'t give up!"']),
    practice: randomChoice(['every day','step by step','bit by bit','slowly but surely']),
    feeling: randomChoice(['nervous','scared','worried','unsure','brave'])
  }),
  
  generateStory: function(vars) {
    return {
      meta: {
        id: `big_challenge_${Date.now()}`,
        title: this.title(),
        language: 'en',
        author: 'Procedural',
        created: new Date().toISOString().split('T')[0],
        ageRange: this.ageRange,
        genderSupport: {boy:true, girl:true},
        theme: this.theme,
        mood: this.mood,
        totalPages: 13,
        scenesUsed: [vars.location1, vars.location2, vars.location3],
        collectibleItem: randomChoice(['moomoo_milk','pokesnack','fresh_water','oran_berry']),
        itemPage: 'act2_prepare'
      },
      pages: {
        start: {
          id: 'start',
          title: 'A Big Goal',
          scene: vars.location1,
          text: `{{name}} wanted to ${vars.achievement}. But {{he}} was afraid of ${vars.fear}. "I don't know if I can," {{he}} said.`,
          choices: [
            {text: 'Try anyway', next: 'act1_try'},
            {text: 'Ask for help', next: 'act1_help'}
          ]
        },
        
        act1_try: {
          id: 'act1_try',
          title: 'First Attempt',
          scene: vars.location1,
          text: `{{name}} tried! But the ${vars.fear} made {{him}} feel ${vars.feeling}. {{He}} stopped. "Maybe another time," {{he}} thought.`,
          choices: [
            {text: 'Don\'t give up', next: 'act1_persist'},
            {text: 'Think about it', next: 'act1_reflect'}
          ]
        },
        
        act1_help: {
          id: 'act1_help',
          title: 'Getting Support',
          scene: vars.location1,
          text: `{{name}} talked to {{his}} ${vars.support}. They said ${vars.encouragement} "You just need to practice ${vars.practice}!"`,
          choices: [
            {text: 'Start practicing', next: 'act2_practice'},
            {text: 'Learn more first', next: 'act2_learn'}
          ]
        },
        
        act1_persist: {
          id: 'act1_persist',
          title: 'Trying Again',
          scene: vars.location1,
          text: `{{name}} took a deep breath. "I can do this!" {{he}} said. {{He}} would try again tomorrow.`,
          choices: [
            {text: 'Make a plan', next: 'act2_plan'}
          ]
        },
        
        act1_reflect: {
          id: 'act1_reflect',
          title: 'Thinking It Through',
          scene: vars.location1,
          text: `{{name}} thought about why {{he}} wanted to ${vars.achievement}. It was important! {{He}} decided to keep trying.`,
          choices: [
            {text: 'Get ready', next: 'act2_prepare'}
          ]
        },
        
        act2_practice: {
          id: 'act2_practice',
          title: 'Practice Time',
          scene: vars.location2,
          text: `Every day, {{name}} practiced. ${vars.practice.charAt(0).toUpperCase() + vars.practice.slice(1)}, {{he}} got better! The ${vars.fear} didn't seem so scary anymore.`,
          choices: [
            {text: 'Keep going', next: 'act2_improve'},
            {text: 'Take a break', next: 'act2_rest'}
          ]
        },
        
        act2_learn: {
          id: 'act2_learn',
          title: 'Learning Skills',
          scene: vars.location2,
          text: `{{name}} learned all about how to ${vars.achievement} safely. Knowledge helped {{him}} feel more confident!`,
          choices: [
            {text: 'Practice the skills', next: 'act2_practice'},
            {text: 'Start the challenge', next: 'act3_ready'}
          ]
        },
        
        act2_plan: {
          id: 'act2_plan',
          title: 'The Plan',
          scene: vars.location1,
          text: `{{name}} made a plan. First practice. Then prepare. Then try again! "I can do this," {{he}} said with confidence.`,
          choices: [
            {text: 'Follow the plan', next: 'act2_prepare'}
          ]
        },
        
        act2_prepare: {
          id: 'act2_prepare',
          title: 'Getting Ready',
          scene: vars.location2,
          text: `{{name}} got everything ready. {{He}} felt prepared now. Along the way, {{he}} found something special that might help!`,
          choices: [
            {text: 'Start the challenge', next: 'act3_begin'},
            {text: 'Practice one more time', next: 'act2_improve'}
          ]
        },
        
        act2_improve: {
          id: 'act2_improve',
          title: 'Getting Better',
          scene: vars.location2,
          text: `{{name}} was improving so much! What seemed impossible before was now possible. Practice really worked!`,
          choices: [
            {text: 'Time for the real thing', next: 'act3_begin'}
          ]
        },
        
        act2_rest: {
          id: 'act2_rest',
          title: 'Rest and Recover',
          scene: vars.location1,
          text: `{{name}} took a break to rest. Tomorrow {{he}} would be even stronger! Rest is part of getting better too.`,
          choices: [
            {text: 'Continue tomorrow', next: 'act3_ready'}
          ]
        },
        
        act3_begin: {
          id: 'act3_begin',
          title: 'The Moment',
          scene: vars.location3,
          text: `This was it! {{name}} stood ready. {{His}} ${vars.support} cheered ${vars.encouragement} The ${vars.fear} was there, but {{name}} was ready now!`,
          choices: [
            {text: 'Do it!', next: 'ending_success'}
          ]
        },
        
        act3_ready: {
          id: 'act3_ready',
          title: 'Ready to Go',
          scene: vars.location3,
          text: `{{name}} felt ready! All the practice paid off. {{He}} wasn't as scared anymore. Time to ${vars.achievement}!`,
          choices: [
            {text: 'Go for it!', next: 'ending_triumph'}
          ]
        },
        
        ending_success: {
          id: 'ending_success',
          title: 'I Did It!',
          scene: vars.location3,
          text: `{{name}} did it! {{He}} conquered the ${vars.fear} and was able to ${vars.achievement}! Everyone celebrated! "I'm so proud of you!" said {{his}} ${vars.support}. {{name}} felt amazing!`,
          choices: []
        },
        
        ending_triumph: {
          id: 'ending_triumph',
          title: 'Victory!',
          scene: 'sunset',
          text: `{{name}} accomplished {{his}} goal! The ${vars.fear} couldn't stop {{him}}! {{He}} learned that with practice and courage, {{he}} could do hard things. What a great feeling!`,
          choices: []
        }
      },
      startPage: 'start'
    };
  }
};

/* BLUEPRINT 4: THE NATURE EXPLORER */
STORY_BLUEPRINTS.nature_explorer = {
  id: 'nature_explorer',
  title: () => `${randomChoice(['Exploring','Discovering','Finding','Searching'])} ${randomChoice(['Nature','The Wild','The Forest','The Outdoors'])}`,
  theme: 'adventure',
  mood: 'cheerful',
  ageRange: {min:5, max:7, tier:'simple'},
  
  getVariables: () => ({
    location1: randomChoice(['forest','beach','mountain_valley','village_park']),
    location2: randomChoice(['forest_stream','forest_clearing','cherry','snow']),
    location3: randomChoice(['forest_deep','mountain_peak','sunset','cave']),
    animal1: randomChoice(['bird','rabbit','squirrel','deer','butterfly']),
    animal2: randomChoice(['frog','fish','turtle','bee','ladybug']),
    plant: randomChoice(['flower','tree','mushroom','moss','fern']),
    color: randomChoice(['red','blue','yellow','purple','orange']),
    sound: randomChoice(['chirping','rustling','splashing','buzzing','singing']),
    discovery: randomChoice(['nest','hole','path','den','burrow']),
    weather: randomChoice(['sunny','cloudy','breezy','warm','cool'])
  }),
  
  generateStory: function(vars) {
    return {
      meta: {
        id: `nature_explorer_${Date.now()}`,
        title: this.title(),
        language: 'en',
        author: 'Procedural',
        created: new Date().toISOString().split('T')[0],
        ageRange: this.ageRange,
        genderSupport: {boy:true, girl:true},
        theme: this.theme,
        mood: this.mood,
        totalPages: 11,
        scenesUsed: [vars.location1, vars.location2, vars.location3],
        collectibleItem: randomChoice(['rainbow_herb','oran_berry','pecha_berry','honey_jar']),
        itemPage: 'act2_find'
      },
      pages: {
        start: {
          id: 'start',
          title: `${vars.weather.charAt(0).toUpperCase() + vars.weather.slice(1)} Day`,
          scene: vars.location1,
          text: `It was a ${vars.weather} day. {{name}} went to explore the ${vars.location1.replace('_',' ')}. So many things to see!`,
          choices: [
            {text: 'Look around', next: 'act1_look'},
            {text: 'Listen to sounds', next: 'act1_listen'}
          ]
        },
        
        act1_look: {
          id: 'act1_look',
          title: 'What Do You See?',
          scene: vars.location1,
          text: `{{name}} looked carefully. {{He}} saw a ${vars.color} ${vars.plant}! It was pretty.`,
          choices: [
            {text: 'Look closer', next: 'act1_closer'},
            {text: 'Keep exploring', next: 'act2_walk'}
          ]
        },
        
        act1_listen: {
          id: 'act1_listen',
          title: 'Nature Sounds',
          scene: vars.location1,
          text: `{{name}} listened. {{He}} heard ${vars.sound}! What could it be?`,
          choices: [
            {text: 'Follow the sound', next: 'act1_follow'},
            {text: 'Stay and listen more', next: 'act1_enjoy'}
          ]
        },
        
        act1_closer: {
          id: 'act1_closer',
          title: 'Up Close',
          scene: vars.location1,
          text: `{{name}} looked at the ${vars.plant} closely. A tiny ${vars.animal2} was on it! So cute!`,
          choices: [
            {text: 'Watch it', next: 'act2_watch'},
            {text: 'Explore more', next: 'act2_walk'}
          ]
        },
        
        act1_follow: {
          id: 'act1_follow',
          title: 'Following Sounds',
          scene: vars.location2,
          text: `The ${vars.sound} led {{name}} to a new place! {{He}} saw a ${vars.animal1} there!`,
          choices: [
            {text: 'Say hello', next: 'act2_greet'}
          ]
        },
        
        act1_enjoy: {
          id: 'act1_enjoy',
          title: 'Peaceful',
          scene: vars.location1,
          text: `{{name}} sat quietly. The ${vars.sound} was nice. Nature was peaceful.`,
          choices: [
            {text: 'Keep exploring', next: 'act2_walk'}
          ]
        },
        
        act2_walk: {
          id: 'act2_walk',
          title: 'Walking Along',
          scene: vars.location2,
          text: `{{name}} walked further. {{He}} came to a beautiful spot! There were ${vars.plant}s everywhere!`,
          choices: [
            {text: 'Look for animals', next: 'act2_search'},
            {text: 'Enjoy the view', next: 'act3_view'}
          ]
        },
        
        act2_watch: {
          id: 'act2_watch',
          title: 'Watching Quietly',
          scene: vars.location1,
          text: `{{name}} watched the ${vars.animal2}. It was busy! Then it flew away. Time to keep going!`,
          choices: [
            {text: 'Follow it', next: 'act2_find'}
          ]
        },
        
        act2_greet: {
          id: 'act2_greet',
          title: 'Making Friends',
          scene: vars.location2,
          text: `"Hello ${vars.animal1}!" {{name}} said softly. The ${vars.animal1} looked at {{him}}. Then it hopped away!`,
          choices: [
            {text: 'See where it goes', next: 'act2_find'}
          ]
        },
        
        act2_search: {
          id: 'act2_search',
          title: 'Looking Carefully',
          scene: vars.location2,
          text: `{{name}} looked and looked. {{He}} found a ${vars.discovery}! And nearby was something special!`,
          choices: [
            {text: 'Check it out', next: 'act3_discovery'}
          ]
        },
        
        act2_find: {
          id: 'act2_find',
          title: 'A Find!',
          scene: vars.location2,
          text: `{{name}} found something! It was on the ground, next to a ${vars.color} ${vars.plant}!`,
          choices: [
            {text: 'Pick it up', next: 'act3_collect'},
            {text: 'Look around more', next: 'act3_explore'}
          ]
        },
        
        act3_view: {
          id: 'act3_view',
          title: 'Beautiful!',
          scene: vars.location3,
          text: `{{name}} looked at everything. The ${vars.location3.replace('_',' ')} was amazing! So many things in nature!`,
          choices: []
        },
        
        act3_discovery: {
          id: 'act3_discovery',
          title: 'What a Day!',
          scene: vars.location3,
          text: `{{name}} explored the ${vars.discovery}. Nature was full of surprises! {{He}} saw birds, plants, and animals. What fun!`,
          choices: []
        },
        
        act3_collect: {
          id: 'act3_collect',
          title: 'Treasures',
          scene: vars.location2,
          text: `{{name}} collected the special thing. {{He}} also saw a ${vars.animal1} and a ${vars.animal2}! Nature was wonderful!`,
          choices: []
        },
        
        act3_explore: {
          id: 'act3_explore',
          title: 'Explorer',
          scene: vars.location3,
          text: `{{name}} kept exploring! {{He}} found ${vars.plant}s, heard ${vars.sound}, and saw ${vars.color} things! Being outside was the best!`,
          choices: []
        }
      },
      startPage: 'start'
    };
  }
};

/* BLUEPRINT 5: THE HELPING HAND */
STORY_BLUEPRINTS.helping_hand = {
  id: 'helping_hand',
  title: () => `${randomChoice(['Helping','Assisting','Supporting','Caring for'])} ${randomChoice(['a Friend','Others','Someone','the Community'])}`,
  theme: 'helping',
  mood: 'heartwarming',
  ageRange: {min:6, max:9, tier:'medium'},
  
  getVariables: () => ({
    location1: randomChoice(['village','village_park','house_living','forest']),
    location2: randomChoice(['house_entry','lab_hallway','forest_clearing','beach']),
    location3: randomChoice(['sunset','cherry','village_park','house_living']),
    person: randomChoice(['elderly neighbor','younger kid','friend','family member']),
    problem: randomChoice(['hurt foot','heavy bags','lost item','broken toy','messy room']),
    help1: randomChoice(['carry things','find something','fix something','clean up']),
    help2: randomChoice(['get help','make them comfortable','cheer them up','stay with them']),
    feeling: randomChoice(['grateful','thankful','happy','relieved']),
    reward: randomChoice(['big smile','warm hug','thank you card','special treat']),
    lesson: randomChoice(['helping feels good','kindness matters','we help each other','being caring is important'])
  }),
  
  generateStory: function(vars) {
    return {
      meta: {
        id: `helping_hand_${Date.now()}`,
        title: this.title(),
        language: 'en',
        author: 'Procedural',
        created: new Date().toISOString().split('T')[0],
        ageRange: this.ageRange,
        genderSupport: {boy:true, girl:true},
        theme: this.theme,
        mood: this.mood,
        totalPages: 12,
        scenesUsed: [vars.location1, vars.location2, vars.location3],
        collectibleItem: randomChoice(['pokesnack','moomoo_milk','fresh_water','pecha_berry']),
        itemPage: 'act2_solution'
      },
      pages: {
        start: {
          id: 'start',
          title: 'Someone Needs Help',
          scene: vars.location1,
          text: `{{name}} saw a ${vars.person} who had a ${vars.problem}. They looked like they needed help!`,
          choices: [
            {text: 'Offer to help', next: 'act1_offer'},
            {text: 'Ask what happened', next: 'act1_ask'}
          ]
        },
        
        act1_offer: {
          id: 'act1_offer',
          title: 'Offering Help',
          scene: vars.location1,
          text: `"Can I help you?" {{name}} asked kindly. The ${vars.person} smiled. "That would be wonderful!"`,
          choices: [
            {text: 'Start helping right away', next: 'act2_help'},
            {text: 'Make a plan first', next: 'act1_plan'}
          ]
        },
        
        act1_ask: {
          id: 'act1_ask',
          title: 'Learning More',
          scene: vars.location1,
          text: `{{name}} asked what was wrong. The ${vars.person} explained about the ${vars.problem}. "I could really use some help," they said.`,
          choices: [
            {text: 'Help them', next: 'act1_decide'},
            {text: 'Get someone else to help too', next: 'act1_gethelp'}
          ]
        },
        
        act1_plan: {
          id: 'act1_plan',
          title: 'Making a Plan',
          scene: vars.location1,
          text: `{{name}} thought about the best way to help. "First we ${vars.help1}, then we ${vars.help2}!" {{he}} said.`,
          choices: [
            {text: 'Follow the plan', next: 'act2_execute'}
          ]
        },
        
        act1_decide: {
          id: 'act1_decide',
          title: 'Ready to Help',
          scene: vars.location1,
          text: `{{name}} decided to help! {{He}} was good at this kind of thing. Together they could fix the ${vars.problem}!`,
          choices: [
            {text: 'Get started', next: 'act2_help'}
          ]
        },
        
        act1_gethelp: {
          id: 'act1_gethelp',
          title: 'Teamwork',
          scene: vars.location1,
          text: `{{name}} got more people to help! Many hands make light work. Everyone worked together!`,
          choices: [
            {text: 'Work as a team', next: 'act2_team'}
          ]
        },
        
        act2_help: {
          id: 'act2_help',
          title: 'Helping Out',
          scene: vars.location2,
          text: `{{name}} helped ${vars.help1}. The ${vars.person} was so grateful! "You are very kind," they said.`,
          choices: [
            {text: 'Do more', next: 'act2_more'},
            {text: 'Check how they feel', next: 'act2_check'}
          ]
        },
        
        act2_execute: {
          id: 'act2_execute',
          title: 'Following Through',
          scene: vars.location2,
          text: `{{name}} followed {{his}} plan perfectly! First ${vars.help1}, then ${vars.help2}. It was working!`,
          choices: [
            {text: 'Finish up', next: 'act3_complete'}
          ]
        },
        
        act2_team: {
          id: 'act2_team',
          title: 'Working Together',
          scene: vars.location2,
          text: `Everyone helped together! Some people would ${vars.help1} while others would ${vars.help2}. Teamwork was great!`,
          choices: [
            {text: 'Finish the job', next: 'act3_team'}
          ]
        },
        
        act2_more: {
          id: 'act2_more',
          title: 'Going Above and Beyond',
          scene: vars.location2,
          text: `{{name}} did even more than asked! {{He}} also helped ${vars.help2}. The ${vars.person} was amazed!`,
          choices: [
            {text: 'Make sure everything is good', next: 'act3_thorough'}
          ]
        },
        
        act2_check: {
          id: 'act2_check',
          title: 'Caring',
          scene: vars.location2,
          text: `"Are you okay now?" {{name}} asked. The ${vars.person} nodded. "Much better, thanks to you!" They felt ${vars.feeling}!`,
          choices: [
            {text: 'Finish helping', next: 'act2_solution'}
          ]
        },
        
        act2_solution: {
          id: 'act2_solution',
          title: 'Finding a Solution',
          scene: vars.location2,
          text: `{{name}} found the perfect way to help! While helping, {{he}} found something useful nearby!`,
          choices: [
            {text: 'Complete the task', next: 'act3_done'}
          ]
        },
        
        act3_complete: {
          id: 'act3_complete',
          title: 'Mission Accomplished',
          scene: vars.location3,
          text: `The ${vars.problem} was fixed! The ${vars.person} gave {{name}} a ${vars.reward}. "Thank you so much!" they said. {{name}} felt proud!`,
          choices: []
        },
        
        act3_team: {
          id: 'act3_team',
          title: 'Success Together',
          scene: vars.location3,
          text: `Everyone finished helping together! The ${vars.person} thanked the whole team. {{name}} learned that ${vars.lesson}!`,
          choices: []
        },
        
        act3_thorough: {
          id: 'act3_thorough',
          title: 'Job Well Done',
          scene: vars.location3,
          text: `Everything was perfect! The ${vars.person} was so ${vars.feeling}. They gave {{name}} a ${vars.reward}. Helping others felt wonderful!`,
          choices: []
        },
        
        act3_done: {
          id: 'act3_done',
          title: 'Happy Ending',
          scene: vars.location3,
          text: `{{name}} finished helping! The ${vars.person} smiled big. "You're a wonderful helper!" {{name}} learned that ${vars.lesson}. What a good day!`,
          choices: []
        }
      },
      startPage: 'start'
    };
  }
};

/* Helper functions for procedural generation */
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateProceduralStory(blueprintId) {
  const blueprint = STORY_BLUEPRINTS[blueprintId];
  if (!blueprint) return null;
  
  const vars = blueprint.getVariables();
  const story = blueprint.generateStory(vars);
  
  // System will auto-add Pokemon, item page will be set, vocab will be generated
  return story;
}
