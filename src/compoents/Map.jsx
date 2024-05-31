import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import Button from "./Button";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import useUrlPosition from "../hooks/useUrlPosition";
import { usePost } from "../context/CityiesContext";
import { useGeolocation } from "../hooks/useGeolocation";

function Map() {
  const { cities } = usePost();

  const [MapPosition, setMapPosition] = useState(
    //默认地址
    [23, 113]
  );
  const [Lat, Lng] = useUrlPosition();
  const { isLoading, position, getPosition } = useGeolocation();
  // console.log(mapLat, mapLng);
  // const position =[ lat, lng ];G
  // console.log(cities);
  //同步操作
  useEffect(
    function () {
      //如果map和lng
      if (Lat && Lng) setMapPosition([Lat, Lng]);
    },
    [Lat, Lng]
  );
  useEffect(
    function () {
      //如果map和lng,hqdt
      if (position) {
        setMapPosition([position.lat, position.lng]);
        // navigate(`?lat=${position.lat}&lng=${position.lng}`);
      }
    },
    [position]
  );

  return (
    <>
      <div className={styles.mapContainer}>
        {position ? (
          <Button type="position" onClick={getPosition}>
            {isLoading ? "Loding" : "use you position"}
          </Button>
        ) : (
          ""
        )}
        <MapContainer
          className={styles.map}
          center={MapPosition}
          zoom={6}
          minZoom={3}
          maxZoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}"
          />
          {cities.map((item) => (
            <div key={item.id}>
              <Marker position={[item.position.lat, item.position.lng]}>
                <Popup>
                  <span>{item.emoji}</span>
                  <span>{item.cityName}</span>
                </Popup>
              </Marker>
            </div>
          ))}
          <ChangeCenter position={MapPosition}></ChangeCenter>
          <DetectClick></DetectClick>
        </MapContainer>
      </div>
    </>
  );
}

//平滑移动
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
//地图点击事件 ，配合移动实现点击移动
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e.latlng);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

//自定义钩子

export default Map;
