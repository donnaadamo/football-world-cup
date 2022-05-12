const GLOBAL = {
  API: {
    BASE_URL: "https://api.soccersapi.com/v2.2",
    RESOURCES: {
      TEAMS: "teams",
    },
    USER: "donnasadamo",
    TOKEN: "0556ea9aae30bce3a7697e884c00742b",
    T: "squad",
  },
  TEXTS: {
    LOADING: "LOADING...",
    ERROR: "Error",
    ERRORS: {
      PLAYER_AS_COACH: "You can't add a player as coach",
      COACH_AS_PLAYER: "You can't add a coach as a player",
      SAME_PLAYER_TWICE: "The same player cannot be added twice",
      MANDATORY_COACH: "You must have a coach",
      TOTAL_PLAYERS_LIMIT: "You can't add more than 16 players",
      GOALKEEPERS_MINIMUM_AMOUNT: "You must have at least 2 goalkeepers",
      DEFENDERS_MINIMUM_AMOUNT: "You must have at least 4 defenders",
      MIDFIELDERS_MINIMUM_AMOUNT: "You must have at least 4 midfielders",
      FORWARDS_MINIMUM_AMOUNT: "You must have at least 2 forwards",
      PLAYERS_PER_TEAM_LIMIT:
        "You can't have more than 4 players from each team",
      FIRST_TEAM_TOTAL_PLAYERS: "Your first team should have 11 players",
      TWO_GOAL_KEEPERS_FIRST_TEAM:
        "You can't have two goalkeepers on your first team",
      TWO_GOAL_KEEPERS_SUBSTITUTES:
        "You can't have two goalkeepers on your substitutes",
    },
    SUCCESS: "Your team was successfully saved!",
    POSITIONS: {
      GOALKEEPER: "G",
      DEFENDER: "D",
      MIDFIELDER: "M",
      FORWARD: "F",
      COACH: "C",
      GOALKEEPER_COMPLETE: "Goalkeeper",
      DEFENDERS_COMPLETE: "Defenders",
      MIDFIELDERS_COMPLETE: "Midfielders",
      FORWARDS_COMPLETE: "Forwards",
      COACH_COMPLETE: "COACH",
    },
    BUTTONS: {
      ADD_COACH: "COACH",
      ADD_TO_FIRST_TEAM: "FIRST TEAM",
      ADD_TO_SUBSTITUTES: "SUBSTITUTES",
      REMOVE: "REMOVE",
      SAVE: "SAVE",
      CREATE_TEAM: "CREATE TEAM",
    },
    HEADERS: {
      MAIN_TITLE: "WELCOME TO ADIDAS",
      MAIN_SUBTITLE: "FOOTBALL CUP",
      MY_TEAM: "MY TEAM",
      FIRST_TEAM: "FIRST TEAM",
      SUBSTITUTES: "SUBSTITUTES",
      CHOOSE_TEAM: "CHOOSE NATIONAL TEAM",
      CHOOSE_PLAYERS: "CHOOSE PLAYERS",
    },
    REDUX: {
      TEAM_KEY: "team",
      USER_TEAM_KEY: "userTeam",
      TEAM_TYPE_SUBSTITUTES: "substitutes",
      TEAM_TYPE_FIRST_TEAM: "firstTeam",
    },
  },
};

export default GLOBAL;
