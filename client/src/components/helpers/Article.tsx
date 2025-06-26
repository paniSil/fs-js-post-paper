import type { ArticleInterface } from "../../types/Article.interface";
import { BsStar } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import Button from "./Button";
import { Context } from "../../context/Context";
import { useContext } from "react";

interface ArticleProps {
  article: ArticleInterface;
}

const Article = ({
  article: {
    _id,
    authorId,
    title,
    description,
    text,
    createdAt,
    likes,
    paperclips,
    cover,
  },
}: ArticleProps) => {
  const { users } = useContext(Context);
  const author = users.find(
    (user) => user._id === authorId || user._id === authorId
  );

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__info">
          <div className="article__author link-span">
            <div className="article__avatar-frame">
              <img src={author ? author.avatar : ""} alt="avatar" />
            </div>

            <Button className="link-span__text">
              {author ? author.name : authorId}
            </Button>
          </div>
          <div className="article__date">
            {createdAt
              ? new Date(createdAt).toLocaleDateString("en-EN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </div>
        </div>
        <div className="article__cover">
          <img className="article__image" src={cover} alt={title} />
        </div>
      </div>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <div className="article__text">{text}</div>
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
          <Button className="link-span__text" to={`/articles/${_id}`}>
            read more...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
