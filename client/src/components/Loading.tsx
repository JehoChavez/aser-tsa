import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <GridLoader color="navy" />
    </div>
  );
};

export default Loading;
