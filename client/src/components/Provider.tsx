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
        console.log("Users from API:", res.data.users);
        setUsers(res.data.users || []);
      })
      .catch(() => setUsers([]));
  }, []);

  const addArticle = (article: ArticleInterface) => {
    setArticles([...articles, article]);
  };

  return (
    <Context.Provider value={{ users, articles, addArticle }}>
      {children}
    </Context.Provider>
  );
};
export default Provider;
