import { ReactNode } from "react";

const LabelAndData = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <span>
        <p>{label}</p>
      </span>
      {children}
    </div>
  );
};

export default LabelAndData;
