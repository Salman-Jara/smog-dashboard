'use client'

import React from 'react'
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faHeadSideCough, faHeadSideMask, faMaskVentilator } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { useAQIData } from '@/app/api/fetchAqiData/fetchAqi';

const cityStateMap: Record<string, string> = {
  "Lahore": "punjab",
  "Lodhran": "Punjab",
  "Mangla": "Punjab",
  "Multan": "Punjab",
  "Pindi Bhattian": "Punjab",
  "Rahim Yar Khan": "Punjab",
  "Rawalpindi": "Punjab",
  "Rojhan": "Punjab",
  "Sialkot": "Punjab",
  "Karachi": "sindh",
  "Sukkur": "sindh",
  "Peshawar": "Khyber Pakhtunkhwa",
  "Abbottabad": "Khyber Pakhtunkhwa",
  "Charsadda": "Khyber Pakhtunkhwa",
  "Dera Ismail Khan": "Khyber Pakhtunkhwa",
  "Haripur": "Khyber Pakhtunkhwa",
  "Quetta": "Balochistan",
  "Islamabad": "Islamabad",
  "Gilgit": "Gilgit-Baltistan",
  "Skardu": "Gilgit-Baltistan",
};

type AQICardProps = {
  city: string;
  onSelect: (aqi: number) => void;
};

type OutsideCondition = {
  description: string;
  icon: any;
}

type AQIData = {
  aqi: number;
  weather: {
    tp: number;
    hu: number;
  };
}

const AQICard = ({ city, onSelect}: AQICardProps) => {
  const [imageName, setImageName] = useState<string>("01d");
  const [condition, setCondition] = useState<OutsideCondition>({
    description: "Good air quality, with little or no risk", 
    icon: faLeaf, 
  });

  const displayCity = city || "Lahore";
  const state = cityStateMap[displayCity] || "Punjab"; 
  const country = "Pakistan";

  const { data, isLoading, error } = useAQIData(
    `/api/fetchAqiData?city=${displayCity}&state=${state}&country=${country}`
  );

  useEffect(() => {
    if (data) {
      setImageName(data.weatherIcon || "01d");
      
      if (data.aqi <= 50) 
        {
        setCondition({ description: "Good air quality", icon: faLeaf });
      } else if (data.aqi <= 100) {
        setCondition({ description: "Moderate air quality", icon: faHeadSideCough });
      } else if (data.aqi <= 150) {
        setCondition({ description: "Unhealthy for sensitive groups", icon: faHeadSideMask });
      } else {
        setCondition({ description: "Unhealthy air quality", icon: faMaskVentilator });
      }

      onSelect(data.aqi);
    }
  }, [data, onSelect]);
  
  return (
    <Card className="w-full h-48 border-black">
      <CardHeader className="gap-3">
        <CardTitle>AQI for {displayCity || "Loading..."} : {data?.aqi}</CardTitle>
        <CardDescription> 
          {isLoading ? (
            <p>...</p>
          ) : error ? (
            <p className="text-red-500">{error.message}</p>
          ) : (
              data && (
              <Badge variant="destructive" className="gap-5 padding pt-2 padding pb-2">
                <FontAwesomeIcon icon={condition.icon} />
                <p className="text-sm">{condition.description}</p>
              </Badge>
            )
          )
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading AQI data...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          data && (
            <Badge variant="outline" className="gap-5 padding pt-1 padding pb-1">
              <Image src={"/weather/"+ imageName + ".png"} alt={"weather icon"} width={25} height={25}/>
              <p><strong> Temperature: </strong>{data?.weather?.tp}°C</p>
              <p><strong>Humidity: </strong>{data?.weather?.hu}%</p>
            </Badge>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default AQICard;