import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Button from "./Button";
import { GoPaperclip } from "react-icons/go";

type Props = {
  articleId: string;
  paperclips: number;
};

const PaperclipButton = ({ articleId, paperclips }: Props) => {
  const { currentUser, setCurrentUser, updatePaperclipsInContext } =
    useContext(Context);
  const [loading, setLoading] = useState(false);

  const isBookmarked = currentUser?.paperclips.includes(articleId);

  const togglePaperclip = async () => {
    if (!currentUser) return;
    setLoading(true);

    try {
      let newPaperclips;
      let newCount;

      if (isBookmarked) {
        newPaperclips = currentUser.paperclips.filter((id) => id !== articleId);
        newCount = -1;
      } else {
        newPaperclips = [...currentUser.paperclips, articleId];
        newCount = 1;
      }

      const userRes = await fetch(`/api/users/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperclips: newPaperclips }),
        credentials: "include",
      });

      if (!userRes.ok) {
        console.error("User update failed:", await userRes.text());
        return;
      }

      const articleRes = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperclipsIncrement: newCount }),
        credentials: "include",
      });

      if (!articleRes.ok) {
        console.error("Article update failed:", await articleRes.text());
        return;
      }

      updatePaperclipsInContext(articleId, newCount);

      const data = await userRes.json();
      setCurrentUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="article__button">
        <Button
          className="link__button link"
          onClick={togglePaperclip}
          disabled={loading}
        >
          {isBookmarked ? (
            <GoPaperclip size="1.2rem" className="link__icon--pressed" />
          ) : (
            <GoPaperclip size="1.2rem" className="link__icon" />
          )}
        </Button>
        <span>{paperclips}</span>
      </div>
    </>
  );
};

export default PaperclipButton;
