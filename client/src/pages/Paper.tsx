import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Article from "../components/forPages/ArticleCard";
import Button from "../components/helpers/Button";
import axios from "axios";
import type { ArticleInterface } from "../types/Article.interface";

const Paper = () => {
  const { currentUser } = useContext(Context);
  const [userArticles, setUserArticles] = useState<ArticleInterface[]>([]);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userPage, setUserPage] = useState(1);
  const [isUserArticlesLoading, setIsUserArticlesLoading] = useState(false);
  const LIMIT = 5;

  const loadUserArticles = async (page = 1) => {
    if (!currentUser?._id) return;
    setIsUserArticlesLoading(true);

    try {
      const res = await axios.get(
        `/api/articles/user/${currentUser._id}?page=${page}&limit=${LIMIT}`
      );

      if (page === 1) {
        setUserArticles(res.data.articles);
      } else {
        setUserArticles((prev) => [...prev, ...res.data.articles]);
      }

      setUserHasMore(res.data.pagination.hasMore);
      setUserPage(page);
    } catch (err) {
      console.error("Error loading user articles:", err);
    } finally {
      setIsUserArticlesLoading(false);
    }
  };

  const loadMoreUserArticles = () => {
    if (userHasMore && !isUserArticlesLoading) {
      loadUserArticles(userPage + 1);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      loadUserArticles(1);
    }
  }, [currentUser]);

  return (
    <>
      <div className="container-main--paddings">
        <h2>My Paper</h2>
        <div>
          {userArticles.length > 0 ? (
            userArticles.map((article) => (
              <Article key={article._id} article={article} />
            ))
          ) : (
            <p className="articles__empty">No published articles yet</p>
          )}
        </div>
      </div>{" "}
      {userHasMore && (
        <div className="link__more-articles">
          <Button
            onClick={loadMoreUserArticles}
            disabled={isUserArticlesLoading}
            className="navbar__link"
          >
            {isUserArticlesLoading ? "Loading..." : "Discover more articles"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Paper;
