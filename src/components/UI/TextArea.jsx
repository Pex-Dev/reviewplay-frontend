import { useEffect, useState } from "react";

export default function TextArea({
  placeholder,
  id,
  name,
  initialValue = "",
  onChange,
  charLimit = 250,
}) {
  const [text, setText] = useState(initialValue);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  return (
    <div>
      <textarea
        className="bg-linear-to-l from-gray-800 to-gray-700 w-full p-2 rounded text-white  border-t-2 border-l-2
                border-gray-900  border-b-2 border-r-2 border-b-gray-600 border-r-gray-600 h-[180px] max-h-[246px] focus:outline-1 focus:outline-blue-400"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event);
          handleTextChange(event);
        }}
        value={text}
      ></textarea>
      <p
        className={`text-right ${
          text.length > charLimit ? "text-red-500" : "text-gray-300"
        }`}
      >{`${text.length}/${charLimit}`}</p>
    </div>
  );
}
