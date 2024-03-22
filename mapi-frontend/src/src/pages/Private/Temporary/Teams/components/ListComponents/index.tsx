import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TemporaryContext } from "src/context";
import { Brand, Model } from "src/interfaces";
import { useAxios } from "src/hooks";
import { BrandService } from "src/services";
import AddBrandModal from "../AddBrandModal";
import plusIcon from "src/assets/icons/plus-icon.svg";
import editIcon from "src/assets/icons/edit.svg";
import infoIcon from "src/assets/icons/information.svg";
import styles from "./listcomponents.module.css";

const ListComponents = () => {
  const { temporaryState, setModelActive, setStep } =
    useContext(TemporaryContext);
  const { callEndpoint } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    getBrandsAndModels();

    return () => {};
  }, [temporaryState.teamActive]);

  const getBrandsAndModels = async () => {
    if (temporaryState.teamActive) {
      setLoading(true);
      const res = await callEndpoint(
        BrandService.getByTeam(temporaryState.teamActive?.id_team)
      );
      if (res) {
        const { data } = res.data;
        setBrands(data);
        if (data.length) {
          if (data[0].brand_models.length) {
            setModelActive(data[0].brand_models[0]);
          }
        }
      }
      setLoading(false);
    }
  };

  const handleActiveModel = (model: Model) => {
    navigate(location.pathname);
    setModelActive(model);
  };

  const handleClose = (refresh: boolean) => {
    setShow(false);
    if (refresh) {
      getBrandsAndModels();
    }
  };

  const handleEditTeam = () => {
    if (temporaryState.teamActive) {
      navigate(`editar/${temporaryState.teamActive.id_team}`);
      setStep(2);
    }
  };

  return (
    <>
      <section className={styles.list_components}>
        {brands.length > 0 && (
          <div className={styles.actions}>
            <p>Modelos de OEM</p>
            <button className="btn_black" onClick={() => setShow(true)}>
              <img src={plusIcon} alt="Plus icon" /> Agregar marca
            </button>
          </div>
        )}
        <ul className={styles.components}>
          {!loading && (
            <section>
              <h3>¡Aún no tienes marcas agregadas!</h3>
              <p>
                Es hora de agregar tus marcas de equipos originales de fabrica
                para aprovechar al máximo todas las funcionalidades que
                ofrecemos
              </p>
              <button onClick={() => setShow(true)} className="btn_black">
                <img src={plusIcon} alt="Plus icon" />
                Agregar marca
              </button>
            </section>
          )}
          {brands.map((brand, index) => (
            <div
              className={`animate__animated animate__fadeIn animate__faster ${styles.brand_item}`}
              key={index}
            >
              <input
                type="checkbox"
                defaultChecked={index === 0}
                name="component"
                id={`brand${index}`}
              />
              <label
                className={brand.brand_models.length ? styles.dropdown : ""}
                htmlFor={`brand${index}`}
              >
                {brand.brand_name} ({brand.brand_code})
                <button onClick={handleEditTeam}>
                  <img src={editIcon} alt="Edit icon" />
                  Editar
                </button>
              </label>
              <ul>
                {brand.brand_models.length ? (
                  brand.brand_models.map((model, index) => (
                    <li
                      className={
                        temporaryState.modelActive?.id_model === model.id_model
                          ? styles.active
                          : ""
                      }
                      onClick={() => handleActiveModel(model)}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        name="model"
                        id={`model${index}`}
                      />
                      <label htmlFor={`model${index}`}>
                        <img src={infoIcon} alt="Info icon" />
                      </label>
                      <p>{model.model_code}</p>
                      <p>{model.model_name}</p>
                      <div>
                        <p>
                          <strong>Aplicación:</strong> {model.model_application}
                        </p>
                        <p>
                          <strong>Años:</strong> {model.model_init_year}-{model.model_final_year}
                        </p>
                        <p>
                          <strong>Motor:</strong> {model.model_engine}
                        </p>
                        <p>
                          <strong>Puente trasero:</strong> {model.model_rear_bridge}
                        </p>
                        <p>
                          <strong>Transmisión:</strong> {model.model_transmission}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
          ))}
        </ul>
      </section>
      {show && <AddBrandModal closeModal={handleClose} />}
    </>
  );
};

export default ListComponents;
