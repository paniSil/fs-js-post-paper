import { useContext } from "react";
import { Context } from "../../context/Context";
import Button from "../helpers/Button";

const TopAuthors = () => {
  const { users, getUserInfo } = useContext(Context);

  if (!users || users.length === 0) {
    return <p className="articles__empty">No registered users yet</p>;
  }

  return (
    <div className="sidebar__block">
      <h3>
        <Button to={"/top-authors"} className="navbar__link">
          Top authors
        </Button>
      </h3>
      <ul className="sidebar__list">
        {[...users]
          .sort(
            (a, b) =>
              Number(b.articles?.length || 0) - Number(a.articles?.length || 0)
          )
          .slice(0, 5)
          .map((user) => (
            <li className="sidebar__item article__author ">
              <Button
                to={`/users/${user._id}`}
                onClick={() => getUserInfo(user._id)}
                className="sidebar__link"
              >
                <div className="article__avatar-frame">
                  <img src={user ? user.avatar : ""} alt="avatar" />
                </div>
                {user.name}
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopAuthors;
