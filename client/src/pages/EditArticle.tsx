import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";


const validationSchema = Yup.object ({
    title: Yup.string(),
    description: Yup.string(),
    text: Yup.string(),
    cover: Yup.string().url("Must be a valid URL"),
})

const EditArticle = (articleId: string) => {
const {articles, updateArticle} = useContext(Context); //прибрати
const navigate = useNavigate();
const articleInfo = articles.find((article) => article._id === articleId);

if (!articleInfo) {
    return <div>No article info to edit!</div>
}

  return (
    <div className="profile">
        <div className="profile__img-frame">
            <img src={articleInfo.cover} alt="article cover" />
        </div>
 <Formik
        initialValues={{
          title: articleInfo.title|| "",
          description: articleInfo.description || "",
          text: articleInfo.text|| "",
          cover: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const filtered = Object.fromEntries(
              Object.entries(values).filter(
                ([key, value]) =>
                  value !== "" && value !== undefined && key !== "id"
              )
            );
            updateArticle(articleInfo._id, filtered);
            resetForm();
            navigate("/");
          } catch (error) {
            alert(`Article update failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
            <Form className="form">
            <h2>Update Article</h2>
            <div>
                <div>
                <label htmlFor="title">Title:</label>
                <Field id="title" name="title" type="text" />
                </div>
                <ErrorMessage name="title" component="div" className="form__error" />
            </div>

            <div>
                <div>
                <label htmlFor="description">Description:</label>
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

            <button type="submit">Update</button>
            </Form>
        </Formik>
    </div>
    
  )
}



export default EditArticle;