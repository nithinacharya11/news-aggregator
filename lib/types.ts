// /lib/types.ts
export interface Article {
    source:string;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  }
  
  export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
  }

  export interface NewsAPIArticle {
    source: { name: string };
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string | null;
  }
  
  export interface GuardianArticle {
    webTitle: string;
    webUrl: string;
    webPublicationDate: string;
  }
  
  export interface NYTimesArticle {
    source: string;
    headline: { main: string };
    abstract: string;
    web_url: string;
    multimedia: { url: string }[];
    pub_date: string;
  }
  
  