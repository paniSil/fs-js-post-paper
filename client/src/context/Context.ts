import { createContext } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import type { UserInterface } from "../types/User.Interface";

interface ContextType {
  articles: ArticleInterface[];
  addArticle: (article: ArticleInterface) => void;
  users: UserInterface[];
}

const initialState: ContextType = {
  users: [],
  articles: [],
  addArticle: () => {},
};

export const Context = createContext<ContextType>(initialState);
