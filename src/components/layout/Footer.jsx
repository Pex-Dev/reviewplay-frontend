export default function Footer() {
  return (
    <footer className="relative container mx-auto flex h-30 mt-20">
      <div className="bg-gradient-to-l from-gray-900 to-gray-950 w-1/2 h-full"></div>
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 w-1/2 h-full"></div>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-100">ReviewPlay</p>
          <p className="text-cyan-100"> &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
