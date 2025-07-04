import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Button from "./Button";
import { BsStar } from "react-icons/bs";

type Props = {
  articleId: string;
  likes: number;
  likedBy: string[];
};

const LikeButton = ({ articleId, likes, likedBy }: Props) => {
  const { currentUser, updateLikesInContext } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const isLiked = !!currentUser && likedBy.includes(currentUser._id);

  const toggleLike = async () => {
    if (!currentUser) return;
    setLoading(true);

    try {
      let newLikedBy;
      let newCount;

      if (isLiked) {
        newLikedBy = likedBy.filter((id) => id !== currentUser._id);
        newCount = -1;
      } else {
        newLikedBy = [...likedBy, currentUser._id];
        newCount = 1;
      }

      await fetch(`/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likedBy: newLikedBy, likes: likes + newCount }),
        credentials: "include",
      });

      updateLikesInContext(articleId, newCount, currentUser._id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article__button">
      <Button
        onClick={toggleLike}
        disabled={loading}
        className="link__button link"
      >
        {isLiked ? (
          <BsStar size="1.2rem" className="link__icon--pressed" />
        ) : (
          <BsStar size="1.2rem" className="link__icon" />
        )}
      </Button>
      <span>{likes}</span>
    </div>
  );
};

export default LikeButton;
