# How to Add New Background Images - Complete Guide

## Overview
This guide explains how to add new background scenes to the Pokemon Story App. We'll use the lab backgrounds as an example.

---

## Files You'll Need to Modify

When adding a new background, you need to update **5 locations**:

1. ✅ `/assets/` folder - Add the image file
2. ✅ `js/app.js` - BGS constant
3. ✅ `js/app.js` - Validation list
4. ✅ `js/app.js` - Story generation prompt (2 places)
5. ✅ `index.html` - Scene selector checkboxes
6. 🎨 `js/app.js` - Particle effects (optional)

---

## Step-by-Step Instructions

### Step 1: Prepare Your Image

**Requirements:**
- Format: `.jpg` or `.png`
- Recommended size: 1920x1080 or 1280x720
- Pixel art style preferred
- Landscape orientation

**Naming Convention:**
```
bg_[scene_name].jpg

Examples:
bg_lab_table.jpg
bg_lab_hallway.jpg
bg_city_street.jpg
bg_desert.jpg
```

**Tips:**
- Use lowercase
- Use underscores for spaces
- Be descriptive but concise
- Keep consistent with existing names

---

### Step 2: Add Image to Assets Folder

**Location:** `/pokemon-story-app/assets/`

**Action:** Copy your image file here

```bash
# Command line:
cp your_image.jpg /pokemon-story-app/assets/bg_scene_name.jpg

# Or drag and drop into the assets folder
```

**Result:** File should be at:
```
/pokemon-story-app/assets/bg_lab_table.jpg
```

---

### Step 3: Update BGS Constant (JavaScript)

**File:** `js/app.js`

**Find:** Line 4 (at very top of file)
```javascript
const BGS={village:'assets/bg_village.jpg',village_park:...
```

**Action:** Add your new scene to the object

**Before:**
```javascript
const BGS={
  village:'assets/bg_village.jpg',
  village_park:'assets/bg_village_park.jpg',
  ...
  cave:'assets/bg_cave.jpg'
};
```

**After:**
```javascript
const BGS={
  village:'assets/bg_village.jpg',
  village_park:'assets/bg_village_park.jpg',
  ...
  cave:'assets/bg_cave.jpg',
  lab_table:'assets/bg_lab_table.jpg',        // NEW
  lab_hallway:'assets/bg_lab_hallway.jpg'    // NEW
};
```

**Important:** 
- Scene key (left side) is what you use in stories
- Path (right side) must match your filename
- Don't forget commas between entries!

---

### Step 4: Update Validation List

**File:** `js/app.js`

**Find:** Search for `const validScenes=`

**Location:** Around line 796 (in validateStory function)

**Before:**
```javascript
const validScenes=['village','village_park','forest',...,'cave'];
```

**After:**
```javascript
const validScenes=['village','village_park','forest',...,'cave','lab_table','lab_hallway'];
```

**Purpose:** This allows the scene to pass validation when importing stories

---

### Step 5: Update Story Generation Prompt (2 places)

**File:** `js/app.js`

**Find:** Search for "Available:" in the prompt

#### Location 1: Scene List (~line 1371)

**Before:**
```
  - Available: village, village_park, forest, ..., cave
```

**After:**
```
  - Available: village, village_park, forest, ..., cave, lab_table, lab_hallway
```

#### Location 2: Validation Checklist (~line 1487)

**Before:**
```
✓ Scene names are EXACT: village, village_park, ..., cave
```

**After:**
```
✓ Scene names are EXACT: village, village_park, ..., cave, lab_table, lab_hallway
```

**Purpose:** Tells AI story generators which scenes they can use

---

### Step 6: Add to HTML Scene Selector

**File:** `index.html`

**Find:** Scene checkboxes section (around line 112)

**Look for:**
```html
<div class="checkbox-group">
  <label class="checkbox-label"><input type="checkbox" value="village" checked> 🏘️ Village</label>
  ...
```

**Add at the end (before `</div>`):**
```html
  <label class="checkbox-label"><input type="checkbox" value="lab_table"> 🧪 Lab Table</label>
  <label class="checkbox-label"><input type="checkbox" value="lab_hallway"> 🔬 Lab Hallway</label>
</div>
```

**Emoji Selection:**
- Choose emoji that represents the scene
- Keep it simple and recognizable
- Examples: 🧪 🔬 🏙️ 🏜️ 🏰 🌆 🌃

**Purpose:** Allows users to select your scene when creating stories

---

### Step 7: Add Particle Effects (Optional but Recommended)

**File:** `js/app.js`

**Find:** `function startParticles(scene)` (around line 1220)

**Look for:** The scene-specific conditions (e.g., `if(scene==='forest')`)

