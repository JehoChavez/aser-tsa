import { useContext, useState, useEffect } from "react";
import DropdownButton from "../../utils/DropdownButton";
import axios, { AxiosError } from "axios";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";
import { PolizasContext } from "../../../store/polizas-context";
import { Navigate } from "react-router-dom";
import Loading from "../../utils/Loading";

const EliminarButton = ({ id }: { id: number }) => {
  const polizasContext = useContext(PolizasContext);

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const [refetch, setRefetch] = useState(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/polizas/${id}`,
        { withCredentials: true }
      );
      if (response.data.status === 200) {
        setDeleteSuccess(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  useEffect(() => {
    if (refetch) {
      polizasContext.fetchPolizas();
    }
  }, [refetch]);

  return (
    <>
      {isLoading && <Loading />}
      <DropdownButton onClick={deleteHandler}>Eliminar</DropdownButton>
      {error && (
        <ErrorModal
          onClick={() => {
            setError(false);
          }}
        />
      )}
      {deleteSuccess && (
        <SuccessModal
          type="eliminada"
          onOk={() => {
            setRefetch(true);
          }}
        />
      )}
    </>
  );
};

export default EliminarButton;
