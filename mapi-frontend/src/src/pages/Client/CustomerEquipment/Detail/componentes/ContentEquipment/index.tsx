import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { privateRoutes } from "src/models";
import { EquipmentDetail, EquipmentPhotos } from "src/interfaces";
import CopyToClipboardButton from "../CopyButtons";
import Gallery from "src/components/UI/Gallery";
import edit from "src/assets/icons/edit.svg";
import arrow from "src/assets/icons/arrow-down.svg";
import styles from "./detail.module.css";
import { formatDate } from "src/utilities";

type Props = {
  details: EquipmentDetail;
};

const DetailEquipments = ({ details }: Props) => {
  const [smallImages, __] = useState<EquipmentPhotos[]>(details.photos);
  const photosRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const handleMoveSlider = (left: number) => {
    photosRef.current?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: left,
    });
  };

  return (
    <>
      <section className={styles.table_system}>
        <div className={styles.container_content}>
          <div className={styles.container_galery}>
            <div className={styles.gallery_container}>
              <div className={styles.gallery_image}>
                <img
                  onClick={() => setCurrentIndex(0)}
                  src={smallImages[0].tp_photo}
                  alt="Car image"
                />
              </div>
              {details.photos.length > 1 && (
                <>
                  <div ref={photosRef} className={styles.small_images}>
                    {smallImages.map((image, index) => (
                      <img
                        onClick={() => setCurrentIndex(index)}
                        key={index}
                        src={image.tp_photo}
                        alt={`Photo car ${index}`}
                      />
                    ))}
                  </div>
                  <div className={styles.buttons_container}>
                    <button
                      onClick={() => handleMoveSlider(-200)}
                      className={styles.button_galery}
                    >
                      <img src={arrow} alt="Arrow icon" />
                    </button>
                    <button
                      onClick={() => handleMoveSlider(+200)}
                      className={styles.button_galery}
                    >
                      <img src={arrow} alt="Arrow icon" />
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className={styles.container_mantenimient}>
              <h2> Próximos mantenimientos</h2>
              <ul className={styles.options}>
                <p>No se encontrarón resultados</p>
              </ul>
            </div>
          </div>

          <div className={styles.content_description}>
            <div className={styles.content_title}>
              <div>
                <p>
                  {details.brand_name} - {details.model_name}
                </p>
                <h2>
                  {details.team_name} - {details.ut_car_plate}
                </h2>
              </div>
              <Link
                to={`/${privateRoutes.CLIENT}/${privateRoutes.EQUIPMENT}/${privateRoutes.SAVEEQUIPMENT}`}
                className="btn_secondary"
              >
                <img src={edit} alt="Edit icon" />
                Editar equipo
              </Link>
            </div>
            <div className={styles.container_date}>
              <strong>Fecha de compra:</strong>
              <span>{formatDate(details.ut_date_purchased)}</span>
              <div className={styles.bar}></div>
              <strong>Año:</strong>
              <span>{details.ut_year}</span>
              <div className={styles.bar}></div>
              <strong>Aplicación:</strong>
              <span>{details.ut_application}</span>
            </div>
            <div className={styles.container_detail_driver}>
              <div className={styles.property_cart}>
                <div>
                  <strong>{details.ut_car_plate}</strong>
                  <span>Placa</span>
                </div>
                <div className={styles.bar}></div>
                <div>
                  <strong>3.245 km</strong>
                  <span>Km. recorrido</span>
                </div>
                <div className={styles.bar}></div>
                <div>
                  <strong className={styles.active}>Activo</strong>
                  <span>Estado actual</span>
                </div>
              </div>
              <div className={styles.property_driver}>
                <img src={details.personal_photo} alt="Photo conductor" />
                <div>
                  <h2>
                    {details.personal_names} {details.personal_surnames}
                  </h2>
                  <div>
                    <p>
                      Contacto
                      <CopyToClipboardButton text={details.personal_phone} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.optionsContainer}>
              <div className={styles.dropdownContainer}>
                <div className={styles.selected_option_title}>
                  Características del equipo
                </div>
                <div className={styles.scroll}>
                  <ul className={styles.options}>
                    <li>
                      <strong>Fecha de compra</strong>
                      <span>
                        <CopyToClipboardButton
                          text={formatDate(details.ut_date_purchased)}
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Marca</strong>
                      <span>
                        <CopyToClipboardButton text={details.brand_name} />
                      </span>
                    </li>
                    <li>
                      <strong>Modelo</strong>
                      <span>
                        <CopyToClipboardButton text={details.model_name} />
                      </span>
                    </li>
                    <li>
                      <strong>Año</strong>
                      <span>
                        <CopyToClipboardButton
                          text={details.ut_year.toString()}
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Placa</strong>
                      <CopyToClipboardButton text={details.ut_car_plate} />
                    </li>
                    <li>
                      <strong>VIN</strong>

                      <CopyToClipboardButton text={details.ut_vin} />
                    </li>
                    <li>
                      <strong>Aplicación</strong>

                      <CopyToClipboardButton text={details.ut_application} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.dropdownContainer}>
                <div className={styles.selected_option_title}>Motor</div>
                <div className={styles.scroll}>
                  <ul className={styles.options}>
                    <li>
                      <strong>Marca</strong>
                      <span>
                        <CopyToClipboardButton
                          text={details.engine_brand ?? "Sin especificar"}
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Modelo</strong>
                      <span>
                        <CopyToClipboardButton
                          text={details.engine_model ?? "Sin especificar"}
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Cilindraje</strong>
                      <span>
                        <CopyToClipboardButton
                          text={
                            details.engine_cylinder_capacity
                              ? `${details.engine_cylinder_capacity} Litros`
                              : "Sin especificar"
                          }
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Serial</strong>
                      <span>
                        <CopyToClipboardButton
                          text={details.engine_serial ?? "Sin especificar"}
                        />
                      </span>
                    </li>
                    <li>
                      <strong>Potencia indicada</strong>
                      <CopyToClipboardButton
                        text={
                          details.engine_power
                            ? `${details.engine_power} H.P`
                            : "Sin especificar"
                        }
                      />
                    </li>
                    <li>
                      <strong>RPM de potencia indicada</strong>

                      <CopyToClipboardButton
                        text={
                          details.engine_rpm_power
                            ? `${details.engine_rpm_power} RPM`
                            : "Sin especificar"
                        }
                      />
                    </li>
                    <li>
                      <strong>Torque</strong>

                      <CopyToClipboardButton
                        text={
                          details.engine_torque
                            ? `${details.engine_torque} Lb.pie`
                            : "Sin especificar"
                        }
                      />
                    </li>
                    <li>
                      <strong>Velocidad gobernada</strong>

                      <CopyToClipboardButton
                        text={
                          details.engine_governed_speed
                            ? `${details.engine_governed_speed} RPM`
                            : "Sin especificar"
                        }
                      />
                    </li>
                    <li>
                      <strong>Código del ECM</strong>

                      <CopyToClipboardButton
                        text={details.engine_ecm_code ?? "Sin especificar"}
                      />
                    </li>
                    <li>
                      <strong>Nombre del ECM</strong>

                      <CopyToClipboardButton
                        text={details.engine_ecm_name ?? "Sin especificar"}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {currentIndex >= 0 && (
        <Gallery
          onClose={() => setCurrentIndex(-1)}
          currentIndex={currentIndex}
          photos={details.photos}
        />
      )}
    </>
  );
};

export default DetailEquipments;
