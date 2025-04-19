import { useState } from "react";

export default function InputPassword({
  inputId,
  name,
  placeholder = "Ingrese su contraseña",
  onChange,
}) {
  const eyeOpen = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32"
      height="32"
      strokeWidth="1"
    >
      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
    </svg>
  );
  const eyeClosed = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="32"
      height="32"
      strokeWidth="1"
    >
      <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4"></path>
      <path d="M3 15l2.5 -3.8"></path>
      <path d="M21 14.976l-2.492 -3.776"></path>
      <path d="M9 17l.5 -4"></path>
      <path d="M15 17l-.5 -4"></path>
    </svg>
  );

  const [type, setType] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(eyeOpen);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevPasswordVisile) => !prevPasswordVisile);

    if (passwordVisible) {
      //Ocultar password
      setEyeIcon(eyeOpen);
      setType("password");
    } else {
      //Mostrar password
      setEyeIcon(eyeClosed);
      setType("text");
    }
  };

  return (
    <div
      className="flex bg-linear-to-l from-gray-800 to-gray-700 w-full  rounded text-white  border-t-2 border-l-2 border-b-2
     border-r-2 border-b-gray-600 border-r-gray-600 border-gray-900"
    >
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="p-2 w-full rounded focus:outline-1 focus:outline-blue-400"
      />
      <button
        type="button"
        aria-label="toggle password visibility"
        tabIndex="-1"
        className="cursor-pointer px-2 text-gray-300 hover:text-white rounded"
        onClick={handleTogglePasswordVisibility}
      >
        {eyeIcon}
      </button>
    </div>
  );
}
