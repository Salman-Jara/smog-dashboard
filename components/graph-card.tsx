import React from 'react';
import AQIChart from './graph-component';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GraphCardProps {
  aqiNumber: number;
}


const GraphCard = ( { aqiNumber }: GraphCardProps) => {
  console.log("in Graph Card: ", aqiNumber)
  return (
    <Card className="relative w-full h-full border-black padding ">
      <CardHeader>
        <CardTitle>AQI and Its Impact on Health</CardTitle>
        <CardDescription>Effects of different pollution levels from healthy to hazardous</CardDescription>
      </CardHeader>
      <CardContent>
        <AQIChart currentAqi={aqiNumber} />
      </CardContent>
    </Card>
  );
};

export default GraphCard;
