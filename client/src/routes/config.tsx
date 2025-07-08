import About from "../pages/About";
import AllArticles from "../pages/articles/AllArticles";
import Article from "../pages/articles/Article";
import Index from "../pages/Index";
import Login from "../pages/auth/Login";
import Paper from "../pages/user/Paper";

import Profile from "../pages/user/Profile";
import Register from "../pages/auth/Register";
import Forgot from "../pages/auth/Forgot";

import CurrentUserProfile from "../pages/user/CurrentUserProfile";

import EditArticle from "../pages/articles/EditArticle";
import Write from "../pages/articles/Write";
import Paperclips from "../pages/user/Paperclips";
import TopArticles from "../pages/lists/TopArticles";
import TopAuthors from "../pages/lists/TopAuthors";

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
    path: "/articles/edit/:id",
    Component: EditArticle,
    label: "Edit Article",
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
    path: "/myprofile",
    Component: CurrentUserProfile,
    label: "My Profile",
    showInNav: true,
  },
  {
    path: "/users/:id",
    Component: Profile,
    label: "User Profile",
    showInNav: false,
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
];
