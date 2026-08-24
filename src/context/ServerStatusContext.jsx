import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";

const ServerStatusContext = createContext(null);

export const ServerStatusProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState("checking");

  const [bannerClosed, setBannerClosed] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    const checkServer = async () => {
      timerRef.current = setTimeout(() => {
        setServerStatus("waking");
      }, 5000);

      try {
        await axios.get(
          `${import.meta.env.VITE_BACK_END_URL}/ping`,
          {
            withCredentials: true,
          }
        );

        clearTimeout(timerRef.current);

        setServerStatus("ready");
      } catch (error) {
        clearTimeout(timerRef.current);

        setServerStatus("ready");

        console.error("Ping request failed:", error);
      }
    };

    checkServer();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const closeBanner = () => {
    setBannerClosed(true);
  };

  const openBanner = () => {
    setBannerClosed(false);
  };

  return (
    <ServerStatusContext.Provider
      value={{
        serverStatus,
        bannerClosed,
        closeBanner,
        openBanner,
      }}
    >
      {children}
    </ServerStatusContext.Provider>
  );
};

export const useServerStatus = () => {
  return useContext(ServerStatusContext);
};