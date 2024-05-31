import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { usePost } from "../context/CityiesContext";

function CityList() {
  // console.log(usePost());
  const { cities, isLoading } = usePost();
  console.log(cities);
  // const  = data;
  if (isLoading) return <Spinner></Spinner>;
  if (!cities.length)
    return <Message message="Add you first city by you mpa"></Message>;

  return (
    <ul className={styles.cityList}>
      {cities.map((item) => (
        <CityItem key={item.id} item={item}></CityItem>
      ))}
    </ul>
  );
}

export default CityList;
