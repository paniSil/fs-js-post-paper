import About from "../pages/About";
import AllArticles from "../pages/AllArticles";
import Article from "../pages/Article";
import Contacts from "../pages/Contacts";
import Index from "../pages/Index";
import Login from "../pages/auth/Login";
import Paper from "../pages/Paper";
import Paperclips from "../pages/Paperclips";
import Profile from "../pages/Profile";
import Register from "../pages/auth/Register";
import TopArticles from "../pages/TopArticles";
import TopAuthors from "../pages/TopAuthors";
import Forgot from "../pages/auth/Forgot";
import Write from "../pages/Write";

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
    label: "Front Page",
    showInNav: true,
  },
  {
    path: "/articles",
    Component: AllArticles,
    label: "All Articles",
    showInNav: true,
  },
  {
    path: "/articles/:id",
    Component: Article,
    label: "Full Article",
    showInNav: false,
  },
  {
    path: "/write",
    Component: Write,
    label: "Write New Article",
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
    path: "/users/:id",
    Component: Profile,
    label: "User Profile",
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
  {
    path: "/register",
    Component: Register,
    label: "Register",
    showInNav: false,
  },
  {
    path: "/login",
    Component: Login,
    label: "Login",
    showInNav: false,
  },
  {
    path: "/forgot",
    Component: Forgot,
    label: "Forgot",
    showInNav: false,
  },
  // Add Colophon ???
];
