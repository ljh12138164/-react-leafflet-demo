import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { usePost } from "../context/CityiesContext";

//格式化日期
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ item }) {
  const { currentCity, delectCity } = usePost();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = item;
  return (
    <>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={`${styles.emoji} fi fi-${emoji}`}></span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            delectCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </>
  );
}

export default CityItem;
