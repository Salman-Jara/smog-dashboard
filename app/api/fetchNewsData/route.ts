import { useQuery } from "@tanstack/react-query";


const generateRandomNumber = () => {
    return Math.ceil(Math.random() * 51); 
  };
  

const fetchNewsData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
    const url = `https://newsapi.org/v2/everything?q=smog%20in%20pakistan&apiKey=${apiKey}`;
    console.log("fetching news data")
    const response = await fetch(url)
    const data = await response.json()

    if (data.status === "ok"){
        const firstArticle = data.articles[generateRandomNumber()];
        return {
            title: firstArticle.title,
            imageSrc: firstArticle.urlToImage,
            url: firstArticle.url,
        };
    }
    throw new Error("Error fetching News data")
}


export const useNewsData = () => {
    return useQuery({queryKey: ['news'], queryFn: fetchNewsData})
}