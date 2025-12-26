import QuinisindicLogo from "../ui/QuinisindicLogo";
import { SearchBar } from "../ui/SearchBar";

export default function Header() {
  // logo, barra de busqueda
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md p-4 border-b border-card-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo - Tamaño fijo para que no se mueva */}
        <div className="shrink-0">
          <QuinisindicLogo />
        </div>

        {/* Barra de búsqueda - flex-1 para que ocupe el espacio disponible */}
        <div className="flex-1 max-w-xl">
          <SearchBar />
        </div>
      </div>

      {/* CATEGORÍAS (Scroll Horizontal) */}
      {/* <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
        {["Todos", "Videos", "Fotos", "Links", "Tweets"].map((cat) => (
          <button
            key={cat}
            className="whitespace-nowrap px-4 py-1 rounded-full bg-zinc-800 text-xs font-medium hover:bg-zinc-700 transition"
          >
            {cat}
          </button>
        ))}
      </div> */}
    </header>
  );
}
