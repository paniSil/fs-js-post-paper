import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Article from "../../components/articles/ArticleCard";
import axios from "axios";
import type { ArticleInterface } from "../../types/Article.interface";

const Paper = () => {
  const { currentUser } = useContext(Context);
  const [userArticles, setUserArticles] = useState<ArticleInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserArticles = async () => {
      if (!currentUser?._id) return;
      setIsLoading(true);
      try {
        const res = await axios.get(`/api/articles/user/${currentUser._id}`);
        setUserArticles(res.data.articles || []);
      } catch (err) {
        console.error("Error loading user articles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserArticles();
  }, [currentUser]);

  const sortedUserArticles = [...userArticles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className="container-main--paddings">
      <h2>My Paper</h2>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : sortedUserArticles.length > 0 ? (
          sortedUserArticles.map((article) => (
            <Article key={article._id} article={article} />
          ))
        ) : (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
    </div>
  );
};

export default Paper;
