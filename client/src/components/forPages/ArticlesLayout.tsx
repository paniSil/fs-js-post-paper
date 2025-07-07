import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "./ArticleCard";
import Button from "../helpers/Button";

const Articles = () => {
  const { articles, isLoading, loadMoreArticles, hasMore } =
    useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No published articles yet</p>;
  }

  return (
    <div>
      <div className="articles-grid">
        {articles.map((article) => (
          <Article key={article._id} article={article} />
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
