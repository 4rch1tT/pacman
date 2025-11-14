# Pac-Man Game

A classic Pac-Man game implementation using vanilla JavaScript, HTML, and CSS.

## Features

- **Playable Pac-Man** - Control with arrow keys
- **Four Ghosts** - Each with unique behaviors:
  - **Blinky** (Red) - Chases Pac-Man directly
  - **Pinky** (Pink) - Scatters to top-left corner
  - **Inky** (Cyan) - Normal random movement
  - **Clyde** (Orange) - Chases when close, scatters when far
- **Game Modes** - Chase and scatter modes that alternate every 7 seconds
- **Power-ups** - Eat pellets to make ghosts vulnerable for 3 seconds
- **Scoring** - Earn 10 points per dot, 50 points per pellet
- **Lives System** - Start with 3 lives, lose one when caught by a ghost
- **Win/Lose Conditions** - Win by eating all dots and pellets, lose when out of lives

## How to Play

1. Press any arrow key to start moving
2. Use arrow keys to navigate Pac-Man
3. Eat all dots (small circles) and pellets (large circles)
4. Avoid ghosts unless they turn pink (frightened mode)
5. When ghosts are pink, you can eat them for points
6. Click "Restart" to play again

## Game Mechanics

- **Grid-based Movement** - 15x15 tile map with walls, corridors, and open spaces
- **Manhattan Distance** - Ghosts use this algorithm to chase Pac-Man
- **Pellet Power-up** - Eating a pellet makes all ghosts frightened for 3 seconds
- **Direction Queuing** - You can queue your next direction before making the move

## File Structure

- `index.html` - Game HTML structure
- `script.js` - Game logic and mechanics
- `style.css` - Game styling and layout

Enjoy the game! 🎮
