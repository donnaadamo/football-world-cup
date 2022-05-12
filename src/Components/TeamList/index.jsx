import React from "react";
import { Tab, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { selectTeam } from "../../Store/teamSlice";
import { useQuery } from "react-query";
import { getTeams } from "../../Api/Api";
import GLOBAL from "../../Config/Global";

const TeamList = () => {
  const { data, error, isLoading } = useQuery(["teams"], () => getTeams());
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>{GLOBAL.TEXTS.LOADING}</div>;
  }

  if (error) {
    return <div>{GLOBAL.TEXTS.ERROR}</div>;
  }

  return (
    <Tab.Container>
      <ListGroup className="listgroup">
        {data.map((team) => (
          <ListGroup.Item
            key={team.id}
            action
            data-testid="team-item"
            onClick={() => dispatch(selectTeam(team))}
          >
            {team.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Tab.Container>
  );
};

export default TeamList;
