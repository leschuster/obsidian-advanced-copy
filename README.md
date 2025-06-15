# Obsidian Advanced Copy

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/leschuster/obsidian-advanced-copy/main.yml)
![GitHub Release](https://img.shields.io/github/v/release/leschuster/obsidian-advanced-copy)

An [Obsidian](https://obsidian.md) plugin to copy Markdown and transform it into HTML, Anki, or any custom format. Create custom profiles with versatile templates tailored to your workflow.

You can create templates for almost all Markdown elements supported by Obsidian, organized under a "Profile". Templates can include variables such as the heading level, element content, current filename, and date.

When running the plugin's commands, you need to select a profile. Default profiles are available and can be customized to your preferences.

## 💡 Example Use Cases

- Copy notes as HTML with functioning links
- Export selected Markdown as Anki-compatible HTML
- Copy content along with a source reference to the original note
- Quickly share text snippets by pasting them into platforms like Slack

## 🎬 Demo

todo: remove metadata

![Demo Image 1](docs/assets/demo1.png)

![Demo Image 2](docs/assets/demo2.png)

![Demo video](https://github.com/user-attachments/assets/af4e9f83-d324-42f4-95fc-bda558bcee2c)

## 🚀 Quickstart

You can download this plugin in the **Obsidian Community plugins tab**.

Here is how to do it manually:

1. From the latest release, download `main.js`, `manifest.json` and `styles.css`.
2. Open your vaults plugin directory: `<vault>/.obsidian/plugins/`
3. Create a new directory called `advanced-copy` and place the downloaded files there.
4. Restart Obsidian or reload the community plugins list.
5. Enable `Advanced Copy` in the community plugins list.

## ▶️ Usage

This plugin adds the commands `Advanced Copy: Copy Page` and `Advanced Copy: Copy Selection`. You need to choose which profile to use. After that, the plugin will copy the Markdown text, perform transformations according to the profile and place the result in the clipboard.

To speed things up, you can add separate commands for each profile. You may also add hotkeys for these commands in Obsidians `Hotkeys`-Tab. Beware that you might need to restart Obsidian for the changes to take effect.

## ⚙️ Configuration

In the plugins setting tab, you can configure pre-existing profiles, delete or duplicate them. You can also enable/disable commands for specifc profiles (you need to restart Obsidian after that).

Global variables are listed at the beginning of the `Templates` section in the `Edit` dialog. Local variables are listed in the description of the template.

## 🤝 Contributing

Please create a dedicated Dev vault in Obsidian. Do not use your main vault!

1. Go to your vaults plugin folder: `<vault>/.obsidian/plugins/`
2. Clone this repository: `git clone https://github.com/leschuster/obsidian-advanced-copy.git`
3. Rename the downloaded directory to `advanced-copy` and open it in your editor.
4. Install dependencies: `npm i`
5. Run the project: `npm run dev`
6. Make your changes
7. Run tests: `npm run test` or `npm run test:watch`

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.

**Note:** After you've made code changes, you need to either restart Obsidian or disable & enable the plugin. Alternatively, you can use the [Obsidian Hot-Reload Plugin](https://github.com/pjeby/hot-reload).

## 🚢 How to Release

1. Update the version in the following files:
    - `manifest.json`
    - `version-bump.mjs`
    - `package.json`
2. Run `npm i` to update the version in `package-lock.json`.
3. Commit your changes.
4. Tag the commit with the new release version:
    ```bash
    git tag -s 0.x.y -m "Release 0.x.y"
    ```
5. Push the changes and open Pull Request.

## 🙏 Acknowledgements

The core functionality of this project, converting Markdown to a custom format, relies heavily on the incredible work done by the [unified](https://github.com/unifiedjs) and [remark](https://github.com/remarkjs) projects. I am deeply grateful for their contributions.
