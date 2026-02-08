# NotebookLM Skills

<p align="center">
  <a href="https://github.com/Dong237/notebooklm-skills/releases"><img src="https://img.shields.io/github/v/release/Dong237/notebooklm-skills?style=for-the-badge&color=blue" alt="GitHub Release"></a>
  <img src="https://img.shields.io/badge/node.js-16+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 16+">
  <a href="https://github.com/Dong237/notebooklm-skills/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Dong237/notebooklm-skills?style=for-the-badge&color=green" alt="License"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/notebooklm-cli"><img src="https://img.shields.io/npm/v/notebooklm-cli?style=flat-square&logo=npm&label=CLI" alt="npm"></a>
  <a href="https://www.npmjs.com/package/notebooklm-cli"><img src="https://img.shields.io/npm/dm/notebooklm-cli?style=flat-square&label=downloads" alt="npm downloads"></a>
  <a href="https://github.com/Dong237/notebooklm-skills/stargazers"><img src="https://img.shields.io/github/stars/Dong237/notebooklm-skills?style=flat-square&logo=github" alt="GitHub stars"></a>
</p>

Transform your files and folders into rich learning materials—audio podcasts, video explainers, slide decks, quizzes, flashcards, and more—using Google's NotebookLM, all through your AI coding assistant.

## What is NotebookLM Skills?

**NotebookLM Skills** is an AI coding assistant skill that automates the creation of learning materials from your documents. Point it at your PDFs, Markdown files, or folders, and it generates:

- 🎙️ **Audio Podcasts** (Deep Dive, Brief, Critique, Debate)
- 🎬 **Video Explainers** with 9 visual styles
- 📊 **Slide Decks** (automatically watermark-free)
- 📝 **Study Guides** and **Briefing Docs**
- ❓ **Quizzes** and **Flashcards**
- 🗺️ **Mind Maps** and **Infographics**
- 📄 **Custom Reports** and **Blog Posts**

It handles batch processing, resume support, and intelligent file grouping—all through a conversational AI interface.

## Features

### 🚀 Core Capabilities

- **Batch Processing** - Process multiple files or folders in one session
- **8 Output Formats** - Audio, video, slides, quizzes, flashcards, infographics, mind maps, reports
- **Automatic Watermark Removal** - Slide decks are automatically cleaned using advanced texture cloning
- **Configurable Grouping** - Individual files, subfolders, entire folders, or custom patterns
- **Companion File Pairing** - Automatically pair primary files with supporting materials
- **Shared Resources** - Include global files (glossaries, references) in all batches
- **Resume Support** - Interrupted batches can be resumed without re-processing
- **State Tracking** - Progress saved to local files with Markdown tables

### 🎯 Intelligent Workflow

The skill uses a **3-phase workflow**:

1. **Configure** (Phase 1) - 8-step guided configuration
   - Select source directory and file types
   - Define grouping strategy (individual, subfolder, folder, custom)
   - Configure companion file pairing
   - Choose output formats and customize options
   - Set focus prompts for AI generation

2. **Confirm** (Phase 2) - State file creation and validation
   - Generates `.notebook-decks-meta.json` (full configuration)
   - Creates `tasks.md` (human-readable progress table)
   - Writes `generation-config.jsonl` (batch processing queue)
   - Validates all configurations before starting

3. **Process** (Phase 3) - Batch execution via NotebookLM MCP
   - Creates notebooks using `notebooklm-mcp` tools
   - Uploads sources with progress tracking
   - Generates artifacts (polls every 15-30s)
   - Downloads and optionally cleans outputs
   - Updates state files after each batch

### 📦 Output Types with Sub-Options

