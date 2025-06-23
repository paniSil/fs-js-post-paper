import { useContext } from "react";
import { Context } from "../context/Context";
import Article from "../components/helpers/Article";

const AllArticles = () => {
  const { articles } = useContext(Context);
  return (
    <div>
      <h2>All Articles</h2>
      <div>
        {articles.length === 0 && (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
      <div>
        {articles.map(function (article) {
          return <Article key={article.articleId} article={article} />;
        })}
      </div>
    </div>
  );
};

export default AllArticles;
