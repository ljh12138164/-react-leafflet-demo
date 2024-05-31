// import styles from "./City.module.css";

// import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { usePost } from "../context/CityiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { currentCity, getCity, isLoading } = usePost();
  const { cityName, emoji, date, notes } = currentCity;
  // TEMP DATA
  // const [searchParams, setSerachParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );
  if (isLoading) return <Spinner></Spinner>;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span className={`fi fi-${emoji}`}></span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://www.worldcountryguide.com/zh-cn/country/`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <BackButton />
    </div>
  );
}

export default City;
