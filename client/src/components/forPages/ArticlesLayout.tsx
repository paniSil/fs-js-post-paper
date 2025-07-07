import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "./ArticleCard";
import Button from "../helpers/Button";

const Articles = () => {
  const { articles } = useContext(Context);

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No published articles yet</p>;
  }

  return (
    <div>
      <div className="article--top">
        <Article key={sortedArticles[0]._id} article={sortedArticles[0]} />
      </div>

      <div className="articles-grid">
        {sortedArticles.slice(1).map((article) =>
          article && article._id ? (
            <div className="article--small" key={article._id}>
              <Article article={article} />
            </div>
          ) : null
        )}
      </div>
      <div className="link__more-articles">
        <Button to="/articles" className="link">
          Discover more articles
        </Button>
      </div>
    </div>
  );
};

export default Articles;
