import React, { useState } from "react";
import { getPlayersByTeamId } from "../../Api/Api";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFirstTeam,
  addToSubstitutes,
  addCoach,
  addPlayersByTeamId,
  addToPlayersTotal,
} from "../../Store/userTeamSlice";
import { ListGroup } from "react-bootstrap";
import ButtonCustom from "../ButtonCustom";
import GLOBAL from "../../Config/Global";

const TeamPlayers = () => {
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const selectedTeam = useSelector((state) => state.team);
  const userTeam = useSelector((state) => state.userTeam);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery(
    ["players", selectedTeam.id],
    () => getPlayersByTeamId(selectedTeam.id)
  );

  const handleClick = (playerData) => {
    setSelectedPlayer(playerData);
  };

  const handleCoachDispatch = (payload) => {
    if (
      typeof selectedPlayer === "string" ||
      selectedPlayer instanceof String
    ) {
      dispatch(addCoach(payload));
    } else {
      alert(GLOBAL.TEXTS.ERRORS.PLAYER_AS_COACH);
    }
  };

  const handlePlayerDispatch = (action, payload, isSubstitute) => {
    if (validateAddPlayer(payload, isSubstitute)) {
      dispatch(action(payload));
      dispatch(addPlayersByTeamId({ teamId: selectedTeam.id }));
      dispatch(addToPlayersTotal());
    }
  };

  const onImageError = (event) => {
    event.target.src = "/noimage.png";
  };

  const validateAddPlayer = (player, isSubstitute) => {
    const id = player.id;
    const position = player.position;
    const firstTeamPositionPlayers = userTeam.firstTeam[position];
    const substitutesPositionPlayers = userTeam.substitutes[position];

    if (position === GLOBAL.TEXTS.POSITIONS.COACH) {
      alert(GLOBAL.TEXTS.ERRORS.COACH_AS_PLAYER);
      return false;
    }

    if (position === GLOBAL.TEXTS.POSITIONS.GOALKEEPER) {
      if (!isSubstitute && firstTeamPositionPlayers) {
        alert(GLOBAL.TEXTS.ERRORS.TWO_GOAL_KEEPERS_FIRST_TEAM);
        return false;
      }
      if (isSubstitute && substitutesPositionPlayers) {
        alert(GLOBAL.TEXTS.ERRORS.TWO_GOAL_KEEPERS_SUBSTITUTES);
        return false;
      }

      return true;
    }

    for (const p of firstTeamPositionPlayers) {
      if (p.id === id) {
        alert(GLOBAL.TEXTS.ERRORS.SAME_PLAYER_TWICE);
        return false;
      }
    }

    for (const p of substitutesPositionPlayers) {
      if (p.id === id) {
        alert(GLOBAL.TEXTS.ERRORS.SAME_PLAYER_TWICE);
        return false;
      }
    }
    return true;
  };

  if (isLoading) {
    return <div>{GLOBAL.TEXTS.LOADING}</div>;
  }

  if (error) {
    return <div>{GLOBAL.TEXTS.ERROR}</div>;
  }

  return (
    <div className="teamplayers">
      <ListGroup className="teamplayers__listgroup">
        <ListGroup.Item action onClick={() => handleClick(selectedTeam.coach)}>
          <img style={{ maxWidth: "50px" }} src="/noimage.png" alt="img" />{" "}
          {selectedTeam.coach} (C)
        </ListGroup.Item>
        {data.squad.map((playerData) => (
          <ListGroup.Item
            action
            onClick={() => handleClick(playerData)}
            key={playerData.player.id}
            data-testid="player"
          >
            <img
              style={{ maxWidth: "50px" }}
              src={playerData.player.img}
              alt="img"
              onError={onImageError}
            />{" "}
            {playerData.player.common_name} ({playerData.position})
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ButtonCustom
        className="teamplayers__listgroup__button"
        description={GLOBAL.TEXTS.BUTTONS.ADD_COACH}
        imgClassname={"fa-solid fa-user-plus"}
        handleClick={() =>
          handleCoachDispatch({
            name: selectedPlayer,
            position: GLOBAL.TEXTS.POSITIONS.COACH,
          })
        }
      />
      <ButtonCustom
        className="teamplayers__listgroup__button"
        description={GLOBAL.TEXTS.BUTTONS.ADD_TO_FIRST_TEAM}
        imgClassname={"fa-solid fa-user-plus"}
        handleClick={() =>
          handlePlayerDispatch(addToFirstTeam, {
            name: selectedPlayer.player?.common_name,
            position: selectedPlayer.position || GLOBAL.TEXTS.POSITIONS.COACH,
            id: selectedPlayer.player?.id,
            teamId: selectedTeam.id,
          })
        }
      />
      <ButtonCustom
        className="teamplayers__listgroup__button"
        description={GLOBAL.TEXTS.BUTTONS.ADD_TO_SUBSTITUTES}
        imgClassname={"fa-solid fa-user-plus"}
        handleClick={() =>
          handlePlayerDispatch(
            addToSubstitutes,
            {
              name: selectedPlayer.player?.common_name,
              position: selectedPlayer.position || GLOBAL.TEXTS.POSITIONS.COACH,
              id: selectedPlayer.player?.id,
              teamId: selectedTeam.id,
            },
            true
          )
        }
      />
    </div>
  );
};

export default TeamPlayers;
