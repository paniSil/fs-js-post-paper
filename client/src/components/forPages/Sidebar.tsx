import RandomArticle from "./RandomArticle";
import TopArticles from "./TopArticles";
import TopAuthors from "./TopAuthors";

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
