# Retro Lunar Lander

A retro-style Lunar Lander game built with Next.js, TypeScript, and Three.js.

## 🚀 Game Overview

Retro Lunar Lander is a modern take on the classic arcade game from 1979. The game challenges players to navigate a lunar module from Earth to the Moon, achieve orbit, and land safely on the lunar surface.

## 🎮 Game Mechanics

### Launch Phase
- Start from Earth's surface
- Use thrust to gain altitude
- Achieve orbital velocity (>1.5 units/sec)
- Reach orbit altitude (15-25 units)

### Orbital Phase
- Maintain orbit around Earth
- Prepare for lunar transfer
- Conserve fuel for the journey

### Landing Phase
- Navigate to the Moon
- Reduce velocity for safe landing
- Align with the landing pad
- Land with minimal impact

## 🕹️ Controls

- **SPACE** - Thrust (consumes fuel)
- **LEFT/RIGHT ARROWS** - Rotate the lunar module
- **R** - Reset game

## 🎯 Objectives

1. Launch from Earth
2. Achieve orbit
3. Transfer to the Moon
4. Land safely on the landing pad
5. Conserve fuel

## 🛠️ Technical Details

### Built With
- **Next.js** - React framework
- **TypeScript** - Type-safe JavaScript
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js

### Features
- Retro pixelated graphics
- Realistic physics simulation
- Orbital mechanics
- Fuel management
- Collision detection
- Retro-style UI elements

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/retro-lunar-lander.git
cd retro-lunar-lander
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
retro-lunar-lander/
├── public/
│   └── assets/
│       ├── models/
│       └── textures/
├── src/
│   ├── components/
│   │   ├── Game.tsx
│   │   ├── Rocket.tsx
│   │   ├── Earth.tsx
│   │   ├── Moon.tsx
│   │   ├── LandingPad.tsx
│   │   ├── GameUI.tsx
│   │   ├── KeyboardController.tsx
│   │   ├── Starfield.tsx
│   │   ├── OrbitalPath.tsx
│   │   ├── AtmosphereEffect.tsx
│   │   ├── OrbitGuidance.tsx
│   │   ├── FeedbackMessage.tsx
│   │   ├── MissionStatus.tsx
│   │   └── StartMenu.tsx
│   ├── utils/
│   │   ├── gameState.ts
│   │   ├── physics.ts
│   │   └── audioManager.ts
│   ├── pages/
│   │   └── index.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Game Assets

The game uses a combination of procedurally generated graphics and custom shaders to create a retro aesthetic. The Earth and Moon are rendered with pixelated textures, and the rocket is a simple 3D model with animated exhaust.

## 🧪 Future Enhancements

- Multiple difficulty levels
- Additional celestial bodies
- More detailed physics simulation
- Custom sound effects
- High score tracking
- Mobile touch controls

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the classic Lunar Lander arcade game (1979)
- Thanks to the Three.js and React Three Fiber communities
- Special thanks to all contributors and testers 