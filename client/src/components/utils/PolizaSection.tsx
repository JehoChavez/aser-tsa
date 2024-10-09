import { ReactNode } from "react";

const PolizaSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col md:flex-row my-4 w-full">{children}</div>;
};

export default PolizaSection;
