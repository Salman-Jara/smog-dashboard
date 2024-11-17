'use client'

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";


const ImageSlideshow = () => {

  const [news, setNews] = useState({
      title: "Pictures from space show mighty smog choking Lahore",
      imageSrc: "https://ichef.bbci.co.uk/news/1024/branded_news/dfac/live/77f149a0-9dc3-11ef-935d-3107d1c873e8.jpg",
      url: "https://www.bbc.com/news/articles/cm20k76d5xno"
  });
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const apiKey = 'f448d8f760cb4fa8b7595fe1400d8389'

  const fetchNews = async () => {
    setError(null);
    setLoading(true)
    
    const url = "/api/fetchNewsData"

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok){
        setNews(data)
      } 
      else{
        setError(data.error || "Error fetching news dataa")
      }
    }
    catch(err){
      setError("Error fetching newsData")
    }
    finally
    {
      setLoading(false)
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNews();
  }, []);
  
  return (
    <Link href={news.url} target="_blank">
      <Card className="w-full h-48 border-black relative overflow-hidden rounded-md cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${news.imageSrc})`,
          }}
        ></div>
  
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  
        <div className="absolute bottom-0 w-full text-white p-4">
          <CardTitle className="text-sm text-white">Latest News</CardTitle>
          <CardTitle className="text-lg font-bold">{news.title}</CardTitle>
        </div>
      </Card>
    </Link>
  );
  
  
};

export default ImageSlideshow;