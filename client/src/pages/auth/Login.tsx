import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../components/helpers/Button";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short! Must be minimum 6 characters long.")
    .max(100, "Too Long! Can not be longer than 100 characters.")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await login(values);
            resetForm();
            navigate("/");
          } catch (error) {
            alert(`Login failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <h2>Login</h2>
          <div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="jane@doe.com"
              />
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

          <p>
            Not registered author? Please,{" "}
            <Button to="/register" className="link-span">
              <span className="link-span__text"> register</span>
            </Button>
          </p>
          <p>
            <Button to="/forgot" className="link-span">
              <span className="link-span__text">Forgot password?</span>
            </Button>
          </p>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
