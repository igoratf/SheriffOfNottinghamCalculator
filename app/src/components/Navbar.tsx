export const Navbar = () => {
  return (
    <nav className="bg-white shadow p-4 flex items-center">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold max-w-[12rem] block">
          Sheriff of Nottingham
        </span>
      </div>

      <ul className="flex space-x-6 ml-8">
        <li>
          <a
            href="#"
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-700 hover:text-amber-600 transition-colors"
          >
            Ranking
          </a>
        </li>
      </ul>
    </nav>
  );
};
