import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import Article from "../components/forPages/ArticleCard";
import { useNavigate } from "react-router";

const Paper = () => {
  const { currentUser, articles } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container-main--paddings">
      <h2>My Paper</h2>
      <div>
        {currentUser?.articles && currentUser.articles.length > 0 ? (
          articles
            .filter((article) =>
              currentUser.articles?.map(String).includes(String(article._id))
            )
            .sort(
              (a, b) =>
                new Date(b.createdAt ?? 0).getTime() -
                new Date(a.createdAt ?? 0).getTime()
            )
            .map((article) => <Article key={article._id} article={article} />)
        ) : (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
    </div>
  );
};

export default Paper;
