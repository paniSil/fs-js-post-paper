import { useContext } from "react";
import { Context } from "../context/Context";
import Article from "../components/forPages/ArticleCard";
import Button from "../components/helpers/Button";

const AllArticles = () => {
  const { articles } = useContext(Context);

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.createdAt ?? 0).getTime() -
      new Date(a.createdAt ?? 0).getTime()
  );

  return (
    <div>
      <div className="container-main--paddings">
        <h2>All Articles</h2>
        {articles.length === 0 && (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
      <div className="container-main--paddings ">
        {sortedArticles.map(function (article) {
          return <Article key={article._id} article={article} />;
        })}
      </div>
      <div className="link__more-articles">
        <Button to="/articles" className="link">
          Discover more articles
        </Button>
      </div>
    </div>
  );
};

export default AllArticles;
