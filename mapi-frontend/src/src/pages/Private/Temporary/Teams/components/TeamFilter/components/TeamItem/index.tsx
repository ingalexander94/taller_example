import { MouseEvent, useContext } from "react";
import { TemporaryContext } from "src/context";
import { Team } from "src/interfaces";
import editIcon from "src/assets/icons/edit.svg";
import styles from "./teamitem.module.css";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  team: Team;
};

const TeamItem = ({ team }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setTeamActive, temporaryState } = useContext(TemporaryContext);

  const handleEditTeam = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`editar/${team.id_team}`);
  };

  const handleSetActiveTeam = () => {
    navigate(location.pathname);
    setTeamActive(team);
  };

  return (
    <li
      onClick={handleSetActiveTeam}
      className={`${
        styles.team_item
      } animate__animated animate__fadeInLeft animate__faster ${
        temporaryState.teamActive?.id_team === team.id_team ? styles.active : ""
      }`}
    >
      {team.team_name}
      <button onClick={handleEditTeam}>
        <img src={editIcon} alt="Edit icon" />
        <span>Editar</span>
      </button>
    </li>
  );
};

export default TeamItem;
