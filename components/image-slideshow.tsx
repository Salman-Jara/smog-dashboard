'use client'

import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { useNewsData } from "@/app/api/fetchNewsData/route";

const ImageSlideshow = () => {

  const [title, setTitle] = useState<string>("Pictures from space show mighty smog choking Lahore")
  const [imageSrc, setImageSrc] = useState<string>("https://ichef.bbci.co.uk/news/1024/branded_news/dfac/live/77f149a0-9dc3-11ef-935d-3107d1c873e8.jpg")
  const [url, setUrl] = useState<string>("https://www.bbc.com/news/articles/cm20k76d5xno")

  const { data, isLoading, error } = useNewsData();

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setImageSrc(data.imageSrc)
      setUrl(data.url)
    }
  }, [data]);
  
  return (
    <Link href={url} target="_blank">
      <Card className="w-full h-48 border-black relative overflow-hidden rounded-md cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        ></div>
  
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
  
        <div className="absolute bottom-0 w-full text-white p-4">
          <CardTitle className="text-sm text-white">Latest News</CardTitle>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
      </Card>
    </Link>
  );
  
  
};

export default ImageSlideshow;