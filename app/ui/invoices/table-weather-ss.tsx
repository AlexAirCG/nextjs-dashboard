import { fetchWeatherss } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import {
  DeleteInvoice,
  DeleteWeather,
  UpdateInvoice,
  UpdateInvoiceBaty,
} from "./buttons";

export default async function TableWeatherss({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const weathers = await fetchWeatherss(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-300 mt-4 p-2 md:pt-0">
          <div className="md:hidden">
            {weathers.map((weather, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div>
                  <div className="mb-2 flex items-center">
                    <p>{weather.city}</p>
                  </div>
                  <p className="text-sm text-gray-500">{weather.temp}</p>
                  <p className="text-sm text-gray-500">
                    {formatDateToLocal(weather.date)}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <UpdateInvoiceBaty id={weather.id} />
                  <DeleteWeather id={weather.id} />
                </div>
              </div>
            ))}
          </div>

          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  City
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Temp
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {weathers.map((weather, index) => (
                <tr key={index} className="w-full border-b py-3 text-sm">
                  <td className="whitespace-nowrap px-3 py-3">
                    {weather.city}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {weather.temp}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(weather.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoiceBaty id={weather.id} />
                      <DeleteWeather id={weather.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full h-7 bg-amber-600"></div>
        </div>
      </div>
    </div>
  );
}
