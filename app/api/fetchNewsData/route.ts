import { NextResponse } from "next/server";

const generateRandomNumber = () => {
    return Math.ceil(Math.random() * 51); 
  };
  

export async function GET(req: any) {
    const apiKey = process.env.NEWS_API_KEY
    const url = `https://newsapi.org/v2/everything?q=smog%20in%20pakistan&apiKey=${apiKey}`;

    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.status === "ok"){
            const firstArticle = data.articles[generateRandomNumber()];
            return NextResponse.json({
                title: firstArticle.title,
                imageSrc: firstArticle.urlToImage,
                url: firstArticle.url,
            });
        }
        else{
            return NextResponse.json({ error: "Error fetching News data" }, { status: 400 });
        }
    } catch(err){
        return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 });
    }

}