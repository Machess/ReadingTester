# 🚀 Quick Start Guide

## Running the App

### Option 1: Double-Click (Recommended)
1. Simply double-click `index.html`
2. Your default browser will open the app
3. Start playing!

### Option 2: Local Server (For Development)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```
Then open `http://localhost:8000`

## First-Time Setup

### Try the Default Stories
1. Click **"NEW STORY"**
2. Enter your name, age, gender
3. Choose a Pokémon
4. Enjoy one of the 2 built-in stories!

### Create Your First Custom Story
1. Click **"CREATE STORY"**
2. Fill out the form:
   - Theme: "Friendship"
   - Age: "9-10"
   - Language: "English"
   - Pages: "5"
   - Branching: "Simple"
   - Scenes: Check "Village", "Forest", "Cherry", "Sunset"
   - Gender: Both
   - Pokémon: Flexible
3. Click **"GENERATE PROMPT"**
4. Click **"COPY TO CLIPBOARD"**
5. Go to [Claude.ai](https://claude.ai) or [ChatGPT](https://chat.openai.com)
6. Paste the prompt
7. Wait for the AI to generate a JSON story
8. Copy the entire JSON response
9. Return to the app
10. Click **"MANAGE STORIES"**
11. Paste the JSON into the text area
12. Click **"VALIDATE & IMPORT"**
13. Done! Your story is now in the library

## Understanding the Interface

### Main Menu
- 🇬🇧🇮🇸 **Language Flags** - Switch between English/Icelandic
- ▶️ **NEW STORY** - Start reading a story
- 📝 **CREATE STORY** - Generate AI prompt for new story
- 📚 **MANAGE STORIES** - Import/export/delete stories

### Story Player
- **Choice Buttons** - Click to make decisions and branch the story
- **◀ BACK** - Return to previous choice
- **🔊 CRY** - Hear your Pokémon's cry (page 4 only)
- **⬡ MENU** - Return to main menu

### Keyboard Shortcuts
- **Arrow Keys** - Navigate choices (when applicable)
- **Escape** - Return to menu (future feature)

## Troubleshooting

### Story doesn't load
- Check browser console (F12) for errors
- Ensure all files are in correct folders
- Try refreshing the page (Ctrl/Cmd + R)

### Images don't appear
- Verify `assets/` folder contains all 12 images
- Check file names match exactly (case-sensitive)
- Open browser DevTools > Network to see failed requests

### Story import fails
- Ensure JSON is valid (use JSONLint.com to check)
- Verify all required fields are present
- Check validation error messages for details

### LocalStorage full
- Export important stories as backup
- Delete unused stories from library
- Clear browser cache if needed

## Tips & Tricks

### Creating Better Stories
- Be specific in the AI prompt's additional instructions
- Test your story after importing to catch errors
- Use meaningful choice text (≤6 words works best)
- Ensure all story paths lead to an ending

### Managing Large Libraries
- Export stories regularly as backup
- Name stories descriptively (edit the JSON's title field)
- Delete test stories you don't need
- Group stories by theme or age in file names when exporting

### Sharing Stories
1. Go to "MANAGE STORIES"
2. Click **"EXPORT"** on any story
3. Share the .json file with others
4. They can import it into their own library

## Customization

### Change Background Images
1. Create 1280×720 pixel art images
2. Save as JPG with these exact names:
   - `bg_village.jpg`
   - `bg_forest.jpg`
   - `bg_snow.jpg`
   - `bg_cherry.jpg`
   - `bg_volcano.jpg`
   - `bg_beach.jpg`
   - `bg_sunset.jpg`
   - `bg_cave.jpg`
3. Replace files in `assets/` folder

### Change Colors
Edit `css/style.css` and modify the `:root` variables:
```css
:root {
  --red: #e3350d;    /* Pokémon red */
  --yel: #ffcb05;    /* Pokémon yellow */
  --blu: #3d7dca;    /* Pokémon blue */
  /* ... etc */
}
```

## Getting Help

### Common Questions
**Q: Can I use this commercially?**
A: This is an educational project. Check Pokémon trademark guidelines for commercial use.

**Q: Why can't I hear Pokémon cries?**
A: Cries load from PokeAPI and require internet. Some browsers block autoplay audio.

**Q: Can I add more than 12 Pokémon?**
A: Yes! Edit `js/app.js` and add to the `POKES` array with official PokeAPI IDs.

**Q: Does this work offline?**
A: Mostly! Stories work offline, but Pokémon sprites and cries need internet.

**Q: Can I translate the interface?**
A: Yes! Edit the `L.en` and `L.is` objects in `js/app.js` to add more languages.

## Next Steps

1. ✅ Create 3-5 custom stories for different ages
2. ✅ Test stories with real kids
3. ✅ Share your best stories with friends
4. ✅ Customize the visuals to your liking
5. ✅ Consider adding more Pokémon choices

---

**Have fun creating magical Pokémon adventures!** 🎉⚡📚
