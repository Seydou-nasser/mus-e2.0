import { Link } from "react-router";

export default function Header() {
  return (
    <header>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Musée 2.0</h1>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-blue-200">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="text-white hover:text-blue-200"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-blue-200">
                À propos
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
