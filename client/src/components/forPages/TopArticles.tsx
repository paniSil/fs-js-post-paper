import { useContext } from "react";
import { Context } from "../../context/Context";
import Button from "../helpers/Button";
import { PiArticleLight } from "react-icons/pi";

const TopArticles = () => {
  const { articles } = useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No articles yet</p>;
  }

  return (
    <div className="sidebar__block">
      <h3>
        <Button to={"/top-articles"} className="navbar__link">
          Top articles
        </Button>
      </h3>
      <ul className="sidebar__list">
        {articles
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3)
          .map((article) => (
            <li className="sidebar__item">
              <Button to={`/articles/${article._id}`} className="sidebar__link">
                <PiArticleLight size="1.5rem" className="link__icon" />
                {article.title}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopArticles;
