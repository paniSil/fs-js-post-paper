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

  useEffect(() => {
    axios
      .get("/articles/api")
      .then((res) => {
        setArticles(res.data.articles || []);
      })
      .catch(() => {
        setArticles([]);
      });

    axios
      .get("/users/api")
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch(() => setUsers([]));
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    const res = await axios.post("/auth/login", credentials);
    setCurrentUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  const register = async (credentials: {
    name: string;
    email: string;
    password: string;
    age: string;
  }) => {
    const res = await axios.post("/auth/register", credentials);
    setCurrentUser(res.data.user);
  };

  const addArticle = async (article: {
    title: string;
    description: string;
    text: string;
    cover: string;
  }) => {
    const res = await axios.post("/articles", article);
    const newArticle = res.data.article;
    setArticles([...articles, newArticle]);
    if (currentUser) {
      const updatedUserRes = await axios.put(`/users/${currentUser._id}`, {
        articleId: newArticle._id,
      });
      setCurrentUser(updatedUserRes.data.user);
    }
  };

  return (
    <Context.Provider
      value={{
        users,
        articles,
        addArticle,
        currentUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export default Provider;
