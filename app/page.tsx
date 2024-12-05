'use client'

import { useEffect, useState } from "react";
import AQICard from "@/components/aqi-card";
import GraphCard from "@/components/graph-card";
import ImageSlideshow from "@/components/image-slideshow";
import SearchBar from "@/components/searchbar";
import Image from "next/image";
import { useAQIData } from "./api/fetchAqiData/fetchAqi";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>("Lahore");
  const [aqiValue, setAQIValue] = useState<number>(0)

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('city', city)
  };

  const { data, isLoading, error } = useAQIData(selectedCity);

  useEffect(() => {
    if (data && data.aqi !== undefined) {
      console.log("AQI Request sent for:", selectedCity);
      setAQIValue(data.aqi);
    }
  }, [data]);

  return (
  
    <div className="min-h-screen w-[80vw] flex items-center justify-center pt-20 pb-20">
      <div className="flex flex-col items-center gap-10 w-full max-w-4xl">
        <div className="flex flex-row items-center justify-center gap-5">
          <Image src="/pakistan.png" alt="Pakistan Flag" width={120} height={120} />
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl"><strong>Smog Dashboard</strong></h1>
            <p>Stay up to date with the latest information</p>
          </div>
        </div>
        <div className="w-full px-4">
          <SearchBar onCitySelect={handleCitySelect} />
        </div>
        <div className="grid grid-cols-2 gap-5 w-full">
            <AQICard city={selectedCity} />
            <ImageSlideshow />
          <div className="col-span-2">
            <GraphCard aqiNumber={aqiValue}/>
          </div>
        </div>
      </div>
    </div>
  );
}
