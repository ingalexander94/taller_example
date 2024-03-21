import { MouseEvent, useContext } from "react";
import { TemporaryContext } from "src/context";
import { Team } from "src/interfaces";
import editIcon from "src/assets/icons/edit.svg";
import styles from "./teamitem.module.css";
import { useNavigate } from "react-router-dom";

type Props = {
  team: Team;
};

const TeamItem = ({ team }: Props) => {
  const navigate = useNavigate();

  const { setTeamActive, temporaryState } = useContext(TemporaryContext);

  const handleEditTeam = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`editar/${team.id_team}`);
  };

  return (
    <li
      onClick={() => setTeamActive(team)}
      className={`${
        styles.team_item
      } animate__animated animate__fadeInLeft animate__faster ${
        temporaryState.teamActive?.id_team === team.id_team ? styles.active : ""
      }`}
    >
      {team.team_name}
      <button onClick={handleEditTeam}>
        <img src={editIcon} alt="Edit icon" />
      </button>
    </li>
  );
};

export default TeamItem;
