import { render, screen, waitFor } from "@testing-library/react";
import TeamList from "./index";
import { QueryClient, QueryClientProvider } from "react-query";
import { getTeams } from "../../Api/Api";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
jest.mock("../../Api/Api", () => ({ getTeams: jest.fn() }));

const mockStore = configureStore([]);

const queryClient = new QueryClient();

const mockTeams = [
  { id: 1, name: "Argentina", country_id: "1" },
  { id: 2, name: "Belgium", country_id: "1" },
  { id: 3, name: "Brazil", country_id: "1" },
];

describe("TeamList", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      team: { name: null, id: null },
    });
  });
  test("displays a row for each team", async () => {
    getTeams.mockResolvedValue(mockTeams);

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <TeamList />
        </Provider>
      </QueryClientProvider>
    );

    const teamList = await waitFor(() => screen.findAllByTestId("team-item"));
    expect(teamList).toHaveLength(3);
  });
});
