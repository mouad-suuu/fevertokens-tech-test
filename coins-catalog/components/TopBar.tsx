"use client";

import { useState, useEffect } from "react";
import { useSearchStore } from "@/store/searchStore";
import Image from "next/image";

export function TopBar() {
  const {
    searchTerm,
    setSearchTerm,
    filterField,
    setFilterField,
    priceRange,
    setPriceRange,
    percentageChangeRange,
    setPercentageChangeRange,
  } = useSearchStore();

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [localFilterField, setLocalFilterField] = useState(filterField);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [localPercentageChangeRange, setLocalPercentageChangeRange] = useState(
    percentageChangeRange
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchTerm(localSearchTerm);
      setFilterField(localFilterField);
      setPriceRange(localPriceRange);
      setPercentageChangeRange(localPercentageChangeRange);
    }, 300);

    return () => clearTimeout(debounce);
  }, [
    localSearchTerm,
    localFilterField,
    localPriceRange,
    localPercentageChangeRange,
    setSearchTerm,
    setFilterField,
    setPriceRange,
    setPercentageChangeRange,
  ]);

  return (
    <div className="flex flex-auto items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="/icon.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h3 className="ml-2 font-bold">Crypto Catalog</h3>
      </div>
      <div className="flex flex-1 max-w-xl mx-4 items-center gap-2">
        <select
          value={localFilterField}
          onChange={(e) => setLocalFilterField(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">ID</option>
          <option value="symbol">Code</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="price">Price</option>
          <option value="percentage_change">Change %</option>
        </select>
        {localFilterField !== "price" &&
          localFilterField !== "percentage_change" && (
            <div className="flex-1">
              <input
                type="text"
                placeholder={`Search by ${localFilterField}`}
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
      </div>
      {localFilterField === "price" && (
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={localPriceRange[0]}
            onChange={(e) =>
              setLocalPriceRange([Number(e.target.value), localPriceRange[1]])
            }
            className="w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localPriceRange[1]}
            onChange={(e) =>
              setLocalPriceRange([localPriceRange[0], Number(e.target.value)])
            }
            className="w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      {localFilterField === "percentage_change" && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min Change %"
            value={localPercentageChangeRange[0]}
            onChange={(e) =>
              setLocalPercentageChangeRange([
                Number(e.target.value),
                localPercentageChangeRange[1],
              ])
            }
            className="w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Change %"
            value={localPercentageChangeRange[1]}
            onChange={(e) =>
              setLocalPercentageChangeRange([
                localPercentageChangeRange[0],
                Number(e.target.value),
              ])
            }
            className="w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <div className="hidden md:block text-lg font-semibold">
        By Mouad Mennioui
      </div>
    </div>
  );
}
