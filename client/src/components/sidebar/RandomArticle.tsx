import { useContext, useEffect, useState } from "react";
import Button from "../buttons/Button";
import { Context } from "../../context/Context";
import type { ArticleInterface } from "../../types/Article.interface";
import { RxUpdate } from "react-icons/rx";

const getRandom = (articles: ArticleInterface[], prev?: ArticleInterface) => {
  if (!articles.length) return undefined;
  if (articles.length === 1) return articles[0];

  const availableArticles = prev
    ? articles.filter((article) => article._id !== prev._id)
    : articles;

  return availableArticles[
    Math.floor(Math.random() * availableArticles.length)
  ];
};

const RandomArticle = () => {
  const { allArticles } = useContext(Context);
  const [randomArticle, setRandomArticle] = useState<
    ArticleInterface | undefined
  >(undefined);

  useEffect(() => {
    if (allArticles && allArticles.length > 0) {
      setRandomArticle(getRandom(allArticles));
    }
  }, [allArticles]);

  if (!allArticles || allArticles.length === 0) {
    return <p className="articles__empty">No articles yet</p>;
  }

  if (!randomArticle) {
    return <p className="articles__empty">Loading random article...</p>;
  }

  return (
    <div className="sidebar__block">
      <div className="random">
        <h3>
          <Button
            onClick={() => {
              setRandomArticle(getRandom(allArticles, randomArticle));
            }}
            className="link__button navbar__link"
          >
            Random article <RxUpdate size="1.2rem" className="link__icon" />
          </Button>
        </h3>
        <h2>{randomArticle.title}</h2>
        <h3>{randomArticle.description}</h3>
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
    </div>
  );
};

export default RandomArticle;
