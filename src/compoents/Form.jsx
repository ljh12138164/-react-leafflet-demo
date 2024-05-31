// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// import "react-datepicker/dist/react-datepicker-cssmodules.css";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinger from "./Spinner";
import Message from "./Message";
import { usePost } from "../context/CityiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  console.log(codePoints);
  return String.fromCodePoint(...codePoints);
}
const URL_GEN = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocoding, setGeocoding] = useState("");
  const navigator = useNavigate();
  const { createCity, isLoading } = usePost();
  const [Lat, Lng] = useUrlPosition();
  useEffect(
    function () {
      async function fetchGeo() {
        if (!Lat && !Lng) return;
        try {
          setIsLoadingGeocoding(true);
          setGeocoding("");
          const res = await fetch(
            `${URL_GEN}?latitude=${Lat}&longitude=${Lng}`
          );

          const data = await res.json();
          if (!data.city) throw new Error("not find,click other ");
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(data.countryCode);
        } catch (err) {
          setGeocoding(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchGeo();
    },
    [Lat, Lng]
  );

  async function hadleSubmit(e) {
    e.preventDefault();
    console.log(e);
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji: emoji.toLocaleLowerCase(),
      date,
      notes,
      position: { lat: Lat, lng: Lng },
    };
    await createCity(newCity);
    navigator("/app/cities");
  }
  if (!Lat && !Lng)
    return <Message message="Click map to some on the map"></Message>;

  if (geocoding) return <Message message={geocoding}></Message>;

  if (isLoadingGeocoding) return <Spinger></Spinger>;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.Loading : ""}`}
      onSubmit={hadleSubmit}
    >
      <div className={styles.row}>
        <div className={styles.icon}>
          <label htmlFor="cityName">City name</label>
          <span
            className={`${styles.flag} fi fi-${emoji.toLocaleLowerCase()}`}
          ></span>
        </div>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
