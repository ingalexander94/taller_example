import { useRef, useState, MouseEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { privateRoutes } from "src/models";
import { PersonalContext } from "src/context";
import DownloadExcel from "src/components/DownloadToExcel";
import ListContentTable from "../ListContent/ListContentTable";
import plusIcon from "src/assets/icons/plus-icon.svg";
import errorIcon from "src/assets/icons/error.svg";
import searchIcon from "src/assets/icons/search.svg";
import styles from "./listoftechnician.module.css";
import { useAxios } from "src/hooks";
import { PersonalService } from "src/services";

const ListSearchPerson = () => {
  const [search, setText] = useState<string>("");
  const { setSearch } = useContext(PersonalContext);

  const { callEndpoint } = useAxios();

  const debouncedValidate = useRef(
    debounce(async (text: string) => {
      setSearch(text);
    }, 1000)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <section className={styles.list_system}>
      <div className={styles.system_actions}>
        <div className={styles.input_search}>
          <p>Listado de personal</p>
          <input
            type="text"
            autoComplete="off"
            value={search}
            onChange={handleChange}
            placeholder="Buscar personal por nombre ó cédula"
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
            to={`/${privateRoutes.CLIENT}/${privateRoutes.PERSONAL}/${privateRoutes.SAVEPERSONAL}`}
            className={styles.customer_portal}
          >
            <img src={plusIcon} alt="arrow" />
            Agregar personal
          </Link>
          <div>
            <DownloadExcel
              title_sheet="Reporte de personal"
              table_headers={[
                "ID",
                "Nombres",
                "Apellidos",
                "Número de identidad",
                "Número de contacto",
                "Salario base",
                "Cargo u ocupación",
              ]}
              service={async () => {
                const res: any = await callEndpoint(PersonalService.download());
                if (res) {
                  const { data } = res.data;
                  return data;
                }
                return [];
              }}
            />
          </div>
        </div>
      </div>

      <ListContentTable />
    </section>
  );
};

export default ListSearchPerson;
