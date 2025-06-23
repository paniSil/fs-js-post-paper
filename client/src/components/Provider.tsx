import { useState } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import { MOCK_ARTICLES } from "../data/mock-articles";
import { Context } from "../context/Context";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [articles, setArticles] = useState<ArticleInterface[]>(MOCK_ARTICLES);

  const addArticle = (article: ArticleInterface) => {
    setArticles([...articles, article]);
  };

  return (
    <Context.Provider value={{ articles, addArticle }}>
      {children}
    </Context.Provider>
  );
};
export default Provider;
