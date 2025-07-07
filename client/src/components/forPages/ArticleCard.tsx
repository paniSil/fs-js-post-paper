import type { ArticleInterface } from "../../types/Article.interface";
import Button from "../helpers/Button";
import { Context } from "../../context/Context";
import { useContext } from "react";
import PaperclipButton from "../helpers/PaperclipButton";
import LikeButton from "../helpers/LikeButton";

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
    likedBy,
  },
}: ArticleProps) => {
  const { users, getUserInfo, getArticleInfo } = useContext(Context);
  const author = users.find((user) => user._id === authorId);

  return (
    <div className="article">
      <div className="article__header">
        <div className="article__info">
          <div className="article__author link-span">
            <div className="article__avatar-frame">
              <img src={author ? author.avatar : ""} alt="avatar" />
            </div>
            {author ? (
              <Button
                to={`/users/${author._id}`}
                onClick={() => getUserInfo(author!._id)}
                className="link__button link-span__text"
              >
                {author ? author.name : authorId}
              </Button>
            ) : (
              <span>{authorId}</span>
            )}
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
          <LikeButton articleId={_id} likes={likes} likedBy={likedBy || []} />
          <PaperclipButton articleId={_id} paperclips={paperclips} />
        </div>

        <div className="article__readmore link-span">
          <Button className="link-span__text" onClick={()=>getArticleInfo(_id)} to={`/articles/${_id}`}>
            read more...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
