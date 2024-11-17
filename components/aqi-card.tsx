'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faHeadSideCough, faHeadSideMask, faMaskVentilator } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"


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

const AQICard = ({ city, onSelect}: AQICardProps) => {
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const [imageName, setImageName] = useState<string>("01d");

  const [aqiData, setAqiData] = useState<any>({
    current: {
      pollution: { aqius: 0 }, 
      weather: { tp: 0, hu: 0 }, 
    }
  });
  
  const [condition, setCondition] = useState<OutsideCondition>({
    description: "Good air quality, with little or no risk", 
    icon: faLeaf, 
  });
  

  const displayCity = city || "Lahore";
  const state = cityStateMap[displayCity] || "Punjab"; 
  const country = "Pakistan";


  const fetchAqiData = async () => {
    setError(null);
    setLoading(true);
  
    const url = `/api/fetchAqiData?city=${displayCity}&state=${state}&country=${country}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        setAqiData(data);
        setImageName(data.weatherIcon);
        const aqi = data.aqi;
  
        if (aqi <= 80) {
          setCondition({ description: "Good air quality -  little to no risk", icon: faLeaf });
        } else if (aqi > 80 && aqi <= 150) {
          setCondition({ description: "Moderate air quality - slight health concerns", icon: faHeadSideCough });
        } else if (aqi > 150 && aqi <= 300) {
          setCondition({ description: "Unhealthy air quality - health side effects", icon: faHeadSideMask });
        } else if (aqi > 300) {
          setCondition({ description: "Hazardous air quality - try to stay indoors", icon: faMaskVentilator });
        }
        onSelect(aqi);
      } else {
        setError(data.error || "Error fetching AQI data");
      }
    } catch (err) {
      setError("Error fetching AQI data.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setLoading(true);
    fetchAqiData();
  }, [city]); 

  return (
    <Card className="w-full h-48 border-black">
      <CardHeader className="gap-3">
        <CardTitle>AQI for {displayCity || "Loading..."} : {aqiData.aqi}</CardTitle>
        <CardDescription> 
          {loading ? (
            <p>...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
              aqiData && (
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
        {loading ? (
          <p>Loading AQI data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          aqiData && (
            <Badge variant="outline" className="gap-5 padding pt-1 padding pb-1">
              <Image src={"/weather/"+ imageName + ".png"} alt={"weather icon"} width={25} height={25}/>
              <p><strong> Temperature: </strong>{aqiData.weather.tp}°C</p>
              <p><strong>Humidity: </strong>{aqiData.weather.hu}%</p>
            </Badge>

          )
        )}
      </CardContent>
    </Card>
  );
};

export default AQICard;