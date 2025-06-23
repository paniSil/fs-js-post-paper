import Articles from "../components/helpers/Articles";
import Button from "../components/helpers/Button";

const Index = () => {
  return (
    <div>
      <h2>This is Index Page</h2>
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
