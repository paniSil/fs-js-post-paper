import { SlNote, SlUser, SlLogout } from "react-icons/sl";

import { useContext } from "react";
import { Context } from "../context/Context";
import Button from "./buttons/Button";

const Header = () => {
  const { currentUser, logout } = useContext(Context);

  const today = new Date().toLocaleDateString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      {!currentUser && (
        <div className="header__navbar">
          <Button to="/register" title="Register" className="header__item link">
            Registration
          </Button>

          <Button to="/login" title="Login" className="header__item link">
            Login
          </Button>
        </div>
      )}

      {currentUser && (
        <div className="header__navbar">
          <Button to="/write" title="New Article" className="header__item link">
            <SlNote size="1.2rem" className="link__icon" />
            Write
          </Button>

          <Button to={`/myprofile`} className="header__item link">
            <SlUser size="1.2rem" className="link__icon" />
            {currentUser?.name}
          </Button>

          <Button to="/" onClick={logout} className="header__item link">
            <SlLogout size="1.2rem" className="link__icon" />
          </Button>
        </div>
      )}

      <h1>The Post Paper</h1>
      <div className="header__infobar">
        <div className="header__text">Issue №1234</div>
        <div className="header__text">Your old-school blogging companion</div>
        <div className="header__text">{today}</div>
      </div>
    </header>
  );
};

export default Header;
