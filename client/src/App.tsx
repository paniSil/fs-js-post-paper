import { createBrowserRouter, RouterProvider } from "react-router";
import "./scss/index.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { routes } from "./routes/config";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div>{children}</div>
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
