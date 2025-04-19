export default function Button({
  text,
  onClick,
  disabled = false,
  type = "submit",
}) {
  return (
    <button
      className={`text-center w-full space-x-1 bg-linear-to-r  rounded py-2.5 text-white font-medium
         uppercase text-sm  transition-colors
         ${
           disabled
             ? "cursor-not-allowed text-gray-500 from-cyan-800 to-blue-900 hover:from-cyan-800  hover:to-blue-900"
             : "cursor-pointer from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-800"
         }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
}
