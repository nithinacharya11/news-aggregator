"use client";
import NewsCard from "@/components/NewsCard";
import { Article, NewsResponse } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);
  const [source, setSource] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sourceOptions, setSourceOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");

  const categoryOptions = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const query = {
      query: searchQuery,
      category: category,
      from: fromDate,
    };
    axios
      .get<NewsResponse>("/api/combined-articles", { params: query })
      .then((res) => {
        setArticles(res.data.articles);
        setVisibleArticles(res.data.articles);
        const opt = res.data.articles.map((item) => item.source).filter((source) => source !== "[Removed]");
        setSourceOptions([...new Set(opt)]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [category,fromDate]); // Trigger fetch when fromDate changes

  const handleSourceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(e.target.value);
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const query = {
      query: searchQuery,
      category: category,
      from: fromDate,
    };

    try {
      const response = await axios.get<NewsResponse>("/api/combined-articles", {
        params: query,
      });

      const articles = response.data.articles || [];
      setArticles(articles);
      setVisibleArticles(articles);

      const sources = articles.map((item) => item.source || "Unknown").filter((source) => source !== "[Removed]");
      setSourceOptions([...new Set(sources)]);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const arr = articles.filter((item) => {
      const isValidArticle =
        item.title &&
        item.description &&
        item.source &&
        item.url &&
        item.source !== "[Removed]" &&
        item.url !== "https://removed.com";

      return isValidArticle && (source !== "" ? item.source === source : true);
    });

    setVisibleArticles(arr);
  }, [source, articles]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">News</h2>

      <form onSubmit={handleSearchSubmit} className="flex items-center w-[30%] sm:w-[90%]">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 w-full bg-white text-gray-900 focus:ring-2 focus:ring-green-500 duration-300 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
        <button
          type="submit"
          className="ml-2 bg-green-500 text-white py-2 px-4 rounded-sm shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      <div className=" my-10 w-[80%] flex sm:flex-col items-center gap-4">
        <div className="relative w-full">
          <select
            name="category"
            id="category"
            className="border p-2 w-full cursor-pointer appearance-none pr-10"
            value={category}
            onChange={handleCategorySelect}
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map((item: string, index: number) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          {category && (
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setCategory("")}
              aria-label="Clear selection"
            >
              &#x2715;
            </button>
          )}
        </div>

        <div className="relative w-full">
          <select
            name="source"
            id="source"
            className="border p-2 w-full cursor-pointer appearance-none pr-10"
            value={source}
            onChange={handleSourceSelect}
          >
            <option value="" disabled>
              Select source
            </option>
            {sourceOptions.map((item: string, index: number) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          {source && (
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setSource("")}
              aria-label="Clear selection"
            >
              &#x2715;
            </button>
          )}
        </div>

        <div className="date-picker relative bottom-3 sm:bottom-0 w-full">
          <label htmlFor="fromDate" className="block text-sm sm:mb-1 font-medium text-gray-700">
            Select Date
          </label>
          <div className="relative">
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2 w-full pr-8"
            />
            {fromDate && (
              <button
                type="button"
                onClick={() => setFromDate("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            )}
          </div>
        </div>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mx-auto p-4 mb-8 w-[300px]">
                <div className="relative h-64 bg-gray-300 animate-pulse rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-4 w-5/6"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded mb-4 w-1/2"></div>
              </div>
            ))
          : visibleArticles.map((item: Article, index: number) => (
              <NewsCard key={index} article={item} />
            ))}
      </div>

      {!loading && visibleArticles.length === 0 && (
        <p className="text-center flex justify-center mt-4 text-red-400">No articles found. Please try adjusting your filters or search query.</p>
      )}
    </div>
  );
}
