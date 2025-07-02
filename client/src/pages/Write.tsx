import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";

const NewArticleSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short!")
    .max(120, "Too long!")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Too short!")
    .max(240, "Too long!")
    .required("Title is required"),
  text: Yup.string().min(10, "Too short!").required("Text is required"),
  cover: Yup.string().url("Must be a valid URL"),
});

const Write = () => {
  const { addArticle } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          text: "",
          cover: "",
        }}
        validationSchema={NewArticleSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await addArticle(values);
            resetForm();
            navigate("/");
          } catch (error) {
            alert(`Article creation failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <h2>New Article</h2>
          <div>
            <div>
              <label htmlFor="title">Title:</label>
              <Field id="title" name="title" type="text" />
            </div>
            <ErrorMessage
              name="title"
              component="div"
              className="form__error"
            />
          </div>

          <div>
            <div>
              <label htmlFor="desription">Description:</label>
              <Field id="description" name="description" type="text" />
            </div>
            <ErrorMessage
              name="description"
              component="div"
              className="form__error"
            />
          </div>

          <div>
            <div>
              <label htmlFor="text">Text:</label>
              <Field id="text" name="text" type="text" />
            </div>
            <ErrorMessage name="text" component="div" className="form__error" />
          </div>

          <div>
            <div>
              <label htmlFor="cover">Cover Link:</label>
              <Field id="cover" name="cover" type="url" />
            </div>
            <ErrorMessage
              name="cover"
              component="div"
              className="form__error"
            />
          </div>

          <button type="submit">Publish</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Write;
