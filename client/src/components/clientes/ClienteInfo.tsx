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
          <div>
            <p className="inline-block font-semibold mr-1">Tipo:</p>
            <p className="inline-block">Persona {cliente?.tipoPersona}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">
              {cliente.tipoPersona === "fisica"
                ? "Fecha de nacimiento:"
                : "Fecha de constitución:"}
            </p>
            <p className="inline-block">{nacimiento}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">RFC:</p>
            <p className="inline-block">{cliente.rfc}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Empresa:</p>
            <p className="inline-block">{cliente.empresa}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Correo:</p>
            <p className="inline-block">
              <a href={`mailto:${cliente.correo}`} className="underline">
                {cliente.correo}
              </a>
            </p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Teléfono:</p>
            <p className="inline-block">{cliente.telefono}</p>
          </div>
        </div>
        <div className="md:w-1/3 m-1">
          <div>
            <p className="inline-block font-semibold mr-1">Calle:</p>
            <p className="inline-block">{cliente.calle}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Exterior:</p>
            <p className="inline-block">{cliente.exterior}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Interior:</p>
            <p className="inline-block">{cliente.interior}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Colonia:</p>
            <p className="inline-block">{cliente.colonia}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Código Postal:</p>
            <p className="inline-block">{cliente.codigoPostal}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Estado:</p>
            <p className="inline-block">{cliente.estado?.estado}</p>
          </div>
          <div>
            <p className="inline-block font-semibold mr-1">Municipio:</p>
            <p className="inline-block">{cliente.municipio?.municipio}</p>
          </div>
        </div>
        <div className="md:w-1/3 m-1 flex flex-col">
          <h4 className="font-semibold">Comentarios:</h4>
          <p className="bg-neutral-50 w-full h-40 p-1 rounded overflow-y-auto">
            {cliente.comentarios}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClienteInfo;
