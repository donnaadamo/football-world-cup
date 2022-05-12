import axios from "axios";
import GLOBAL from "../Config/Global";
import teams from "./Mocks";

axios.defaults.baseURL = GLOBAL.API.BASE_URL;

export const getTeams = () => {
  return teams;
};

export const getPlayersByTeamId = async (teamId) => {
  const user = GLOBAL.API.USER;
  const token = GLOBAL.API.TOKEN;
  const t = GLOBAL.API.T;
  const id = teamId;

  const { data } = await axios.get(GLOBAL.API.RESOURCES.TEAMS, {
    params: { user, token, t, id },
  });

  return data.data;
};
