import { ClienteInterface } from "../../types/interfaces";

const ClienteInfo = ({ cliente }: { cliente: ClienteInterface }) => {
  let nacimiento: string | undefined;
  if (cliente.nacimiento) {
    const [year, month, day] = cliente.nacimiento.split("-");
    nacimiento = `${day}-${month}-${year}`;
  }

  return (
    <div className="bg-neutral-100 p-2 rounded">
      <h3 className="text-xl font-semibold text-neutral-800">
        Datos del cliente
      </h3>
      <div className="flex flex-col md:flex-row w-full p-2 text-neutral-700">
        <div className="md:w-1/3 m-1">
          <p>Tipo: Persona {cliente?.tipoPersona}</p>
          <p>
            {cliente.tipoPersona === "fisica"
              ? "Fecha de nacimiento:"
              : "Fecha de constitución:"}{" "}
            {nacimiento}
          </p>
          <p>RFC: {cliente.rfc}</p>
          <p>Empresa: {cliente.empresa}</p>
          <p>
            Correo:{" "}
            <a href={`mailto:${cliente.correo}`} className="underline">
              {cliente.correo}
            </a>
          </p>
          <p>Teléfono: {cliente.telefono}</p>
        </div>
        <div className="md:w-1/3 m-1">
          <p>Calle: {cliente.calle}</p>
          <p>Exterior: {cliente.exterior}</p>
          <p>Interior: {cliente.interior}</p>
          <p>Colonia: {cliente.colonia}</p>
          <p>CP: {cliente.codigoPostal}</p>
          <p>Estado: {cliente.estado?.estado}</p>
          <p>Municipio: {cliente.municipio?.municipio}</p>
        </div>
        <div className="md:w-1/3 m-1 flex flex-col">
          <h4 className="font-semibold">Comentarios:</h4>
          <p className="bg-neutral-50 w-full h-full p-1 rounded overflow-y-auto">
            {cliente.comentarios}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
