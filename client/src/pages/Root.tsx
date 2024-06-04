import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/check-session",
          { withCredentials: true }
        );
        // Only update state if it has changed
        const authStatus = response.data.data.isAuthenticated;
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

  console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;