| Format | Sub-Options | Description |
|--------|-------------|-------------|
| **Audio** | Deep Dive, Brief, Critique, Debate | Short/Default/Long duration |
| **Video** | Explainer, Brief | 9 visual styles (Warm, Cool, Ocean, etc.) |
| **Slide Deck** | Detailed, Presenter Slides | Short/Default length, auto-cleaned |
| **Study Guide** | - | Comprehensive study materials |
| **Quiz** | Easy/Medium/Hard | Configurable question count |
| **Flashcards** | Easy/Medium/Hard | Difficulty-based card sets |
| **Infographic** | Landscape/Portrait/Square | Concise/Standard/Detailed |
| **Mind Map** | - | Visual knowledge structure |
| **Reports** | Briefing Doc, Blog Post, Custom | Structured documents |

## Prerequisites

Before using this skill, ensure you have:

1. **NotebookLM MCP** installed and authenticated
   ```bash
   # If using notebooklm-mcp, ensure it's configured in your MCP settings
   # Run authentication:
   nlm login  # via terminal
   ```

2. **Node.js 16+** (for watermark removal script)
   ```bash
   node --version  # Should be 16.0.0 or higher
   ```

3. **AI Coding Assistant** - One of:
   - [Claude Code](https://claude.ai/claude-code)
   - [Cursor](https://cursor.sh)
   - [Windsurf](https://windsurf.com)
   - [Continue](https://continue.dev)
   - Or any compatible AI assistant

## Installation

### Method 1: CLI Installation (Recommended)

The easiest way to install across any platform:

```bash
# Install the CLI globally
npm install -g notebooklm-cli

# Install skill to your AI assistant
nlm-cli init --ai claude      # For Claude Code
# nlm-cli init --ai cursor    # For Cursor
# nlm-cli init --ai windsurf  # For Windsurf
# nlm-cli init --ai continue  # For Continue
```

The CLI will:
- ✅ Detect your AI assistant
- ✅ Copy skill files to the correct location
- ✅ Install Node.js dependencies for watermark removal
- ✅ Verify installation

### Method 2: Marketplace Installation (Claude Code, Windsurf)

For Claude Code or Windsurf users:

```
/plugin marketplace add Dong237/notebooklm-skills
/plugin install notebooklm-skills@notebooklm-skills
```

Then restart your AI assistant.

### Method 3: Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Dong237/notebooklm-skills.git
   cd notebooklm-skills
   ```

2. Copy to your AI assistant's skills directory:
   ```bash
   # For Claude Code:
   cp -r src/notebooklm-skills ~/.claude/skills/

   # For Cursor:
   # cp -r src/notebooklm-skills ~/.cursor/skills/

   # For Windsurf:
   # cp -r src/notebooklm-skills ~/.windsurf/skills/

   # For Continue:
   # cp -r src/notebooklm-skills ~/.continue/skills/
   ```

3. Install Node.js dependencies for watermark removal:
   ```bash
   cd ~/.claude/skills/notebooklm-skills/scripts
   npm install
   ```

## Usage

Once installed, activate the skill through natural conversation with your AI assistant:

### Example 1: Basic Usage

```
You: "Transform my lecture PDFs in /docs/lectures into slide decks"

AI: [Activates notebooklm-skills]
    Let me guide you through the configuration...

    Step 1/8: I'll analyze /docs/lectures
    Found 5 PDF files:
    - lecture1.pdf
    - lecture2.pdf
    - lecture3.pdf
    - ...

    Step 2/8: Which file types should I process?
    ...
```

The skill will walk you through 8 configuration questions, create state files, and process your batches automatically.

### Example 2: With Custom Grouping

```
You: "Convert my research papers into audio podcasts. Group by subfolder and include the README in each."

AI: [Guides you through configuration]
    - Grouping: subfolder
    - Companions: all_in_folder
    - Shared files: README.md
    - Output: audio → deep_dive → default
```

### Example 3: Resume Interrupted Session

```
You: "Resume the NotebookLM processing"

AI: [Detects state files]
    Found incomplete batches. Resuming from batch 3/10...
    Batch 3: Creating notebook for "Chapter 3"...
```

### Example 4: Multiple Outputs

```
You: "Generate study materials from my course notes. I want quizzes, flashcards, and a study guide."

AI: [Will process 3 times - once for each output format]
```

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  USER REQUEST                                                   │
│  "Transform my PDFs into slide decks"                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 1: CONFIGURE (01-configure.md)                           │
│  • Analyze source directory                                     │
│  • Select file types and grouping strategy                      │
│  • Configure companions and shared files                        │
│  • Choose output formats and options                            │
│  • Set focus prompts                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 2: CONFIRM (02-confirm.md)                               │
│  • Generate state files:                                        │
│    - .notebook-decks-meta.json (full config)                    │
│    - tasks.md (progress table)                                  │
│    - generation-config.jsonl (batch queue)                      │
│  • Validate JSON structure                                      │
│  • Get user confirmation                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  PHASE 3: PROCESS (03-process.md)                               │
│  For each batch:                                                │
│  1. notebook_create → Create notebook                           │
│  2. source_add → Upload primary + companions + shared files     │
│  3. studio_create → Generate artifact (audio/video/slides/...)  │
│  4. studio_status → Poll every 15-30s until complete            │
│  5. download_artifact → Save to output directory                │
│  6. [If slides] clean-watermark.js → Remove watermarks          │
│  7. Update state files → Mark batch complete                    │
└─────────────────────────────────────────────────────────────────┘
```

### State Files

The skill creates 3 state files in your project root:

1. **`.notebook-decks-meta.json`** - Full configuration + batch metadata
   ```json
   {
     "source_dir": "/docs/lectures",
     "grouping": "individual_file",
     "output_format": "slide_deck",
     "batches": [...]
   }
   ```

2. **`tasks.md`** - Human-readable progress table
   ```markdown
   | Batch | Name | Primary Files | Status | Notebook ID |
   |-------|------|---------------|--------|-------------|
   | 1     | lecture1 | lecture1.pdf | downloaded | abc123 |
   | 2     | lecture2 | lecture2.pdf | processing | def456 |
   ```

3. **`generation-config.jsonl`** - Machine-readable batch queue (one batch per line)
   ```jsonl
   {"batch_id":1,"name":"lecture1","primary_files":["lecture1.pdf"],...}
   {"batch_id":2,"name":"lecture2","primary_files":["lecture2.pdf"],...}
   ```

### Design Principles

- **MCP-Only** - All NotebookLM operations use `notebooklm-mcp` tools (never CLI)
- **State-First** - Configuration written to disk before any operations
- **Fully Gated** - Every phase waits for user confirmation
- **Resumable** - Incomplete batches can be resumed via state files
- **No Script Generation** - Never creates automation scripts (.sh, .py, .js)

## Watermark Removal

Slide decks generated by NotebookLM include a small watermark in the bottom-right corner. This skill **automatically removes it** using advanced texture cloning:

### How It Works

1. **Detection** - Fixed position watermark (bottom-right, 8.25% × 3.75% of image)
2. **Texture Cloning** - Samples surrounding pixels and clones texture
3. **Edge Feathering** - 12px gradient for seamless blending
4. **PDF Reconstruction** - Rebuilds PDF with cleaned pages

The algorithm is based on [SlideClean](https://github.com/example/slideclean) and runs automatically after slide deck downloads.

### Manual Cleaning

You can also clean PDFs manually:

```bash
# Single file
node ~/.claude/skills/notebooklm-skills/scripts/clean-watermark.js input.pdf output.pdf

# Batch processing
node ~/.claude/skills/notebooklm-skills/scripts/clean-watermark.js --batch /path/to/directory
```

## Development

### File Structure

```
notebooklm-skills/
├── .claude-plugin/          # Plugin metadata
│   ├── plugin.json          # Plugin registration
│   └── marketplace.json     # Marketplace metadata
├── src/                     # Source of truth
│   └── notebooklm-skills/
│       ├── SKILL.md         # Main skill definition
│       ├── phases/          # 3-phase workflow
│       │   ├── 01-configure.md
│       │   ├── 02-confirm.md
│       │   └── 03-process.md
│       └── scripts/         # Utilities
│           ├── clean-watermark.js
│           ├── package.json
│           └── package-lock.json
├── .claude/                 # Local development
│   └── skills/
│       └── notebooklm-skills/  (copy of src/)
├── .shared/                 # Reference copy
│   └── notebooklm-skills/  (copy of src/)
├── cli/                     # NPM CLI installer
│   ├── src/                 # TypeScript source
│   ├── assets/              # Bundled skill files
│   └── dist/                # Compiled output
├── README.md
├── LICENSE
└── .gitignore
```

### Source-of-Truth Pattern

- **`src/`** - Canonical source (edit here)
- **`.claude/`** - Local development (synced from src/)
- **`.shared/`** - Reference (synced from src/)
- **`cli/assets/`** - Bundled for distribution (synced from src/)

### Contributing

Contributions are welcome! Please follow these guidelines:

1. Make changes in `src/notebooklm-skills/`
2. Test locally by syncing to `.claude/skills/`
3. Ensure the 3-phase workflow still works end-to-end
4. Update README.md if adding features
5. Submit a pull request with clear description

## Roadmap

- [ ] Add support for Google Drive sources
- [ ] Implement custom templates for reports
- [ ] Add progress bars for long-running batches
- [ ] Support for additional output formats (timelines, diagrams)
- [ ] Parallel batch processing (process multiple batches simultaneously)
- [ ] Web UI for configuration (alternative to conversational interface)

## FAQ

**Q: Do I need a NotebookLM account?**
A: Yes, you need a Google account with access to NotebookLM. The `notebooklm-mcp` tool handles authentication.

**Q: What file types are supported?**
A: Any file type that NotebookLM supports: PDF, TXT, MD, DOCX, URLs, Google Docs, etc.

**Q: Can I process hundreds of files at once?**
A: Yes, but processing is sequential (one batch at a time). Large jobs may take several hours depending on output type.

**Q: Why do I need Node.js?**
A: Only for watermark removal on slide decks. If you don't need slide decks, Node.js is optional.

**Q: Can I customize the AI prompts?**
A: Yes, in Step 8 of configuration, you can provide a "focus prompt" that guides the AI generation.

**Q: What happens if my internet disconnects during processing?**
A: The skill saves state after each batch. You can resume by saying "Resume NotebookLM processing."

**Q: Can I use this with other AI assistants besides Claude?**
A: Yes! The CLI installer supports 14+ platforms including Cursor, Windsurf, Continue, Copilot, and more.

## Troubleshooting

### Issue: Skill not activating

**Solution:**
```bash
# Verify installation
ls ~/.claude/skills/notebooklm-skills/
# Should show: SKILL.md, phases/, scripts/

# Check skill is recognized
# In your AI assistant, it should appear in the skills list
```

### Issue: Watermark removal fails

**Solution:**
```bash
# Check Node.js version
node --version  # Must be 16+

# Reinstall dependencies
cd ~/.claude/skills/notebooklm-skills/scripts
rm -rf node_modules
npm install
```

### Issue: NotebookLM authentication errors

**Solution:**
```bash
# Re-authenticate
nlm login

# Or use the MCP tool directly
# In your AI assistant: "Please run notebooklm-mcp:refresh_auth"
```

### Issue: State files out of sync

**Solution:**
```bash
# Reset state (caution: loses progress)
rm .notebook-decks-meta.json tasks.md generation-config.jsonl

# Or manually edit tasks.md to fix batch statuses
```

## License

MIT License - see [LICENSE](LICENSE) for details.

Copyright (c) 2025 Dong237

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/Dong237/notebooklm-skills/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/Dong237/notebooklm-skills/discussions)
- 📧 **Email**: youxiang.dong@outlook.com

## Acknowledgments

- Built for use with [Google NotebookLM](https://notebooklm.google.com)
- Uses [notebooklm-mcp](https://github.com/example/notebooklm-mcp) for MCP integration
- Watermark removal inspired by [SlideClean](https://github.com/example/slideclean)
- Developed with [Claude Code](https://claude.ai/claude-code)

---

**Made with ❤️ by [Dong237](https://github.com/Dong237)**
