import { useState } from "react";
import { SearchInputInterface } from "../../types/interfaces";

const SearchInput = ({ placeholder, onSearch }: SearchInputInterface) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="flex w-full"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value);
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        className="h-8 w-full border border-blue-950 border-opacity-50 bg-blue-500 bg-opacity-5 rounded px-2"
      />
      <button
        className="bg-blue-950 rounded text-neutral-100 hover:bg-indigo-950 px-2"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;
