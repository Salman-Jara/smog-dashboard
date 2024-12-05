import { useQuery } from "@tanstack/react-query";
import { cityStateMap } from "@/app/cityState";

type QueryParameter = {
  queryKey: any
}

const fetchAQIData = async ({queryKey}: QueryParameter) => {
  const[_key, parameters] = queryKey;
  const city = parameters;
  const state = cityStateMap[city]
  const apiKey = process.env.NEXT_PUBLIC_AIRVISUAL_API_KEY; 
  const url_query = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=Pakistan&key=${apiKey}`;
  
  const response = await fetch(url_query);
  const data = await response.json();

  if(data.status === "success"){
    return {
      aqi: parseInt(data.data.current.pollution.aqius, 10),
      weatherIcon: data.data.current.weather.ic,
      pollution: data.data.current.pollution,
      weather: data.data.current.weather,
    };
  }
  
  throw new Error("Error fetching AQI data");
}

export const useAQIData = ( AQIRequest: string ) => {
  console.log("custom hook called: ", AQIRequest)
  return useQuery({queryKey: ['aqi', AQIRequest], queryFn: fetchAQIData})
}