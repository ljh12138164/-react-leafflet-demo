import { useSearchParams } from "react-router-dom";
/**
 @returns:lat和lng的url
 * */
function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const Lat = searchParams.get("lat");
  const Lng = searchParams.get("lng");
  return [Lat, Lng];
}

export default useUrlPosition;
