import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "./Article";
import ArticleSmall from "./ArticleSmall";

const Articles = () => {
  const { articles } = useContext(Context);

  return (
    <div>
      {articles.length === 0 && (
        <p className="articles__empty">No published articles yet</p>
      )}
      <Article key={articles[0].articleId} article={articles[0]} />

      <div className="articles-grid">
        {articles.map(function (article, index) {
          if (index !== 0) {
            return <ArticleSmall key={article.articleId} article={article} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Articles;
