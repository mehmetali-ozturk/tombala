# Tombala Game

## Overview
Tombala is a web-based implementation of the classic Turkish bingo game. This project allows multiple players to participate in a game where they can select their numbers and check against drawn numbers to determine the winner.

## Project Structure
The project is organized into several directories and files:

- **app/**: Contains the main application files.
  - **page.tsx**: Main entry point for the application, setting up the layout and structure of the Tombala game interface.
  - **layout.tsx**: Defines the overall layout of the application, including shared components and styles.
  - **globals.css**: Contains global CSS styles for consistent styling across all components.
  - **components/**: Contains React components for various parts of the game.
    - **TombalaBoard.tsx**: Represents the game board displaying drawn numbers.
    - **TombalaCard.tsx**: Represents an individual player's card with their selected numbers.
    - **NumberSelector.tsx**: Allows users to select the number of players and numbers for the game.
    - **PlayerList.tsx**: Displays the list of players and their current status in the game.
    - **WinnerAnnouncement.tsx**: Responsible for announcing the winner(s) of the game.

- **lib/**: Contains utility files.
  - **types.ts**: Exports TypeScript types and interfaces used throughout the application.
  - **utils.ts**: Contains utility functions for game logic, such as drawing numbers and checking for winners.

- **public/**: Contains static assets like images and icons.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **tailwind.config.js**: Configuration for Tailwind CSS, specifying custom styles and themes.

- **next.config.js**: Configuration for the Next.js application.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd tombala
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to play the game.

## Usage
- Select the number of players and the numbers they wish to play with using the Number Selector component.
- Each player will have their own card displayed.
- As numbers are drawn, they will be displayed on the Tombala Board.
- The game will automatically check for winners and announce them once all drawn numbers have been checked against the players' cards.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.#   t o m b a l a  
 