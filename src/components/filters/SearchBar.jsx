import React, { useEffect, useState } from "react";

export default function SearchBar({
  searchValue,
  handleSearch,
  placeholder,
  styles,
  id = "search",
}) {
  const [searchValueLocal, setSearchValueLocal] = useState("");

  //Obtener lo que ingreso el usuario
  const handleInputChange = (event) => {
    setSearchValueLocal(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchValueLocal);
  };

  useEffect(() => {
    setSearchValueLocal(searchValue ? searchValue : "");
  }, [searchValue]);

  return (
    <form
      className={`flex items-center w-full ${styles}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id={id}
        className="w-full h-12 bg-gray-700 py-2 px-2 border-b-2 border-gray-900 rounded-tl-lg rounded-bl-lg text-white focus:outline-none"
        placeholder={placeholder}
        value={searchValueLocal}
        onInput={handleInputChange}
      />
      <button
        type="submit"
        className="py-1 h-12 px-4 rounded-tr-lg rounded-br-lg border-b-2 border-blue-950 bg-blue-800 text-white cursor-pointer transition-colors hover:bg-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="24"
          strokeWidth="2.5"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
      </button>
    </form>
  );
}
