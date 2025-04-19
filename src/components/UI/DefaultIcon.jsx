export default function DefaultIcon({
  styles = "w-[160px] h-[160px] ",
  iconSize = 60,
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full shadow bg-cyan-700 overflow-hidden ${styles}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width={iconSize}
        height={iconSize}
      >
        <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z"></path>
        <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"></path>
      </svg>
    </div>
  );
}
