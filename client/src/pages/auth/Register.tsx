import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import Button from "../../components/helpers/Button";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short! Must be minimum 3 characters long.")
    .max(30, "Too Long! Can not be longer than 30 characters.")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short! Must be minimum 6 characters long.")
    .max(100, "Too Long! Can not be longer than 100 characters.")
    .required("Password is required"),
  age: Yup.number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : Number(originalValue)
    )
    .min(1, "Wrong value")
    .max(110, "Can not be more than 110"),
});

const Register = () => {
  const { login, register } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          age: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await register(values);
            await login(values);
            resetForm();
            navigate("/");
          } catch (error) {
            alert(`Registration failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <h2>Registration</h2>
          <div>
            <div>
              <label className="form__label" htmlFor="name">
                Name*:
              </label>
              <Field id="name" name="name" placeholder="Jane" />
            </div>

            <ErrorMessage name="name" component="div" className="form__error" />
          </div>

          <div>
            <div>
              <label htmlFor="email">Email*:</label>
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
              <label htmlFor="password">Password*:</label>
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
              <Field id="age" name="age" />
            </div>
            <ErrorMessage name="age" component="div" className="form__error" />
          </div>

          <p>
            Already registered? Please,{" "}
            <Button to="/login" className="link-span">
              <span className="link-span__text">login</span>
            </Button>
          </p>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
