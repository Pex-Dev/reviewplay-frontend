export default function Input({
  inputId,
  type = "text",
  name,
  placeholder,
  onChange,
}) {
  return (
    <input
      id={inputId}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="bg-linear-to-l from-gray-800 to-gray-700 w-full p-2 rounded text-white  border-t-2 border-l-2
       border-gray-900  border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 focus:outline-1 focus:outline-blue-400"
    />
  );
}
