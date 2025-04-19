import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Container({ children }) {
  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
      <NavBar />
      <div className="container mx-auto p-1 md:p-3 grow">{children}</div>
      <Footer />
    </div>
  );
}