**Add before the default `else` block:**

```javascript
  // Lab - scientific bubbles/steam
  else if(scene==='lab'){
    for(let i=0;i<25;i++)pts.push({
      x:Math.random()*W,
      y:H+Math.random()*20,
      r:1+Math.random()*3,
      vy:-(0.3+Math.random()*.6),
      vx:(Math.random()-.5)*.2,
      life:Math.random(),
      col:['rgba(100,255,200,.6)','rgba(150,200,255,.6)','rgba(255,200,150,.6)'][Math.floor(Math.random()*3)]
    });
    function draw(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        ctx.globalAlpha=Math.sin(p.life*Math.PI)*.4;
        ctx.fillStyle=p.col;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.y+=p.vy;
        p.x+=p.vx;
        p.life+=.003;
        if(p.life>1||p.y<-10){
          p.life=0;
          p.y=H+10;
          p.x=Math.random()*W;
        }
      });
      ctx.globalAlpha=1;
      animId=requestAnimationFrame(draw);
    }
    draw();
  }
```

**Particle Effect Ideas by Scene Type:**

| Scene Type | Effect Ideas |
|------------|-------------|
| Forest | Falling leaves (green/brown) |
| Snow | Snowflakes (white circles) |
| Beach | Bubbles rising |
| Volcano | Embers rising with glow |
| Cave | Sparkles/crystals |
| Lab | Colored bubbles/steam |
| City | Rain drops |
| Desert | Sand particles |
| Space | Stars twinkling |

**Particle Properties:**
- `x, y` - Position
- `r` - Radius (size)
- `vx, vy` - Velocity (movement speed)
- `life` - Fade cycle (0-1)
- `col` - Color (rgba)

---

## Quick Reference Checklist

When adding a new scene called `my_scene`:

- [ ] Image added to `/assets/bg_my_scene.jpg`
- [ ] Added to `BGS` constant: `my_scene:'assets/bg_my_scene.jpg'`
- [ ] Added to `validScenes` array: `'my_scene'`
- [ ] Added to prompt "Available:" list
- [ ] Added to prompt "Scene names are EXACT:" list
- [ ] Added checkbox in `index.html` with emoji
- [ ] (Optional) Added particle effects for `scene==='my'`

---

## Common Mistakes to Avoid

❌ **Filename mismatch:**
```javascript
BGS = {city: 'assets/bg_town.jpg'}  // WRONG - names don't match
```

✅ **Correct:**
```javascript
BGS = {city: 'assets/bg_city.jpg'}  // RIGHT
```

---

❌ **Missing comma:**
```javascript
BGS = {
  village: 'assets/bg_village.jpg'
  city: 'assets/bg_city.jpg'  // ERROR - missing comma above
}
```

✅ **Correct:**
```javascript
BGS = {
  village: 'assets/bg_village.jpg',  // comma here
  city: 'assets/bg_city.jpg'
}
```

---

❌ **Using spaces in scene name:**
```javascript
BGS = {'lab table': 'assets/bg_lab_table.jpg'}  // BAD
```

✅ **Correct:**
```javascript
BGS = {lab_table: 'assets/bg_lab_table.jpg'}  // GOOD
```

---

❌ **Forgetting validation list:**
- Scene added to BGS
- Scene NOT added to validScenes
- Result: Stories importing will fail validation!

---

## Testing Your New Scene

### Test 1: Visual Test
1. Create a simple test story
2. Set a page to use your new scene
3. Import the story
4. Navigate to that page
5. Verify image loads correctly

### Test 2: Validation Test
```json
{
  "pages": {
    "start": {
      "scene": "lab_table",
      "text": "Test"
    }
  }
}
```
Import this - should NOT show "Invalid scene" error

### Test 3: Generator Test
1. Go to "CREATE STORY"
2. Check if your scene appears in checkboxes
3. Select it
4. Generate prompt
5. Verify scene appears in prompt text

---

## Scene Naming Best Practices

**Good Names:**
- `lab_table` - Specific and clear
- `city_street` - Descriptive
- `forest_deep` - Shows variation
- `house_bedroom` - Location hierarchy

**Bad Names:**
- `scene1` - Not descriptive
- `cool background` - Has space
- `LaB_TaBlE` - Inconsistent casing
- `laboratory_experimentation_area` - Too long

**Patterns to Follow:**
- General → Specific: `location_detail`
- Examples:
  - `forest` → `forest_stream`, `forest_clearing`
  - `house` → `house_entry`, `house_living`
  - `lab` → `lab_table`, `lab_hallway`

---

## Particle Effects - Deep Dive

