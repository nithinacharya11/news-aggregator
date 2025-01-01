import { Article } from "@/lib/types";
import React from "react";
import Image from "next/image";

const NewsCard = ({ article }: { article: Article }) => {
  const { title, description, urlToImage, url, publishedAt, source } = article;

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-lg mx-auto p-4 mb-8">
      {urlToImage && (
        <div className="relative mb-4">
          <img src={urlToImage} alt={title} className="rounded-lg" />
        </div>
      )}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-sm text-gray-500 mb-4">
        <p>Source: {source}</p>
        <p>Published: {new Date(publishedAt).toLocaleString()}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
