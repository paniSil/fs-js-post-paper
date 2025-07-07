import { createContext } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import type { UserInterface } from "../types/User.Interface";

interface ContextType {
  articles: ArticleInterface[];
  allArticles: ArticleInterface[];
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
  userInfo: UserInterface | null;
  getUserInfo: (id: string) => Promise<void>;
  setCurrentUser: (user: UserInterface | null) => void;
  updatePaperclipsInContext: (articleId: string, increment: number) => void;
  updateLikesInContext: (
    articleId: string,
    increment: number,
    userId: string
  ) => void;
  updateUserInfo: (
    id: string,
    updatedProfile: {
      name: string;
      email: string;
      password: string;
      age: number | string;
      avatar: string;
    }
  ) => Promise<void>;
  isLoading: boolean;
  isUserInfoLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadMoreArticles: () => Promise<void>;
}

const initialState: ContextType = {
  isUserInfoLoading: false,
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  loadMoreArticles: async () => {},
  users: [],
  articles: [],
  allArticles: [],
  addArticle: async () => {},
  currentUser: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  userInfo: null,
  getUserInfo: async () => {},
  setCurrentUser: () => {},
  updatePaperclipsInContext: () => {},
  updateLikesInContext: () => {},
  updateUserInfo: async () => {},
};

export const Context = createContext<ContextType>(initialState);
