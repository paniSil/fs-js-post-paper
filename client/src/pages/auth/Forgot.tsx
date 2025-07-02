import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const Forgot = () => {
  return (
    <div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ForgotSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await axios.post("/auth/forgot", values);
            alert("Reset request has been sent!");
            resetForm();
          } catch (error) {
            alert(`Reset request failed! ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form">
          <h2>Forgot password?</h2>
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

          <button type="submit">Reset password</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Forgot;
