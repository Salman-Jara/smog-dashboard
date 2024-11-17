import { NextResponse } from "next/server";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const state = searchParams.get("state");
  const country = searchParams.get("country");
  const apiKey = process.env.AIRVISUAL_API_KEY; 
  const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "success") {
      const aqi = parseInt(data.data.current.pollution.aqius, 10);
      const icon = data.data.current.weather.ic;

      return NextResponse.json({
        aqi,
        weatherIcon: icon,
        pollution: data.data.current.pollution,
        weather: data.data.current.weather,
      });
    } else {
      return NextResponse.json({ error: "Error fetching AQI data" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 });
  }
}
