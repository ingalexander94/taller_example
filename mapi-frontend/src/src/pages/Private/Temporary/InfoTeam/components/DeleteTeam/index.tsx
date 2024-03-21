import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UIContext } from "src/context";
import { useAxios } from "src/hooks";
import { Alerts } from "src/lib";

import deleteIcon from "src/assets/icons/delete.svg";
import { TeamService } from "src/services";
import { privateRoutes, temporaryRoutes } from "src/models";

const DeleteTeam = () => {
  const navigate = useNavigate();
  const { toggleCheking } = useContext(UIContext);
  const { callEndpoint } = useAxios();

  const { id } = useParams();

  const handleDeleteTeam = async () => {
    const dialog = await Alerts.showConfirmDialog(
      "Esta a punto de eliminar un equipo",
      "Recuerda que esta acción eliminará todos los componentes, marcas y modelos creados junto con este equipo. Las operaciones asignadas a estos equipos también se eliminarán. Las operaciones creadas fuera de este equipo seguirán vigentes en el sistema.",
      "question",
      "Eliminar"
    );
    if (dialog.isConfirmed) {
      toggleCheking();
      await callEndpoint(TeamService.delete(id!));
      toggleCheking();
      navigate(
        `/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}/${temporaryRoutes.TEAMS}`,
        { replace: true }
      );
    }
  };

  return (
    <button type="button" onClick={handleDeleteTeam}>
      <img src={deleteIcon} alt="Delete Icon" />
    </button>
  );
};

export default DeleteTeam;
