import { useContext } from "react";
import { Context } from "../../context/Context";

//виведення однієї статті повністю

const ArticleFull = (id: number) => {
  const { articles } = useContext(Context);
  return <div>{}</div>;
};

export default ArticleFull;
