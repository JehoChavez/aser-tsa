import ActionButton from "./ActionButton";
import FormNumberInput from "./FormNumberInput";
import FormSelectInput from "./FormSelectInput";

const PageControls = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-double-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
            <path
              fillRule="evenodd"
              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </ActionButton>
        <ActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </ActionButton>
        <div className="w-12">
          <FormNumberInput name="page" center />
        </div>
        <ActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </ActionButton>
        <ActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chevron-double-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
            />
            <path
              fillRule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </ActionButton>
      </div>
      <div className="w-full flex justify-center mt-2">
        <div className="w-20">
          <FormSelectInput
            name="limit"
            options={[
              { value: 10, name: "10" },
              { value: 20, name: "20" },
              { value: 50, name: "50" },
              { value: 100, name: "100" },
              { value: 200, name: "200" },
              { value: 500, name: "500" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default PageControls;
