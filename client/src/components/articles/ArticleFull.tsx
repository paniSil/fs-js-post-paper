import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ArticleInterface } from "../../types/Article.interface";
import Button from "../buttons/Button";
import { Context } from "../../context/Context";
import LikeButton from "../buttons/LikeButton";
import PaperclipButton from "../buttons/PaperclipButton";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const ArticleFull = () => {
  const {
    allArticles,
    articles,
    getUserInfo,
    users,
    currentUser,
    deleteArticle,
  } = useContext(Context);
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    let currentArticle =
      allArticles && allArticles.length
        ? allArticles.find((article) => article._id === id)
        : null;

    if (!currentArticle && articles && articles.length) {
      currentArticle = articles.find((article) => article._id === id);
    }

    if (currentArticle) {
      setArticle(currentArticle);
    } else {
      setArticle(null);
    }
    setLoading(false);
  }, [id, allArticles, articles]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Downloading article
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
    _id,
    authorId,
    createdAt,
    cover,
    title,
    description,
    text,
    likes,
    paperclips,
    likedBy,
  } = article;
  const author = users.find(
    (user) => user._id === authorId || user._id === authorId
  );

  return (
    <div className="article container-main--paddings">
      <div className="article__header">
        <div className="article__info">
          <div className="article__author link-span">
            <div className="article__avatar-frame">
              <img src={author ? author.avatar : ""} alt="avatar" />
            </div>

            <Button
              to={`/users/${author!._id}`}
              onClick={() => getUserInfo(author!._id)}
              className="link__button link-span__text"
            >
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
          <LikeButton articleId={_id} likes={likes} likedBy={likedBy || []} />
          <PaperclipButton articleId={_id} paperclips={paperclips} />
        </div>
        <div className="article__info">
          {currentUser?._id === article.authorId && (
            <>
              <div className="article__button">
                <Button
                  onClick={() => deleteArticle(article._id)}
                  className="link__button link"
                >
                  <RiDeleteBinLine size="1.2rem" className="link__icon" />
                </Button>
              </div>
              <div className="article__button">
                <Button
                  to={`/articles/edit/${article._id}`}
                  className="link__button link"
                >
                  <FiEdit size="1.2rem" className="link__icon" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleFull;
