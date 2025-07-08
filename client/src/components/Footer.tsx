import { RxExternalLink } from "react-icons/rx";
import Button from "./buttons/Button";

const Footer = () => {
  return (
    <footer className="container-column">
      <div className="footer">
        <div className="footer__subgrid">
          <div className="footer__info">
            <div className="footer__header">Site Info</div>
            <p>
              Hi! This site is a course project by Mariia Zvonkova made during
              study on Fullstack JS Course in Hillel IT School.
            </p>
            <p>
              Check out the{" "}
              <span className="link-span">
                <a className="link-span__text">about page</a>
              </span>{" "}
              for more info about how it was made.
            </p>
            <p>
              Want to look at my portfolio?{" "}
              <span className="link-span">
                <a className="link-span__text container-row">
                  Visit{" "}
                  <RxExternalLink size="1.2rem" className="link-span__icon" />
                </a>
              </span>
            </p>
          </div>

          <div className="footer-nav">
            <div className="footer__header">Navigation</div>
            <ul className="footer-nav__list">
              <li className="footer-nav__item link-span">
                <Button to="/" title="Front Page" className="link-span__text">
                  Front page
                </Button>
              </li>
              <li className="footer-nav__item link-span">
                <Button
                  to="/articles"
                  title="All Articles"
                  className="link-span__text"
                >
                  All articles
                </Button>
              </li>
              <li className="footer-nav__item link-span">
                <Button
                  to="/top-articles"
                  title="Top Articles"
                  className="link-span__text"
                >
                  Top articles
                </Button>
              </li>
              <li className="footer-nav__item link-span">
                <Button
                  to="/top-authors"
                  title="Top Authors"
                  className="link-span__text"
                >
                  Top authors
                </Button>
              </li>
              <li className="footer-nav__item link-span">
                <Button to="/about" title="About" className="link-span__text">
                  About
                </Button>
              </li>
              <li className="footer-nav__item link-span">
                <a href="/" className="link-span__text">
                  GitHub
                  <RxExternalLink size="1.4rem" className="link-span__icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__copyright">© 2025 Mariia Zvonkova</div>
    </footer>
  );
};

export default Footer;
