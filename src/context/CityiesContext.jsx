import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
const URL = "http://localhost:8000";

function reduce(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: false, cities: action.payload };
    case "loading":
      return { ...state, isLoading: true };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/current":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/deleted":
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((i) => i.id !== action.payload),
      };
    case "reject":
      return { ...state, isLoading: false, error: action.payload };
  }
}
const init = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
const CitiesContext = createContext();
function CityiesContext({ children }) {
  const [state, dispatch] = useReducer(reduce, init);
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  //获取城市列表
  const { cities, isLoading, currentCity } = state;
  useEffect(function () {
    async function fect() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        // setCities(() => data);
        dispatch({ type: "cities/loading", payload: data });
      } catch (err) {
        console.error("flase fetch");
        dispatch({ type: "reject", payload: err });
        // throw new Error("flase");
      }
    }
    fect();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      //优化，当id相同时就不会重新变化
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "cities/current", payload: data });
      } catch (err) {
        console.error("flase fetch");
        dispatch({ type: "reject", payload: err });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });
      // console.log(data);
    } catch (err) {
      dispatch({ type: "reject", payload: err });
      throw new Error("flase");
    }
  }
  async function delectCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "cities/deleted",
        payload: id,
      });
      // console.log(data);
      // console.log(data);
    } catch (err) {
      dispatch({ type: "reject" });
      throw new Error("flase");
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        createCity,
        cities,
        isLoading,
        currentCity,
        getCity,
        delectCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function usePost() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("flase to fetch Post");
  return context;
}
export { CityiesContext, usePost };
