import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "../components/helpers/Button";
import { PiArticleLight } from "react-icons/pi";

const TopAuthors = () => {
  const { users, getUserInfo } = useContext(Context);

  if (!users || users.length === 0) {
    return <p className="articles__empty">No registered users yet</p>;
  }

  return (
    <div>
      <h2>Top Authors list</h2>
      <ol className="rating__list">
        {[...users]
          .sort(
            (a, b) =>
              Number(b.articles?.length || 0) - Number(a.articles?.length || 0)
          )
          .map((user) => (
            <li className="rating__item ">
              <Button
                to={`/users/${user._id}`}
                onClick={() => getUserInfo(user._id)}
                className="rating__link"
              >
                {user.name} - {user.articles.length}
                <PiArticleLight size="1.2rem" className="link__icon" />
              </Button>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default TopAuthors;
