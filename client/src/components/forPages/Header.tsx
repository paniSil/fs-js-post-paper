import { SlNote, SlUser, SlLogout } from "react-icons/sl";
import Button from "../helpers/Button";

const Header = () => {
  const today = new Date().toLocaleDateString("en-EN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__navbar">
        <Button to="/register" title="Register" className="header__item link">
          Registration
        </Button>

        <Button to="/login" title="Login" className="header__item link">
          Login
        </Button>

        <Button to="/" title="New Article" className="header__item link">
          Write
          <SlNote size="1.2rem" className="link__icon" />
        </Button>

        <Button to="/profile" className="header__item link">
          <SlUser size="1.2rem" className="link__icon" />
        </Button>

        <Button to="/" className="header__item link">
          <SlLogout size="1.2rem" className="link__icon" />
        </Button>
      </div>

      <h1>The Post Paper</h1>
      <div className="header__infobar">
        {/* add issue counter (articles / 10) */}
        <div className="header__text">Issue №1234</div>
        <div className="header__text">Your old-school blogging companion</div>
        {/* add current date */}
        <div className="header__text">{today}</div>
      </div>
    </header>
  );
};

export default Header;
