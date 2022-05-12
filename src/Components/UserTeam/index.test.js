import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import UserTeam from "./index";

const mockStore = configureStore([]);

const queryClient = new QueryClient();

describe("UserTeam", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userTeam: {
        firstTeam: {
          G: {
            name: "Andrada, Esteban",
            position: "G",
            id: "8869",
            teamId: 244,
          },
          D: [
            {
              name: "Otamendi, Nicolas",
              position: "D",
              id: "6487",
              teamId: 244,
            },
            {
              name: "Tagliafico, Nicolas",
              position: "D",
              id: "1853",
              teamId: 244,
            },
          ],
          M: [],
          F: [
            {
              name: "Messi, Lionel",
              position: "F",
              id: "6750",
              teamId: 244,
            },
          ],
        },
        substitutes: {
          G: null,
          D: [],
          M: [],
          F: [],
        },
        coach: {
          name: "Lionel Scaloni",
          position: "C",
        },
        playersByTeamId: {
          244: 4,
        },
        playersTotal: 4,
        goalkeepersTotal: 1,
        defendersTotal: 2,
        midfieldersTotal: 0,
        forwardsTotal: 1,
      },
      team: {
        name: "Argentina",
        id: 244,
        coach: "Lionel Scaloni",
      },
    });
  });

  test("displays a row for each team", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserTeam />
        </Provider>
      </QueryClientProvider>
    );

    const teamPositions = await waitFor(() =>
      screen.findAllByTestId("user-team-position")
    );
    const teamPlayers = await waitFor(() =>
      screen.findAllByTestId("user-team-player")
    );
    // 1 coach + (1 for each position) * 2 (firstTeam and substitutes)
    expect(teamPositions).toHaveLength(9);
    expect(teamPlayers).toHaveLength(5);
  });
});
