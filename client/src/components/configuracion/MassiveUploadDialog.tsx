import { useState } from "react";
import Modal from "../utils/Modal";
import ActionButton from "../utils/ActionButton";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

const MassiveUploadDialog = ({
  type,
  onClose,
}: {
  type: "aseguradoras" | "agentes" | "vendedores" | "ramos";
  onClose: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleFormSubmission = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    if (!file) return;

    try {
      setIsLoading(true);

      const uploadData = new FormData();
      uploadData.append("file", file);

      const request = await axios.post(
        `http://localhost:3000/api/${type}/upload`,
        uploadData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type
          },
        }
      );
      setResponse(request.data.content);
    } catch (error) {
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

  return (
    <Modal size="small" closeBtn onClose={onClose}>
      <h3 className="text-2xl bg-blue-950 text-neutral-50 rounded p-2">
        Carga masiva de {type}
      </h3>
      <form
        className="h-full flex flex-col justify-between items-center p-2"
        onSubmit={handleFormSubmission}
      >
        <div className="flex flex-col h-full justify-center items-center">
          <input
            type="file"
            accept=".csv"
            name="file"
            id="file"
            className="p-1"
            required
          />
        </div>
        <div className="w-full flex justify-end">
          <ActionButton size="lg" color="blue">
            Subir
          </ActionButton>
        </div>
      </form>
    </Modal>
  );
};

export default MassiveUploadDialog;
