import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import TeamPlayers from "./index";
import { getPlayersByTeamId } from "../../Api/Api";
jest.mock("../../Api/Api", () => ({ getPlayersByTeamId: jest.fn() }));

const mockStore = configureStore([]);

const queryClient = new QueryClient();

const mockPlayers = {
  formation: null,
  squad: [
    {
      player: {
        id: "6750",
        name: null,
        common_name: "Messi, Lionel",
        firstname: "Lionel Andres",
        lastname: "Messi",
        weight: "72",
        height: "171",
        age: 34,
        img: "https://cdn.soccersapi.com/images/soccer/players/50/6750.png",
        country: {
          id: "12",
          name: "Argentina",
          cc: "ar",
        },
      },
      number: "10",
      captain: null,
      position: "F",
      order: null,
    },
    {
      player: {
        id: "683",
        name: null,
        common_name: "Di Maria, Angel",
        firstname: "Angel Fabian",
        lastname: "Di Maria",
        weight: "70",
        height: "181",
        age: 33,
        img: "https://cdn.soccersapi.com/images/soccer/players/50/683.png",
        country: {
          id: "12",
          name: "Argentina",
          cc: "ar",
        },
      },
      number: "11",
      captain: null,
      position: "M",
      order: null,
    },
  ],
};

describe("TeamPlayers", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      team: { name: null, id: null },
    });
  });

  test("displays a row for each team", async () => {
    getPlayersByTeamId.mockResolvedValue(mockPlayers);
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <TeamPlayers />
        </Provider>
      </QueryClientProvider>
    );

    const teamPlayers = await waitFor(() => screen.findAllByTestId("player"));
    expect(teamPlayers).toHaveLength(2);

    /* No need to expect here since GET queries 
    make the test fail if the element is not found */
    await waitFor(() => screen.getByText("Messi, Lionel (F)"));
    await waitFor(() => screen.getByText("Di Maria, Angel (M)"));
  });
});