### Basic Template:
```javascript
else if(scene==='YOUR_SCENE'){
  // Create particles
  for(let i=0; i<NUMBER_OF_PARTICLES; i++){
    pts.push({
      x: Math.random()*W,           // Random X position
      y: Math.random()*H,           // Random Y position
      r: 1+Math.random()*3,         // Size
      vx: (Math.random()-.5)*.5,    // X velocity
      vy: Math.random()*.3,          // Y velocity
      life: Math.random()            // Fade cycle
    });
  }
  
  // Animation loop
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      // Draw particle
      ctx.globalAlpha = Math.sin(p.life*Math.PI)*.5;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      p.life += .005;
      
      // Reset when life cycle complete
      if(p.life > 1){
        p.life = 0;
        p.x = Math.random()*W;
        p.y = Math.random()*H;
      }
    });
    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }
  draw();
}
```

### Customization Options:

**Falling Effect (rain, snow, leaves):**
```javascript
vy: 0.3 + Math.random()*.5  // Positive = falls down
```

**Rising Effect (bubbles, smoke, embers):**
```javascript
vy: -(0.3 + Math.random()*.5)  // Negative = rises up
```

**Horizontal Drift:**
```javascript
vx: (Math.random()-.5)*.3  // Random left/right
```

**Color Variation:**
```javascript
col: ['#ff0000','#00ff00','#0000ff'][Math.floor(Math.random()*3)]
pts.push({..., col: colors[i%colors.length]})
```

**Size Variation:**
```javascript
r: 1 + Math.random()*5  // Small to large
```

**Opacity/Fade:**
```javascript
ctx.globalAlpha = Math.sin(p.life*Math.PI)*.7  // 0-70% opacity
```

---

## Advanced: Scene Variations

You can create variations of the same scene:

```javascript
// In startParticles function:
const sceneBase = scene.split('_')[0];  // 'lab_table' → 'lab'

if(sceneBase === 'lab'){
  // Same particles for lab_table AND lab_hallway
}
```

This way both `lab_table` and `lab_hallway` share the same particle effect!

---

## Summary

**5 Required Steps:**
1. Add image to `/assets/`
2. Update `BGS` constant
3. Update `validScenes` array
4. Update prompt (2 places)
5. Add HTML checkbox

**1 Optional Step:**
6. Add particle effects

**Total Time:** ~10 minutes per scene

**Result:** Professional scene that works in stories, validation, and generation!

---

## Example: Adding a Desert Scene

### 1. Add image:
```
/assets/bg_desert.jpg
```

### 2. BGS constant:
```javascript
const BGS={...,desert:'assets/bg_desert.jpg'};
```

### 3. Validation:
```javascript
const validScenes=[...,'desert'];
```

### 4. Prompt (2 places):
```
Available: ..., desert
Scene names are EXACT: ..., desert
```

### 5. HTML:
```html
<label class="checkbox-label">
  <input type="checkbox" value="desert"> 🏜️ Desert
</label>
```

### 6. Particles (optional):
```javascript
else if(scene==='desert'){
  // Sand particles - small, slow horizontal drift
  for(let i=0;i<30;i++){
    pts.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:0.5+Math.random()*1.5,
      vx:(Math.random()-.3)*.8,  // Mostly right drift
      vy:Math.random()*.1,
      life:Math.random(),
      col:'rgba(255,220,150,.3)'  // Sandy color
    });
  }
  function draw(){/* standard draw loop */}
  draw();
}
```

Done! 🎉

---

## Current Scenes (as of Feb 2026)

Total: **19 scenes**

| Scene | Description | Particles |
|-------|-------------|-----------|
| village | Main village | Sparkles |
| village_park | Park area | Sparkles |
| forest | General forest | Leaves |
| forest_stream | Stream in forest | Leaves |
| forest_clearing | Open clearing | Leaves |
| forest_deep | Dense forest | Fireflies |
| mountain_valley | Valley | Snow |
| mountain_ridge | Ridge | Snow |
| mountain_peak | Peak | Snow |
| house_entry | House entrance | Sparkles |
| house_living | Living room | Sparkles |
| snow | Snowy area | Snowflakes |
| cherry | Cherry blossoms | Petals |
| volcano | Volcano | Embers |
| beach | Beach | Bubbles |
| sunset | Sunset sky | Fireflies |
| cave | Dark cave | Sparkles |
| lab_table | Lab table | Bubbles |
| lab_hallway | Lab hallway | Bubbles |

---

## Need Help?

If you get stuck:
1. Check browser console for errors
2. Verify all 5 steps completed
3. Check for typos in scene names
4. Make sure image file exists
5. Test with simple story first

Common error messages:
- "Invalid scene" → Check validScenes array
- Image not loading → Check BGS path
- Scene not in dropdown → Check HTML

Happy scene adding! 🎨
