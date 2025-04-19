export default function Label({
  inputId,
  value,
  error,
  children,
  styles = "",
}) {
  return (
    <>
      <label
        htmlFor={inputId}
        className={`px-1 text-gray-200 text-lg ${styles}`}
      >
        {value}
      </label>
      {children}
      {error && (
        <ul
          className={`p-1 rounded text-white mt-2 ${
            error
              ? "bg-gradient-to-l from-red-700 to-red-600 border border-red-400"
              : ""
          }`}
        >
          {error
            ? error.map((error, index) => <li key={index}> {error} </li>)
            : ""}
        </ul>
      )}
    </>
  );
}
