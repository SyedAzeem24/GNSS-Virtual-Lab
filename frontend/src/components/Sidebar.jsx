import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          GNSS Lab
        </h1>
      </div>

      <nav className="flex flex-col p-6 gap-4">

        <Link to="/"> Home</Link>

        <Link to="/learn"> Learn GNSS</Link>

        <Link to="/visibility">Satellite Visibility</Link>

        <Link to="/dop">DOP Analysis</Link>

        <Link to="/skyplot">Skyplot</Link>

      </nav>

    </aside>
  );
}