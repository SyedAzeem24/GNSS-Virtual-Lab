import { useState } from "react";
import axios from "axios";

function Visibility() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [height, setHeight] = useState("");

  const [selectedLocation, setSelectedLocation] =
    useState("Custom Coordinates");

  const [satellites, setSatellites] = useState([]);

  const locations = [
    {
      name: "Custom Coordinates",
      latitude: "",
      longitude: "",
      height: "",
    },
    {
      name: "Islamabad",
      latitude: 33.6844,
      longitude: 73.0479,
      height: 540,
    },
    {
      name: "Karachi",
      latitude: 24.8607,
      longitude: 67.0011,
      height: 8,
    },
    {
      name: "Lahore",
      latitude: 31.5204,
      longitude: 74.3587,
      height: 217,
    },
    {
      name: "Peshawar",
      latitude: 34.0151,
      longitude: 71.5249,
      height: 331,
    },
    {
      name: "Quetta",
      latitude: 30.1798,
      longitude: 66.9750,
      height: 1680,
    },
    {
      name: "Gilgit",
      latitude: 35.9208,
      longitude: 74.3142,
      height: 1500,
    },
    {
      name: "Skardu",
      latitude: 35.2971,
      longitude: 75.6337,
      height: 2228,
    },
  ];

  const fetchVisibility = async (lat, lon, h) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/visibility/",
        {
          latitude: Number(lat),
          longitude: Number(lon),
          height: Number(h),
        }
      );

      setSatellites(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVisibility(latitude, longitude, height);
  };

  const handleLocationChange = async (e) => {
    const city = locations.find(
      (location) => location.name === e.target.value
    );

    setSelectedLocation(city.name);

    setLatitude(city.latitude);
    setLongitude(city.longitude);
    setHeight(city.height);

    if (city.name !== "Custom Coordinates") {
      await fetchVisibility(
        city.latitude,
        city.longitude,
        city.height
      );
    }
  };

  const visibleSatellites = satellites.filter(
    (sat) => sat.visible
  );

  const hiddenSatellites = satellites.filter(
    (sat) => !sat.visible
  );

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Satellite Visibility
      </h1>

      {/* Form + Summary */}

      <div className="grid grid-cols-2 gap-8 mb-10">

        {/* Receiver Card */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Receiver Coordinates
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="font-medium">
                Latitude
              </label>
<div>
  <label className="font-medium">
    Preset Location
  </label>

  <select
    value={selectedLocation}
    onChange={handleLocationChange}
    className="w-full mt-2 border rounded-lg p-3"
  >
    {locations.map((location) => (
      <option
        key={location.name}
        value={location.name}
      >
        {location.name}
      </option>
    ))}
  </select>
</div>
<div>
  <label className="font-medium">
    Preset Location
  </label>

  <select
    value={selectedLocation}
    onChange={handleLocationChange}
    className="w-full mt-2 border rounded-lg p-3"
  >
    {locations.map((location) => (
      <option
        key={location.name}
        value={location.name}
      >
        {location.name}
      </option>
    ))}
  </select>
</div>
              <input
  type="number"
  step="any"
  value={latitude}
  disabled={selectedLocation !== "Custom Coordinates"}
  onChange={(e) => setLatitude(e.target.value)}
  className="w-full mt-2 border rounded-lg p-3"
  placeholder="Enter Latitude"
  required
/>
</div>
<div>
      <input
  type="number"
  step="any"
  value={longitude}
  disabled={selectedLocation !== "Custom Coordinates"}
  onChange={(e) => setLongitude(e.target.value)}
  className="w-full mt-2 border rounded-lg p-3"
  placeholder="Enter Longitude"
  required
/>      
</div>
            <div>
              <input
  type="number"
  value={height}
  disabled={selectedLocation !== "Custom Coordinates"}
  onChange={(e) => setHeight(e.target.value)}
  className="w-full mt-2 border rounded-lg p-3"
  placeholder="Enter Height"
  required
/>
            </div>

            <button
  type="submit"
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
>
  Refresh Results
</button>

          </form>

        </div>

        {/* Summary Card */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Visibility Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-2">
              <span>Total Satellites</span>
              <span className="font-bold">{satellites.length}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-green-600">
                Visible
              </span>

              <span className="font-bold text-green-600">
                {visibleSatellites.length}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-red-600">
                Hidden
              </span>

              <span className="font-bold text-red-600">
                {hiddenSatellites.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Receiver Height</span>
              <span className="font-bold">
                {height || "-"} m
              </span>
            </div>

          </div>

        </div>

      </div>

      {satellites.length > 0 && (
        <>

          {/* Visible Table */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-10">

            <h2 className="text-2xl font-semibold text-green-700 mb-5">
              Visible Satellites
            </h2>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-green-600 text-white">

                  <tr>
                    <th className="p-3">Satellite</th>
                    <th className="p-3">Azimuth</th>
                    <th className="p-3">Elevation</th>
                    <th className="p-3">Distance</th>
                  </tr>

                </thead>

                <tbody>

                  {visibleSatellites.map((sat) => (

                    <tr
                      key={sat.satellite}
                      className="border-b hover:bg-green-50"
                    >

                      <td className="p-3 text-center">
                        {sat.satellite}
                      </td>

                      <td className="p-3 text-center">
                        {sat.azimuth.toFixed(1)}°
                      </td>

                      <td className="p-3 text-center">
                        {sat.elevation.toFixed(1)}°
                      </td>

                      <td className="p-3 text-center">
                        {sat.distance.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}{" "}
                        m
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* Hidden Table */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-semibold text-red-700 mb-5">
              Hidden Satellites
            </h2>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-red-600 text-white">

                  <tr>
                    <th className="p-3">Satellite</th>
                    <th className="p-3">Azimuth</th>
                    <th className="p-3">Elevation</th>
                    <th className="p-3">Distance</th>
                  </tr>

                </thead>

                <tbody>

                  {hiddenSatellites.map((sat) => (

                    <tr
                      key={sat.satellite}
                      className="border-b hover:bg-red-50"
                    >

                      <td className="p-3 text-center">
                        {sat.satellite}
                      </td>

                      <td className="p-3 text-center">
                        {sat.azimuth.toFixed(1)}°
                      </td>

                      <td className="p-3 text-center">
                        {sat.elevation.toFixed(1)}°
                      </td>

                      <td className="p-3 text-center">
                        {sat.distance.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}{" "}
                        m
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default Visibility;