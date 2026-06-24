import { Link } from "@tanstack/react-router";

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
          <Link
            to="/"
            activeOptions={{ exact: true }}
            inactiveProps={{
              className: "text-gray-700 hover:text-amber-600 transition-colors",
            }}
            activeProps={{ className: "text-amber-600" }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            search={{
              page: 1,
              filter: undefined,
              dateFrom: undefined,
              dateTo: undefined,
            }}
            inactiveProps={{
              className: "text-gray-700 hover:text-amber-600 transition-colors",
            }}
            activeOptions={{}}
            activeProps={{ className: "text-amber-600" }}
          >
            Ranking
          </Link>
        </li>
      </ul>
    </nav>
  );
};
