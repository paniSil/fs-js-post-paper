import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import Article from "./ArticleCard";

const Articles = () => {
  const { articles } = useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No published articles yet</p>;
  }

  return (
    <div>
      <Article key={articles[0]._id} article={articles[0]} />

      <div className="articles-grid">
        {articles.slice(1).map((article) =>
          article && article._id ? (
            <div className="article--small" key={article._id}>
              <Article article={article} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Articles;
