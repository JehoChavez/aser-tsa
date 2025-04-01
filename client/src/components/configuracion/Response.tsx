const Response = ({ results, errors }: { results: any[]; errors: any[] }) => {
  const resultsString = JSON.stringify(results, null, 2);
  const errorsString = JSON.stringify(errors, null, 2);

  return (
    <div className="w-full h-full scroll-auto p-1">
      <div className="flex flex-col h-full overflow-auto">
        <div className="flex flex-col w-full max-h-96 overflow-auto">
          <h3 className="text-lg font-semibold text-green-800">Subidos</h3>
          <pre className="bg-gray-100 p-2 rounded border border-gray-300 overflow-auto">
            {resultsString}
          </pre>
        </div>
        <div className="flex flex-col w-full max-h-96 overflow-auto mt-4">
          <h3 className="text-lg font-semibold text-red-700">Errores</h3>
          <pre className="bg-gray-100 p-2 rounded border border-gray-300 overflow-auto">
            {errorsString}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Response;
