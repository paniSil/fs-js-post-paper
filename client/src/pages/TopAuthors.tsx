import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "../components/helpers/Button";

const TopAuthors = () => {
  const { users } = useContext(Context);

  if (!users || users.length === 0) {
    return <p className="articles__empty">No registered users yet</p>;
  }

  return (
    <div>
      <h2>Top Authors list</h2>
      <ol className="rating__list">
        {users.map((user) => (
          <li className="rating__item ">
            <Button to={`users/${user._id}`} className="rating__link">
              {user.name}
            </Button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopAuthors;
