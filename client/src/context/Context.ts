import { createContext } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import type { UserInterface } from "../types/User.Interface";

interface ContextType {
  isLoading: boolean;
  error: string | null;

  articles: ArticleInterface[];
  allArticles: ArticleInterface[];
  loadMoreArticles: () => Promise<void>;
  page: number;
  hasMore: boolean;

  addArticle: (credentials: {
    title: string;
    description: string;
    text: string;
    cover: string;
  }) => Promise<void>;
  updateArticle: (id: string, data: Partial<ArticleInterface>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;

  updatePaperclipsInContext: (articleId: string, increment: number) => void;
  updateLikesInContext: (
    articleId: string,
    increment: number,
    userId: string
  ) => void;

  users: UserInterface[];
  userInfo: UserInterface | null;
  isUserInfoLoading: boolean;
  getUserInfo: (id: string) => Promise<void>;
  updateUserInfo: (id: string, data: Partial<UserInterface>) => Promise<void>;

  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: {
    name: string;
    email: string;
    password: string;
    age: string;
  }) => Promise<void>;
  currentUser: UserInterface | null;
  setCurrentUser: (user: UserInterface | null) => void;
}

const initialState: ContextType = {
  isLoading: false,
  error: null,

  articles: [],
  allArticles: [],
  loadMoreArticles: async () => {},
  page: 1,
  hasMore: true,

  addArticle: async () => {},
  updateArticle: async () => {},
  deleteArticle: async () => {},

  updatePaperclipsInContext: () => {},
  updateLikesInContext: () => {},

  users: [],
  userInfo: null,
  isUserInfoLoading: false,
  getUserInfo: async () => {},
  updateUserInfo: async () => {},

  login: async () => {},
  logout: async () => {},
  register: async () => {},
  currentUser: null,
  setCurrentUser: () => {},
};

export const Context = createContext<ContextType>(initialState);
