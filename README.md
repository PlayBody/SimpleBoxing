<h1> Run </h1>
 
 > Install node.js
 > 
 > Install mysql server like xampp
 > 
 > Make your own database
 >
 > Change AppDataSource in index.ts file.

 
 Dev mode
 ```
  npm install
  npm run dev
 ```
 
 Production mode
 ```
  npm install
  npm run build
  npm start
 ```

<h1> Data Models </h1>

The following data models have been implemented in this application:

- Fighter: A representation of a boxer with attributes such as name, nickname, birthdate, height, weight class, nationality, team, wins, losses, knockouts, draws, and submissions.

 - Event: Represents an event or a match with attributes such as name and location.

 - Fight: Represents a fight, detailing the two fighters involved, the event it's part of, and the result of the fight.

 - Rank: Represents the ranking of a fighter in a specific weight class.

<h1>API Endpoints</h1>
Fighters

 - getFighters: Get all fighters

 - getFighter: Get fighter by ID

 - createFighter: Create a new fighter

 - updateFighter: Update a fighter's information

 - deleteFighter: Remove a fighter

Events
 - getEvents: Get all events

 - getEvent: Get event by ID

 - createEvent: Create a new event

Fights
 - getFights: Get all fights

 - getFight: Get fight by ID

 - createFight: Create a new fight result

Ranks
 - getRanks: Get Rank information of fighters