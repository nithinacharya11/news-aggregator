import { Article, GuardianArticle, NewsAPIArticle, NYTimesArticle } from "@/lib/types";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const fromDate = searchParams.get("from"); // Get the particular date parameter

  // Build API URLs dynamically
  const newsapiUrl = query
    ? `https://newsapi.org/v2/top-headlines?q=${query}&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

    const guardianUrl = query
    ? `https://content.guardianapis.com/search?q=${query}&${category ? `section=${category}&` : ""}api-key=${process.env.GUARDIAN_API_KEY}`
    : `https://content.guardianapis.com/search?${category ? `section=${category}&` : ""}api-key=${process.env.GUARDIAN_API_KEY}`;
  

    const nytimesUrl = query
    ? `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&${category ? `fq=section_name:("${category}")&` : ""}api-key=${process.env.NYT_API_KEY}`
    : `https://api.nytimes.com/svc/search/v2/articlesearch.json?${category ? `fq=section_name:("${category}")&` : ""}api-key=${process.env.NYT_API_KEY}`;
  

  try {
    // Fetch data from all APIs concurrently
    const [newsapiResponse, guardianResponse, nytimesResponse] = await Promise.all([
      axios.get(newsapiUrl).catch((error) => ({ data: { articles: [] }, error })),
      axios.get(guardianUrl).catch((error) => ({ data: { response: { results: [] } }, error })),
      axios.get(nytimesUrl).catch((error) => ({ data: { response: { docs: [] } }, error })),
    ]);

    // Combine and normalize articles
    let articles: Article[] = [
      ...(newsapiResponse.data.articles || []).map((item: NewsAPIArticle) => ({
        source: item.source?.name || "Unknown",
        title: item.title || "No title",
        description: item.description || "No description",
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      })),
    
      ...(guardianResponse.data.response?.results || []).map((item: GuardianArticle) => ({
        source: "The Guardian",
        title: item.webTitle || "No title",
        description: item.webTitle || "No description",
        url: item.webUrl,
        urlToImage: null,
        publishedAt: item.webPublicationDate,
      })),
    
      ...(nytimesResponse.data.response?.docs || []).map((item: NYTimesArticle) => ({
        source: item.source || "The New York Times",
        title: item.headline?.main || "No title",
        description: item.abstract || "No description",
        url: item.web_url,
        urlToImage: item.multimedia?.length
          ? `https://www.nytimes.com/${item.multimedia[0].url}`
          : null,
        publishedAt: item.pub_date,
      })),
    ];
    


    // Filter articles by the selected date
    if (fromDate) {
      const selectedDate = new Date(fromDate).toDateString();
      articles = articles.filter((article) => {
        const publishedDate = new Date(article.publishedAt).toDateString();
        return publishedDate === selectedDate; // Match the exact date
      });
    }

    // Return the filtered articles
    return Response.json({ status: "ok", articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return Response.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
