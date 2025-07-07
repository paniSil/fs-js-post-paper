import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../components/helpers/Button";

const validationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email("Invalid email"),
  password: Yup.string(),
  age: Yup.number().typeError("Age must be a number"),
  avatar: Yup.string().url("Must be a valid URL"),
});

const CurrentUserProfile = () => {
  const { currentUser, updateUserInfo, articles } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="profile">
      <h2>{`${currentUser.name}'s`} Author's Profile</h2>
      <div className="profile__img-frame">
        <img src={currentUser?.avatar} alt="user avatar" />
      </div>

      <Formik
        initialValues={{
          name: currentUser.name || "",
          email: currentUser.email || "",
          password: "",
          age: currentUser.age ? String(currentUser.age) : "",
          avatar: "",
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
            updateUserInfo(currentUser._id, filtered);
            resetForm();
            navigate("/");
          } catch (error) {
            alert(`User update failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <h2>Update Profile</h2>
          <div>
            <div>
              <label htmlFor="name">Name:</label>
              <Field id="name" name="name" type="text" />
            </div>
            <ErrorMessage name="name" component="div" className="form__error" />
          </div>

          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field id="email" name="email" type="text" />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="form__error"
            />
          </div>

          <div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field id="password" name="password" type="password" />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="form__error"
            />
          </div>

          <div>
            <div>
              <label htmlFor="age">Age:</label>
              <Field id="age" name="age" type="text" />
            </div>
            <ErrorMessage name="age" component="div" className="form__error" />
          </div>

          <div>
            <div>
              <label htmlFor="avatar">Avatar Link:</label>
              <Field id="avatar" name="avatar" type="url" />
            </div>
            <ErrorMessage
              name="avatar"
              component="div"
              className="form__error"
            />
          </div>

          <button type="submit">Update</button>
        </Form>
      </Formik>

      <div>
        <span className="profile__info-articles">
          Articles by {currentUser.name}:
        </span>
        <ol className="rating__list">
          {currentUser?.articles && currentUser.articles.length > 0 ? (
            articles
              .filter((article) =>
                currentUser.articles?.map(String).includes(String(article._id))
              )
              .map((article) => (
                <li className="rating__item">
                  <Button
                    to={`/articles/${article._id}`}
                    className="rating__link"
                  >
                    {article.title}
                  </Button>
                </li>
              ))
          ) : (
            <p className="articles__empty">No published articles yet</p>
          )}
        </ol>
      </div>
    </div>
  );
};

export default CurrentUserProfile;
