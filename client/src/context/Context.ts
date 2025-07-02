import { createContext } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import type { UserInterface } from "../types/User.Interface";

interface ContextType {
  articles: ArticleInterface[];
  addArticle: (credentials: {
    title: string;
    description: string;
    text: string;
    cover: string;
  }) => Promise<void>;
  users: UserInterface[];
  currentUser: UserInterface | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: {
    name: string;
    email: string;
    password: string;
    age: string;
  }) => Promise<void>;
}

const initialState: ContextType = {
  users: [],
  articles: [],
  addArticle: async () => {},
  currentUser: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
};

export const Context = createContext<ContextType>(initialState);
