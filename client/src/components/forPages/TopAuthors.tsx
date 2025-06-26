import { useContext } from "react";
import { Context } from "../../context/Context";

const TopAuthors = () => {
  const { users } = useContext(Context);

  if (!users || users.length === 0) {
    return <p className="articles__empty">No registered users yet</p>;
  }

  return (
    <div>
      <ul className="sidebar__list">
        {users.map((user) => (
          <li className="sidebar__item article__author">
            <div className="article__avatar-frame">
              <img src={user ? user.avatar : ""} alt="avatar" />
            </div>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopAuthors;
