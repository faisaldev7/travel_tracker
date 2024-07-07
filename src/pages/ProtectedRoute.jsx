import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticate) navigate("/");
    },
    [isAuthenticate, navigate]
  );

  return isAuthenticate ? children : null;
}

export default ProtectedRoute;
