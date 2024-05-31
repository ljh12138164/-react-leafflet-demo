import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRouted({ children }) {
  const { isAuther } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuther) navigate("/");
    },
    [isAuther, navigate]
  );
  return isAuther ? children : null;
}

export default ProtectedRouted;
