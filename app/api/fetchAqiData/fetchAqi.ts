import { useQuery } from "@tanstack/react-query";

type QueryParameter = {
  queryKey: any
}

const fetchAQIData = async ({queryKey}: QueryParameter) => {
  const[_key, parameters] = queryKey;
  const searchParams = new URLSearchParams(parameters.split('?')[1]);
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const country = searchParams.get("country");
  const apiKey = process.env.NEXT_PUBLIC_AIRVISUAL_API_KEY; 
  const url_query = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;
  
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