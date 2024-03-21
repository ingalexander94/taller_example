import { useRef, useState } from "react";
import arrow from "src/assets/icons/arrow.svg";
import close from "src/assets/icons/x.svg";
import styles from "./gallery.module.css";
import { EquipmentPhotos } from "src/interfaces";

type Props = {
  photos: EquipmentPhotos[];
  currentIndex: number;
  onClose: () => void;
};

const Gallery = ({ photos, onClose, currentIndex }: Props) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState<number>(currentIndex);

  const handleMoveLeft = () => {
    const prev = index - 1;
    setIndex(prev < 0 ? photos.length - 1 : prev);
  };

  const handleMoveRight = () => {
    const next = index + 1;
    setIndex(next === photos.length ? 0 : next);
  };

  const handleClose = () => {
    if (lightboxRef.current) {
      lightboxRef.current.classList.add("animate__fadeOut");
    }
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      ref={lightboxRef}
      className={`animate__animated animate__fadeIn animate__faster ${styles.lightbox}`}
    >
      <button onClick={handleMoveLeft}>
        <img src={arrow} alt="icon arrow" />
      </button>
      <div>
        <img src={photos[index].tp_photo} loading="lazy" alt="Photo active" />
        <button className={styles.close} onClick={handleClose}>
          <img src={close} alt="Close icon" />
        </button>
      </div>
      <button onClick={handleMoveRight}>
        <img src={arrow} alt="icon arrow" />
      </button>
    </div>
  );
};

export default Gallery;
