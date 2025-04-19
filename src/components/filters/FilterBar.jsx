import { useState } from "react";
import { genres, tags, platforms } from "../../data/Filters";

export default function FilterBar({
  handleFilterChange,
  handleOrderChange,
  selectedGenres,
  selectedTags,
  selectedPlatforms,
  order,
  loading,
  styles = "",
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`bg-linear-65 from-gray-800 to-gray-700 border-b-2 border-r-2 border-gray-900 border-t-2 border-t-gray-600 self-start p-2 w-full md:w-[248px] overflow-hidden transition-all ${
        !expanded ? "max-h-[53px] md:max-h-[1700px]" : "max-h-[800px]"
      } ${styles}`}
    >
      <header className="flex justify-between items-center">
        <h3 className="text-white text-xl font-bold">Filtrar</h3>
        <button
          className="text-white cursor-pointer md:hidden"
          onClick={() => {
            setExpanded((prevExpanded) => !prevExpanded);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="36"
            height="36"
            strokeWidth="1.75"
          >
            <path d="M6 9l6 6l6 -6"></path>
          </svg>
        </button>
      </header>

      <section className="mt-3">
        <div className="flex flex-col mb-3">
          {/* Filtro select para ordenar */}
          <label htmlFor="sort" className="text-white">
            Ordenar por:
          </label>
          <select
            id="sort"
            className={`bg-gray-900 w-fit  rounded ${
              loading ? "text-gray-600" : "text-white"
            }`}
            onChange={(event) => {
              handleOrderChange(event.target.value);
            }}
            disabled={loading}
            value={order}
          >
            <option value="null">Por defecto</option>
            <option value="highest">Mejor valorados</option>
            <option value="lowest">Peor valorados</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>
        <h4 className="text-white">Por genero:</h4>
        <ul className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <li
              className={`flex justify-between px-1 cursor-pointer rounded ${
                selectedGenres.includes(genre.nameEn)
                  ? "bg-blue-700"
                  : "bg-gray-900"
              }`}
              key={genre.nameEn}
              onClick={() => {
                if (!loading) {
                  handleFilterChange(genre.nameEn, "genres");
                }
              }}
            >
              <span className={loading ? "text-gray-600" : "text-white"}>
                {genre.nameEs}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3">
        <h4 className="text-white">Por etiquetas</h4>
        <ul className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <li
              className={`flex justify-between px-1 cursor-pointer rounded ${
                selectedTags.includes(tag.nameEn)
                  ? "bg-blue-700"
                  : "bg-gray-900"
              }`}
              key={tag.nameEn}
              onClick={() => {
                if (!loading) {
                  handleFilterChange(tag.nameEn, "tags");
                }
              }}
            >
              <span className={loading ? "text-gray-600" : "text-white"}>
                {tag.nameEs}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-3">
        <h4 className="text-white">Por plataforma:</h4>
        <ul className="flex flex-wrap gap-1">
          {platforms.map((platform) => (
            <li
              className={`flex justify-between px-1 cursor-pointer rounded ${
                selectedPlatforms.includes(platform.id)
                  ? "bg-blue-700"
                  : "bg-gray-900"
              }`}
              key={platform.id}
              onClick={() => {
                if (!loading) {
                  handleFilterChange(platform.id, "platforms");
                }
              }}
            >
              <span className={loading ? "text-gray-600" : "text-white"}>
                {platform.name}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
