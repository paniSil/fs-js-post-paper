import { useCallback, useEffect, useState } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import { Context } from "../context/Context";
import axios from "axios";
import type { UserInterface } from "../types/User.Interface";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [allArticles, setAllArticles] = useState<ArticleInterface[]>([]);
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 5;

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [userInfo, setUserInfo] = useState<UserInterface | null>(null);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(false);

  // Articles and users get functions
  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [articlesRes, usersRes, allArticlesRes] = await Promise.all([
        axios.get(`/api/articles?page=1&limit=${LIMIT}&sort={"createdAt":-1}`),
        axios.get("/api/users"),
        axios.get("/api/articles?limit=1000"),
      ]);

      if (articlesRes.data.articles) {
        setArticles(articlesRes.data.articles);
        setHasMore(articlesRes.data.articles.length === LIMIT);
        setPage(1);
      }

      if (usersRes.data.users) {
        setUsers(usersRes.data.users);
      }

      if (allArticlesRes.data.articles) {
        setAllArticles(allArticlesRes.data.articles);
      }
    } catch (err) {
      setError("Failed to load initial data");
      console.error("Loading error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreArticles = async () => {
    if (!hasMore || isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const url = `/api/articles?page=${nextPage}&limit=${
        LIMIT - 1
      }&sort={"createdAt":-1}`;
      console.log("Fetching URL:", url);

      const res = await axios.get(url);
      console.log("Response data:", res.data);

      if (res.data.articles && res.data.articles.length > 0) {
        const hasMoreFromServer = res.data.pagination?.hasMore;

        setArticles((prev) => [...prev, ...res.data.articles]);
        setHasMore(
          hasMoreFromServer !== undefined
            ? hasMoreFromServer
            : res.data.articles.length === LIMIT
        );

        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load more articles");
      console.error("Loading more error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // User authentification check and functions
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/check");
        if (res.data.user) {
          setCurrentUser(res.data.user);
        }
      } catch {
        setCurrentUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await axios.post("/api/auth/login", credentials);
    setCurrentUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
  };

  const register = async (credentials: {
    name: string;
    email: string;
    password: string;
    age: string;
  }) => {
    const res = await axios.post("/api/auth/register", credentials);
    setCurrentUser(res.data.user);
  };

  // Single article handlers
  const addArticle = async (article: {
    title: string;
    description: string;
    text: string;
    cover: string;
  }) => {
    try {
      const res = await axios.post("/api/articles", article);
      const newArticle = res.data.article;
      setArticles((prev) => [...prev, newArticle]);
      setAllArticles((prev) => [...prev, newArticle]);
      if (currentUser) {
        const updatedUserRes = await axios.put(
          `/api/users/${currentUser._id}`,
          {
            articleId: newArticle._id,
          }
        );
        setCurrentUser(updatedUserRes.data.user);
      }
    } catch (err) {
      console.error("Error adding article:", err);
      throw err;
    }
  };

  const updateArticle = async (id: string, data: Partial<ArticleInterface>) => {
    try {
      const res = await axios.put(`/api/articles/${id}`, data);
      const updatedArticleData = res.data.article;

      setAllArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id ? { ...article, ...updatedArticleData } : article
        )
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id ? { ...article, ...updatedArticleData } : article
        )
      );

      return res.data.article;
    } catch (err) {
      console.error("Error updating article:", err);
      throw err;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const res = await axios.delete(`/api/articles/${id}`);

      setAllArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== id)
      );

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== id)
      );

      if (currentUser && currentUser.articles) {
        const updatedUserRes = await axios.put(
          `/api/users/${currentUser._id}`,
          {
            removeArticleId: id,
          }
        );

        setCurrentUser(updatedUserRes.data.user);
      }
      return res.data;
    } catch (err) {
      console.error("Error deleting article:", err);
      throw err;
    }
  };

  // likes and paperclips for articles
  const updatePaperclipsInContext = (articleId: string, increment: number) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article._id === articleId
          ? { ...article, paperclips: (article.paperclips || 0) + increment }
          : article
      )
    );
  };

  const updateLikesInContext = (
    articleId: string,
    increment: number,
    userId: string
  ) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article._id !== articleId) return article;
        let likedBy = article.likedBy || [];
        if (increment === 1) {
          likedBy = [...likedBy, userId];
        } else if (increment === -1) {
          likedBy = likedBy.filter((id) => id !== userId);
        }
        return {
          ...article,
          likes: (article.likes || 0) + increment,
          likedBy,
        };
      })
    );
  };

  // User info handlers
  const getUserInfo = useCallback(async (id: string) => {
    setIsUserInfoLoading(true);
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUserInfo(res.data.user || null);
    } catch {
      setUserInfo(null);
    } finally {
      setIsUserInfoLoading(false);
    }
  }, []);

  const updateUserInfo = async (id: string, data: Partial<UserInterface>) => {
    try {
      const res = await axios.put(`/api/users/${id}`, data);
      setCurrentUser(res.data.user || null);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, ...res.data.user } : user
        )
      );
    } catch {
      setCurrentUser(null);
    }
  };

  return (
    <Context.Provider
      value={{
        users,
        articles,
        addArticle,
        login,
        register,
        logout,
        currentUser,
        setCurrentUser,
        userInfo,
        getUserInfo,
        updatePaperclipsInContext,
        updateLikesInContext,
        updateUserInfo,
        isLoading,
        error,
        hasMore,
        loadMoreArticles,
        page,
        allArticles,
        isUserInfoLoading,
        updateArticle,
        deleteArticle,
      }}
    >
      {isLoading && !articles.length ? <div>Loading...</div> : children}
    </Context.Provider>
  );
};
export default Provider;
