import { useContext } from "react";
import { Context } from "../context/Context";

const Profile = () => {
  const { currentUser } = useContext(Context);

  return (
    <div>
      <h2>Author's Profile</h2>
      <div>
        <img src={currentUser?.avatar} alt="" />
      </div>
      <div>
        <span>Name: </span>
        {currentUser?.name}
      </div>
      <div>
        <span>Email: </span>
        {currentUser?.email}
      </div>
    </div>
  );
};

export default Profile;
