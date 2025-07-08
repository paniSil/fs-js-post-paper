import { useContext } from "react";
import { Context } from "../../context/Context";
import Article from "../../components/articles/ArticleCard";
import Button from "../../components/buttons/Button";
import Articles from "../../components/articles/ArticlesLayout";

const AllArticles = () => {
  const { articles } = useContext(Context);

  return (
    <div>
      <div className="container-main--paddings">
        <h2>All Articles</h2>
        {articles.length === 0 && (
          <p className="articles__empty">No published articles yet</p>
        )}
      </div>
      <div>
        <Articles />
      </div>
    </div>
  );
};

export default AllArticles;
