import type { ArticleInterface } from "../../types/Article.interface";
import { BsStar } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import Button from "./Button";

interface ArticleProps {
  article: ArticleInterface;
}

const ArticleSmall = ({
  article: {
    authorId,
    title,
    subtitle,
    text,
    createdAt,
    likes,
    paperclips,
    cover,
  },
}: ArticleProps) => {
  return (
    <div className="article">
      <div className="article__header">
        <div className="article__info">
          <div className="article__author link-span">
            <Button className="link-span__text">{authorId}</Button>
          </div>
          <div className="article__date">{createdAt}</div>
        </div>
        <div className="article__cover">
          <img
            className="article__image article__image--small"
            src={cover}
            alt={title}
          />
        </div>
      </div>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <div className="article__text article__text--small">{text}</div>
      <div className="article__info">
        <div className="article__info">
          <div className="article__button">
            <Button className="link">
              <BsStar size="1.2rem" className="link__icon" />
            </Button>
            <span>{likes}</span>
          </div>
          <div className="article__button">
            <Button className="link">
              <GoPaperclip size="1.2rem" className="link__icon" />
            </Button>
            <span>{paperclips}</span>
          </div>
        </div>

        <div className="article__readmore link-span">
          <Button className="link-span__text">read more...</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleSmall;
