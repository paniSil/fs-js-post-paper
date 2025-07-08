import { useContext, useEffect } from "react";

import { useNavigate } from "react-router";
import { Context } from "../../context/Context";
import Article from "../../components/articles/ArticleCard";

const Paperclips = () => {
  const { currentUser, allArticles } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  if (!allArticles.length) return <div>Loading...</div>;

  const paperclipSet = new Set(currentUser.paperclips.map(String));
  const filteredArticles = allArticles
    .filter((article) => paperclipSet.has(String(article._id)))
    .sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );

  return (
    <div className="container-main--paddings">
      <h2>My Paperclips</h2>
      <div>
        {currentUser?.paperclips && currentUser.paperclips.length > 0 ? (
          filteredArticles.map((article) => (
            <Article key={article._id} article={article} />
          ))
        ) : (
          <p className="articles__empty">
            No saved articles yet. You can save articles for further reading
            using paperclip icon!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paperclips;
