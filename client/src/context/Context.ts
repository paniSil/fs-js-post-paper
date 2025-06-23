import { createContext } from "react";
import type { ArticleInterface } from "../types/Article.interface";

interface ContextType {
  articles: ArticleInterface[];
  addArticle: (article: ArticleInterface) => void;
}

const initialState: ContextType = {
  articles: [],
  addArticle: () => {},
};

export const Context = createContext<ContextType>(initialState);
