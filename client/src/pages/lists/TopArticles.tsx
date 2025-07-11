import { useContext } from "react";
import { PiHeartLight } from "react-icons/pi";
import { Context } from "../../context/Context";
import Button from "../../components/buttons/Button";

const TopArticles = () => {
  const { allArticles } = useContext(Context);

  if (!allArticles || allArticles.length === 0) {
    return <p className="articles__empty">No articles yet</p>;
  }

  return (
    <div className="container-main--paddings">
      <h2>Top articles list</h2>
      <ol className="rating__list">
        {allArticles
          .sort((a, b) => b.likes - a.likes)
          .map((article) => (
            <li className="rating__item">
              <Button to={`/articles/${article._id}`} className="rating__link">
                {article.title} - {article.likes}
                <PiHeartLight size="1.2rem" className="link__icon" />
              </Button>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TopArticles;
