import { useContext, useEffect, useRef, useState } from "react";
import plusIcon from "src/assets/icons/plus-icon.svg";
import arrowIcon from "src/assets/icons/arrow.svg";
import styles from "./teamfilter.module.css";
import { TemporaryContext } from "src/context";
import { useAxios } from "src/hooks";
import TeamItem from "./components/TeamItem";
import { TeamService } from "src/services";
import SaveTeam from "../SaveTeam";


type Props =  {
  setLoading: (loading: boolean) => void;
}

const TeamFilter = ({ setLoading }: Props) => {
  const tagsRef = useRef<HTMLUListElement>(null);
  const isInitialized = useRef<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { callEndpoint } = useAxios();
  const { temporaryState, setTeams, setTeamSave, setTeamActive } =
    useContext(TemporaryContext);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      const getTeams = async () => {
        setLoading(true);
        const res = await callEndpoint(TeamService.getAll());
        const { data } = res?.data;
        setTeams(data);
        if (data.length) {
          setTeamActive(data[0]);
        }
        setLoading(false)
      };
      getTeams();
    }

    return () => {};
  }, []);

  const handleMoveSlider = (left: number) => {
    tagsRef.current?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: left,
    });
  };

  const handleSetTeamSave = () => {
    setTeamSave({
      id_team: 0,
      team_name: "",
    });
    setShow(true);
  };

  return (
    temporaryState.teams.length > 0 && (
      <>
        <section className={styles.team_filter}>
          <p>Selecciona el equipo</p>
          <div>
            <button onClick={() => handleMoveSlider(-100)}>
              <img src={arrowIcon} alt="Arrow icon" className={styles.arrow} />
            </button>
            <ul ref={tagsRef}>
              {temporaryState.teams &&
                temporaryState.teams.map((team) => (
                  <TeamItem team={team} key={team.id_team} />
                ))}
            </ul>
            <button onClick={() => handleMoveSlider(+100)}>
              <img src={arrowIcon} alt="Arrow icon" className={styles.arrow} />
            </button>
          </div>
          <button onClick={handleSetTeamSave} className="btn_black">
            <img src={plusIcon} alt="Plus icon" />
            Agregar equipo
          </button>
        </section>
        {show && <SaveTeam closeModal={() => setShow(false)} />}
      </>
    )
  );
};

export default TeamFilter;
