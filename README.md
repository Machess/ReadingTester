# Pokémon Story Adventure 📚⚡

An interactive, branching story application for children that adapts to their reading level and allows custom AI-generated stories.

## 📁 Project Structure

```
pokemon-story-app/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styles and responsive design
├── js/
│   └── app.js          # Application logic and story engine
└── assets/             # Images and media
    ├── profoak.png
    ├── trainer1.png
    ├── trainer2.png
    ├── trainer3.png
    ├── bg_village.jpg
    ├── bg_forest.jpg
    ├── bg_snow.jpg
    ├── bg_cherry.jpg
    ├── bg_volcano.jpg
    ├── bg_beach.jpg
    ├── bg_sunset.jpg
    └── bg_cave.jpg
```

## 🚀 Features

### Core Features
- ✅ **Branching Interactive Stories** - Make choices that affect the narrative
- ✅ **Bilingual Support** - English & Icelandic (Íslenska)
- ✅ **Age-Adaptive Reading Levels** - 6 tiers from Grade K (ages 5-6) to Grade 9+ (15+)
- ✅ **Gender-Flexible Stories** - Use template variables for personalization
- ✅ **Pokémon Integration** - Choose your companion from 12 Pokémon
- ✅ **Story Library System** - Import, export, and manage unlimited stories
- ✅ **Offline-First** - Works without internet once loaded
- ✅ **Mobile Responsive** - Optimized for 375×667 to desktop

### Story Creation
- 📝 **AI Prompt Generator** - Creates perfect prompts for Claude, ChatGPT, or Gemini
- 🎨 **Customizable Parameters**:
  - Theme (friendship, adventure, courage, mystery, helping)
  - Age range and reading level
  - Number of pages (4-8)
  - Branching style (linear, simple, complex)
  - Scenes to include (8 pixel art backgrounds)
  - Gender support (boy/girl/both)
  - Pokémon compatibility
  - Story mood

### Story Management
- 📚 **Library Display** - View all imported and default stories
- 📥 **Import System** - Upload JSON files or paste directly
- ✅ **Validation** - Detailed error checking before import
- 📤 **Export** - Download any story as .json
- 🗑️ **Delete** - Remove imported stories (defaults protected)
- 📊 **Play Tracking** - See how many times each story was played

## 🎮 How to Use

### Playing Stories
1. Open `index.html` in a web browser
2. Click "NEW STORY"
3. Answer Professor Oak's questions (name, age, gender, Pokémon)
4. The app automatically selects the best-fit story from your library
5. Read and make choices to branch through the narrative

### Creating Custom Stories
1. Click "CREATE STORY" from main menu
2. Fill out the story parameters form
3. Click "GENERATE PROMPT"
4. Copy the generated prompt
5. Paste into Claude.ai, ChatGPT, or Gemini
6. Copy the JSON output from the AI
7. Go to "MANAGE STORIES" → Import the JSON

### Managing Your Library
1. Click "MANAGE STORIES" from main menu
2. View all available stories
3. Import new stories (upload file or paste JSON)
4. Export stories to share or backup
5. Delete imported stories as needed

## 🔧 Technical Details

### Template Variables
Stories use these variables for personalization:
- `{{name}}` - Child's name
- `{{pokemon}}` - Chosen Pokémon
- `{{age}}` - Child's age
- `{{he}}/{{she}}` - Gender pronouns (auto-swaps)
- `{{his}}/{{her}}` - Possessive pronouns
- `{{He}}/{{His}}` - Capitalized versions

### Reading Level Guidelines
Each age tier has specific requirements:
- **Ages 5-6 (Grade K)**: 3-5 word sentences, 100 most common words
- **Ages 7-8 (Grades 1-2)**: Simple sentences, basic vocabulary
- **Ages 9-10 (Grades 3-4)**: Varied structure, descriptive language
- **Ages 11-12 (Grades 5-6)**: Complex sentences, metaphors
- **Ages 13-14 (Grades 7-8)**: Advanced vocabulary, thematic depth
- **Ages 15+ (Grade 9+)**: Mature literary style

### Story JSON Structure
```json
{
  "meta": {
    "id": "story_unique_id",
    "title": "Story Title",
    "language": "en",
    "ageRange": {"min": 7, "max": 10, "tier": "medium"},
    "genderSupport": {"boy": true, "girl": true},
    "pokemonFlexible": true,
    "theme": "friendship",
    "totalPages": 5,
    "scenesUsed": ["village", "forest", "sunset"]
  },
  "pages": {
    "start": {
      "id": "start",
      "title": "Chapter Title",
      "scene": "village",
      "text": "{{name}} woke up...",
      "choices": [
        {"text": "Go to forest", "next": "forest_path"},
        {"text": "Stay home", "next": "home_path"}
      ]
    }
  },
  "startPage": "start"
}
```

## 📦 Storage

Stories are saved in browser localStorage:
- ~5-10MB available
- Persists across browser sessions
- Export/import for backup and sharing
- Default stories always available

## 🎨 Asset Credits

- **Backgrounds**: 8 pixel art scenes (village, forest, snow, cherry blossoms, volcano, beach, sunset, cave)
- **Trainer Sprites**: 3 variations (randomly selected)
- **Professor Oak**: Character sprite
- **Pokémon Sprites**: Fetched from PokeAPI (official artwork)
- **Pokémon Cries**: Audio from PokeAPI

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari (iOS 12+)
- ✅ Mobile browsers

## 📱 Mobile Support

Fully responsive design:
- Touch-friendly interface
- Vertical layout on small screens
- Safe area insets for notched phones
- Optimized for 375×667 (iPhone SE) and up

## 🔐 Privacy

- No data sent to external servers
- No tracking or analytics
- All processing done locally
- Stories stored only in browser localStorage

## 🛠️ Development

To modify the app:
1. Edit `css/style.css` for styling changes
2. Edit `js/app.js` for functionality changes
3. Edit `index.html` for structure changes
4. Replace images in `assets/` folder to customize visuals

## 📝 License

Educational project - Free to use and modify.

## 🤝 Contributing

To add new features or fix bugs:
1. Test thoroughly across browsers
2. Ensure mobile responsiveness
3. Update this README if adding features
4. Validate all JSON stories before committing

## 🎓 Educational Use

Perfect for:
- Literacy development
- Creative writing inspiration
- Reading comprehension practice
- ESL/language learning
- Parent-child bonding through storytelling

---

**Enjoy creating personalized Pokémon adventures!** 🎉
