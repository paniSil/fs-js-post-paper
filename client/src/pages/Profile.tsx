import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "../components/helpers/Button";

const Profile = () => {
  const { userInfo, articles } = useContext(Context);

  if (!userInfo) {
    return <p>No info about the user!</p>;
  }

  return (
    <div className="profile">
      <h2>{`${userInfo.name}'s`} Profile</h2>
      <div className="profile__img-frame">
        <img src={userInfo.avatar} alt="" />
      </div>
      <div className="profile__info">
        <div className="profile__line">
          <span className="profile__info-type">Name: </span>
          <span>{userInfo.name}</span>
        </div>
        <div className="profile__line">
          <span className="profile__info-type">Email: </span>
          <span>{userInfo.email}</span>
        </div>
        <div className="profile__line">
          <span className="profile__info-type">Age: </span>
          <span>{userInfo.age}</span>
        </div>
        <div className="profile__line">
          <span className="profile__info-type">Articles in total: </span>
          <span>{userInfo.articles?.length || 0}</span>
        </div>
        <div>
          <span className="profile__info-articles">
            Articles by {userInfo.name}:
          </span>
          <ol className="rating__list">
            {userInfo?.articles && userInfo.articles.length > 0 ? (
              articles
                .filter((article) =>
                  userInfo.articles?.map(String).includes(String(article._id))
                )
                .map((article) => (
                  <li className="rating__item" key={article._id}>
                    <Button
                      to={`/articles/${article._id}`}
                      className="rating__link"
                    >
                      {article.title}
                    </Button>
                  </li>
                ))
            ) : (
              <p className="articles__empty">No published articles yet</p>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Profile;
