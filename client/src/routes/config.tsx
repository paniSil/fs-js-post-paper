import About from "../pages/About";
import AllArticles from "../pages/AllArticles";
import Article from "../pages/Article";
import Contacts from "../pages/Contacts";
import Index from "../pages/Index";
import Paper from "../pages/Paper";
import Paperclips from "../pages/Paperclips";
import Profile from "../pages/Profile";
import TopArticles from "../pages/TopArticles";
import TopAuthors from "../pages/TopAuthors";

interface RouteConfig {
  path: string;
  Component: React.ComponentType;
  label: string;
  showInNav: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    Component: Index,
    label: "Index",
    showInNav: false,
  },
  {
    path: "/articles",
    Component: AllArticles,
    label: "All Articles",
    showInNav: true,
  },
  {
    path: "/article",
    Component: Article,
    label: "Article",
    showInNav: false,
  },
  {
    path: "/paper",
    Component: Paper,
    label: "My Paper",
    showInNav: true,
  },
  {
    path: "/paperclips",
    Component: Paperclips,
    label: "My Paperclips",
    showInNav: true,
  },
  {
    path: "/profile",
    Component: Profile,
    label: "My Profile",
    showInNav: true,
  },
  {
    path: "/top-articles",
    Component: TopArticles,
    label: "Top Articles",
    showInNav: false,
  },
  {
    path: "/top-authors",
    Component: TopAuthors,
    label: "Top Authors",
    showInNav: false,
  },
  {
    path: "/about",
    Component: About,
    label: "About",
    showInNav: false,
  },
  {
    path: "/contacts",
    Component: Contacts,
    label: "Contacts",
    showInNav: false,
  },
  // Add Colophon ???
];
