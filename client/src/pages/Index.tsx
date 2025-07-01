import Articles from "../components/forPages/ArticlesLayout";
import Button from "../components/helpers/Button";

const Index = () => {
  return (
    <div>
      <Articles />
      <div>
        <Button to="/articles" className="link">
          Discover more articles
        </Button>
      </div>
    </div>
  );
};

export default Index;
