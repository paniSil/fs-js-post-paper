import { createBrowserRouter, RouterProvider } from "react-router";
import "./scss/index.scss";
import { routes } from "./routes/config";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Provider from "./components/Provider";
import Header from "./components/Header";

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
      <Provider>
        <div className="container-xxl">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </>
  );
}

export default App;
