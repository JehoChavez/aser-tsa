import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center opacity-50">
      <GridLoader color="navy" />
    </div>
  );
};

export default Loading;
