import Sidebar from "../compoents/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../compoents/Map";
import User from "../compoents/User";
import { useAuth } from "../context/FakeAuthContext";

function AppLayout() {
  const isAuther = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
      {isAuther ? <User></User> : ""}
    </div>
  );
}

export default AppLayout;
