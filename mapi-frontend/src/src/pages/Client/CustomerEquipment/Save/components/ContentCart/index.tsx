import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAxios } from "src/hooks";
import { EquipmentService } from "src/services";
import { Brand, Model, Team } from "src/interfaces";
import styles from "./contectcart.module.css";

type Props = {
  formik: any;
  id_user_team: string;
};

const ContentCart = ({ formik, id_user_team }: Props) => {
  const isInitialized = useRef<boolean>(false);
  const { callEndpoint } = useAxios();

  const [teams, setTeams] = useState<Team[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getTeams();
    }
    return () => {};
  }, []);

  const getTeams = async () => {
    setLoading(true);
    const res = await callEndpoint(EquipmentService.getTeams(id_user_team));
    if (res) {
      const { data } = res.data;
      setTeams(data.teams);
      setBrands(data.brands);
      setModels(data.models);
      setYears(data.years);
    }
    setLoading(false);
  };

  const handleChangeTeam = async (e: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    const { value } = e.target;
    const id: number = parseInt(value);
    if (id) {
      setLoading(true);
      const res = await callEndpoint(EquipmentService.getBrandsByTeam(id));
      if (res) {
        const { data } = res.data;
        setBrands(data);
      }
      setLoading(false);
    } else {
      setBrands([]);
    }
    setModels([]);
    setYears([]);
    formik.setFieldValue("ut_brand", 0);
    formik.setFieldValue("ut_model", 0);
    formik.setFieldValue("ut_year", 0);
  };

  const handleChangeBrand = (e: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    const { value } = e.target;
    const id: number = parseInt(value);
    if (id) {
      const modelsBrand: Model[] = brands.find(
        ({ id_brand }) => id_brand === id
      )!.brand_models;
      setModels(modelsBrand);
    } else {
      setModels([]);
    }
    setYears([]);
    formik.setFieldValue("ut_model", 0);
    formik.setFieldValue("ut_year", 0);
  };

  const handleChangeModel = (e: ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    const { value } = e.target;
    const id: number = parseInt(value);
    if (id) {
      const model = models.find(({ id_model }) => id_model === id);
      if (model) {
        const { model_init_year, model_final_year } = model;
        const numbers = Array.from(
          Array(model_final_year! - model_init_year! + 1).keys(),
          (i) => i + model_init_year!
        );
        setYears(numbers);
      } else {
        setYears([]);
      }
    } else {
      setYears([]);
    }
    formik.setFieldValue("ut_year", 0);
  };

  return (
    <>
      <article className={styles.content_cart}>
        <div className={styles.content_img}>
          <img src={formik.values.placeholder} alt="imagen camion" />
        </div>
        <section>
          <div>
            <label>Tipo de equipo</label>
            <select
              name="ut_team"
              value={formik.values.ut_team}
              onBlur={formik.handleBlur}
              disabled={loading || !teams.length}
              onChange={handleChangeTeam}
              className={
                formik.touched.ut_team && formik.errors.ut_team ? "invalid" : ""
              }
            >
              <option value={0}>Selecciona un tipo de equipo</option>
              {teams.map(({ id_team, team_name }) => (
                <option key={id_team} value={id_team}>
                  {team_name}
                </option>
              ))}
            </select>
            <span>
              {formik.touched.ut_team && formik.errors.ut_team
                ? `${formik.errors.ut_team}`
                : ""}
            </span>
          </div>
          <div>
            <label> Marca del equipo</label>
            <select
              name="ut_brand"
              value={formik.values.ut_brand}
              onBlur={formik.handleBlur}
              disabled={loading || !brands.length}
              onChange={handleChangeBrand}
              className={
                formik.touched.ut_brand && formik.errors.ut_brand
                  ? "invalid"
                  : ""
              }
            >
              <option value={0}>Selecciona una marca del equipo</option>
              {brands.map(({ id_brand, brand_name }) => (
                <option key={id_brand} value={id_brand}>
                  {brand_name}
                </option>
              ))}
            </select>
            <span>
              {formik.touched.ut_brand && formik.errors.ut_brand
                ? `${formik.errors.ut_brand}`
                : ""}
            </span>
          </div>
          <div>
            <label> Modelo del equipo</label>
            <select
              name="ut_model"
              value={formik.values.ut_model}
              onBlur={formik.handleBlur}
              onChange={handleChangeModel}
              disabled={loading || !models.length}
              className={
                formik.touched.ut_model && formik.errors.ut_model
                  ? "invalid"
                  : ""
              }
            >
              <option value={0}>Selecciona el modelo del equipo</option>
              {models.map(({ id_model, model_name }) => (
                <option key={id_model} value={id_model}>
                  {model_name}
                </option>
              ))}
            </select>
            <span>
              {formik.touched.ut_model && formik.errors.ut_model
                ? `${formik.errors.ut_model}`
                : ""}
            </span>
          </div>
          <div>
            <label> Año del modelo</label>
            <select
              name="ut_year"
              value={formik.values.ut_year}
              onBlur={formik.handleBlur}
              disabled={loading || !years.length}
              onChange={formik.handleChange}
              className={
                formik.touched.ut_year && formik.errors.ut_year ? "invalid" : ""
              }
            >
              <option value={0}>Selecciona el año del modelo</option>
              {years.map((year, i) => (
                <option key={i} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <span>
              {formik.touched.ut_year && formik.errors.ut_year
                ? `${formik.errors.ut_year}`
                : ""}
            </span>
          </div>
          <div>
            <label>Placa del equipo</label>
            <input
              name="ut_car_plate"
              value={formik.values.ut_car_plate ?? ""}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              className={
                formik.touched.ut_car_plate && formik.errors.ut_car_plate
                  ? "select invalid"
                  : ""
              }
              placeholder="Escribe la placa del equipo"
            />
            <span>
              {formik.touched.ut_car_plate && formik.errors.ut_car_plate
                ? `${formik.errors.ut_car_plate}`
                : ""}
            </span>
          </div>
        </section>
      </article>
    </>
  );
};

export default ContentCart;
