import { useEffect, useState } from "react";
import type { ArticleInterface } from "../types/Article.interface";
import { Context } from "../context/Context";
import axios from "axios";
import type { UserInterface } from "../types/User.Interface";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [articles, setArticles] = useState<ArticleInterface[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
  const [userInfo, setUserInfo] = useState<UserInterface | null>(null);

  useEffect(() => {
    axios
      .get("/api/articles")
      .then((res) => {
        setArticles(res.data.articles || []);
      })
      .catch(() => {
        setArticles([]);
      });

    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch(() => setUsers([]));
  }, []);

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
    const res = await axios.post("api/auth/login", credentials);
    setCurrentUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("api/auth/logout");
    setCurrentUser(null);
  };

  const register = async (credentials: {
    name: string;
    email: string;
    password: string;
    age: string;
  }) => {
    const res = await axios.post("api/auth/register", credentials);
    setCurrentUser(res.data.user);
  };

  const addArticle = async (article: {
    title: string;
    description: string;
    text: string;
    cover: string;
  }) => {
    const res = await axios.post("api/articles", article);
    const newArticle = res.data.article;
    setArticles([...articles, newArticle]);
    if (currentUser) {
      const updatedUserRes = await axios.put(`api/users/${currentUser._id}`, {
        articleId: newArticle._id,
      });
      setCurrentUser(updatedUserRes.data.user);
    }
  };

  const getUserInfo = async (id: string) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUserInfo(res.data.user || null);
    } catch {
      setUserInfo(null);
    }
  };

  const updateUserInfo = async (
    id: string,
    updatedProfile: {
      name: string;
      email: string;
      password: string;
      age: number | string;
      avatar: string;
    }
  ) => {
    try {
      const res = await axios.put(`api/users/${id}`, updatedProfile);
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

  return (
    <Context.Provider
      value={{
        users,
        articles,
        addArticle,
        currentUser,
        setCurrentUser,
        login,
        logout,
        register,
        userInfo,
        getUserInfo,
        updatePaperclipsInContext,
        updateLikesInContext,
        updateUserInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provider;
