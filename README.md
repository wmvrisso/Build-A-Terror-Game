# Build-A-Terror

Welcome to **Build-A-Terror**, a monster building game where creativity meets chaos! In this laboratory, you have the power to assemble terrifying monsters from a collection of spare parts from past experiments gone awry.
Once your creature is complete, unleash it in battles against opponents to see whose monstrosity reigns supreme!

## Table of Contents

- [About the Game](#about-the-game)
- [How to Play](#how-to-play)
- [Features](#features)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

## About the Game

In **Build-A-Terror**, players step into the shoes of a mad scientist, with the challenge of creating the most terrifying monsters imaginable. Mix and match parts from various creatures to design your unique terror.

## How to Play

1. **Build Your Monster**: Use the parts available in the laboratory to construct your monster.
2. **Battle Time**: Challenge other players or AI opponents

## Features

- **Customization**: Choose from a wide variety of monster parts to create your ultimate creature.
- **Battles**: Engage battles against other players or AI.

## File Structure

Build-A-Terror-Game
├─ .editorconfig
├─ client
│  ├─ .babelrc
│  ├─ index.html
│  ├─ LICENSE
│  ├─ log.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ assets
│  │  │  ├─ background.png
│  │  │  ├─ bg.png
│  │  │  ├─ Build.css
│  │  │  ├─ card-back.png
│  │  │  ├─ index-C7yZTzWi.css
│  │  │  ├─ index-DIyvQUoO.js
│  │  │  ├─ logo.png
│  │  │  └─ monster-logo.png
│  │  ├─ favicon.png
│  │  └─ style.css
│  ├─ README.md
│  ├─ screenshot.png
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  ├─ Dashboard.jsx
│  │  │  └─ Login.jsx
│  │  ├─ context
│  │  │  └─ AuthContext.js
│  │  ├─ game
│  │  │  ├─ EventBus.js
│  │  │  ├─ handlers
│  │  │  │  ├─ CardHandler.js
│  │  │  │  ├─ DeckHandler.js
│  │  │  │  ├─ GameHandler.js
│  │  │  │  ├─ PlayerHandler.js
│  │  │  │  ├─ SocketHandler.js
│  │  │  │  ├─ UIHandler.js
│  │  │  │  └─ ZoneHandler.js
│  │  │  ├─ main.js
│  │  │  ├─ PhaserGame.jsx
│  │  │  └─ scenes
│  │  │     ├─ Boot.js
│  │  │     ├─ Build.jsx
│  │  │     ├─ Game.js
│  │  │     ├─ GameOver.js
│  │  │     ├─ MainMenu.js
│  │  │     └─ Preloader.js
│  │  ├─ gameUI.jsx
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ Game.jsx
│  │  │  └─ Home.jsx
│  │  ├─ services
│  │  │  └─ api.js
│  │  └─ styles
│  │     ├─ gameUI.css
│  │     └─ input.css
│  └─ webpack
│     ├─ config.js
│     └─ config.prod.js
├─ db
│  ├─ query.sql
│  ├─ schema.sql
│  └─ seed.sql
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ background.png
│  ├─ battlefieldBG.png
│  ├─ bg.png
│  ├─ Build.css
│  ├─ card-back.png
│  ├─ favicon.png
│  ├─ greenBG.png
│  ├─ logo.png
│  ├─ monster-logo.png
│  ├─ stoneBG.png
│  └─ style.css
├─ README.md
├─ server
│  ├─ controllers
│  │  └─ cardController.js
│  ├─ middleware
│  │  └─ authMiddleware.js
│  ├─ models
│  │  ├─ card.js
│  │  ├─ db.js
│  │  ├─ index.js
│  │  └─ user.js
│  └─ server.js
└─ vite
   ├─ config.dev.mjs
   ├─ config.prod.mjs
   └─ vite.config.js

## Technologies Used

- **React**: For building the user interface.
- **CSS**: For styling the game and making it visually appealing.
- **Phaser.io API**:

## Installation

To get started with **Build-A-Terror**, follow these steps:

## Contributing

## License

## Questions

If you have any questions or suggestions, feel free to reach out to

``