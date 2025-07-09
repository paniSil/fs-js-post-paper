import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "./ArticleCard";
import Button from "../buttons/Button";

const Articles = () => {
  const { articles, isLoading, loadMoreArticles, hasMore } =
    useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No published articles yet</p>;
  }

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="articles-grid">
        {sortedArticles.map((article) => (
          <div key={article._id}>
            <Article article={article} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="link__more-articles">
          <Button
            onClick={loadMoreArticles}
            disabled={isLoading}
            className="navbar__link"
          >
            {isLoading ? "Loading..." : "Discover more articles"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Articles;
