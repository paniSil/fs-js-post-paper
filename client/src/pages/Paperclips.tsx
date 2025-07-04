import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import Article from "../components/forPages/ArticleCard";

const Paperclips = () => {
  const { currentUser, articles } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <h2>My Paperclips</h2>
      <div>
        {currentUser?.paperclips && currentUser.paperclips.length > 0 ? (
          articles
            .filter((article) =>
              currentUser.paperclips?.map(String).includes(String(article._id))
            )
            .reverse()
            .map((article) => <Article key={article._id} article={article} />)
        ) : (
          <p className="articles__empty">
            No saved articles yet. You can save articles for further reading
            using paperclip icon!
          </p>
        )}
      </div>
    </div>
  );
};

export default Paperclips;
