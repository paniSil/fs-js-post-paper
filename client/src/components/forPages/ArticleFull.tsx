import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ArticleInterface } from "../../types/Article.interface";
import Button from "../helpers/Button";
import { GoPaperclip } from "react-icons/go";
import { BsStar } from "react-icons/bs";
import { Context } from "../../context/Context";

const ArticleFull = () => {
  const { articles } = useContext(Context);
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { users } = useContext(Context);

  useEffect(() => {
    setLoading(true);

    const currentArticle = articles.find((article) => article._id === id);

    if (currentArticle) {
      setArticle(currentArticle);
    } else {
      setArticle(null);
    }
    setLoading(false);
  }, [id, articles]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Завантаження поста...
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
        Пост з ID: {id} не знайдено.
      </div>
    );
  }

  const {
    authorId,
    createdAt,
    cover,
    title,
    description,
    text,
    likes,
    paperclips,
  } = article;
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

            <Button className="link__button link-span__text">
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
          <img className="article__image--full" src={cover} alt={title} />
        </div>
      </div>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <div className="article__text--full">{text}</div>
      <div className="article__info">
        <div className="article__info">
          <div className="article__button">
            <Button className="link__button link">
              <BsStar size="1.2rem" className="link__icon" />
            </Button>
            <span>{likes}</span>
          </div>
          <div className="article__button">
            <Button className="link__button link">
              <GoPaperclip size="1.2rem" className="link__icon" />
            </Button>
            <span>{paperclips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleFull;
