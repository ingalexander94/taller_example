import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { privateRoutes, temporaryRoutes } from "src/models";
import { useAxios } from "src/hooks";
import { BrandValidatorForm, ComponentValidatorForm } from "src/validators";
import {
  Brand,
  Component,
  InitialValuesBrand,
  InitialValuesComponent,
} from "src/interfaces";
import { TemporaryContext, UIContext } from "src/context";
import { BrandService, ComponentService, TeamService } from "src/services";
import SaveTeam from "../Teams/components/SaveTeam";
import BrandItem from "./components/BrandItem";
import ComponentItem from "./components/ComponentItem";
import DeleteTeam from "./components/DeleteTeam";
import arrowIcon from "src/assets/icons/arrow.svg";
import editIcon from "src/assets/icons/edit.svg";
import plusIcon from "src/assets/icons/plus-icon.svg";
import styles from "./infoteam.module.css";

const InfoTeam = () => {
  const isInitialized = useRef<boolean>(false);
  const brandContainerRef = useRef<HTMLUListElement>(null);
  const componentsListRef = useRef<HTMLUListElement>(null);
  const componentsContainerRef = useRef<HTMLDivElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { callEndpoint } = useAxios();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const { temporaryState, setTeamSave, setStep } = useContext(TemporaryContext);
  const { toggleCheking } = useContext(UIContext);

  const emptyBrandValues: Brand = {
    brand_code: "",
    brand_name: "",
    brand_team: parseInt(id!),
    id_brand: 0,
    brand_models: [],
  };

  const emptyComponentValues: Component = {
    component_code: "",
    component_name: "",
    component_team: parseInt(id!),
    id_component: 0,
    component_systems: [],
  };

  const [brands, setBrands] = useState<InitialValuesBrand>({
    brands: [],
  });
  const [components, setComponents] = useState<InitialValuesComponent>({
    components: [],
  });

  const brandFormik = useFormik({
    initialValues: brands,
    validateOnMount: false,
    validationSchema: BrandValidatorForm.validationSchemaBrand,
    onSubmit: async (values) => {
      if (brandFormik.isValid) {
        toggleCheking();
        const res = await callEndpoint(BrandService.save(values.brands));
        if (res) {
          const { data: brands } = res.data;
          setBrands({ brands });
          brandFormik.setValues({ brands });
        }
        toggleCheking();
      }
    },
  });

  const componentFormik = useFormik({
    initialValues: components,
    validateOnMount: false,
    validationSchema: ComponentValidatorForm.validationSchemaComponent,
    onSubmit: async (values) => {
      if (componentFormik.isValid) {
        toggleCheking();
        const res = await callEndpoint(
          ComponentService.save(values.components)
        );
        if (res) {
          const { data: components } = res.data;
          setComponents({ components });
          componentFormik.setValues({ components });
        }
        toggleCheking();
      }
    },
  });

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;

      const getDetail = async () => {
        toggleCheking();
        const res = await callEndpoint(TeamService.getDetail(id!));
        if (res) {
          const { data } = res.data;
          setTeamSave(data.team);
          const newValuesBrand = data.brands.length
            ? { brands: [...data.brands] }
            : { brands: [...brands.brands, ...data.brands] };
          const newValuesComponent = data.components.length
            ? { components: [...data.components] }
            : { components: [...components.components, ...data.components] };
          setBrands(newValuesBrand);
          setComponents(newValuesComponent);
          brandFormik.setValues(newValuesBrand);
          componentFormik.setValues(newValuesComponent);
        } else {
          navigate(`/${privateRoutes.NOT_FOUND}`);
        }
        toggleCheking();
      };

      getDetail();
    }
    return () => {
      setTeamSave(null);
    };
  }, []);

  useEffect(() => {
    if (modelContainerRef.current && componentsContainerRef.current) {
      if (temporaryState.step === 1) {
        modelContainerRef.current.style.display = "none";
        componentsContainerRef.current.style.display = "grid";
      } else {
        componentsContainerRef.current.style.display = "none";
        modelContainerRef.current.style.display = "grid";
      }
    }
  }, [temporaryState.step]);

  const handleShow = () => {
    setShow(true);
  };

  const handleAddModel = (index_brand: number) => {
    const aux = brandFormik.values;
    aux.brands[index_brand].brand_models.push({
      id_model: 0,
      model_application: "",
      model_code: `${aux.brands[index_brand].brand_code}${
        aux.brands[index_brand].brand_models.length + 1
      }`,
      model_brand: aux.brands[index_brand].id_brand,
      model_engine: "",
      model_name: "",
      model_transmission: "",
      model_suspension: "",
      model_rear_bridge: "",
      model_init_year: null,
      model_final_year: null,
    });
    setBrands(aux);
    brandFormik.setValues(aux);
  };

  const handleAddSystem = (index_component: number) => {
    const aux = componentFormik.values;
    aux.components[index_component].component_systems.push({
      id_system: 0,
      system_code: "",
      system_name: "",
      system_component: aux.components[index_component].id_component,
    });
    setComponents(aux);
    componentFormik.setValues(aux);
  };

  const handleAddBrand = () => {
    const aux = brandFormik.values;
    aux.brands.push(emptyBrandValues);
    setBrands(aux);
    brandFormik.setValues(aux);
    setTimeout(() => {
      if (brandContainerRef.current) {
        window.scrollTo({
          top: brandContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const handleAddComponent = () => {
    const aux = componentFormik.values;
    aux.components.push(emptyComponentValues);
    setComponents(aux);
    componentFormik.setValues(aux);
    setTimeout(() => {
      if (componentsListRef.current) {
        window.scrollTo({
          top: componentsListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  const handleSubmit = async (typeForm = "") => {
    switch (typeForm) {
      case "brand":
        await brandFormik.submitForm();
        break;
      case "component":
        await componentFormik.submitForm();
        break;
      default:
        break;
    }
  };

  const deleteModel = (index_brand: number, indexModel: number) => {
    const aux = brands;
    const { brand_code } = aux.brands[index_brand];
    aux.brands[index_brand].brand_models.splice(indexModel, 1);
    aux.brands[index_brand].brand_models = aux.brands[
      index_brand
    ].brand_models.map((model, i) => ({
      ...model,
      model_code: `${brand_code}${i + 1}`,
    }));
    setBrands(aux);
    brandFormik.setValues(aux);
  };

  const deleteSystem = (index_component: number, index_system: number) => {
    const aux = components;
    const { component_code } = aux.components[index_component];
    aux.components[index_component].component_systems.splice(index_system, 1);
    aux.components[index_component].component_systems = aux.components[
      index_component
    ].component_systems.map((system, i) => ({
      ...system,
      model_code: `${component_code}${i + 1}`,
    }));
    setComponents(aux);
    componentFormik.setValues(aux);
  };

  const deleteBrand = (index_brand: number) => {
    const aux = brands;
    aux.brands = aux.brands.filter((_, i) => i !== index_brand);
    setBrands(aux);
    brandFormik.setValues(aux);
  };

  const deleteComponent = (index_component: number) => {
    const aux = components;
    aux.components = aux.components.filter((_, i) => i !== index_component);
    setComponents(aux);
    componentFormik.setValues(aux);
  };

  return (
    <>
      <article className={styles.info_team}>
        <section className={styles.breadcrumb}>
          <Link
            to={`/${privateRoutes.PRIVATE}/${privateRoutes.TEMPORARY}/${temporaryRoutes.TEAMS}`}
          >
            Equipos
          </Link>
          <img src={arrowIcon} alt="Arrow icon" />
          <p>{temporaryState.teamSave?.team_name}</p>
        </section>
        <section className={styles.info_actions}>
          <div>
            <h4>{temporaryState.teamSave?.team_name}</h4>
            <button className="btn_secondary" onClick={handleShow}>
              <img src={editIcon} alt="Edit Icon" /> Editar equipo
            </button>
            <DeleteTeam />
          </div>
          <ul>
            <li
              onClick={() => setStep(1)}
              className={temporaryState.step === 1 ? styles.active : ""}
            >
              <span>1</span>Componentes
            </li>
            <li
              onClick={() => setStep(2)}
              className={temporaryState.step === 2 ? styles.active : ""}
            >
              <span>2</span>Marcas y modelos
            </li>
          </ul>
        </section>
        <section className={styles.info_forms}>
          <div
            ref={componentsContainerRef}
            className={`animate__animated animate__faster ${styles.components}`}
          >
            <div className={styles.add}>
              <h3>Listados de componentes asociados al equipo</h3>
              <button
                type="button"
                onClick={handleAddComponent}
                className="btn_black"
              >
                <img src={plusIcon} alt="Plus icon" />
                Agregar componente
              </button>
            </div>
            <div className={styles.list_components}>
              <div className={styles.header}>
                <div>Código</div>
                <div>Nombre del componente</div>
                <div>Nro. de sistemas</div>
                <div>Acciones</div>
              </div>
              <form autoComplete="off">
                <ul ref={componentsListRef}>
                  {components.components.map((component, i) => (
                    <ComponentItem
                      key={i}
                      index={i}
                      component={component}
                      formik={componentFormik}
                      addSystem={handleAddSystem}
                      removeSystem={deleteSystem}
                      removeComponent={deleteComponent}
                    />
                  ))}
                </ul>
              </form>
            </div>
          </div>
          <div
            ref={modelContainerRef}
            className={`animate__animate animate__faster ${styles.models}`}
          >
            <div className={styles.add}>
              <h3>Listado de los modelos OEM</h3>
              <button
                type="button"
                onClick={handleAddBrand}
                className="btn_black"
              >
                <img src={plusIcon} alt="Plus icon" />
                Agregar marca
              </button>
            </div>
            <form autoComplete="off">
              <ul ref={brandContainerRef}>
                {brands.brands.map((brand, i) => (
                  <BrandItem
                    key={i}
                    index={i}
                    brand={brand}
                    formik={brandFormik}
                    addModel={handleAddModel}
                    removeModel={deleteModel}
                    removeBrand={deleteBrand}
                  />
                ))}
              </ul>
            </form>
          </div>
        </section>
        <div className={styles.to_back_next}>
          <button
            onClick={() => setStep(1)}
            className={`${styles.back} ${
              temporaryState.step === 1 ? styles.hide : "btn_red"
            }`}
          >
            <img src={arrowIcon} alt="Arrow icon" />
            Listados de componentes
          </button>

          <div className={styles.save_button}>
            <button
              onClick={() => setStep(2)}
              className={`${styles.next} ${
                temporaryState.step === 2 ? styles.hide : "btn_red"
              }`}
            >
              Listado de modelos OEM
              <img src={arrowIcon} alt="Arrow icon" />
            </button>
            {temporaryState.step === 1 ? (
              <button
                onClick={() => handleSubmit("component")}
                type="submit"
                disabled={!componentFormik.dirty || !componentFormik.isValid}
              >
                Guardar actualización
              </button>
            ) : (
              <button
                onClick={() => handleSubmit("brand")}
                type="submit"
                disabled={!brandFormik.dirty || !brandFormik.isValid}
              >
                Guardar actualización
              </button>
            )}
          </div>
        </div>
      </article>
      {show && <SaveTeam closeModal={() => setShow(false)} />}
    </>
  );
};

export default InfoTeam;
