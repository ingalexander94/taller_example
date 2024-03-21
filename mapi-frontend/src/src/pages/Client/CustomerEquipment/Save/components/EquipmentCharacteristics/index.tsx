import { useContext, useEffect, useRef, useState } from "react";
import styles from "./equipmentCharacteristics.module.css";
import iconDelete from "src/assets/icons/delete.svg";
import uploadWhite from "src/assets/icons/upload-white.svg";
import { useAxios } from "src/hooks";
import { EquipmentService } from "src/services";
import { Driver } from "src/interfaces";
import { UIContext } from "src/context";

type props = {
  formik: any;
  isHidden: boolean;
};

const CharacteristicsEquipment = ({ isHidden, formik }: props) => {
  const { toggleCheking } = useContext(UIContext);

  const [images, setImages] = useState<
    { file: File; name: string; size: string }[]
  >([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const [drivers, setDrivers] = useState<Driver[]>([]);

  const isInitialized = useRef<boolean>(false);

  const { callEndpoint } = useAxios();

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getDrivers();
    }
    return () => {};
  }, []);

  const getDrivers = async () => {
    const res = await callEndpoint(EquipmentService.getDrivers());
    if (res) {
      const { data } = res.data;
      setDrivers(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedImages = Array.from(e.target.files).map((file) => {
        return {
          file,
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
        };
      });
      setImages([...images, ...selectedImages]);
      let photos = images.map(({ file }) => file);
      photos = [...photos, ...Array.from(e.target.files)];
      formik.setFieldValue("files", photos);
    }
  };

  const handleImagesRemove = async () => {
    toggleCheking();
    if (formik.values.id_user_team) {
      const res = await callEndpoint(
        EquipmentService.deleteAllPhoto(formik.values.id_user_team)
      );
      formik.setFieldValue("photos", []);
      if (res) {
        const { data } = res?.data;
        formik.setFieldValue("placeholder", data);
      }
    }
    setImages([]);
    formik.setFieldValue("files", []);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    toggleCheking();
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    if (inputRef.current && inputRef.current.files?.length) {
      const files = Array.from(inputRef.current.files);
      files.splice(index, 1);
      const newFiles = new DataTransfer();
      files.forEach(function (file) {
        newFiles.items.add(file);
      });
      inputRef.current.files = newFiles.files;
      formik.setFieldValue("files", newFiles.files);
    }
    setImages(updatedImages);
  };

  const removePhoto = async (id: number) => {
    toggleCheking();
    let photos = formik.values.photos;
    photos = photos.filter(({ id_team_photo }: any) => id_team_photo !== id);
    const res = await callEndpoint(EquipmentService.deletePhoto(id));
    formik.setFieldValue("photos", photos);
    if (res && !photos.length) {
      const { data } = res?.data;
      formik.setFieldValue("placeholder", data);
    }
    toggleCheking();
  };

  return (
    <>
      <article
        className={`${styles.content_characteristics} ${
          isHidden ? styles.hidden : ""
        }`}
      >
        <div>
          <h3>Características del equipo</h3>
        </div>
        <div>
          <section>
            <div>
              <label>Aplicación del equipo</label>
              <input
                type="text"
                placeholder="Escribe la aplicación de este vehiculo"
                name="ut_application"
                value={formik.values.ut_application ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label>Fecha de compra</label>
              <input
                type="date"
                placeholder="Selecciona la fecha de la compra"
                name="ut_date_purchased"
                value={formik.values.ut_date_purchased ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label>Forma en la que se mide el equipo</label>
              <select
                name="ut_measure"
                value={formik.values.ut_measure ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option value={""}>Selecciona horas o kilómetros</option>
                <option value={1}>Horas</option>
                <option value={2}>Kilómetros</option>
              </select>
            </div>
            <div>
              <label>Número de VIN</label>
              <input
                type="text"
                placeholder="Escribe el número de VIN"
                name="ut_vin"
                value={formik.values.ut_vin ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label>Conductor</label>
              <select
                name="ut_driver"
                value={formik.values.ut_driver ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option value={""}>Selecciona un conductor</option>
                {drivers.map(
                  ({ id_personal, personal_names, personal_surnames }) => (
                    <option key={id_personal} value={id_personal}>
                      {personal_names} {personal_surnames}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label>Estado actual del equipo</label>
              <select
                name="ut_state"
                value={formik.values.ut_state ?? ""}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option value="">Selecciona un estado actual</option>
                <option value={1}>Bueno</option>
                <option value={2}>Malo</option>
              </select>
            </div>
            <input
              id="photos"
              type="file"
              multiple
              accept="image/png, image/jpeg"
              ref={inputRef}
              name="files"
              onBlur={formik.handleBlur}
              onChange={handleImageChange}
              className={styles.input_remove}
            />
            <div className={styles.container_photo}>
              <label>Fotografías del equipo</label>
              <div className={styles.border}>
                <label htmlFor="photos" className={styles.label_remove}>
                  Haga clic para cargar
                  <p className={styles.btn}>Seleccionar imagen</p>
                  <p>Tamaño máximo por imagen 1 MB</p>
                </label>
                {images.length || formik.values.photos.length ? (
                  <div>
                    <div className={styles.input}>
                      <label htmlFor="photos">
                        <img src={uploadWhite} alt="icon" />
                        Adjuntar nueva imagen
                      </label>
                      <button
                        type="button"
                        className={styles.btn_remove}
                        onClick={handleImagesRemove}
                      >
                        Eliminar todo
                        <img src={iconDelete} alt="icon" />
                      </button>
                    </div>

                    <div className={styles.wrapper_images}>
                      {formik.values.photos.map((photo: any, index: any) => (
                        <div key={index} className={styles.content_img}>
                          <div className={styles.container_img}>
                            <img
                              src={photo.tp_photo}
                              alt="icon"
                              className={styles.img}
                            />
                            <span>
                              {photo.tp_photo_name}
                              <small className="text_green">Subido</small>
                            </span>
                          </div>

                          <button
                            className={styles.btn_delete}
                            type="button"
                            onClick={() => removePhoto(photo.id_team_photo)}
                          >
                            <img src={iconDelete} alt="icon" />
                          </button>
                        </div>
                      ))}
                      {images.map((image, index) => (
                        <div key={index} className={styles.content_img}>
                          <div className={styles.container_img}>
                            <img
                              src={URL.createObjectURL(image.file)}
                              alt="icon"
                              className={styles.img}
                            />
                            <span>
                              {image.name} <small>{image.size}</small>
                            </span>
                          </div>

                          <button
                            className={styles.btn_delete}
                            type="button"
                            onClick={() => handleImageDelete(index)}
                          >
                            <img src={iconDelete} alt="icon" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default CharacteristicsEquipment;
