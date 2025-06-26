import TopAuthors from "./TopAuthors";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Top Articles</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio debitis
        quod sunt, hic, provident ad aperiam neque doloremque soluta quam
        recusandae numquam, iste asperiores accusamus omnis reprehenderit
        quisquam! Distinctio, nostrum.
      </p>
      <h3>Top Authors</h3>
      <div>
        <TopAuthors />
      </div>
      <h3>Random Article</h3>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore sint
        aut adipisci tenetur laboriosam fuga, dignissimos officia aspernatur
        accusamus modi perferendis, voluptate reiciendis porro. Non corporis
        dolorum quibusdam omnis facere?
      </p>
    </div>
  );
};

export default Sidebar;
