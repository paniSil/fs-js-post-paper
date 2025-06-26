import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "./Article";

const Articles = () => {
  const { articles } = useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No published articles yet</p>;
  }

  return (
    <div>
      <Article key={articles[0]._id} article={articles[0]} />

      <div className="articles-grid">
        {articles.map(function (article, index) {
          if (index !== 0) {
            return (
              <div className="article--small">
                <Article key={article._id} article={article} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Articles;
