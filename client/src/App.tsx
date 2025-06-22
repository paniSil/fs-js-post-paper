import { createBrowserRouter, RouterProvider } from "react-router";
import "./scss/index.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { routes } from "./routes/config";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="container-grid">
        <Navbar />
        <div className="container-main">{children}</div>
        <Sidebar />
      </div>

      <Footer />
    </>
  );
};

const routerConfig = routes.map((route) => ({
  path: route.path,
  element: (
    <Layout>
      <route.Component />
    </Layout>
  ),
}));

const router = createBrowserRouter(routerConfig);

function App() {
  return (
    <>
      <div className="container-xxl">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
