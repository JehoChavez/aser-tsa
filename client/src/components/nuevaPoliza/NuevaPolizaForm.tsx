import FormTextInput from "../utils/FormTextInput";

const NuevaPolizaForm = () => {
  return (
    <div className="p-2 mt-2">
      <h2 className="border-b text-xl text-gray-600 font-bold">
        Datos de la Póliza
      </h2>
      <form className="mt-2">
        <div className="grid grid-cols-5">
          <div className="px-2">
            <FormTextInput name="noPoliza" label="Número de Póliza" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NuevaPolizaForm;
