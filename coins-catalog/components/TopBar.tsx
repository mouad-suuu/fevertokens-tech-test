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
    <div className="bg-white shadow-md p-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center">
        <Image
          src="/icon.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h3 className="ml-2 font-bold text-lg">Crypto Catalog</h3>
      </div>
      <div className="mt-4 md:mt-0 md:flex md:flex-1 md:max-w-xl md:mx-4 md:items-center md:gap-2">
        <select
          value={localFilterField}
          onChange={(e) => setLocalFilterField(e.target.value)}
          className="w-full md:w-auto px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <div className="flex-1 mt-4 md:mt-0 md:ml-4">
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
        <div className="flex mt-4 md:mt-0 md:items-center md:justify-center md:gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={localPriceRange[0]}
            onChange={(e) =>
              setLocalPriceRange([Number(e.target.value), localPriceRange[1]])
            }
            className="w-full md:w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={localPriceRange[1]}
            onChange={(e) =>
              setLocalPriceRange([localPriceRange[0], Number(e.target.value)])
            }
            className="w-full md:w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      {localFilterField === "percentage_change" && (
        <div className="flex mt-4 md:mt-0 md:items-center md:gap-2">
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
            className="w-full md:w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full md:w-36 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <div className="hidden md:block text-lg font-semibold mt-4 md:mt-0">
        By Mouad Mennioui
      </div>
    </div>
  );
}
