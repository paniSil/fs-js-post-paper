import Button from "../components/Button";

const Index = () => {
  return (
    <div>
      <h2>This is Index Page</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae corporis
        impedit, sit voluptatibus quod eos esse excepturi hic quas possimus.
        Natus, labore ex. Harum reiciendis, optio nesciunt repellat aliquam eum
        explicabo hic quo doloremque et eaque, doloribus vitae placeat odit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae corporis
        impedit, sit voluptatibus quod eos esse excepturi hic quas possimus.
        Natus, labore ex. Harum reiciendis, optio nesciunt repellat aliquam eum
        explicabo hic quo doloremque et eaque, doloribus vitae placeat odit!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae corporis
        impedit, sit voluptatibus quod eos esse excepturi hic quas possimus.
        Natus, labore ex. Harum reiciendis, optio nesciunt repellat aliquam eum
        explicabo hic quo doloremque et eaque, doloribus vitae placeat odit!
      </p>
      <div>
        <Button to="/articles" className="link">
          Discover more articles
        </Button>
      </div>
    </div>
  );
};

export default Index;
