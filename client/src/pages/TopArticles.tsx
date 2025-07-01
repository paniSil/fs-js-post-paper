import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "../components/helpers/Button";

const TopArticles = () => {
  const { articles } = useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No articles yet</p>;
  }

  return (
    <div>
      <h2>Top articles list</h2>
      <ol className="rating__list">
        {articles
          .sort((a, b) => b.likes - a.likes)
          .map((article) => (
            <li className="rating__item">
              <Button to={`/articles/${article._id}`} className="rating__link">
                {article.title}
              </Button>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TopArticles;
