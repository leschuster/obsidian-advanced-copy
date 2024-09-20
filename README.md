# Obsidian Sample Plugin

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/leschuster/obsidian-advanced-copy/main.yml)
![GitHub Release](https://img.shields.io/github/v/release/leschuster/obsidian-advanced-copy)

A plugin for Obsidian (https://obsidian.md) that lets you copy text and transform it according to your needs.

Note: This plugin is still in alpha. Please open issues if you find bugs or have ideas for improvements.

## Example Use Cases

-   Insert metadate (e.g., a backlink to the file, current date) into the copied text
-   Convert Markdown to HTML
-   Convert Markdown to HTML with custom classes/styles
-   Convert Markdown to Anki HTML
-   Remove all Markdown syntax elements from the text

## 🚀 Quickstart

This project is not yet available in Obsidians community plugin list. You need to install it manually for now.

1. From the latest release, download `main.js` and `manifest.json`.
2. Open your vaults plugin directory:
    1. In Obsidian, go to "Community plugins".
    2. Hit the folder icon next to the heading `Installed plugins`.
3. Create a new directory called `obsidian-advanced-copy` and place the downloaded files there.
4. Restart Obsidian or reload the community plugins list.
5. Enable `Advanced Copy` in the community plugins list.

## Usage

This plugin adds the commands `Advanced Copy: Copy Page` and `Advanced Copy: Copy Selection`. You need to choose which profile to use. After that, the plugin will copy the Markdown text, perform transformations according to the profile and place the result in the clipboard.

To speed things up, you can add separate commands for each profile. You may also add hotkeys for these commands in Obsidians `Hotkeys`-Tab.

## ⚙️ Configuration

In the plugins setting tab, you can configure pre-existing profiles, delete or modify them. You can also enable/disable commands for specifc profiles (you need to restart Obsidian after that).

Please refer to the wiki for detailed information about a profiles configuration.

## 🤝 Contributing

### Obsidian Test Vault

For development, please create a dedicated Test or Dev vault for Obsidian. Do not use your main vault for development.

### Clone the repo

Clone the repo into your vaults plugin folder.

```bash
git clone https://github.com/leschuster/obsidian-advanced-copy.git
cd obsidian-advanced-copy
```

### Install dependencies

```bash
npm i
```

### Run the project

```bash
npm run dev
```

### Run the tests

```bash
npm run test
```

or

```bash
npm run test:watch
```

### Make changes

You can now go to Obsidian and enable the plugin. After you've made code changes, you need to either restart Obsidian or disable & enable the plugin.

Alternatively, you can use the [Obsidian Hot-Reload Plugin](https://github.com/pjeby/hot-reload).

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.
