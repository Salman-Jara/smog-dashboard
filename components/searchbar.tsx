'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";

const cities = [
  "Lahore", "Lodhran", "Mangla", "Multan","Pindi Bhattian", "Rahim Yar Khan", "Rawalpindi", "Rojhan","Sialkot",
  "Karachi", "Sukkur",
  "Peshawar", "Abbottabad", "Charsadda", "Dera Ismail Khan", "Haripur",
  "Quetta",
  "Islamabad",
  "Gilgit", "Skardu",
];

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

type SearchBarProps = {
  onCitySelect: (city: string) => void;
};

const SearchBar = ({ onCitySelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleSelectCity = (city: string) => {
    setQuery(city); 
    setFilteredCities([]); 
    onCitySelect(city); 
  };

  return (
    <div className="relative w-full">
    <div className="relative w-full">
      <FontAwesomeIcon
        icon={faLocationDot}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      />
      <Input
        type="text"
        placeholder="Search your city"
        value={query}
        onChange={handleChange}
        className="w-full pl-10" 
      />
    </div>
      {filteredCities.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg z-10">
          {filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => handleSelectCity(city)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
