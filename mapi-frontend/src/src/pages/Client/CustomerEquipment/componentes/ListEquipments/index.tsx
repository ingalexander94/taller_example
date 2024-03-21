import {
  ChangeEvent,
  useState,
  MouseEvent,
  useRef,
  useContext,
  useEffect,
} from "react";
import ListContentTable from "../ListContent";
import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";
import DownloadExcel from "src/components/DownloadToExcel";
import { EquipmentService } from "src/services";
import { useAxios } from "src/hooks";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import styles from "./listoftechnician.module.css";
import { debounce } from "lodash";
import { EquipmentContext } from "src/context/equipment";
import { TeamFilter } from "src/interfaces";

const ListEquipments = () => {
  const [search, setText] = useState<string>("");
  const { callEndpoint } = useAxios();
  const { setSearch, setTeam, equipmentState } = useContext(EquipmentContext);
  const [teams, setTeams] = useState<TeamFilter[]>([]);

  const isInitialized = useRef<boolean>(false);

  const debouncedValidate = useRef(
    debounce(async (text: string) => {
      setSearch(text);
    }, 1000)
  );

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getMyTeams();
    }
    return () => {};
  }, []);

  const getMyTeams = async () => {
    const res = await callEndpoint(EquipmentService.getMyTeams());
    if (res) {
      const { data } = res.data;
      setTeams(data);
      if (data.length) {
        setTeam(data[0].id_team);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setText(searchValue);
    debouncedValidate.current(searchValue);
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (search.length) {
      setText("");
      setSearch("");
    }
  };

  const handleSetTeamFilter = (id_team: number) => {
    setTeam(id_team);
  };

  return (
    <section className={styles.list_system}>
      <ul className={styles.equipment_filters}>
        {teams.map(({ id_team, team_name }) => (
          <li
            onClick={() => handleSetTeamFilter(id_team)}
            className={`animate__animated animate__fadeInLeft animate__faster ${
              id_team === equipmentState.team ? styles.active : ""
            }`}
            key={id_team}
          >
            {team_name}
          </li>
        ))}
      </ul>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Listado de Parque automotor</p>
          <input
            type="text"
            autoComplete="off"
            value={search}
            onChange={handleChange}
            placeholder="Buscar equipo por placa"
          />
          <button
            onClick={handleReset}
            className={`${styles.search_icon} ${
              search.length ? styles.active : ""
            }`}
          >
            <img
              src={search.length ? errorIcon : searchIcon}
              alt="Error icon"
            />
          </button>
        </div>
        <div className={styles.list_actions}>
          <Link
            className="btn_black"
            to={`/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}/${privateRoutes.SAVEEQUIPMENT}`}
          >
            <img src={plusIcon} alt="Plus icon" /> Agregar equipo
          </Link>
          <DownloadExcel
            title_sheet="Reporte de equipos"
            table_headers={[
              "ID",
              "Equipo",
              "Placa",
              "Marca",
              "Modelo",
              "Kilometros",
              "Estado",
            ]}
            service={async () => {
              const res: any = await callEndpoint(EquipmentService.download());
              if (res) {
                const { data } = res.data;
                return data;
              }
              return [];
            }}
          />
        </div>
      </div>

      <ListContentTable />
    </section>
  );
};

export default ListEquipments;
