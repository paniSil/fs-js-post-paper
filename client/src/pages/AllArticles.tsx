import { useContext } from "react";
import { Context } from "../context/Context";
import Article from "../components/forPages/ArticleCard";

const AllArticles = () => {
  const { articles } = useContext(Context);

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  return (
    <div>
      <h2>All Articles</h2>
      <div>
        {articles.length === 0 && (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
      <div>
        {sortedArticles.map(function (article) {
          return <Article key={article._id} article={article} />;
        })}
      </div>
    </div>
  );
};

export default AllArticles;
