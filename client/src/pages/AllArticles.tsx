import { useContext } from "react";
import { Context } from "../context/Context";
import Article from "../components/forPages/ArticleCard";
import Button from "../components/helpers/Button";

const AllArticles = () => {
  const { articles, hasMore, loadMoreArticles, isLoading } =
    useContext(Context);

  return (
    <div>
      <div className="container-main--paddings">
        <h2>All Articles</h2>
        {articles.length === 0 && (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
      <div className="container-main--paddings ">
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

export default AllArticles;
