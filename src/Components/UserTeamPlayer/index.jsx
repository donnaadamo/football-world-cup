import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import GLOBAL from "../../Config/Global";
import {
  removeFromPlayersTotal,
  removePlayersByTeamId,
} from "../../Store/userTeamSlice";

const UserTeamPlayer = ({
  remover,
  position,
  userTeamPosition,
  playerData,
}) => {
  const dispatch = useDispatch();

  const handleDispatch = (remover, payload) => {
    dispatch(remover(payload));
    if (position !== GLOBAL.TEXTS.POSITIONS.COACH_COMPLETE) {
      dispatch(removePlayersByTeamId({ teamId: payload.teamId }));
      dispatch(removeFromPlayersTotal());
    }
  };

  return (
    <>
      <div
        data-testid="user-team-position"
        className={`p-0 m-0 mb-1 userteamplayer__position ${
          position === GLOBAL.TEXTS.POSITIONS.COACH_COMPLETE
            ? " userteamplayer__position__coach"
            : ""
        }`}
      >
        {position}
      </div>
      {position !== GLOBAL.TEXTS.POSITIONS.GOALKEEPER_COMPLETE &&
      position !== GLOBAL.TEXTS.POSITIONS.COACH_COMPLETE
        ? userTeamPosition.map((player) => (
            <Row
              className="p-0 m-0"
              key={player.id}
              data-testid="user-team-player"
            >
              <Col md={10}>{player?.name}</Col>
              {player && (
                <Col
                  md={2}
                  className="p-0 userteamplayer__player__remove"
                  onClick={() => handleDispatch(remover, player)}
                >
                  X
                </Col>
              )}
            </Row>
          ))
        : playerData && (
            <Row className="p-0 m-0" data-testid="user-team-player">
              <Col md={10} className="p-0">
                {playerData?.name}
              </Col>
              {playerData && (
                <Col
                  md={2}
                  className="p-0 remove"
                  onClick={() => handleDispatch(remover, playerData)}
                >
                  X
                </Col>
              )}
            </Row>
          )}
    </>
  );
};

export default UserTeamPlayer;
