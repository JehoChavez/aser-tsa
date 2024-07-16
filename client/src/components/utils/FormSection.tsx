import { ReactNode } from "react";

const FormSection = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col md:flex-row mb-4 w-full">{children}</div>;
};

export default FormSection;
