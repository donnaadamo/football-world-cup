# Adidas World Cup

Welcome to the Adidas World Cup!

To run the project please run:

1. `git clone https://github.com/donnaadamo/football-world-cup`
2. `npm i` (node >= 16.0.0 is required so you do not have any problems with jest and react testing lib, I used v16.13.2)
3. `npm start`

To run all the tests you can just:

`npm test`

### Notes & Comments

1. I decided to work with soccerApi, but the 2022 World Cup league is not available for the free tier, nor the coaches info, so I improvised a mock with that data. It can be found in `src/Api/Mocks`

2. For simplicity sake soccerApi's token is stored on `src/config/Global`, on a real project this would be stored in some kind of secret manager

3. The team being built by the user (UserTeam) is persisted on the browser's local storage at all time so, if the tab is closed, the user never loses the progress.

   - The save button, then, is only used to trigger final validations and show an alert, at this point is where I would actually send the data to be saved on the server
