import React, { useRef, useState, useLayoutEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCoach,
  removeFromFirstTeam,
  removeFromSubstitutes,
  removeTeam,
} from "../../Store/userTeamSlice";
import UserTeamPlayer from "../UserTeamPlayer";
import ButtonCustom from "../ButtonCustom";
import ValidationMessages from "../ValidationMessages";
import GLOBAL from "../../Config/Global";

const UserTeam = () => {
  const userTeam = useSelector((state) => state.userTeam);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const errorList = [];

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (errors.length === 0) alert(GLOBAL.TEXTS.SUCCESS);
  }, [errors]);

  const handleSave = () => {
    for (const teamId in userTeam.playersByTeamId) {
      if (userTeam.playersByTeamId[teamId] > 4) {
        errorList.push(GLOBAL.TEXTS.ERRORS.PLAYERS_PER_TEAM_LIMIT);
        break;
      }
    }
    let firstTeamPlayersAmount = 0;
    for (const position in userTeam.firstTeam) {
      if (position !== GLOBAL.TEXTS.POSITIONS.GOALKEEPER) {
        firstTeamPlayersAmount += userTeam.firstTeam[position].length;
      } else {
        firstTeamPlayersAmount++;
      }
    }

    if (firstTeamPlayersAmount !== 11) {
      errorList.push(GLOBAL.TEXTS.ERRORS.FIRST_TEAM_TOTAL_PLAYERS);
    }
    if (!userTeam.coach) errorList.push(GLOBAL.TEXTS.ERRORS.MANDATORY_COACH);
    if (userTeam.playersTotal > 16)
      errorList.push(GLOBAL.TEXTS.ERRORS.TOTAL_PLAYERS_LIMIT);
    if (userTeam.goalkeepersTotal < 2)
      errorList.push(GLOBAL.TEXTS.ERRORS.GOALKEEPERS_MINIMUM_AMOUNT);
    if (userTeam.defendersTotal < 4)
      errorList.push(GLOBAL.TEXTS.ERRORS.DEFENDERS_MINIMUM_AMOUNT);
    if (userTeam.midfieldersTotal < 4)
      errorList.push(GLOBAL.TEXTS.ERRORS.MIDFIELDERS_MINIMUM_AMOUNT);
    if (userTeam.forwardsTotal < 2)
      errorList.push(GLOBAL.TEXTS.ERRORS.FORWARDS_MINIMUM_AMOUNT);

    setErrors(errorList);
  };

  const handleRemove = () => {
    dispatch(removeTeam());
  };

  return (
    <Col
      md={12}
      className="p-0 d-flex flex-column align-items-stretch userteam"
    >
      <Row className="p-2 m-0 userteam d-flex flex-column userteam__row">
        <UserTeamPlayer
          playerData={userTeam.coach}
          remover={removeCoach}
          position={GLOBAL.TEXTS.POSITIONS.COACH_COMPLETE}
        />
        <hr className="m-0 p-0" />
        <div className="p-0 m-0 userteam__row__title">
          {GLOBAL.TEXTS.HEADERS.FIRST_TEAM}
        </div>
        <UserTeamPlayer
          playerData={userTeam.firstTeam.G}
          remover={removeFromFirstTeam}
          position={GLOBAL.TEXTS.POSITIONS.GOALKEEPER_COMPLETE}
        />
        <UserTeamPlayer
          remover={removeFromFirstTeam}
          position={GLOBAL.TEXTS.POSITIONS.DEFENDERS_COMPLETE}
          userTeamPosition={userTeam.firstTeam.D}
        />
        <UserTeamPlayer
          remover={removeFromFirstTeam}
          position={GLOBAL.TEXTS.POSITIONS.MIDFIELDERS_COMPLETE}
          userTeamPosition={userTeam.firstTeam.M}
        />
        <UserTeamPlayer
          remover={removeFromFirstTeam}
          position={GLOBAL.TEXTS.POSITIONS.FORWARDS_COMPLETE}
          userTeamPosition={userTeam.firstTeam.F}
        />
        <hr className="m-0 p-0" />
        <div className="p-0 m-0 userteam__row__title">
          {GLOBAL.TEXTS.HEADERS.SUBSTITUTES}
        </div>
        <UserTeamPlayer
          playerData={userTeam.substitutes.G}
          remover={removeFromSubstitutes}
          position={GLOBAL.TEXTS.POSITIONS.GOALKEEPER_COMPLETE}
        />
        <UserTeamPlayer
          remover={removeFromSubstitutes}
          position={GLOBAL.TEXTS.POSITIONS.DEFENDERS_COMPLETE}
          userTeamPosition={userTeam.substitutes.D}
        />
        <UserTeamPlayer
          remover={removeFromSubstitutes}
          position={GLOBAL.TEXTS.POSITIONS.MIDFIELDERS_COMPLETE}
          userTeamPosition={userTeam.substitutes.M}
        />
        <UserTeamPlayer
          remover={removeFromSubstitutes}
          position={GLOBAL.TEXTS.POSITIONS.FORWARDS_COMPLETE}
          userTeamPosition={userTeam.substitutes.F}
        />
        <hr className="m-0 p-0 mb-2" />
        <div className="d-flex justify-content-end">
          <ButtonCustom
            handleClick={handleRemove}
            className="userteam__row__actions__button"
            imgClassname={"fa-solid fa-trash-can"}
            testId="remove"
          />
          <ButtonCustom
            handleClick={handleSave}
            className="userteam__row__actions__button"
            imgClassname={"fa-solid fa-check"}
          />
        </div>
        {errors.length > 0 && <ValidationMessages errors={errors} />}
      </Row>
    </Col>
  );
};

export default UserTeam;
