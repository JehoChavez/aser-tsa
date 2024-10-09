import { ReactNode } from "react";

const LabelAndData = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-neutral-100 p-1 rounded text-neutral-500 w-full">
      <p className="border-b border-neutral-300 mb-1">{label}</p>
      <span className="px-1 text-neutral-700">{children}</span>
    </div>
  );
};

export default LabelAndData;
