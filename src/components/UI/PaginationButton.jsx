export default function PaginationButton({ page, text, onClick }) {
  return (
    <button
      className={`flex items-center space-x-1 rounded-3xl p-2 font-medium uppercase text-sm    ${
        page == null || page < 1
          ? "bg-gray-800"
          : "bg-white hover:bg-gray-100 cursor-pointer "
      }`}
      onClick={onClick}
      disabled={page == null || page < 1}
    >
      {text}
    </button>
  );
}
