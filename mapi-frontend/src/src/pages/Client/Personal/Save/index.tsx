import { useContext, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { FormCreatePersonValidator } from "src/validators";
import styles from "./save.module.css";
import { useAxios } from "src/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PersonalService } from "src/services";
import { Technician } from "src/interfaces";
import { UIContext } from "src/context";
import { formatCurrency, jsonToFormData } from "src/utilities";
import { Alerts } from "src/lib";
import { privateRoutes } from "src/models";

const SavePersonal = () => {
  const { callEndpoint } = useAxios();
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialized = useRef<boolean>(false);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [defaultPhoto, setDefaultPhoto] = useState("");
  const [params, _] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id") || 0;

  const { toggleCheking } = useContext(UIContext);

  const [photoUrl, setPhotoUrl] = useState("");

  const formik = useFormik({
    initialValues: FormCreatePersonValidator.initialState,
    validationSchema: FormCreatePersonValidator.validatorSchemaAddPerson,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (formik.isValid) {
        toggleCheking();
        const formdata = jsonToFormData(values);
        if (selectedPhoto) {
          formdata.delete("personal_photo");
          formdata.set("personal_photo", selectedPhoto);
        }
        const res = await callEndpoint(PersonalService.save(formdata));
        if (res) {
          if (!id) {
            navigate(`/${privateRoutes.CLIENT}/${privateRoutes.PERSONAL}`);
          }
          Alerts.showToast(
            "success",
            `${formik.values.personal_names} se ha guardado`
          );
        }
        toggleCheking();
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      const getDetail = async () => {
        const res = await callEndpoint(
          PersonalService.getDetail(id.toString())
        );
        if (res) {
          const { data } = res.data;
          setDefaultPhoto(data.avatar);
          formik.setValues(data.personal);
          setTechnicians(data.technicians);
        }
      };
      getDetail();
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (selectedPhoto) {
      const photoUrl = URL.createObjectURL(selectedPhoto);
      setPhotoUrl(photoUrl);
    } else {
      setPhotoUrl("");
    }
  }, [selectedPhoto]);

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleDeletePhoto = (event: any) => {
    event.preventDefault();
    setSelectedPhoto(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    formik.setFieldValue("personal_photo", defaultPhoto);
  };

  const handlePhoneChange = (e: any) => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 10);
    formik.setFieldValue("personal_phone", value);
  };

  const handleDocumentChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 10);
    formik.setFieldValue("personal_document", value);
  };

  const handleSalaryChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 20);
    formik.setFieldValue("personal_salary", value);
  };

  return (
    <article className={styles.container_create_person}>
      <div className={styles.container_create_persons}>
        {!id ? (
          <div className={styles.photo_section}>
            <div className={styles.add_person_wrapper}>
              <label htmlFor="photo" className={styles.add_photo_label}>
                {formik.values.personal_photo ? (
                  photoUrl ? (
                    <img
                      className="animate__animated animate__fadeIn"
                      src={photoUrl}
                      alt="Photo upload"
                    />
                  ) : (
                    <img
                      className="animate__animated animate__fadeIn"
                      src={formik.values.personal_photo}
                      alt="Avatar"
                    />
                  )
                ) : (
                  <></>
                )}
              </label>
              <input
                type="file"
                id="photo"
                ref={inputRef}
                accept="image/png, image/jpeg"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              <h2>Aún no has registrado una nueva persona</h2>
            </div>
          </div>
        ) : (
          <div className={styles.photo_section}>
            <div className={styles.add_person_wrapper}>
              <div className={styles.content_edit_user}>
                <label htmlFor="photo" className={styles.add_photo_labels}>
                  {formik.values.personal_photo ? (
                    photoUrl ? (
                      <img
                        className="animate__animated animate__fadeIn"
                        src={photoUrl}
                        alt="Photo upload"
                      />
                    ) : (
                      <img
                        className="animate__animated animate__fadeIn"
                        src={formik.values.personal_photo}
                        alt="Avatar"
                      />
                    )
                  ) : (
                    <></>
                  )}
                  <div className={styles.content_name}>
                    <h2>
                      <strong>
                        {formik.values.personal_names}{" "}
                        {formik.values.personal_surnames}
                      </strong>
                    </h2>
                    <h3>{formik.values.technician_name}</h3>
                  </div>
                </label>
              </div>

              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              <div className={styles.content_documents}>
                <h3>Documento de identidad:</h3>
                <strong>{formik.values.personal_document}</strong>
              </div>
              <div className={styles.content_documents}>
                <h3>Número de contacto</h3>
                <h2>
                  <strong>{formik.values.personal_phone}</strong>
                </h2>
              </div>
              <div className={styles.content_documents}>
                <h3>Cargo u ocupación </h3>
                <h2>
                  <strong>{formik.values.technician_name}</strong>
                </h2>
              </div>
              <div className={styles.content_documents}>
                <h3>Salario base </h3>
                <h2>
                  <strong>
                    {formatCurrency(formik.values.personal_salary)}
                  </strong>
                </h2>
              </div>
            </div>
          </div>
        )}

        <div className={styles.form_section}>
          <h2>Crear personal </h2>
          <form
            onSubmit={formik.handleSubmit}
            className={styles.form_content}
            autoComplete="off"
          >
            <div
              className={`${styles.form_groups} ${
                formik.touched.personal_photo && formik.errors.personal_photo
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="photo">
                {formik.values.personal_photo ? (
                  photoUrl ? (
                    <img
                      className="animate__animated animate__fadeIn"
                      src={photoUrl}
                      alt="Photo upload"
                    />
                  ) : (
                    <img
                      className="animate__animated animate__fadeIn"
                      src={formik.values.personal_photo}
                      alt="Avatar"
                    />
                  )
                ) : (
                  <></>
                )}
              </label>
              <div className={styles.buttons}>
                <label
                  htmlFor="photo"
                  className={styles.btn_secondary}
                  id={styles.buttons_add}
                >
                  Agregar foto
                </label>
                <button
                  className="btn_secondary"
                  id={styles.buttons_delete}
                  onClick={handleDeletePhoto}
                >
                  Eliminar foto
                </button>
              </div>
              {formik.touched.personal_photo &&
                formik.errors.personal_photo && (
                  <div
                    className={`${styles.error} ${styles.errorText}`}
                    id={styles.errores}
                  >
                    {formik.errors.personal_photo}
                  </div>
                )}
            </div>

            <div
              className={`${styles.form_group} ${
                formik.touched.personal_names && formik.errors.personal_names
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_names">Nombres </label>
              <span className={styles.required}>*</span>
              <input
                type="text"
                id="personal_names"
                name="personal_names"
                value={formik.values.personal_names}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Escribe los nombres aquí"
                className={`${
                  formik.touched.personal_names && formik.errors.personal_names
                    ? styles.errorInput
                    : ""
                }`}
              />
              {formik.touched.personal_names &&
                formik.errors.personal_names && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_names}
                  </div>
                )}
            </div>
            <div
              className={`${styles.form_group} ${
                formik.touched.personal_surnames &&
                formik.errors.personal_surnames
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_surnames">Apellidos </label>
              <span className={styles.required}>*</span>
              <input
                type="text"
                id="personal_surnames"
                name="personal_surnames"
                value={formik.values.personal_surnames}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Escribe los apellidos aquí"
                className={`${
                  formik.touched.personal_surnames &&
                  formik.errors.personal_surnames
                    ? styles.errorInput
                    : ""
                }`}
              />
              {formik.touched.personal_surnames &&
                formik.errors.personal_surnames && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_surnames}
                  </div>
                )}
            </div>
            <div
              className={`${styles.form_group_last} ${
                formik.touched.personal_document &&
                formik.errors.personal_document
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_document">Documento de identidad </label>
              <span className={styles.required}>*</span>
              <input
                type="text"
                id="personal_document"
                value={formik.values.personal_document}
                name="personal_document"
                onChange={handleDocumentChange}
                onBlur={formik.handleBlur}
                placeholder="Escribe el documento de identidad"
                className={`${
                  formik.touched.personal_document &&
                  formik.errors.personal_document
                    ? styles.errorInput
                    : ""
                }`}
              />

              {formik.touched.personal_document &&
                formik.errors.personal_document && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_document}
                  </div>
                )}
            </div>

            <div
              className={`${styles.form_group} ${
                formik.touched.personal_phone && formik.errors.personal_phone
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_phone">Número de contacto </label>
              <span className={styles.required}>*</span>
              <input
                type="text"
                id="personal_phone"
                name="personal_phone"
                value={
                  !formik.values.personal_phone
                    ? ""
                    : formik.values.personal_phone
                }
                onChange={handlePhoneChange}
                onBlur={formik.handleBlur}
                placeholder="Escribe el número de contacto aquí"
                className={`${
                  formik.touched.personal_phone && formik.errors.personal_phone
                    ? styles.errorInput
                    : ""
                }`}
              />

              {formik.touched.personal_phone &&
                formik.errors.personal_phone && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_phone}
                  </div>
                )}
            </div>

            <div
              className={`${styles.form_group} ${
                formik.touched.personal_technician &&
                formik.errors.personal_technician
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_technician">Cargo u ocupación </label>
              <span className={styles.required}>*</span>
              <div className={styles.select_options}>
                <select
                  name="personal_technician"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.personal_technician}
                  id="personal_technician"
                >
                  <option value={0}>Selecciona un cargo u ocupación</option>
                  {technicians.map(({ id_technician, technician_name }, i) => (
                    <option key={i} value={id_technician}>
                      {technician_name}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.personal_technician &&
                formik.errors.personal_technician && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_technician}
                  </div>
                )}
            </div>

            <div
              className={`${styles.form_group_file_document} ${
                formik.touched.personal_salary && formik.errors.personal_salary
                  ? styles.errorBorder
                  : ""
              }`}
            >
              <label htmlFor="personal_salary">Salario base </label>
              <span className={styles.required}>*</span>
              <input
                type="number"
                id="personal_salary"
                name="personal_salary"
                value={
                  formik.values.personal_salary === 0
                    ? ""
                    : formik.values.personal_salary
                }
                onChange={handleSalaryChange}
                onBlur={formik.handleBlur}
                placeholder="Escribe el salario base aquí"
                className={`${
                  formik.touched.personal_salary &&
                  formik.errors.personal_salary
                    ? styles.errorInput
                    : ""
                }`}
              />

              {formik.touched.personal_salary &&
                formik.errors.personal_salary && (
                  <div className={`${styles.error} ${styles.errorText}`}>
                    {formik.errors.personal_salary}
                  </div>
                )}
            </div>

            <button
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
              className={styles.buttons_save_changes}
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default SavePersonal;
