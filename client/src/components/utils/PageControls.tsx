import ActionButton from "./ActionButton";
import FormNumberInput from "./FormNumberInput";
import FormSelectInput from "./FormSelectInput";
import { ChangeEvent, useState } from "react";

const PageControls = ({
  page,
  count,
  limit,
  onPageChange,
  onLimitChange,
}: {
  page: number;
  count: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}) => {
  const [localPage, setLocalPage] = useState(page);

  const lastPage = Math.ceil(count / limit);

  const onFirst = () => {
    setLocalPage(1);
    onPageChange(1);
  };

  const onLast = () => {
    setLocalPage(lastPage);
    onPageChange(lastPage);
  };

  const onPrevious = () => {
    setLocalPage(page - 1);
    onPageChange(page - 1);
  };

  const onNext = () => {
    setLocalPage(page + 1);
    onPageChange(page + 1);
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value) || 0;

    if (val >= 0 && val <= lastPage) {
      setLocalPage(val);
    }
  };

  const onCheckClick = () => {
    onPageChange(localPage);
  };

  return (
    <div>
      <div className="flex justify-between">
        <ActionButton onClick={onFirst} disabled={page <= 1}>
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
        <ActionButton onClick={onPrevious} disabled={page <= 1}>
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
        <div className="flex">
          <FormNumberInput
            value={localPage}
            onChange={onInputChange}
            minValue={1}
            maxValue={lastPage}
            name="page"
            center
          />
          <ActionButton
            onClick={onCheckClick}
            disabled={localPage <= 0 || localPage > lastPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
            </svg>
          </ActionButton>
        </div>
        <ActionButton onClick={onNext} disabled={page >= lastPage}>
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
        <ActionButton onClick={onLast} disabled={page >= lastPage}>
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
            onSelect={(selected) => {
              onLimitChange(parseInt(selected));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageControls;
