'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faHeadSideCough, faHeadSideMask, faMaskVentilator } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { useAQIData } from '@/app/api/fetchAqiData/fetchAqi';

type AQICardProps = {
  city: string;
};

const AQICard = ({ city }: AQICardProps) => {
  const displayCity = city || "Lahore";
  const { data, isLoading, error } = useAQIData(displayCity);
  const imageName = data?.weatherIcon || "01d";
  const condition = (() => {
    if (!data) {
      return {
        description: "Good air quality, with little or no risk", 
        icon: faLeaf, 
      };
    }
    if (data.aqi <= 50) {
      return { description: "Good air quality", icon: faLeaf };
    } else if (data.aqi <= 100) {
      return { description: "Moderate air quality", icon: faHeadSideCough };
    } else if (data.aqi <= 150) {
      return { description: "Unhealthy for sensitive groups", icon: faHeadSideMask };
    } else {
      return { description: "Unhealthy air quality", icon: faMaskVentilator };
    }
  })();

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