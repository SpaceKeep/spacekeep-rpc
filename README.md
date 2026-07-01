<p align="center">
  <img src="https://img.shields.io/badge/SpaceKeep-CLI-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiI+UzwvdGV4dD48L3N2Zz4=" alt="SpaceKeep CLI">
</p>

<p align="center">
  <a href="https://github.com/SpaceKeep/spacekeep-rpc/actions">
    <img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build Status">
  </a>
  <a href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/npm-9.0%2B-red?style=flat-square" alt="npm">
  </a>
  <a href="https://github.com/SpaceKeep/spacekeep-rpc/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License">
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/node-%3E%3D16-green?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  </a>
</p>

<p align="center">
  <strong>The official professional CLI tool for managing your <a href="https://spacekeep.dev">SpaceKeep</a> infrastructure and Discord Rich Presence.</strong>
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **Professional Presence** | Broadcast your development status to Discord with custom dashboard links. |
| ⚡ **CLI-Driven** | Lightweight and fast status management directly from your terminal. |
| 🔒 **Secure** | Designed for developers who value security and local configuration. |
| 📖 **Open Source** | Fully auditable code under the MIT License. |
| 🎮 **Discord Rich Presence** | Display your SpaceKeep development status with interactive buttons. |

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) **v16+**
- npm (comes with Node.js)
- A Discord Application with Rich Presence enabled

### Option 1: Clone the Repository

```bash
# 1. Clone the repository
git clone https://github.com/SpaceKeep/spacekeep-rpc.git
cd spacekeep-rpc

# 2. Install dependencies
npm install

# 3. Add your Discord Client ID
echo "CLIENT_ID=your_discord_client_id_here" > .env

# 4. Install globally
npm link
```

### Option 2: Install via npm

```bash
# Install globally from npm registry
npm install -g spacekeep-cli

# Configure your Discord Client ID
echo "CLIENT_ID=your_discord_client_id_here" > ~/.spacekeep.env
```

> **Note:** You can find your Client ID in the Discord [Developer Portal](https://discord.com/developers/applications) under your application.

---

## 🚀 Usage

### Available Commands

| Command | Description |
|---------|-------------|
| `spacekeep start` | Start broadcasting your Rich Presence status |
| `spacekeep stop` | Stop the active broadcast |
| `spacekeep --help` | Show help information |
| `spacekeep --version` | Show version number |

### Examples

**Start Broadcasting**
```bash
spacekeep start
```
This will display your SpaceKeep development status on your Discord profile.

**Stop Broadcasting**
```bash
spacekeep stop
```

**Check Status**
```bash
spacekeep status
```

---

## ⚙️ Configuration

### Custom Client ID

To use a different Discord application, update your `.env` file:

```env
CLIENT_ID=your_new_client_id_here
```

### Custom Status Messages

Edit `index.js` to customize the status messages:

```javascript
client.setActivity({
  details: "Building SpaceKeep",
  state: "v1.0.0-production",
  largeImageKey: "spacekeep_logo",
  largeImageText: "SpaceKeep Infrastructure",
  buttons: [
    { label: "Dashboard", url: "https://spacekeep.dev" },
    { label: "GitHub Org", url: "https://github.com/SpaceKeep" }
  ],
  instance: false
});
```

### Custom Buttons

You can add up to 2 buttons that appear on your Discord profile:

```javascript
buttons: [
  { label: "Website", url: "https://spacekeep.dev" },
  { label: "Documentation", url: "https://docs.spacekeep.dev" }
]
```

---

## 🛠️ Development

### Project Structure

```
spacekeep-rpc/
├── index.js          # Main CLI entry point
├── package.json      # Dependencies and metadata
├── .env              # Environment variables (not committed)
├── .gitignore        # Ignore patterns
├── README.md         # This file
└── LICENSE           # MIT License
```

### Adding New Commands

To extend the CLI with new commands, add them to `index.js`:

```javascript
program
  .command('new-command')
  .description('Description of your new command')
  .action(() => {
    console.log('Executing new command...');
  });
```

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Building for Production

To prepare your CLI for distribution:

```bash
npm install --production
npm pack
```

---

## 🔧 Troubleshooting

<details>
<summary><b>Common Issues</b></summary>

| Issue | Solution |
|-------|----------|
| **"Cannot find module 'commander'"** | `npm install commander discord-rpc` |
| **"CLIENT_ID is not defined"** | Ensure you have a `.env` file in the project root with `CLIENT_ID=your_client_id` |
| **Buttons not showing on Discord** | Buttons are only visible to other users, not yourself. Check your Discord Developer Portal settings and restart Discord. |
| **"spacekeep: command not found"** | Run `npm link` again and verify you're in the project directory. |

</details>

---

## 🔒 Security

### Best Practices

- **Never commit your `.env` file** - it contains sensitive credentials
- **Regular dependency audits:** Run `npm audit` to check for vulnerabilities
- **Keep dependencies updated:** Use `npm update` to get the latest security patches
- **Review third-party packages:** Always audit external dependencies

### Environment Variables

Your `.env` file should never be shared or committed. It is already included in the `.gitignore` file.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

| Resource | Link |
|----------|------|
| 📚 Documentation | [docs.spacekeep.dev](https://spacekeep.dev/docs) |
| 🐛 Issues | [GitHub Issues](https://github.com/SpaceKeep/spacekeep-rpc/issues) |
| 💬 Discord | Join our community server |

---

## 🌐 About SpaceKeep

SpaceKeep is a modern infrastructure management platform designed for developers and cybersecurity professionals. This CLI tool is part of the SpaceKeep ecosystem, providing seamless integration with Discord's Rich Presence API.

---

## 📋 Changelog

### v1.0.0 (2026-07-01)

- ✨ Initial release
- 🎮 Basic Rich Presence functionality
- ▶️ `start` and `stop` commands
- ⚙️ `.env` configuration support
- 📜 MIT License

---

<div align="center">
  <sub>Built with ❤️ by the <a href="https://spacekeep.dev">SpaceKeep Team</a></sub>
</div>
