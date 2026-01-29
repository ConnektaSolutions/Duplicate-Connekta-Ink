import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

const AppLayout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      // If user landed on root ("/"), redirect to /home
      if (location.pathname === "/") {
        navigate("/home", { replace: true });
      }
    }, 7000); // show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen /> : <>{children}</>;
};

export default AppLayout;
