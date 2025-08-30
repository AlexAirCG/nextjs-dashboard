"use client";

import { CustomerFieldCities, InvoiceFormBaty } from "@/app/lib/definitions";
import { SunIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateBaty } from "@/app/lib/actions";

export default function EditBaty({
  weather,
  citys,
}: {
  weather: InvoiceFormBaty;
  citys: CustomerFieldCities[];
}) {
  const updateWeatherWithIdBaty = updateBaty.bind(null, weather.id);
  return (
    <form action={updateWeatherWithIdBaty}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="city"
              name="city"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={weather.city}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {citys.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="temp"
                name="temp"
                type="number"
                step="0.01"
                defaultValue={weather.temp}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <SunIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
