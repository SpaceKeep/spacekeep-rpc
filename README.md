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
| ✅ **Idempotent Commands** | `start` and `stop` are safe to run multiple times. |
| 🎯 **Custom Status** | Override details and state via CLI flags. |
| 🎲 **Game Detection** | Auto-detect when you start playing a game on Discord (`--follow`). |
| 🕹️ **Manual Game Mode** | Manually set a game name (`--game`) without auto-detection. |
| ⏱️ **Elapsed Timer** | Show live elapsed time counter with `--elapsed`. |
| 👥 **Party Size** | Display party size with `--party current/max` for multiplayer visibility. |
| 📊 **Status Check** | Verify connection state, env configuration, and current activity. |

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
| `spacekeep start --details "text" --state "text"` | Start with custom status text |
| `spacekeep start --game "Game Name"` | Manually set status to show you are playing a game |
| `spacekeep start --follow` | Automatically update status when you start playing a game |
| `spacekeep start --icon <asset_key>` | Add a small image (game logo) in the bottom-right of the RPC icon |
| `spacekeep start --icon-text <text>` | Tooltip text for the small image |
| `spacekeep start --elapsed` | Show live elapsed time counter on your status |
| `spacekeep start --party <size>` | Show party size (format: current/max, e.g. 1/4) |
| `spacekeep stop` | Stop the active broadcast |
| `spacekeep status` | Check connection state, env configuration, and current activity |
| `spacekeep --help` | Show help information |
| `spacekeep --version` | Show version number |

### Examples

**Start Broadcasting**
```bash
spacekeep start
```
This will display your SpaceKeep development status on your Discord profile.

**Start with Custom Status**
```bash
spacekeep start --details "Refactoring CLI" --state "v2.0.0-beta"
```

**Manually Set Game Status**
```bash
spacekeep start --game "Cyberpunk 2077"
```
Shows "Playing Cyberpunk 2077" in your Discord status.

**Manually Set Game Status with Icon**
```bash
spacekeep start --game "Cyberpunk 2077" --icon cyberpunk_2077_logo --icon-text "Cyberpunk 2077"
```
Shows "Playing Cyberpunk 2077" with the game logo in the bottom-right corner of your RPC icon.

**Auto-Follow Game Activity**
```bash
spacekeep start --follow
```
Automatically updates your SpaceKeep status when you start or stop playing a game on Discord.

**Show Elapsed Time**
```bash
spacekeep start --game "Cyberpunk 2077" --elapsed
```
Displays a live elapsed time counter since you started playing.

**Show Party Size**
```bash
spacekeep start --game "Cyberpunk 2077" --party 1/4
```
Shows party size (1 out of 4) next to your status.

**Stop Broadcasting**
```bash
spacekeep stop
```

**Check Status**
```bash
spacekeep status
```
Shows whether RPC is connected, the active env file, your Client ID, and current activity.

---

## ⚙️ Configuration

### Custom Client ID

To use a different Discord application, update your `.env` file:

```env
CLIENT_ID=your_new_client_id_here
```

### Custom Status Messages

Use CLI flags to customize your status without editing code:

```bash
spacekeep start --details "Building SpaceKeep" --state "custom-status"
```

> **Note:** By default, the state line shows the current CLI version from `package.json`. When using `--game` or `--follow`, the version is hidden to give more attention to the game name.

### Game Status

#### Manual Game Mode

Manually set a game name to broadcast:

```bash
spacekeep start --game "Cyberpunk 2077"
```

> **Note:** When using `--game`, the version line is hidden so the game name gets full attention.

Add a small game logo in the bottom-right corner of your RPC icon:

```bash
spacekeep start --game "Cyberpunk 2077" --icon cyberpunk_2077_logo --icon-text "Cyberpunk 2077"
```

> **Note:** The `--icon` value must be a Discord asset key uploaded to your application in the [Developer Portal](https://discord.com/developers/applications).

#### Elapsed Time

Show a live elapsed time counter since you started playing:

```bash
spacekeep start --game "Cyberpunk 2077" --elapsed
```

#### Party Size

Show how many players are in your party:

```bash
spacekeep start --game "Cyberpunk 2077" --party 1/4
```
Format is `current/max` (e.g. `1/4` means you are 1 out of 4 players).

#### Auto-Follow Mode

Automatically detect and broadcast whatever game you are currently playing on Discord:

```bash
spacekeep start --follow
```

When you start a game, SpaceKeep will update your status to show `Playing <Game Name>` and hide the version line. When you stop playing, it reverts to your default status with the current CLI version.

> **Note:** Auto-follow requires Discord to be running and the game to be detectable by Discord's activity system.

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
| **"CLIENT_ID is not defined"** | Create `.env` (local) or `~/.spacekeep.env` (global) with `CLIENT_ID=your_client_id`. |
| **"Client has been destroyed"** | The process was stopped. Restart the CLI to broadcast again. |
| **Buttons not showing on Discord** | Buttons are only visible to other users, not yourself. Check your Discord Developer Portal settings and restart Discord. |
| **"spacekeep: command not found"** | Run `npm link` again and verify you're in the project directory. |
| **"unknown command 'status'"** | You are using an older global install. Run `npm link` in the local repo or use `node index.js status` for the latest features. |
| **Small image not showing** | The `--icon` value must match an asset key uploaded to your Discord application. Check your Developer Portal. |

</details>

### Environment File Priority

SpaceKeep CLI looks for your Client ID in this order:
1. `.env` in the project root (local development)
2. `~/.spacekeep.env` (global npm installs)

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

### v1.3.0 (2026-07-01)

- ⏱️ Added `--elapsed` flag to show live elapsed time counter
- 👥 Added `--party <size>` flag to display party size (format: current/max)
- 🎮 Game presence now supports timestamps and party indicators for more visibility

### v1.2.0 (2026-07-01)

- 🎲 Added `--follow` flag to auto-detect and broadcast current game activity
- 🕹️ Added `--game <name>` flag to manually set game status
- 🖼️ Added `--icon <key>` and `--icon-text <text>` for small game logo in RPC
- 🎯 Enhanced `--details` and `--state` customization
- 📊 `status` now shows current activity details
- 🛡️ Graceful handling of presence updates and game transitions

### v1.1.0 (2026-07-01)

- ✅ Idempotent `start` and `stop` commands (safe to run multiple times)
- 🎯 `start` now accepts `--details` and `--state` CLI flags
- 📊 Implemented `status` command with env detection
- 🔒 Graceful `CLIENT_ID` validation with helpful error messages
- 🌍 Global env file support (`~/.spacekeep.env`)
- 🐛 Fixed duplicate event listener accumulation
- 🛡️ Clean shutdown and disconnect handling

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
