export default function Home() {
  return (
    <div>

      <h1 className="text-5xl font-bold text-slate-800">
        Welcome to GNSS Virtual Laboratory
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        Learn • Simulate • Analyze • Visualize
      </p>

      <div className="grid grid-cols-2 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold">
            Learn GNSS
          </h2>

          <p className="mt-2 text-gray-500">
            Interactive educational modules.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold">
            Satellite Visibility
          </h2>

          <p className="mt-2 text-gray-500">
            View visible satellites.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold">
            DOP Analysis
          </h2>

          <p className="mt-2 text-gray-500">
            Analyze positioning quality.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold">
            Skyplot
          </h2>

          <p className="mt-2 text-gray-500">
            Visualize satellites on a skyplot.
          </p>
        </div>

      </div>

    </div>
  );
}