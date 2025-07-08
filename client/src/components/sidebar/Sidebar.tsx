import RandomArticle from "./RandomArticle";
import TopArticles from "../lists/TopArticles";
import TopAuthors from "../lists/TopAuthors";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <TopArticles />
      <TopAuthors />
      <RandomArticle />
    </div>
  );
};

export default Sidebar;
