const Response = ({ results, errors }: { results: any[]; errors: any[] }) => {
  return (
    <div className="w-full h-full scroll-auto">
      <p>Subidos: {results.length}</p>
      <p>Errores: {errors.length}</p>
    </div>
  );
};

export default Response;
