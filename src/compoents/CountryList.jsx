import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePost } from "../context/CityiesContext";

function CountryList() {
  const { cities, isLoading } = usePost();

  if (isLoading) return <Spinner></Spinner>;
  if (!cities.length)
    return <Message message="Add you first city by you mpa"></Message>;
  const countries = cities.reduce((acc, cur) => {
    //判断每次是否包含相同的国家
    //1.先把对象变成当前数组的country列出来 2.看有没有包含
    if (!acc.map((el) => el.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    } else {
      return acc;
    }
  }, []);
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
