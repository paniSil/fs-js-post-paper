import { useContext, useState } from "react";
import Button from "../helpers/Button";
import { Context } from "../../context/Context";
import type { ArticleInterface } from "../../types/Article.interface";
import { RxUpdate } from "react-icons/rx";

const getRandom = (articles: ArticleInterface[]) => {
  return articles[Math.floor(Math.random() * articles.length)];
};

const RandomArticle = () => {
  const { articles } = useContext(Context);

  if (!articles || articles.length === 0) {
    return <p className="articles__empty">No articles yet</p>;
  }

  const [randomArticle, setRandomArticle] = useState(() => getRandom(articles));

  return (
    <div className="sidebar__block">
      <h3>
        <Button
          onClick={() => {
            setRandomArticle(getRandom(articles));
          }}
          className="link__button navbar__link"
        >
          Random article <RxUpdate size="1.2rem" className="link__icon" />
        </Button>
      </h3>
      <div className="random">
        <h2>{randomArticle.title}</h2>
        <h3>{randomArticle.description}</h3>
      </div>

      <div className="random__link-block">
        <div className="link-span random__link-block">
          <Button
            className="link-span__text random__link-span"
            to={`/articles/${randomArticle._id}`}
          >
            read more...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomArticle;
