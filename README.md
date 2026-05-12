# Front-End Assignment – Slot Machine (Pixi.js)

## Overview

This project is a technical assignment for PearFiction Studios.  
It implements a basic 5x3 HTML5 slot machine using Pixi.js, following the
specifications provided  `programming exercise.md`

---

## Architecture

The project is organized in two part : math logic and application rendering:

### Math Logic

- `src/core/`  
  Contains all logic:
  - reel positioning
  - payline evaluation
  - win calculation

This layer is completely independent from Pixi.js and rendering concerns

### Application Rendering

- `src/app/`  
  Contains the Pixi.js layer:
  - slot machine orchestration
  - UI components
  - layout and scaling logic

- `src/ui/`  
  Contains UI-related logic that is shared (the winnings text formatting)

UI-related types are scoped to the application layer. This separation prevents UI dependencies and side effects from impacting core game logic.

---

## Testing

The project was developed using TDD approach:

- Slot math and winnings logic were implemented first
- Unit tests were written to validate reel behavior, win calculations, and winnings display
- Pixi.js integration and rendering were added afterward

Unit tests are located in the `tests/` directory and cover:
- reel positioning logic
- payline evaluation and win calculation
- winnings text formatting

All position examples provided in the `programming exercise.md` file were used to manually validate the results of the win calculations.

Except for positions [5,14,9,9,16]. It is stated that these positions should trigger paylines 6 and 7.  
However, payline 7 cannot be verified.

    The expected screen is:
      lv1 hv1 lv1 hv1 hv1
      hv1 lv1 hv3 lv1 lv2
      lv1 lv2 lv1 hv1 hv4

    Actual screen:
      lv1 hv1 lv1 hv1 hv1
      hv1 lv1 hv3 lv1 lv2
      hv4 lv2 lv1 hv1 hv4
      
The first character in the last line does not match

---

## Running the project

Ce projet utilise pnpm comme gestionnaire de paquets.

Installer les dépendances :
`pnpm install`

Start the development server :
`pnpm run dev`

Then open the browser at:
http://localhost:5173

The project runs entirely in the browser and does not require any backend.

---

## Running tests

Unit tests for the slot math and win calculation logic can be run with:
`pnpm run test`

---

## Scope Decisions
Spin animations and additional visual effects were intentionally omitted.
The assignment explicitly states that animations are not required, and priority
was given to correctness, clarity, and robustness of the slot math and overall
architecture.

---

## Possible Improvements
With more time, the following features could be added:

reel spin and stop animations
symbol anticipation effects
payline visual highlights
configuration-driven reelsets and paytables
additional automated test cases
