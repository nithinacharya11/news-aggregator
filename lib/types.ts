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
  