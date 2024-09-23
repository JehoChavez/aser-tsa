import { useContext, useState, useEffect } from "react";
import DropdownButton from "../../utils/DropdownButton";
import axios from "axios";
import SuccessModal from "../../utils/SuccessModal";
import ErrorModal from "../../utils/ErrorModal";
import { PolizasContext } from "../../../store/polizas-context";

const EliminarButton = ({ id }: { id: number }) => {
  const polizasContext = useContext(PolizasContext);

  const [refetch, setRefetch] = useState(false);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [error, setError] = useState(false);

  const deleteHandler = async () => {
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
    }
  };

  useEffect(() => {
    if (refetch) {
      polizasContext.fetchPolizas();
    }
  }, [refetch]);

  return (
    <>
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
