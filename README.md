# Block Deleter

Block Deleter is an Obsidian plugin that allows you to easily delete content blocks separated by horizontal divider lines.

## Features

- **Delete Button Widget**: Automatically displays a deletion button `✕` at the start of each text block that follows a divider line.
- **Easy Block Clean Up**: Clicking the button instantly deletes the content block between the current divider and the next divider.
- **Customizable Divider**: Define your own divider string (e.g., `-----`) in the plugin settings.

## Installation

To install the plugin manually:

1. Clone this repository to a local directory.
2. Install dependencies and build the project:
   ```bash
   npm install
   npm run build
   ```
3. Create a folder named `block-deleter` in your Obsidian vault's plugins directory: `<VaultFolder>/.obsidian/plugins/block-deleter/`.
4. Copy `main.js`, `manifest.json`, and `styles.css` from the build directory into that folder.
5. Reload Obsidian and enable **Block Deleter** under **Settings → Community plugins**.

## Development

1. Clone this repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start compilation in watch mode:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## License

This project is licensed under the [MIT License](LICENSE).

---

<a href="https://www.buymeacoffee.com/hungliang" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>