import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loading from "../components/utils/Loading";

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/check-session",
          { withCredentials: true }
        );
        const authStatus = response.data.content.isAuthenticated;
        setIsAuthenticated((prevStatus) =>
          prevStatus !== authStatus ? authStatus : prevStatus
        );
      } catch (error) {
        console.error("Error checking session", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="mt-16 flex flex-col w-full h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
