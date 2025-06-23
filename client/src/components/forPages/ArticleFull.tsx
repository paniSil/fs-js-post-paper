import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ArticleInterface } from "../../types/Article.interface";
import { MOCK_ARTICLES } from "../../data/mock-articles";
import Button from "../helpers/Button";
import { GoPaperclip } from "react-icons/go";
import { BsStar } from "react-icons/bs";

//виведення однієї статті повністю

const ArticleFull = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const articleId = parseInt(id, 10);

    const currentArticle = MOCK_ARTICLES.find(
      (article) => article.articleId === articleId
    );

    if (currentArticle) {
      setArticle(currentArticle);
    } else {
      setArticle(null);
    }
    setLoading(false);
  }, [id]);

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
  return (
    <div className="article">
      <div className="article__header">
        <div className="article__info">
          <div className="article__author link-span">
            <Button className="link-span__text">{article.authorId}</Button>
          </div>
          <div className="article__date">{article.createdAt}</div>
        </div>
        <div className="article__cover">
          <img
            className="article__image--full"
            src={article.cover}
            alt={article.title}
          />
        </div>
      </div>
      <h2>{article.title}</h2>
      <h3>{article.subtitle}</h3>
      <div className="article__text--full">{article.text}</div>
      <div className="article__info">
        <div className="article__info">
          <div className="article__button">
            <Button className="link">
              <BsStar size="1.2rem" className="link__icon" />
            </Button>
            <span>{article.likes}</span>
          </div>
          <div className="article__button">
            <Button className="link">
              <GoPaperclip size="1.2rem" className="link__icon" />
            </Button>
            <span>{article.paperclips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleFull;
